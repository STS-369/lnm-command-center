const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for lnm.soetechllc.com
app.use(cors({
  origin: 'https://lnm.soetechllc.com',
  optionsSuccessStatus: 200,
}));

// Parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Send email via Gmail API
app.post('/api/gmail/send', async (req, res) => {
  try {
    const { to, subject, body } = req.body;
    
    // Decode the base64-encoded Google token
    const googleToken = JSON.parse(Buffer.from(process.env.GOOGLE_TOKEN, 'base64').toString('utf-8'));
    
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials(googleToken);
    
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    
    // Construct the email
    const rawMessage = [
      `To: ${to}`,
      'Content-Type: text/html; charset=utf-8',
      `Subject: ${subject}`,
      '',
      body,
    ].join('\n');
    
    const encodedMessage = Buffer.from(rawMessage).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
    
    // Send the email
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});