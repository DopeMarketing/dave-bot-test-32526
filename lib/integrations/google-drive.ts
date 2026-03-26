import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_EMAIL,
  key: process.env.GOOGLE_DRIVE_API_KEY,
  scopes: ['https://www.googleapis.com/auth/drive']
});

const drive = google.drive({ version: 'v3', auth });

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
}

interface UploadFileParams {
  name: string;
  content: Buffer;
  mimeType: string;
  folderId?: string;
}

export async function uploadFile(params: UploadFileParams): Promise<DriveFile> {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: params.name,
        parents: params.folderId ? [params.folderId] : undefined
      },
      media: {
        mimeType: params.mimeType,
        body: params.content
      }
    });
    return response.data as DriveFile;
  } catch (error) {
    throw new Error(`Google Drive upload failed: ${error}`);
  }
}

export async function listFiles(folderId?: string): Promise<DriveFile[]> {
  try {
    const response = await drive.files.list({
      q: folderId ? `'${folderId}' in parents` : undefined,
      fields: 'files(id,name,mimeType,size)'
    });
    return response.data.files as DriveFile[];
  } catch (error) {
    throw new Error(`Google Drive list failed: ${error}`);
  }
}