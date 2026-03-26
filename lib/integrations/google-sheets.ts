import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_EMAIL,
  key: process.env.GOOGLE_SHEETS_API_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

interface SheetData {
  [key: string]: string | number;
}

interface SheetRow {
  [key: string]: any;
}

export async function appendToSheet(spreadsheetId: string, sheetTitle: string, data: SheetData[]): Promise<void> {
  try {
    const doc = new GoogleSpreadsheet(spreadsheetId, auth);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[sheetTitle];
    await sheet.addRows(data);
  } catch (error) {
    throw new Error(`Google Sheets append failed: ${error}`);
  }
}

export async function getSheetData(spreadsheetId: string, sheetTitle: string): Promise<SheetRow[]> {
  try {
    const doc = new GoogleSpreadsheet(spreadsheetId, auth);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[sheetTitle];
    const rows = await sheet.getRows();
    return rows.map(row => row.toObject());
  } catch (error) {
    throw new Error(`Google Sheets read failed: ${error}`);
  }
}