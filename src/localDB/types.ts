export interface Application {
  id?: string; // Unique string ID
  applicationDate: number;
  position: string;
  company: string;
  country: string;
  location: string;
  cv: {
    id: string; // Foreign key referencing CvFiles table
    name: string;
    lastModified: number;
    link?: string;
  };
  coverLetter: {
    id: string; // Foreign key referencing CoverLetterFiles table
    name: string;
    lastModified: number;
    link?: string;
  } | null;
}

export interface ApplicationCreate {
  applicationDate: Date;
  position: string;
  company: string;
  country: string;
  location: string;
  cv: {
    id: string; // Foreign key referencing CvFiles table
  };
  coverLetter: {
    id: string; // Foreign key referencing CoverLetterFiles table
  } | null;
}

export interface FileRecord {
  id?: string; // Unique string ID
  name: string;
  size: number;
  type: string;
  data: string; // Base64 or binary
  lastModified: number;
  link?: string;
}
