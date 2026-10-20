'use client';
import Link from 'next/link';
import { useState } from 'react';
import NominateModal from './NominateModal';

/**
 * Props definition for the CandidateCard component.
 * Ensures the component receives all necessary candidate details
 * including their nomination progress (if fetched from the backend).
 */
export interface CandidateCardProps {
  id: string;
  name: string;
  slug: string;
  title?: string;
  organization?: string;
  photoUrl?: string;
  category: {
    name: string;
  };
  nominationProgress?: {
    confirmed: number;
    target: number;
    percentage: number;
  };
  awardCandidateId?: string;
  nominationFee?: number;
}

/**
 * CandidateCard - A reusable card component to display candidate summaries.
 * Shows the candidate's photo, basic details, and a dynamic nomination progress bar.
 * 
 * @param {CandidateCardProps} candidate - The candidate data object
 * @param {string} awardSlug - The slug of the award campaign, used for building the profile URL
 */
export default function CandidateCard({ candidate, awardSlug }: { candidate: CandidateCardProps, awardSlug: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use candidate.awardCandidateId if available, otherwise fallback to candidate.id
  const awardCandidateId = candidate.awardCandidateId || candidate.id;

  return (
    <>
      <div className="glass-panel text-left p-0 overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1">
        
        {/* Candidate Photo or Fallback Placeholder */}
        {candidate.photoUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={candidate.photoUrl} alt={candidate.name} className="w-full h-64 object-cover" />
        ) : (
          <div className="w-full h-64 bg-bg-surface" />
        )}
        
        {/* Candidate Details Container */}
        <div className="p-5 flex-1 flex flex-col">
          
          {/* Category Badge */}
          <div className="mb-4">
            <div className="relative inline-flex">
              <span className="relative z-10 flex items-center gap-1.5 bg-bg-surface backdrop-blur-md border border-transparent dark:border-border-strong px-3 py-1.5 rounded-full dark:shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-accent shadow-[0_0_6px_var(--color-primary-glow)]" />
                <span className="text-text-main tracking-wider uppercase text-[10px] font-bold">
                  {candidate.category.name}
                </span>
              </span>
            </div>
          </div>
          
          {/* Candidate Name (truncated to 1 line with ellipsis) */}
          <h3 className="text-base md:text-xl mb-1.5 whitespace-nowrap overflow-hidden text-ellipsis font-heading font-bold" title={candidate.name}>
            {candidate.name}
          </h3>
          
          {/* Dynamic Nomination Progress Bar */}
          {candidate.nominationProgress && (
            <div className="mb-4 mt-2">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-text-muted font-medium">Progress</span>
                <span className="font-semibold">{candidate.nominationProgress.confirmed} / {candidate.nominationProgress.target}</span>
              </div>
              <div className="h-1.5 bg-border-strong rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-accent shadow-[0_0_8px_var(--color-primary-glow)] transition-all duration-300 ease-in-out" 
                  style={{ width: `${Math.min(candidate.nominationProgress.percentage, 100)}%` }} 
                />
              </div>
            </div>
          )}
          
          {/* Call to Action Buttons */}
          <div className="flex gap-3 mt-auto pt-2">
            <Link href={`/awards/${awardSlug}/candidates/${candidate.slug}`} className="btn-secondary flex-1 text-center py-2 px-2 text-sm">
              View Profile
            </Link>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary flex-1 text-center py-2 px-2 text-sm cursor-pointer">
              Nominate Now
            </button>
          </div>
        </div>
      </div>

      <NominateModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        awardCandidateId={awardCandidateId}
        candidateName={candidate.name}
        awardSlug={awardSlug}
        candidateSlug={candidate.slug}
        nominationFee={candidate.nominationFee}
      />
    </>
  );
}
