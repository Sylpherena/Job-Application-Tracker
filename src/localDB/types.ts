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
  name: string;
  size: number;
  type: string;
  data: string; // Base64 or binary
  lastModifiedDate: string;
}
