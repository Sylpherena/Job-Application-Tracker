import { ApplicationCreate, PaginatedApplication } from "../models";
import { ApplicationSortableField, SortDirection } from "../models/application";

export interface ApplicationRepository {
  addApplication(application: ApplicationCreate): Promise<string>;
  getPaginatedApplications(
    page: number,
    limit: number,
    sort?: { sortBy: ApplicationSortableField; directionStr: SortDirection }
  ): Promise<PaginatedApplication>;
}
