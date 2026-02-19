export type ReportStatus = "PENDING" | "REVIEWED" | "RESOLVED";
export type ContentType = "COMMENT" | "POST";

export interface ReportItem {
  id: string;
  reporterName: string;
  reporterAvatar?: string;
  reportedAt: string;
  reason: string;
  comment: string;
  status: ReportStatus;
}

export interface ContentItem {
  id: string;
  type: ContentType;
  reportCount: number;
  createdAt: string;
  content: string;
  reports: ReportItem[];
}

export interface ReportedUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  totalReports: number;
  pendingCount: number;
  reviewedCount: number;
  resolvedCount: number;
  contentItems: ContentItem[];
}