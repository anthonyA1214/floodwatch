"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  MapPin, 
  Clock, 
  Phone, 
  BookOpen, 
  ArrowRight, 
  Crosshair, 
  Navigation 
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

// --- TYPES ---
type LocationType = "Hospital" | "Shelter" | "Evacuation Center";

interface SafetyLocation {
  id: string;
  name: string;
  type: LocationType;
  address: string;
  hours: string;
  phone: string;
  description: string;
  imageUrl: string;
}

interface NearbyLocation {
  id: string;
  name: string;
}

// --- MOCK DATA ---
const MOCK_LOCATIONS: Record<string, SafetyLocation> = {
  "loc-001": {
    id: "loc-001",
    name: "Dr. Jose Rodriguez Memorial Hospital",
    type: "Hospital",
    address: "Saint Joseph Avenue, Tala, Caloocan, 1427 Metro Manila",
    hours: "Open 24hrs",
    phone: "0282942571",
    description:
      "The Dr. Jose N. Rodriguez Memorial Hospital, formerly known as Central Luzon Sanitarium, and also called as the Tala Leprosarium, was established in 1940, to accommodate patients with Hansen's Disease in the entire Luzon region in the Philippines.",
    imageUrl:
      "https://images.unsplash.com/photo-1519311788036-bb1dab4da6dc?w=600&q=80",
  },
};

const MOCK_NEARBY: Record<string, NearbyLocation[]> = {
  "loc-001": [
    { id: "nearby-01", name: "Camarin Healthcare and Emergency Clinic" },
    { id: "nearby-02", name: "Brgy 174 Covered Court" },
    { id: "nearby-03", name: "Caloocan City Medical Center" },
  ],
};

const BADGE_VARIANT: Record<LocationType, "default" | "secondary" | "destructive" | "outline"> = {
  Hospital: "default",
  Shelter: "secondary",
  "Evacuation Center": "destructive",
};

// --- MAIN COMPONENT ---
export default function SafetyInfoPanel({ locationId = "loc-001" }: { locationId?: string }) {
  const [location, setLocation] = useState<SafetyLocation | null>(null);
  const [nearby, setNearby] = useState<NearbyLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startingPoint, setStartingPoint] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const loadData = useCallback(async () => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    setLocation(MOCK_LOCATIONS[locationId] || MOCK_LOCATIONS["loc-001"]);
    setNearby(MOCK_NEARBY[locationId] || MOCK_NEARBY["loc-001"]);
    setIsLoading(false);
  }, [locationId]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleGetCurrentLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        setStartingPoint("My Current Location");
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
      }
    );
  };

  const Panel = ({ children }: { children: React.ReactNode }) => (
    <div className="w-[480px] h-[calc(100vh-64px)] mt-[64px] flex flex-col bg-white border-r border-slate-200 shadow-xl overflow-hidden">
      {children}
    </div>
  );

  if (isLoading) return <Panel><Skeleton className="w-full h-full rounded-none" /></Panel>;

  return (
    <Panel>
      <div className="relative h-[220px] shrink-0">
        <img src={location!.imageUrl} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col p-6">
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 leading-tight mb-4 tracking-tight">
            {location!.name}
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <Clock className="w-3.5 h-3.5 text-[#0066CC]" />
              <span>{location!.hours}</span>
            </div>
            <Badge variant={BADGE_VARIANT[location!.type]} className="rounded-full px-3 py-0.5 text-[10px] uppercase font-bold tracking-wider">
              {location!.type}
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Added mb-4 here to separate the labels from the tab bar */}
          <TabsList className="w-full justify-start bg-transparent border-b border-slate-100 rounded-none h-auto p-0 gap-8 mb-4">
            <TabsTrigger
              value="overview"
              className="relative text-sm font-bold pb-4 rounded-none bg-transparent shadow-none px-0
                         data-[state=active]:text-[#0066CC] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 
                         data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-[#0066CC] transition-all"
            >
              <BookOpen className="w-4 h-4 mr-2" /> Overview
            </TabsTrigger>
            <TabsTrigger
              value="direction"
              className="relative text-sm font-bold pb-4 rounded-none bg-transparent shadow-none px-0
                         data-[state=active]:text-[#0066CC] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 
                         data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-[#0066CC] transition-all"
            >
              <ArrowRight className="w-4 h-4 mr-2" /> Direction
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4 space-y-6 outline-none">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <span className="text-sm font-medium text-slate-600 leading-relaxed">{location!.address}</span>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-sm font-medium text-slate-600">{location!.hours}</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-sm font-medium text-slate-600">{location!.phone}</span>
              </div>
            </div>
            
            <Separator className="bg-slate-100" />
            
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Description</span>
              <p className="text-sm text-slate-500 leading-relaxed text-justify">
                {location!.description}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="direction" className="pt-4 space-y-8 outline-none">
            <div className="flex gap-4">
              <div className="flex flex-col items-center py-1.5">
                <div className="w-2.5 h-2.5 rounded-full border-2 border-slate-300 bg-white" />
                <div className="w-0.5 grow border-l border-dotted border-slate-200 my-1" />
                <MapPin className="w-4 h-4 text-red-500" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="relative">
                  <Input 
                    placeholder="Choose starting point..." 
                    value={startingPoint}
                    onChange={(e) => setStartingPoint(e.target.value)}
                    className="h-10 text-sm bg-slate-50 border-slate-200 focus:bg-white pr-10 rounded-lg shadow-none" 
                  />
                  <Navigation 
                    onClick={handleGetCurrentLocation}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 cursor-pointer 
                      ${startingPoint === "My Current Location" ? 'text-[#0066CC]' : 'text-slate-400 hover:text-[#0066CC]'}`} 
                  />
                </div>
                <div className="h-10 px-3 flex items-center bg-slate-100 rounded-lg border border-slate-200">
                  <span className="text-sm font-semibold text-slate-700 truncate">{location!.name}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                type="button"
                onClick={handleGetCurrentLocation}
                className="flex items-center gap-4 w-full p-2 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="p-2.5 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                  <Crosshair className={`w-4 h-4 ${isLocating ? 'animate-spin' : 'text-[#0066CC]'}`} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-slate-700">Your Location</span>
                  <span className="text-[10px] text-slate-400 font-medium">Click to use GPS</span>
                </div>
              </button>

              <div className="grid gap-1">
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest px-2 mb-1">Nearby Places</span>
                {nearby.map((place) => (
                  <Button
                    key={place.id}
                    type="button"
                    variant="ghost"
                    className="w-full justify-start gap-4 h-12 px-2 hover:bg-slate-50 text-sm font-medium text-slate-600 border border-transparent hover:border-slate-100"
                    onClick={(e) => {
                      e.preventDefault();
                      setStartingPoint(place.name);
                    }}
                  >
                    <MapPin className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                    <span className="truncate">{place.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Panel>
  );
  //hello po
}