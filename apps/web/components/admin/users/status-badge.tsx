"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, MessageSquare, ShieldCheck } from "lucide-react";
import { ReportStatus } from "@/lib/types/reported-content";

interface StatusBadgeProps {
  status: ReportStatus;
}

const statusConfig: Record<
  ReportStatus,
  { label: string; icon: React.ReactNode; className: string }
> = {
  PENDING: {
    label: "PENDING",
    icon: <Clock className="w-3 h-3" />,
    className: "bg-orange-100 text-orange-600 border-orange-200 hover:bg-orange-100",
  },
  REVIEWED: {
    label: "REVIEWED",
    icon: <MessageSquare className="w-3 h-3" />,
    className: "bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-100",
  },
  RESOLVED: {
    label: "RESOLVED",
    icon: <ShieldCheck className="w-3 h-3" />,
    className: "bg-green-100 text-green-600 border-green-200 hover:bg-green-100",
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];

  return (
    <Badge
      variant="outline"
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 ${config.className}`}
    >
      {config.icon}
      {config.label}
    </Badge>
  );
};

export default StatusBadge;