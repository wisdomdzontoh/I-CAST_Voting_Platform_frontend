import React from 'react';

export const Pagination: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const PaginationContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex space-x-1">{children}</div>
);

export const PaginationItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
);

export const PaginationPrevious: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <button {...props} className="px-2 py-1" disabled={props.disabled}>
    {children}
  </button>
);

export const PaginationNext: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <button {...props} className="px-2 py-1" disabled={props.disabled}>
    {children}
  </button>
);

export const PaginationLink: React.FC<{ onClick: () => void; isActive?: boolean; children: React.ReactNode }> = ({
  onClick,
  isActive,
  children,
}) => (
  <button
    onClick={onClick}
    className={`px-2 py-1 ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
  >
    {children}
  </button>
);

export const PaginationEllipsis: React.FC = () => <span className="px-2">...</span>;
