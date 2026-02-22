'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InteractiveMap from '../map/interactive-map';

import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import type { FloodReportDto } from '@repo/schemas';
import { format, parseISO } from 'date-fns';

type ViewReportDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    report?: FloodReportDto | null;
};

function safeDate(iso?: string) {
    if (!iso) return '';
    try {
        return format(parseISO(iso), 'MMMM dd, yyyy • h:mm a');
    } catch {
        return iso;
    }
}

export default function ViewReportDialog({
    open,
    onOpenChange,
    report,
}: ViewReportDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {/* 🔴 SAME DialogContent sizing as CreateFloodAlertDialog */}
            <DialogContent className="min-w-[60vw] sm:max-w-md md:max-w-lg lg:max-w-xl">
                <div className="grid grid-cols-3 gap-4">
                    {/* 🔴 LEFT: MAP — EXACT SAME WRAPPER */}
                    <div className="grid col-span-2">
                        <InteractiveMap mapId="view-report-map" />
                    </div>

                    {/* 🔴 RIGHT: FORM PANEL — CLONED */}
                    <div className="grid col-span-1 gap-y-6">
                        <DialogTitle className="font-poppins text-xl font-semibold">
                            Flood Alert Report
                        </DialogTitle>

                        <ScrollArea className="flex-1 min-h-0 max-h-[80vh] overflow-hidden">
                            <div className="flex flex-col pr-4 gap-y-6 ms-1">
                                {/* Location name (CLONED INPUT) */}
                                <div className="space-y-2">
                                    <Label>Location Name</Label>
                                    <Input
                                        value={report?.location ?? ''}
                                        readOnly
                                        disabled
                                    />
                                </div>

                                {/* Severity Level (CLONED SELECT) */}
                                <div className="space-y-2">
                                    <Label>Severity Level</Label>
                                    <Select value={report?.severity} disabled>
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Severity Level</SelectLabel>
                                                <SelectItem value="critical">Critical</SelectItem>
                                                <SelectItem value="high">High</SelectItem>
                                                <SelectItem value="moderate">Moderate</SelectItem>
                                                <SelectItem value="low">Low</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Range (CLONED INPUT) */}
                                <div className="space-y-2">
                                    <Label>Range</Label>
                                    <Input
                                        value={report?.range ?? ''}
                                        readOnly
                                        disabled
                                    />
                                </div>

                                {/* Reported Date (NEW but SAME STYLE) */}
                                <div className="space-y-2">
                                    <Label>Reported At</Label>
                                    <Input
                                        value={safeDate(report?.reportedAt)}
                                        readOnly
                                        disabled
                                    />
                                </div>

                                {/* Description (CLONED TEXTAREA STYLE) */}
                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <textarea
                                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm text-slate-700 shadow-sm disabled:opacity-100"
                                        value={report?.description ?? ''}
                                        readOnly
                                    />
                                </div>

                                {/* Upload Image (CLONED DROPZONE LOOK) */}
                                <div className="space-y-2">
                                    <Label>Uploaded Image</Label>
                                    <div className="flex h-32 items-center justify-center rounded-md border border-dashed bg-slate-50 text-slate-400">
                                        Image Preview
                                    </div>
                                </div>

                                {/* ACTION BUTTON — SAME SIZE & SPACING */}
                                <div className="flex w-full gap-2">
                                    <Button className="flex-1 py-6">
                                        Verify
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="flex-1 py-6"
                                        onClick={() => onOpenChange(false)}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}