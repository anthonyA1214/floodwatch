import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <>
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
      <Input
        type="search"
        placeholder="Search Location"
        className="h-14 rounded-full pl-14 pr-6 text-lg"
      />
    </>
  );
}
