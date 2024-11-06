import React, { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationLink,
} from './paginator'; // Import from your UI library if available, otherwise use local subcomponents.

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Handle click to go to a specific page
  const handlePageClick = (page: number) => {
    if (page !== currentPage) onPageChange(page);
  };

  return (
    <Pagination className="mt-4 flex items-center justify-center space-x-2">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt; Prev
          </PaginationPrevious>
        </PaginationItem>

        {/* Page Numbers with Ellipsis */}
        {currentPage > 2 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => handlePageClick(1)} isActive={1 === currentPage}>
                1
              </PaginationLink>
            </PaginationItem>
            {currentPage > 3 && <PaginationEllipsis />}
          </>
        )}

        {/* Middle Pages */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(Math.max(0, currentPage - 2), currentPage + 1)
          .map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageClick(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

        {/* Next Button */}
        {currentPage < totalPages - 2 && <PaginationEllipsis />}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageClick(totalPages)} isActive={totalPages === currentPage}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next &gt;
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
