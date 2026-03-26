import axios from 'axios';

const api = axios.create({
  baseURL: process.env.ACTIVECAMPAIGN_BASE_URL,
  headers: {
    'Api-Token': process.env.ACTIVECAMPAIGN_API_KEY,
    'Content-Type': 'application/json'
  }
});

interface Contact {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

interface Campaign {
  type: string;
  name: string;
  subject: string;
  fromname: string;
  fromemail: string;
}

export async function createContact(contact: Contact): Promise<any> {
  try {
    const response = await api.post('/api/3/contacts', {
      contact: {
        email: contact.email,
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`ActiveCampaign contact creation failed: ${error}`);
  }
}

export async function getCampaigns(): Promise<any[]> {
  try {
    const response = await api.get('/api/3/campaigns');
    return response.data.campaigns;
  } catch (error) {
    throw new Error(`ActiveCampaign campaigns fetch failed: ${error}`);
  }
}