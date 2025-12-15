import { cn } from '@/lib';

// Components
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/ui/Pagination';

interface PaginationControlsProps {
  page: number;
  pageCount: number;
}

const PaginationControls = ({ page, pageCount }: PaginationControlsProps) => {
  const currentPage = Math.max(1, Number(page));

  if (pageCount <= 1) return null;

  const isFirst = currentPage === 1;
  const isLast = currentPage === pageCount;

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            href={!isFirst ? `?page=${currentPage - 1}` : undefined}
            aria-disabled={isFirst}
            className={cn(isFirst && 'pointer-events-none opacity-50')}
          />
        </PaginationItem>

        {/* Pages */}
        {Array.from({ length: pageCount }).map((_, i) => {
          const pageNumber = i + 1;
          const isActive = pageNumber === currentPage;

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={`?page=${pageNumber}`}
                isActive={isActive}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href={!isLast ? `?page=${currentPage + 1}` : undefined}
            aria-disabled={isLast}
            className={cn(isLast && 'pointer-events-none opacity-50')}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
