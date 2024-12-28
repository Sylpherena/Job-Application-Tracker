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

export interface PaginatedApplication {
  applications: Application[];
  currentPage: number;
  totalPages: number;
  totalApplications: number;
}
