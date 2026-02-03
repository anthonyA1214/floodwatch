"use client";

import { useState, useEffect, useCallback } from "react";
import { MapPin, Clock, Users, Image as ImageIcon, Send, ArrowRight, Navigation, Crosshair, X, MoreVertical } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const MOCK_NEARBY = [
  { id: "nearby-01", name: "Camarin Healthcare and Emergency Clinic" },
  { id: "nearby-02", name: "Brgy 174 Covered Court" },
  { id: "nearby-03", name: "Caloocan City Medical Center" },
];

export default function AffectedLocPanel({ locationId = "loc-001" }: { locationId?: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [startingPoint, setStartingPoint] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [activeTab, setActiveTab] = useState("direction");

  const loadData = useCallback(async () => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 800));
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
      () => setIsLocating(false)
    );
  };

  if (isLoading) return (
    <div className="fixed top-[64px] left-0 w-[480px] h-[calc(100vh-64px)] p-6 bg-white border-r border-slate-200">
      <Skeleton className="w-full h-full rounded-2xl" />
    </div>
  );

  return (
    <div className="fixed top-[64px] left-0 w-[480px] h-[calc(100vh-64px)] flex flex-col bg-white border-r border-slate-200 shadow-xl overflow-hidden font-sans z-40">
      
      {/* IMAGE SECTION */}
      <div className="relative h-[220px] shrink-0">
        <img 
          src="https://images.unsplash.com/photo-1519311788036-bb1dab4da6dc?w=600&q=80" 
          alt="Affected Location" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
      </div>

      <div className="flex-1 flex flex-col min-h-0 p-6">
        <div className="mb-10 shrink-0">
          <h2 className="text-xl font-bold text-slate-800 leading-tight mb-4 tracking-tight">
            Brgy. 174, Kaimall, Caloocan City
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <Clock className="w-3.5 h-3.5 text-[#0066CC]" />
              <span>Posted 24hrs ago</span>
            </div>
            <Badge className="bg-[#FF4D4D] text-white rounded-full px-3 py-0.5 text-[10px] uppercase font-bold tracking-wider border-none">
              Critical
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0 w-full">
          <TabsList className="shrink-0 w-full justify-start bg-transparent border-b border-slate-100 rounded-none h-auto p-0 gap-8 mb-4">
            <TabsTrigger
              value="direction"
              className="relative text-sm font-bold pb-4 rounded-none bg-transparent shadow-none px-0
                         data-[state=active]:text-[#0066CC] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 
                         data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-[#0066CC] transition-all"
            >
              <ArrowRight className="w-4 h-4 mr-2" /> Direction
            </TabsTrigger>
            <TabsTrigger
              value="community"
              className="relative text-sm font-bold pb-4 rounded-none bg-transparent shadow-none px-0
                         data-[state=active]:text-[#0066CC] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 
                         data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-[#0066CC] transition-all"
            >
              <Users className="w-4 h-4 mr-2" /> Community
            </TabsTrigger>
          </TabsList>

          {/* DIRECTION TAB */}
          <TabsContent value="direction" className="flex-1 overflow-y-auto pt-4 space-y-8 outline-none m-0 pr-2 
            scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
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
                  <span className="text-sm font-semibold text-slate-700 truncate">Dr. Jose Rodriguez Memorial Hospital</span>
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
                {MOCK_NEARBY.map((place) => (
                  <Button
                    key={place.id}
                    variant="ghost"
                    className="w-full justify-start gap-4 h-12 px-2 hover:bg-slate-50 text-sm font-medium text-slate-600 border border-transparent hover:border-slate-100"
                    onClick={() => setStartingPoint(place.name)}
                  >
                    <MapPin className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                    <span className="truncate">{place.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* COMMUNITY TAB */}
          <TabsContent value="community" className="flex-1 flex flex-col min-h-0 pt-4 outline-none m-0">
            <div className="shrink-0 border border-slate-200 rounded-xl p-4 shadow-sm bg-white mb-4">
              <Textarea 
                placeholder="Share with your community..."
                className="min-h-[80px] border-none focus-visible:ring-0 p-0 text-sm resize-none"
              />
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" size="sm" className="h-9 px-4 text-xs font-semibold gap-2 border-slate-300 rounded-md">
                  <ImageIcon className="w-4 h-4" /> Add Image
                </Button>
                <Button size="sm" className="h-9 px-4 text-xs font-semibold gap-2 bg-[#0066CC] hover:bg-blue-700 rounded-md">
                  <Send className="w-4 h-4 rotate-45" /> Post Comment
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="p-5 border border-slate-100 rounded-xl space-y-4 shrink-0">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="text-xs">U</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-center">
                        <span className="text-sm font-normal text-slate-800">User {i + 1}</span>
                        <span className="text-xs text-slate-500 font-medium">11/28/2025, 3:00 PM</span>
                      </div>
                    </div>
                    <MoreVertical className="w-5 h-5 text-slate-300 cursor-pointer" />
                  </div>
                  <p className="text-sm text-slate-600 pl-14">Road is currently impassable due to high water levels.</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
  //hi sayo
}