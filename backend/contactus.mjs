// exports.handler = async (event) => {
//   return { statusCode: 200, body: "Hello World" };
// };

import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const sns = new SNSClient({});
const MAX_MESSAGE_LENGTH = 2000; // Adjust as needed

export const handler = async (event) => {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }
  const { email, message, name } = body || {};
  if (!email || !message) {
    return { statusCode: 400, body: 'Email and message are required.' };
  }
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    return { statusCode: 400, body: 'Invalid email format.' };
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return { statusCode: 400, body: `Message exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters.` };
  }

  const params = {
    TopicArn: process.env.SNS_TOPIC_ARN,
    Subject: 'Nexus Threads New Contact Form Submission',
    Message: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    console.log('Sending message to SNS:', params);
    await sns.send(new PublishCommand(params));
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": process.env.SITE_ORIGIN,
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('Error sending message to SNS:', err);
    return { statusCode: 500, body: 'Failed to send message.' };
  }
};