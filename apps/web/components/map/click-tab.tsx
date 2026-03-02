'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  X,
  AlertTriangle,
  BadgeCheck,
  Ban,
  Users,
  Navigation,
} from 'lucide-react';

type ClickTabProps = {
  onClose?: () => void;
};

export default function ClickTab({ onClose }: ClickTabProps) {
  return (
    <div>
      <Card className="overflow-hidden rounded-xl shadow-xl border bg-white">
        <CardContent>
          <div className="space-y-2">
            {/* Status */}
            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge
                variant="outline"
                className="w-fit rounded-full border-2 border-orange-500 px-3 py-1 text-orange-600 text-xs font-medium"
              >
                Unverified report
              </Badge>
            </div>

            {/* Severity */}
            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Severity Level
              </span>
              <Badge
                variant="outline"
                className="w-fit rounded-full border-2 border-red-500 px-3 py-1 text-red-600 text-xs font-medium"
              >
                <AlertTriangle className="mr-1 h-3.5 w-3.5" />
                Critical
              </Badge>
            </div>

            {/* Date */}
            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <span className="text-sm text-muted-foreground">Date/Time</span>
              <span className="text-sm font-medium">02/28/2026 at 7:30 am</span>
            </div>

            {/* Location */}
            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Location Name
              </span>
              <span className="text-sm font-medium truncate">
                Kai mall caloocan c...
              </span>
            </div>

            {/* Reporter */}
            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <span className="text-sm text-muted-foreground">Reported by</span>
              <span className="text-sm font-medium">Marvin Felices</span>
            </div>

            {/* Credibility */}
            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <span className="text-sm text-muted-foreground">Credibility</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium tabular-nums">45%</span>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[45%] bg-foreground/50" />
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-3" />

          {/* Confirm / Deny */}
          <div className="grid grid-cols-2 gap-3">
            <Button className="h-9 rounded-lg">
              <BadgeCheck className="mr-2 h-4 w-4" />
              Confirm
            </Button>

            <Button variant="destructive" className="h-9 rounded-lg">
              <Ban className="mr-2 h-4 w-4" />
              Deny
            </Button>
          </div>

          {/* Bottom actions */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <Button variant="outline" className="h-9 rounded-lg">
              <Users className="mr-2 h-4 w-4" />
              Community
            </Button>

            <Button variant="outline" className="h-9 rounded-lg">
              <Navigation className="mr-2 h-4 w-4" />
              Get Direction
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
