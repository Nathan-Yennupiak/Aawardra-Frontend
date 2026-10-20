import React from 'react';
import AwardCard from './AwardCard';

export default function AwardsGrid({ awards }: { awards: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-8">
      {awards.map((award) => (
        <AwardCard key={award.id} award={award} />
      ))}
    </div>
  );
}
