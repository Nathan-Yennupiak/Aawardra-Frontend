import AwardCard from '../../components/awards/AwardCard';
import AwardsList from '../../components/awards/AwardsList';

export const revalidate = 60; // Revalidate every 60 seconds

async function getAwards() {
  try {
    const res = await fetch('http://localhost:4000/api/v1/awards', {
      next: { revalidate: 60 }
    });
    if (!res.ok) {
      console.error('Failed to fetch awards', res.statusText);
      return [];
    }
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Error fetching awards:', error);
    return [];
  }
}

export default async function AwardsPage() {
  const awards = await getAwards();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-25">
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 bg-linear-to-r from-text-main to-primary-accent bg-clip-text text-transparent font-heading font-bold px-2">All Awards</h1>
        <p className="text-lg md:text-xl text-text-muted max-w-150 mx-auto px-4">Browse all our ongoing awards and discover the incredible nominees shaping the future.</p>
      </div>

      {awards.length === 0 ? (
        <div className="text-center mt-12.5 text-text-muted">No active awards found right now. Check back later!</div>
      ) : (
        <AwardsList awards={awards} />
      )}
    </div>
  );
}
