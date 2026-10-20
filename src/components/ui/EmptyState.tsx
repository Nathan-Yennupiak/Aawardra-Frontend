import React from 'react';

interface EmptyStateProps {
  message: string;
  onClear?: () => void;
  simple?: boolean;
}

export default function EmptyState({ message, onClear, simple }: EmptyStateProps) {
  if (simple) {
    return <div className="text-center mt-12 text-text-muted">{message}</div>;
  }

  return (
    <div className="text-center mt-12 text-text-muted bg-bg-surface p-12 rounded-xl border border-border-subtle">
      <p className="text-xl mb-2">{message}</p>
      {onClear && (
        <button onClick={onClear} className="text-primary-accent hover:underline font-semibold mt-2 cursor-pointer">
          Clear search
        </button>
      )}
    </div>
  );
}
