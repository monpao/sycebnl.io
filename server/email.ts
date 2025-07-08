import nodemailer from 'nodemailer';

// Configuration du transporteur email
const createTransporter = () => {
  // Configuration pour Gmail
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'sycebnlprojet@gmail.com',
      pass: process.env.EMAIL_PASS || '' // Mot de passe d'application Gmail
    }
  });
};

// Interface pour les données du message de contact
interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Fonction pour envoyer un email de notification de contact
export async function sendContactNotification(contactData: ContactEmailData): Promise<boolean> {
  try {
    const transporter = createTransporter();
    
    // Email de notification pour l'admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER || 'sycebnlprojet@gmail.com',
      to: 'sycebnlprojet@gmail.com',
      subject: `[SYCEBNL Contact] ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">📧 Nouveau Message de Contact</h1>
            <p style="color: #e0e7ff; margin: 10px 0 0 0;">Plateforme SYCEBNL Formation</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1f2937; margin-bottom: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
              Détails du Contact
            </h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">👤 Nom :</strong>
              <span style="color: #6b7280; margin-left: 10px;">${contactData.name}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">📧 Email :</strong>
              <span style="color: #6b7280; margin-left: 10px;">${contactData.email}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">📋 Sujet :</strong>
              <span style="color: #6b7280; margin-left: 10px;">${contactData.subject}</span>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #374151;">💬 Message :</strong>
              <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 10px; border-left: 4px solid #3b82f6;">
                ${contactData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="background: linear-gradient(135deg, #f3f4f6, #e5e7eb); padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 0; color: #6b7280; font-size: 14px; text-align: center;">
                📅 Reçu le ${new Date().toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
            <p>SYCEBNL Formation - Système de Contact Automatisé</p>
          </div>
        </div>
      `
    };

    // Email de confirmation pour l'utilisateur
    const userMailOptions = {
      from: process.env.EMAIL_USER || 'sycebnlprojet@gmail.com',
      to: contactData.email,
      subject: 'Confirmation de réception - SYCEBNL Formation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #10b981, #3b82f6); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">✅ Message Reçu</h1>
            <p style="color: #d1fae5; margin: 10px 0 0 0;">SYCEBNL Formation</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Bonjour ${contactData.name},</h2>
            
            <p style="color: #6b7280; line-height: 1.6; margin-bottom: 20px;">
              Nous avons bien reçu votre message concernant "<strong>${contactData.subject}</strong>" et nous vous remercions de nous avoir contactés.
            </p>
            
            <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
              <h3 style="color: #065f46; margin: 0 0 10px 0; font-size: 16px;">🎯 Prochaines étapes :</h3>
              <ul style="color: #047857; margin: 0; padding-left: 20px;">
                <li>Notre équipe examine votre demande</li>
                <li>Vous recevrez une réponse sous 24-48h</li>
                <li>Pour les paiements de certification, nous vous enverrons les détails</li>
              </ul>
            </div>
            
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #374151; margin: 0 0 10px 0;">📞 Besoin d'aide immédiate ?</h4>
              <p style="color: #6b7280; margin: 0; font-size: 14px;">
                Téléphone : +229 01 60 58 00 11<br>
                Email : sycebnlprojet@gmail.com
              </p>
            </div>
            
            <p style="color: #6b7280; line-height: 1.6; margin-top: 20px;">
              Merci de votre confiance en SYCEBNL Formation pour votre développement professionnel.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #374151; font-weight: bold; margin: 0;">L'équipe SYCEBNL Formation</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
            <p>SYCEBNL Formation - Excellence en Comptabilité des Projets</p>
          </div>
        </div>
      `
    };

    // Envoyer les deux emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);
    
    console.log('Emails de contact envoyés avec succès');
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi des emails:', error);
    return false;
  }
}

// Fonction pour envoyer un email de demande de certification
export async function sendCertificationRequest(userData: { name: string; email: string }): Promise<boolean> {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'sycebnlprojet@gmail.com',
      to: 'sycebnlprojet@gmail.com',
      subject: '[SYCEBNL] Demande de Certification',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🏆 Demande de Certification</h1>
            <p style="color: #fef3c7; margin: 10px 0 0 0;">SYCEBNL Formation</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Nouvelle Demande de Certification</h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">👤 Nom :</strong>
              <span style="color: #6b7280; margin-left: 10px;">${userData.name}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">📧 Email :</strong>
              <span style="color: #6b7280; margin-left: 10px;">${userData.email}</span>
            </div>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <p style="color: #92400e; margin: 0; font-weight: bold;">
                💰 Montant à percevoir : 30 000 FCFA
              </p>
            </div>
            
            <p style="color: #6b7280; margin-top: 20px;">
              📅 Demande reçue le ${new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email de demande de certification envoyé');
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de certification:', error);
    return false;
  }
}

