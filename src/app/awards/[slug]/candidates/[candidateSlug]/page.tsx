import Link from 'next/link';
import { notFound } from 'next/navigation';
import VoteSection from './VoteSection';
import { API_BASE_URL } from '@/lib/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getCandidate(slug: string, candidateSlug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/awards/${slug}/candidates/${candidateSlug}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    return null;
  }
}

export default async function CandidateDetailPage({ params }: { params: Promise<{ slug: string, candidateSlug: string }> }) {
  const { slug, candidateSlug } = await params;
  const data = await getCandidate(slug, candidateSlug);

  if (!data) {
    notFound();
  }

  const candidate = data;
  const { category, award } = data;

  return (
    <div className="max-w-7xl mx-auto w-full min-h-screen px-4 sm:px-8 py-10 md:py-16 pb-25">
      
      <div className="mb-8">
        <Link href={`/awards/${slug}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-surface backdrop-blur-md border border-border-strong text-sm font-bold text-text-main hover:text-primary-accent hover:border-primary-accent transition-all shadow-none dark:shadow-md">
          <span className="text-primary-accent">&larr;</span> Back to {award.name}
        </Link>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* Top Container: Profile Info & Vote Section (Equal Height) */}
        <div className="flex flex-col xl:flex-row gap-8 items-stretch">
          
          {/* Main Profile Info Card */}
          <div className="glass-panel p-8 flex-1 flex flex-col lg:flex-row gap-8 items-center lg:items-center h-full">
            
            {/* Profile Picture Column */}
            <div className="shrink-0 flex flex-col items-center">
              {candidate.photoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={candidate.photoUrl} alt={candidate.name} className="w-80 h-80 rounded-md object-cover border-2 border-primary-accent shadow-sm dark:shadow-md bg-bg-base" />
              ) : (
                <div className="w-80 h-80 rounded-md border-4 border-primary-accent shadow-sm dark:shadow-md bg-bg-surface flex items-center justify-center text-7xl font-bold text-text-muted">
                  {candidate.name.charAt(0)}
                </div>
              )}
              
              <div className="mt-8 w-full flex justify-center">
                {/* Space reserved for future picture accessories if needed */}
              </div>
            </div>

            {/* Candidate Details Column */}
            <div className="flex-1 w-full text-center lg:text-left flex flex-col justify-center">
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-text-main mb-4 tracking-tight leading-tight">{candidate.name}</h1>
              <h2 className="text-sm lg:text-md text-primary-accent mb-6 font-medium">
                {candidate.title} {candidate.organization ? `at ${candidate.organization}` : ''}
              </h2>
              {candidate.location && (
                <p className="text-text-muted text-sm lg:text-md mb-6 flex items-center justify-center lg:justify-start gap-2">
                  📍 {candidate.location}
                </p>
              )}

               <div className="w-full flex justify-center lg:justify-start mb-8">
                 <div className="relative group cursor-default inline-flex">
                   <span className="relative z-10 flex items-center gap-2 bg-bg-surface backdrop-blur-md border border-transparent dark:border-border-strong px-6 py-2.5 rounded-full text-sm font-bold dark:shadow-sm transition-all duration-300 group-hover:border-primary-accent/50">
                    <span className="w-2 h-2 rounded-full bg-primary-accent shadow-[0_0_8px_var(--color-primary-glow)]" />
                    <span className="text-text-main tracking-wide uppercase text-xs">
                      {category.name}
                    </span>
                  </span>
                </div>
              </div>

              {candidate.nominationProgress && (
                <div className="bg-bg-surface p-6 rounded-md border border-border-strong w-full shadow-inner mt-4">
                  <div className="flex justify-between text-base mb-3">
                    <span className="text-text-muted font-medium">Nomination Progress</span>
                    <span className="font-bold text-primary-accent">{candidate.nominationProgress.confirmed} / {candidate.nominationProgress.target}</span>
                  </div>
                  <div className="h-3 bg-border-strong rounded-full overflow-hidden">
                    <div className="h-full bg-linear-to-r from-primary-accent to-[#D48B25] transition-all duration-700 ease-out" style={{ width: `${candidate.nominationProgress.percentage}%` }} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Vote Section */}
          <div className="w-full xl:w-112.5 shrink-0">
             <VoteSection 
               awardCandidateId={candidate.awardCandidateId} 
               awardName={award.name} 
               candidateName={candidate.name} 
               awardSlug={slug}
               candidateSlug={candidate.slug}
               nominationFee={award.nominationFee}
               paystackFeePercentage={award.paystackFeePercentage}
             />
          </div>
        </div>

        {/* Bottom Container: Biography and Achievements */}
        <div className="flex flex-col gap-8 w-full">
          {candidate.biography && (
            <div className="glass-panel p-8 w-full">
              <h3 className="text-2xl font-bold mb-4 border-b border-border-subtle pb-4 text-text-main">About</h3>
              <div className="text-text-muted leading-relaxed text-lg whitespace-pre-wrap">
                {candidate.biography}
              </div>
            </div>
          )}
          
          {candidate.achievements && (
            <div className="glass-panel p-8 w-full">
              <h3 className="text-2xl font-bold mb-4 border-b border-border-subtle pb-4 text-text-main">Key Achievements</h3>
              <div className="text-text-muted leading-relaxed text-lg whitespace-pre-wrap">
                {candidate.achievements}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
