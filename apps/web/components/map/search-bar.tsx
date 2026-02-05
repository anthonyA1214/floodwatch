import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { IconLayersIntersect, IconSearch } from '@tabler/icons-react';

export default function SearchBar({
  toggleLegend,
}: {
  toggleLegend: () => void;
}) {
  return (
    <InputGroup className="absolute top-4 left-4 h-12 rounded-xl z-50 max-w-md bg-white shadow-md">
      <InputGroupInput placeholder="Search location..." />
      <InputGroupAddon>
        <IconSearch />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <button
          onClick={toggleLegend}
          className="p-2 rounded-lg bg-[#0066CC] hover:bg-[#005BB5] transition text-white mr-2 text-xs"
        >
          <IconLayersIntersect className="w-[1.5em]! h-[1.5em]!" />
        </button>
      </InputGroupAddon>
    </InputGroup>
  );
}
