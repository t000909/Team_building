import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON body
  app.use(express.json());

  // API endpoint for processing the Contact Form
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !message) {
        res.status(400).json({
          success: false,
          error: 'Please fill in all required fields (Name, Email, and Message).'
        });
        return;
      }

      console.log(`[Contact Form] Submission received from ${name} <${email}>`);
      console.log(`Subject: ${subject || 'No Subject'}`);
      console.log(`Message: ${message}`);

      // Recipient email is fixed per user request
      const recipientEmail = 'finance@teambuilding.biz';

      // 1. Check if SMTP configuration is provided in environment variables
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const smtpSecure = process.env.SMTP_SECURE === 'true';

      const isConfigured = !!(smtpHost && smtpUser && smtpPass);

      let mailSent = false;
      let sheetsSaved = false;
      let devMessage = '';

      // 1. Forward to Google Sheets if GOOGLE_SHEETS_WEBAPP_URL is configured
      const sheetsWebappUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;
      if (sheetsWebappUrl) {
        try {
          console.log(`[Contact Form] Forwarding to Google Sheets Web App: ${sheetsWebappUrl}`);
          const response = await fetch(sheetsWebappUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              email,
              subject: subject || 'No Subject',
              message,
              recipientEmail,
              timestamp: new Date().toISOString()
            }),
          });

          const responseText = await response.text();
          console.log(`[Contact Form] Google Sheets Web App Response: ${responseText}`);
          
          if (response.ok) {
            try {
              const resultJson = JSON.parse(responseText);
              if (resultJson && resultJson.status === 'error') {
                console.warn(`[Contact Form] Google Sheets Web App returned an internal script error: ${resultJson.message || 'Unknown error'}`);
                sheetsSaved = false;
                devMessage = `Google Sheets script error: ${resultJson.message || 'Unknown error'}`;
              } else {
                sheetsSaved = true;
              }
            } catch (jsonErr) {
              // Not a JSON response, but response.ok is true; default to saved
              sheetsSaved = true;
            }
          } else {
            console.warn(`[Contact Form] Google Sheets Web App returned non-ok status: ${response.status}`);
          }
        } catch (sheetError: any) {
          console.error('[Contact Form] Error sending to Google Sheets Web App:', sheetError);
        }
      }

      // 2. SMTP Mail delivery (optional fallback/secondary)
      if (isConfigured) {
        // Determine the "from" address: use SENDER_EMAIL if provided, fallback to smtpUser
        // Transactional providers like SendGrid require a verified sender email address.
        const senderEmail = process.env.SENDER_EMAIL || smtpUser;

        // Create actual SMTP transporter
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const mailOptions = {
          from: `"${name} (via TeamBuilding Website)" <${senderEmail}>`,
          to: recipientEmail,
          replyTo: email,
          subject: subject ? `Contact Form: ${subject}` : `New Contact Form Submission from ${name}`,
          text: `You have received a new message from your website contact form.

Name: ${name}
Email: ${email}
Subject: ${subject || 'N/A'}

Message:
${message}
`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
              <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-top: 0;">New Contact Form Submission</h2>
              <p>You have received a new contact submission targeted for finance department processing.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 10px; font-weight: bold; width: 120px;">Name:</td>
                  <td style="padding: 10px;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold;">Email:</td>
                  <td style="padding: 10px;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                </tr>
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 10px; font-weight: bold;">Subject:</td>
                  <td style="padding: 10px;">${subject || 'N/A'}</td>
                </tr>
              </table>

              <div style="background-color: #f1f5f9; border-radius: 6px; padding: 15px; margin-top: 15px;">
                <h3 style="margin-top: 0; font-size: 14px; color: #475569;">Message Details:</h3>
                <p style="white-space: pre-wrap; margin-bottom: 0;">${message}</p>
              </div>

              <div style="margin-top: 30px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center;">
                This email was generated automatically by the TeamBuilding website contact form system.
              </div>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        mailSent = true;
        console.log(`[Contact Form] Email successfully sent to ${recipientEmail}`);
      } else if (!sheetsSaved && !sheetsWebappUrl) {
        // If neither SMTP nor Google Sheets Web App is configured, log details to console as fallback
        console.warn('[Contact Form] Neither SMTP credentials nor GOOGLE_SHEETS_WEBAPP_URL is configured in .env yet.');
        console.log('--- EMAIL CONTENT PREVIEW ---');
        console.log(`To: ${recipientEmail}`);
        console.log(`From: ${name} <${email}>`);
        console.log(`Subject: Contact Form: ${subject || 'No Subject'}`);
        console.log(`Body:\n${message}`);
        console.log('-----------------------------');
        
        devMessage = 'Form submitted and logged to server console successfully. (Configure GOOGLE_SHEETS_WEBAPP_URL in .env to enable real Google Sheets & Email automation.)';
      }

      res.status(200).json({
        success: true,
        message: 'Your message has been processed successfully!',
        mailSent,
        sheetsSaved,
        devMessage,
      });
    } catch (error: any) {
      console.error('[Contact Form] Error processing contact form:', error);
      res.status(500).json({
        success: false,
        error: 'An internal server error occurred while sending your message. Please try again later.',
        details: error.message,
      });
    }
  });

  // Serve static assets in production, otherwise delegate to Vite in development
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
