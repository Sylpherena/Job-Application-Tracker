export interface Application {
  id?: string; // Unique string ID
  applicationDate: string;
  position: string;
  company: string;
  country: string;
  location: string;
  cvId: number; // Foreign key referencing Files table
  coverLetterId: number; // Foreign key referencing Files table
}

export interface FileRecord {
  id?: string; // Unique string ID
  fileName: string;
  fileType: string;
  fileData: string; // Base64 or binary
}
