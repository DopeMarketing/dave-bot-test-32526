import { WebClient } from '@slack/web-api';

const slack = new WebClient(process.env.SLACK_API_KEY);

interface SlackMessage {
  channel: string;
  text: string;
  blocks?: any[];
}

interface SlackChannel {
  id: string;
  name: string;
  is_private: boolean;
}

export async function sendMessage(message: SlackMessage): Promise<any> {
  try {
    const result = await slack.chat.postMessage(message);
    return result;
  } catch (error) {
    throw new Error(`Slack message failed: ${error}`);
  }
}

export async function getChannels(): Promise<SlackChannel[]> {
  try {
    const result = await slack.conversations.list({ types: 'public_channel,private_channel' });
    return result.channels as SlackChannel[];
  } catch (error) {
    throw new Error(`Failed to get channels: ${error}`);
  }
}