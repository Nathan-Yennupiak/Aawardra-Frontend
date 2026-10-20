'use client';

import React, { useState } from 'react';
import SearchInput from '../ui/SearchInput';
import EmptyState from '../ui/EmptyState';
import AwardsGrid from './AwardsGrid';

export default function AwardsList({ awards }: { awards: any[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAwards = awards.filter(award => 
    award.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    award.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SearchInput 
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search awards by name or description..."
      />

      {filteredAwards.length === 0 ? (
        <EmptyState 
          message={`No awards found matching "${searchQuery}"`}
          onClear={() => setSearchQuery('')}
        />
      ) : (
        <AwardsGrid awards={filteredAwards} />
      )}
    </>
  );
}
