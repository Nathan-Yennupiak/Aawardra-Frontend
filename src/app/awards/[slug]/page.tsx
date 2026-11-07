import Link from 'next/link';
import { notFound } from 'next/navigation';
import CandidateCard from '../../../components/awards/CandidateCard';
import { API_BASE_URL } from '@/lib/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getAward(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/awards/${slug}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    return null;
  }
}

async function getCandidates(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/awards/${slug}/candidates`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
}

export default async function AwardDetailPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const categoryFilter = resolvedSearchParams?.category as string | undefined;

  const [award, candidates] = await Promise.all([
    getAward(slug),
    getCandidates(slug)
  ]);

  if (!award) {
    notFound();
  }

  const filteredCandidates = categoryFilter 
    ? candidates.filter((c: any) => c.category?.slug === categoryFilter)
    : candidates;

  return (
    <div>
      <section className="text-center relative py-12 md:py-24 px-4 mb-8 md:mb-16 border-b border-border-subtle overflow-hidden z-0">
        {award.imageUrl && (
          <>
            <div 
              className="absolute inset-0 -z-20 bg-cover bg-center" 
              style={{ backgroundImage: `url(${award.imageUrl})` }} 
            />
            <div className="absolute inset-0 -z-10 bg-linear-to-b from-bg-base/40 to-bg-base" />
          </>
        )}
        
        <div className="max-w-7xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>
          <Link 
            href={categoryFilter ? `/awards/${slug}/categories` : "/awards"} 
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-bg-surface backdrop-blur-md border border-transparent dark:border-border-strong text-sm font-bold text-text-main hover:text-primary-accent hover:border-primary-accent transition-all dark:shadow-md"
          >
            <span className="text-primary-accent">&larr;</span> 
            {categoryFilter ? 'Back to Categories' : 'Back to all awards'}
          </Link>
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-text-main mb-4 drop-shadow-sm">
            {award.name}
          </h1>
          <p className="text-base md:text-xl max-w-3xl mx-auto mb-8 text-text-muted drop-shadow-sm">
            {award.description || 'Cast your nomination for the incredible candidates below.'}
          </p>
          
          {(award.startsAt || award.endsAt) && (
            <div className="flex flex-row gap-2 md:gap-4 justify-center items-center text-[11px] sm:text-xs md:text-sm font-medium bg-bg-surface w-fit mx-auto px-4 py-2.5 md:px-6 rounded-full border border-transparent dark:border-border-strong backdrop-blur-md dark:shadow-md text-text-main">
              <span className="flex items-center gap-1.5 md:gap-2 whitespace-nowrap" suppressHydrationWarning>
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-secondary-accent/70 shrink-0"></span>
                Starts: {award.startsAt ? new Date(award.startsAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC'}) : 'TBD'}
              </span>
              <span className="text-text-muted/50">|</span>
              <span className="flex items-center gap-1.5 md:gap-2 whitespace-nowrap" suppressHydrationWarning>
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary-accent shadow-[0_0_8px_var(--color-primary-glow)] shrink-0"></span>
                Ends: {award.endsAt ? new Date(award.endsAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC'}) : 'TBD'}
              </span>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        {categoryFilter && (
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold">
              Showing nominees for category:{' '}
              <span className="text-primary-accent capitalize">
                {categoryFilter.replace(/-/g, ' ')}
              </span>
            </h2>
            <Link href={`/awards/${slug}`} className="text-sm font-medium text-text-muted hover:text-text-main underline underline-offset-4 transition-colors">
              Clear filter
            </Link>
          </div>
        )}
        
        <div className="awards-grid">
          {filteredCandidates.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)' }}>
              {categoryFilter 
                ? 'No candidates found for this category.' 
                : 'No candidates have been announced yet.'}
            </div>
          ) : (
            filteredCandidates.map((candidate: any) => (
              <CandidateCard key={candidate.id} candidate={{...candidate, nominationFee: award.nominationFee, paystackFeePercentage: award.paystackFeePercentage}} awardSlug={slug} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
