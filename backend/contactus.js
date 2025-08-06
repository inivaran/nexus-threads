const AWS = require('aws-sdk');
const { env } = require('process');
const sns = new AWS.SNS();

exports.handler = async (event) => {
  // Parse and validate input
  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }
  const { email, message } = body || {};
  if (!email || !message) {
    return { statusCode: 400, body: 'Email and message are required.' };
  }

  // Basic email format check
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    return { statusCode: 400, body: 'Invalid email format.' };
  }

  // Publish to SNS
  const params = {
    TopicArn: process.env.SNS_TOPIC_ARN,
    Subject: 'New Contact Form Submission',
    Message: `Email: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await sns.publish(params).promise();
    return {
      statusCode: 200,
      headers: { 
        "Access-Control-Allow-Origin": env.SITE_ORIGIN,
        "Access-Control-Allow-Headers": "Content-Type", 
      },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return { statusCode: 500, body: 'Failed to send message.' };
  }
};