import { PrescriptionData } from '../types/prescription';
import { Language, translations } from '../constants/translations';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export const generatePrescriptionHTML = (data: PrescriptionData, language: Language = 'en'): string => {
  const t = translations[language];
  const medicationsHTML = data.medications
    .map(
      (med, index) => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 12px 8px; font-size: 14px;">#${index + 1}</td>
      <td style="padding: 12px 8px;">
        <div style="font-weight: 600; font-size: 15px; color: #1a202c;">${med.name}</div>
        <div style="font-size: 13px; color: #64748b; margin-top: 2px;">${med.dosage}</div>
      </td>
      <td style="padding: 12px 8px; font-size: 14px;">${med.frequency}</td>
      <td style="padding: 12px 8px; font-size: 14px;">${med.duration}</td>
    </tr>
  `
    )
    .join('');

  const templateImageHTML = data.templateImageUri
    ? `<div style="text-align: center; margin-bottom: 20px;">
        <img src="${data.templateImageUri}" style="max-width: 100%; height: auto; max-height: 150px;" />
      </div>`
    : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Helvetica Neue', Arial, sans-serif; 
          padding: 40px;
          background: #fff;
          color: #1a202c;
        }
        .header { 
          border-bottom: 3px solid #0077B6; 
          padding-bottom: 20px; 
          margin-bottom: 30px;
        }
        .clinic-name { 
          font-size: 24px; 
          font-weight: 700; 
          color: #0077B6; 
          margin-bottom: 8px;
        }
        .doctor-info { 
          font-size: 14px; 
          color: #64748b; 
          line-height: 1.6;
        }
        .section { 
          margin-bottom: 25px; 
          padding: 16px;
          background: #f8fafb;
          border-radius: 8px;
        }
        .section-title { 
          font-size: 16px; 
          font-weight: 600; 
          color: #0077B6; 
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .info-grid { 
          display: grid; 
          grid-template-columns: repeat(2, 1fr); 
          gap: 12px;
        }
        .info-item { 
          font-size: 14px; 
        }
        .info-label { 
          color: #64748b; 
          font-weight: 500;
        }
        .info-value { 
          color: #1a202c; 
          font-weight: 600; 
          margin-top: 2px;
        }
        table { 
          width: 100%; 
          border-collapse: collapse; 
          margin-top: 12px;
          background: white;
        }
        th { 
          background: #0077B6; 
          color: white; 
          padding: 12px 8px; 
          text-align: left; 
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .footer { 
          margin-top: 40px; 
          padding-top: 20px; 
          border-top: 2px solid #e5e7eb;
          text-align: right;
        }
        .signature { 
          font-weight: 600; 
          margin-top: 50px;
          color: #1a202c;
        }
        .rx-symbol {
          font-size: 32px;
          font-weight: 700;
          color: #0077B6;
          margin-bottom: 10px;
        }
      </style>
    </head>
    <body>
      ${templateImageHTML}
      
      <div class="header">
        <div class="clinic-name">${data.clinicName}</div>
        <div class="doctor-info">
          <strong>Dr. ${data.doctorName}</strong> (${data.specialization})<br>
          ${language === 'en' ? 'License No' : 'Licencia'}: ${data.licenseNumber}<br>
          ${data.clinicAddress}<br>
          ${t.phone}: ${data.clinicPhone}
        </div>
      </div>

      <div style="text-align: right; margin-bottom: 20px; font-size: 14px; color: #64748b;">
        ${t.date}: ${data.date}
      </div>

      <div class="section">
        <div class="section-title">${t.patientInformation}</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">${language === 'en' ? 'Name' : 'Nombre'}</div>
            <div class="info-value">${data.patientName}</div>
          </div>
          <div class="info-item">
            <div class="info-label">${t.age} / ${t.gender}</div>
            <div class="info-value">${data.patientAge} / ${data.patientGender}</div>
          </div>
          <div class="info-item">
            <div class="info-label">${t.phone}</div>
            <div class="info-value">${data.patientPhone}</div>
          </div>
          <div class="info-item">
            <div class="info-label">${t.address}</div>
            <div class="info-value">${data.patientAddress}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">${t.clinicalAssessment}</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">${t.diagnosis}</div>
            <div class="info-value">${data.diagnosis}</div>
          </div>
          <div class="info-item">
            <div class="info-label">${t.symptoms}</div>
            <div class="info-value">${data.symptoms}</div>
          </div>
          ${
            data.bloodPressure
              ? `<div class="info-item">
            <div class="info-label">${t.bloodPressure}</div>
            <div class="info-value">${data.bloodPressure}</div>
          </div>`
              : ''
          }
          ${
            data.weight
              ? `<div class="info-item">
            <div class="info-label">${t.weight}</div>
            <div class="info-value">${data.weight}</div>
          </div>`
              : ''
          }
        </div>
      </div>

      <div class="section">
        <div class="rx-symbol">${t.rxSymbol}</div>
        <div class="section-title">${language === 'en' ? 'Prescription' : 'Prescripción'}</div>
        <table>
          <thead>
            <tr>
              <th style="width: 40px;">#</th>
              <th>${language === 'en' ? 'Medicine & Dosage' : 'Medicamento y Dosis'}</th>
              <th>${t.frequency}</th>
              <th>${t.duration}</th>
            </tr>
          </thead>
          <tbody>
            ${medicationsHTML}
          </tbody>
        </table>
      </div>

      ${
        data.notes
          ? `<div class="section">
        <div class="section-title">${t.additionalNotes}</div>
        <div style="font-size: 14px; line-height: 1.6; color: #1a202c;">${data.notes}</div>
      </div>`
          : ''
      }

      ${
        data.followUpDate
          ? `<div class="section">
        <div class="section-title">${language === 'en' ? 'Follow-up' : 'Seguimiento'}</div>
        <div style="font-size: 14px; font-weight: 600; color: #1a202c;">${t.nextVisit}: ${data.followUpDate}</div>
      </div>`
          : ''
      }

      <div class="footer">
        <div class="signature">
          Dr. ${data.doctorName}<br>
          ${data.specialization}
        </div>
      </div>
    </body>
    </html>
  `;
};

export const generateAndSharePDF = async (
  data: PrescriptionData,
  language: Language = 'en'
): Promise<void> => {
  try {
    const html = generatePrescriptionHTML(data, language);
    const { uri } = await Print.printToFileAsync({ html });
    
    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: `Prescription_${data.patientName}_${data.date}.pdf`,
        UTI: 'com.adobe.pdf',
      });
    }
  } catch (error) {
    throw new Error('Failed to generate PDF');
  }
};
