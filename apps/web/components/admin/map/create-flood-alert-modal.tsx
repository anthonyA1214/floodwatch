import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ImageIcon } from 'lucide-react';
import MapHolder from './map-component';
import { Textarea } from '@/components/ui/textarea';

export default function CreateFloodAlertModal() {
  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <Button className="w-full rounded-sm h-15 bg-[#0066CC] text-white hover:bg-gray-100 hover:text-black ">
          Create Affected Location
        </Button>
      </DialogTrigger>

      {/* Give modal a real height */}
      <DialogContent className="max-w-md sm:max-w-lg md:max-w-2xl h-[90vh] p-0 overflow-hidden">
        {/* HEADER (fixed height) */}
        <DialogHeader className="p-5">
          <DialogTitle>Create Flood Alert</DialogTitle>
        </DialogHeader>

        {/* BODY */}
        <div className="flex flex-col">
          {/* MAP (fixed height) */}
          <div className="h-[220px] w-full border-b">
            <MapHolder />
          </div>

          {/* FORM (scrollable) */}
          <div className="flex-1 overflow-y-auto bg-[#F2F8FF]">
            <form className="p-4 space-y-4">
              <div>
                <Label className="pb-3"> Location </Label>
                <Input placeholder="Address Location Name" />
              </div>

              <div>
                <Label className="pb-3">Severity Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="pb-3">Latitude</Label>
                  <Input placeholder="14.5995" />
                </div>
                <div>
                  <Label className="pb-3">Longitude</Label>
                  <Input placeholder="120.9842" />
                </div>
              </div>

              <div>
                <Label className="pb-3">Description</Label>
                <Textarea placeholder="Description" />
              </div>

              {/* Upload */}
              <div className="border-2 border-dashed rounded-lg p-6 text-center text-sm text-gray-400">
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <ImageIcon className="h-6 w-6" />
                  <span>Upload Image</span>
                </label>

                <Input id="image-upload" type="file" className="hidden" />
              </div>

              <Button className="w-full py-4 bg-[#0066CC] hover:bg-[#4894db]">
                Post Flood Alert
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
