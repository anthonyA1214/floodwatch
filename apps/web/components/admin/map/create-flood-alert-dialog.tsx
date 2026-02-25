'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import InteractiveMap, {
  InteractiveMapHandle,
} from './interactive-map-location';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Field, FieldLabel } from '@/components/ui/field';
import { IconCurrentLocation, IconMinus, IconPlus } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';

export default function CreateFloodAlertDialog() {
  const interactiveMapRef = useRef<InteractiveMapHandle>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  // form data
  const [radius, setRadius] = useState<number | undefined>(undefined);
  const [severityValue, setSeverityValue] = useState<
    'low' | 'moderate' | 'high' | 'critical'
  >('low');

  const handleUseCurrentLocation = async () => {
    try {
      setLoadingLocation(true);
      await interactiveMapRef.current?.geolocate();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLocation(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-poppins py-6">CREATE FLOOD ALERT</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col min-w-[750px] p-0 overflow-hidden gap-0 border-0 [&>button]:text-white [&>button]:hover:text-white [&>button]:opacity-70 [&>button]:hover:opacity-100">
        {/* ── Blue Header ── */}
        <DialogHeader className="flex flex-row items-center gap-4 bg-[#0066CC] rounded-b-2xl px-5 py-4 shrink-0">
          {/* Text */}
          <DialogTitle className="font-poppins text-base font-semibold text-white">
            CREATE FLOOD ALERT
          </DialogTitle>
        </DialogHeader>

        {/* ── Content Area ── */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="flex flex-col ps-4 py-4">
            <div className="flex-1 flex">
              {/* left column */}
              <div className="flex-2 flex flex-col gap-4 h-fit">
                <div className="flex items-center justify-between">
                  <span className="font-poppins text-sm font-medium text-gray-600">
                    LOCATION
                  </span>
                  <button
                    className="font-poppins text-xs flex gap-2 border px-3 py-1.5 rounded-lg items-center text-gray-600 hover:bg-gray-100"
                    onClick={handleUseCurrentLocation}
                  >
                    {loadingLocation ? (
                      <>
                        <Spinner />
                        <span>GETTING YOUR LOCATION...</span>
                      </>
                    ) : (
                      <>
                        <IconCurrentLocation className="w-[1.5em]! h-[1.5em]!" />
                        <span>USE MY CURRENT LOCATION</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="relative flex-1 flex aspect-square rounded-2xl overflow-hidden border h-fit">
                  <InteractiveMap
                    ref={interactiveMapRef}
                    severity={severityValue}
                    range={radius}
                    mode="flood-alert"
                  />
                  <div className="absolute flex flex-col top-4 left-4 z-1 w-fit gap-2 h-fit">
                    <div className="flex flex-col bg-white/80 rounded-md shadow-lg p-0.5 text-xs">
                      <button
                        onClick={() => interactiveMapRef.current?.zoomIn()}
                        className="aspect-square hover:bg-gray-200 rounded-md p-1"
                        title="Zoom In"
                      >
                        <IconPlus
                          className="w-[1.5em]! h-[1.5em]!"
                          strokeWidth={1.5}
                        />
                      </button>
                      <button
                        onClick={() => interactiveMapRef.current?.zoomOut()}
                        className="aspect-square hover:bg-gray-200 rounded-md p-1"
                        title="Zoom Out"
                      >
                        <IconMinus
                          className="w-[1.5em]! h-[1.5em]!"
                          strokeWidth={1.5}
                        />
                      </button>
                    </div>
                  </div>
                  {/*  */}
                </div>
              </div>

              {/* right column */}
              <div
                className="flex-[1.5] flex flex-col"
                style={{ aspectRatio: '1 / 1' }}
              >
                <ScrollArea className="h-full">
                  <div className="flex flex-col gap-4 px-4">
                    {/* Severity Level */}
                    <Field className="flex items-center">
                      <FieldLabel
                        htmlFor="severity"
                        className="font-poppins text-sm font-medium"
                      >
                        SEVERITY LEVEL
                      </FieldLabel>
                      <Select
                        name="severity"
                        defaultValue={severityValue}
                        onValueChange={(value) =>
                          setSeverityValue(
                            value as 'critical' | 'high' | 'moderate' | 'low',
                          )
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Severity Level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Severity Level</SelectLabel>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Field>

                    {/* range */}
                    <Field className="flex items-center">
                      <FieldLabel
                        htmlFor="range"
                        className="font-poppins text-sm font-medium"
                      >
                        AFFECTED RADIUS
                        <span className="font-inter text-xs text-gray-600">
                          (meters)
                        </span>
                      </FieldLabel>
                      <Input
                        id="range"
                        name="range"
                        type="number"
                        placeholder="e.g., 100"
                        min={1}
                        defaultValue={radius}
                        onChange={(e) => setRadius(Number(e.target.value))}
                      />
                    </Field>

                    {/* Description */}
                    <Field className="flex items-center">
                      <FieldLabel
                        htmlFor="description"
                        className="font-poppins text-sm font-medium"
                      >
                        ADDITIONAL DETAILS
                        <span className="font-inter text-gray-600 text-xs">
                          (Optional)
                        </span>
                      </FieldLabel>
                      <Textarea
                        id="description"
                        placeholder="Enter the description"
                        className="no-scrollbar min-h-[120px] max-h-[120px]"
                        style={{ wordBreak: 'break-word' }}
                      />
                    </Field>

                    {/* Upload image */}
                    <Field className="flex items-center">
                      <FieldLabel className="font-poppins text-sm font-medium">
                        UPLOAD IMAGE
                        <span className="font-inter text-gray-600 text-xs">
                          (Optional)
                        </span>
                      </FieldLabel>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        name="image"
                      />
                    </Field>

                    <Button className="font-poppins py-6 mt-auto">
                      CREATE FLOOD ALERT
                    </Button>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
