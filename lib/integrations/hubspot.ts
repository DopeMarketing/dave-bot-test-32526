import { Client } from '@hubspot/api-client';

const hubspot = new Client({ accessToken: process.env.HUBSPOT_API_KEY });

interface Contact {
  email: string;
  firstname?: string;
  lastname?: string;
  company?: string;
}

interface Deal {
  dealname: string;
  amount: number;
  dealstage: string;
}

export async function createContact(contact: Contact): Promise<any> {
  try {
    const result = await hubspot.crm.contacts.basicApi.create({ properties: contact });
    return result;
  } catch (error) {
    throw new Error(`HubSpot contact creation failed: ${error}`);
  }
}

export async function createDeal(deal: Deal): Promise<any> {
  try {
    const result = await hubspot.crm.deals.basicApi.create({ properties: deal });
    return result;
  } catch (error) {
    throw new Error(`HubSpot deal creation failed: ${error}`);
  }
}