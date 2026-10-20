import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({ value, onChange, placeholder = "Search..." }: SearchInputProps) {
  return (
    <div className="max-w-xl mx-auto mb-12 relative">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-text-muted">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
      <input 
        type="text" 
        name="search"
        autoComplete="on"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-bg-surface border border-border-strong rounded-full py-3 md:py-4 pl-10 pr-2 text-text-main placeholder-text-muted focus:outline-hidden focus:border-primary-accent transition-all shadow-inner text-sm md:text-lg placeholder:text-sm md:placeholder:text-lg"
      />
    </div>
  );
}
