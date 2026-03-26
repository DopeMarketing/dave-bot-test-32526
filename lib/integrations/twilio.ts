import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_API_KEY);

interface SMSMessage {
  to: string;
  from: string;
  body: string;
}

interface CallParams {
  to: string;
  from: string;
  url: string;
}

export async function sendSMS(message: SMSMessage): Promise<any> {
  try {
    const result = await client.messages.create({
      body: message.body,
      from: message.from,
      to: message.to
    });
    return result;
  } catch (error) {
    throw new Error(`Twilio SMS failed: ${error}`);
  }
}

export async function makeCall(params: CallParams): Promise<any> {
  try {
    const result = await client.calls.create({
      url: params.url,
      to: params.to,
      from: params.from
    });
    return result;
  } catch (error) {
    throw new Error(`Twilio call failed: ${error}`);
  }
}