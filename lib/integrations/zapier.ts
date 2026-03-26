import axios from 'axios';

const api = axios.create({
  headers: {
    'X-API-Key': process.env.ZAPIER_API_KEY,
    'Content-Type': 'application/json'
  }
});

interface WebhookData {
  [key: string]: any;
}

interface ZapTrigger {
  url: string;
  data: WebhookData;
}

export async function triggerWebhook(trigger: ZapTrigger): Promise<any> {
  try {
    const response = await api.post(trigger.url, trigger.data);
    return response.data;
  } catch (error) {
    throw new Error(`Zapier webhook trigger failed: ${error}`);
  }
}

export async function sendData(webhookUrl: string, data: WebhookData): Promise<any> {
  try {
    const response = await axios.post(webhookUrl, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Zapier data send failed: ${error}`);
  }
}