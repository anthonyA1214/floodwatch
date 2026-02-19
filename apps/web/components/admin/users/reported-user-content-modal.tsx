"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Clock,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  TriangleAlert,
  CalendarDays,
} from "lucide-react";
import { ReportedUser, ContentItem } from "@/lib/types/reported-content";
import ReportItem from "./report-item";

type ActionType = "hide" | "warn" | "dismiss" | null;

interface ConfirmConfig {
  title: string;
  description: string;
}

const confirmConfig: Record<NonNullable<ActionType>, ConfirmConfig> = {
  hide: {
    title: "Confirm Action",
    description:
      "Are you sure you want to hide this content? This will hide the content from the community feed and resolve the associated reports.",
  },
  warn: {
    title: "Confirm Action",
    description:
      "Are you sure you want to warn this user? This will send a warning about the reported post and mark the report as resolved.",
  },
  dismiss: {
    title: "Confirm Action",
    description:
      "Are you sure you want to dismiss these reports? The content will remain visible and the reports will be marked as resolved.",
  },
};

interface ReportedUserContentModalProps {
  user: ReportedUser | null;
  open: boolean;
  onClose: () => void;
}

const ReportedUserContentModal: React.FC<ReportedUserContentModalProps> = ({
  user,
  open,
  onClose,
}) => {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<{
    type: ActionType;
    itemId: string;
  } | null>(null);

  const handleToggle = (itemId: string) => {
    setExpandedItemId((prev) => (prev === itemId ? null : itemId));
  };

  const handleAction = (type: ActionType, itemId: string) => {
    setPendingAction({ type, itemId });
  };

  const handleConfirm = () => {
    // TODO: wire up to API based on pendingAction.type and pendingAction.itemId
    console.log("Confirmed action:", pendingAction);
    setPendingAction(null);
  };

  const handleCancelConfirm = () => {
    setPendingAction(null);
  };

  if (!user) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="w-[1250px] max-w-[90vw] p-0 gap-0 overflow-hidden rounded-2xl">
          {/* Blue Header */}
          <DialogHeader className="bg-blue-600 px-6 py-4">
            <DialogTitle className="text-white text-lg font-semibold text-left">
              Reported User Content
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[80vh]">
            <div className="p-5 flex flex-col gap-4">

              {/* User Info Card */}
              <Card className="shadow-none border border-gray-100">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-gray-200 text-gray-600 font-bold text-sm">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-500">{user.totalReports}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Total Reports
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Status Summary */}
              <div className="grid grid-cols-3 gap-2">
                <Card className="shadow-none border border-orange-100 bg-orange-50">
                  <CardContent className="p-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                        Pending
                      </p>
                      <p className="text-xl font-bold text-gray-800">{user.pendingCount}</p>
                    </div>
                    <Clock className="w-5 h-5 text-orange-400" />
                  </CardContent>
                </Card>

                <Card className="shadow-none border border-blue-100 bg-blue-50">
                  <CardContent className="p-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                        Reviewed
                      </p>
                      <p className="text-xl font-bold text-gray-800">{user.reviewedCount}</p>
                    </div>
                    <MessageSquare className="w-5 h-5 text-blue-400" />
                  </CardContent>
                </Card>

                <Card className="shadow-none border border-green-100 bg-green-50">
                  <CardContent className="p-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                        Resolved
                      </p>
                      <p className="text-xl font-bold text-gray-800">{user.resolvedCount}</p>
                    </div>
                    <ShieldCheck className="w-5 h-5 text-green-400" />
                  </CardContent>
                </Card>
              </div>

              {/* Content Items */}
              <div className="flex flex-col gap-3">
                {user.contentItems.map((item: ContentItem) => {
                  const isExpanded = expandedItemId === item.id;
                  const formattedDate = new Date(item.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <Card
                      key={item.id}
                      className={`shadow-none overflow-hidden transition-all duration-200 ${
                        isExpanded
                          ? "border-blue-200"
                          : "border-gray-100 hover:border-blue-200 hover:shadow-sm"
                      }`}
                    >
                      {/* Header Row */}
                      <CardContent
                        className="p-3 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                        onClick={() => handleToggle(item.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-50 text-xs font-semibold gap-1"
                            >
                              <MessageSquare className="w-3 h-3" />
                              {item.type}
                            </Badge>

                            <Badge
                              variant="outline"
                              className="bg-red-50 text-red-500 border-red-200 hover:bg-red-50 text-xs font-semibold gap-1"
                            >
                              <TriangleAlert className="w-3 h-3" />
                              {item.reportCount} REPORTS
                            </Badge>

                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                              <CalendarDays className="w-3 h-3" />
                              {formattedDate}
                            </span>
                          </div>

                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                          )}
                        </div>

                        <div className="mt-2">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                            Content
                          </p>
                          <p className={`text-sm text-gray-700 ${!isExpanded ? "line-clamp-2" : ""}`}>
                            {item.content}
                          </p>
                        </div>
                      </CardContent>

                      {/* Expanded: Reports List + Action Buttons */}
                      {isExpanded && (
                        <>
                          <Separator />
                          <div className="p-3 bg-gray-50">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                              Reports ({item.reports.length})
                            </p>
                            <div className="flex flex-col gap-3">
                              {item.reports.map((report) => (
                                <ReportItem key={report.id} report={report} />
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <Separator />
                          <div className="px-3 py-3 bg-white flex items-center justify-end gap-2">
                            <Button
                              onClick={() => handleAction("hide", item.id)}
                              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-full px-4"
                            >
                              HIDE CONTENT
                            </Button>
                            <Button
                              onClick={() => handleAction("warn", item.id)}
                              className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-full px-4"
                            >
                              WARN USER
                            </Button>
                            <Button
                              onClick={() => handleAction("dismiss", item.id)}
                              className="bg-gray-500 hover:bg-gray-600 text-white text-xs font-bold rounded-full px-4"
                            >
                              DISMISS REPORTS
                            </Button>
                          </div>
                        </>
                      )}
                    </Card>
                  );
                })}
              </div>

            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Confirm Action Dialog */}
      {pendingAction?.type && (
        <Dialog open={!!pendingAction} onOpenChange={handleCancelConfirm}>
          <DialogContent className="w-[440px] max-w-[90vw] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-base font-semibold text-gray-800">
                {confirmConfig[pendingAction.type].title}
              </DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">
              {confirmConfig[pendingAction.type].description}
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                className="rounded-full px-6"
                onClick={handleCancelConfirm}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
                onClick={handleConfirm}
              >
                Confirm
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ReportedUserContentModal;