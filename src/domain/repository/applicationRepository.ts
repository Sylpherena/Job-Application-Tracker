import { ApplicationCreate, PaginatedApplication } from "../models";

export interface ApplicationRepository {
  addApplication(application: ApplicationCreate): Promise<string>;
  getPaginatedApplications(
    page: number,
    limit: number
  ): Promise<PaginatedApplication>;
}
