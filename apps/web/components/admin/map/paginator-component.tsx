import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function Paginator() {
  return (
    <Pagination>
      <PaginationContent className="flex items-center gap-2">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className="rounded-full bg-[#0066CC] text-white"
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            href="#"
            isActive
            className="h-9 w-9 rounded-full border-0 bg-[#0066CC] text-white"
          >
            1
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="#"
            className="rounded-full bg-[#0066CC] text-white"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
