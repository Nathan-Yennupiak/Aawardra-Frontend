import Link from 'next/link';

interface AwardCardProps {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  imageUrl?: string;
  startsAt?: string;
  endsAt?: string;
}

export default function AwardCard({ award }: { award: AwardCardProps }) {
  return (
    <div className="glass-panel text-left transition-transform duration-300 hover:-translate-y-1 p-0 overflow-hidden flex flex-col">
      {award.imageUrl ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={award.imageUrl} alt={award.name} className="w-full h-40 object-cover" />
      ) : (
        <div className="w-full h-40 bg-bg-surface" />
      )}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base md:text-xl mb-1.5 whitespace-wrap overflow-hidden text-ellipsis" title={award.name}>
          <Link href={`/awards/${award.slug}`} className="hover:text-primary-accent transition-colors">
            {award.name}
          </Link>
        </h3>
        <p className="flex-1 text-xs mb-3 text-text-muted line-clamp-2">
          {award.shortDescription || 'An award recognizing outstanding achievement.'}
        </p>
        {(award.startsAt || award.endsAt) && (
          <div className="flex justify-between items-center text-[11px] mb-4 border-t border-border-subtle pt-3 mt-1 font-medium tracking-wide">
            <span className="flex items-center gap-1.5 text-text-muted" suppressHydrationWarning>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-accent/70"></span>
              Starts: {award.startsAt ? new Date(award.startsAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC'}) : 'TBD'}
            </span>
            <span className="flex items-center gap-1.5 text-primary-accent" suppressHydrationWarning>
              <span className="w-1.5 h-1.5 rounded-full bg-primary-accent shadow-[0_0_6px_var(--color-primary-glow)]"></span>
              Ends: {award.endsAt ? new Date(award.endsAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC'}) : 'TBD'}
            </span>
          </div>
        )}
        <div className="flex gap-3 mt-auto">
          <Link href={`/awards/${award.slug}/categories`} className="btn-secondary flex-1 text-center py-2 px-2 text-sm">
            Categories
          </Link>
          <Link href={`/awards/${award.slug}`} className="btn-primary flex-1 text-center py-2 px-2 text-sm">
            Nominees
          </Link>
        </div>
      </div>
    </div>
  );
}
