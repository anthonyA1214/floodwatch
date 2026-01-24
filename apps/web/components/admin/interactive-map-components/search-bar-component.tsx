import { Input } from '@/components/ui/input';

export default function SearchBar() {
  return (
    <>
      <Input
        type="search"
        placeholder="Search"
        className="mt-4 text-2xl  h-16 px-8 rounded-xl"
      />
    </>
  );
}
