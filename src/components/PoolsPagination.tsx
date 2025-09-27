
import React from 'react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

interface PoolsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PoolsPagination = ({ currentPage, totalPages, onPageChange }: PoolsPaginationProps) => {
  return (
    <div className="flex justify-center mt-12">
      <Pagination>
        <PaginationContent className="pixel-card px-4 py-2">
          <PaginationItem>
            <PaginationPrevious 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              className={`text-jungle-300 hover:text-yellow-400 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </PaginationItem>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
                isActive={page === currentPage}
                className={`${
                  page === currentPage 
                    ? 'bg-yellow-400 text-jungle-900 font-bold' 
                    : 'text-jungle-300 hover:text-yellow-400 hover:bg-jungle-700'
                }`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
              className={`text-jungle-300 hover:text-yellow-400 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
      {/* Jungle decoration */}
      <div className="absolute -z-10 flex justify-center mt-16 text-2xl space-x-6 opacity-30">
        <span className="animate-pixel-pulse">🌿</span>
        <span className="animate-pixel-pulse" style={{ animationDelay: '0.7s' }}>🍃</span>
        <span className="animate-pixel-pulse" style={{ animationDelay: '1.4s' }}>🌿</span>
      </div>
    </div>
  );
};

export default PoolsPagination;
