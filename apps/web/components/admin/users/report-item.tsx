"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReportItem as ReportItemType } from "@/lib/types/reported-content";
import StatusBadge from "./status-badge";

interface ReportItemProps {
  report: ReportItemType;
}

const ReportItem: React.FC<ReportItemProps> = ({ report }) => {
  const formattedDate = new Date(report.reportedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card className="shadow-none border border-gray-100">
      <CardContent className="p-4 flex flex-col gap-2">
        {/* Reporter Info Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9">
              <AvatarImage src={report.reporterAvatar} alt={report.reporterName} />
              <AvatarFallback className="bg-gray-200 text-gray-600 text-sm font-semibold">
                {report.reporterName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-gray-800">{report.reporterName}</p>
              <p className="text-xs text-muted-foreground">{formattedDate}</p>
            </div>
          </div>
          <StatusBadge status={report.status} />
        </div>

        {/* Reason Tag */}
        <Badge
          variant="outline"
          className="w-fit bg-red-50 text-red-500 border-red-200 hover:bg-red-50 text-xs font-medium"
        >
          {report.reason}
        </Badge>

        {/* Comment */}
        <p className="text-sm text-muted-foreground">{report.comment}</p>
      </CardContent>
    </Card>
  );
};

export default ReportItem;