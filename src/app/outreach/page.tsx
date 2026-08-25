import React, { useState } from 'react';
import axios from 'axios';

export default function OutreachPage() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setMessage('');

    try {
      const apiUrl = process.env.RAILWAY_API_URL || '/api/gmail/send';
      const response = await axios.post(apiUrl, { to, subject, body });
      
      if (response.data.success) {
        setMessage('Email sent successfully!');
      } else {
        setMessage('Failed to send email.');
      }
    } catch (error) {
      setMessage('Error sending email. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <h1>Email Outreach</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>To:</label>
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isSending}>
          {isSending ? 'Sending...' : 'Send Email'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}