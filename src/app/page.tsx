import Link from 'next/link';
import EmptyState from '../components/ui/EmptyState';
import AwardsGrid from '../components/awards/AwardsGrid';
import HeroSection from '../components/layout/HeroSection';
import { API_BASE_URL } from '@/lib/api';

export const revalidate = 60; // Revalidate every 60 seconds

async function getAwards() {
  try {
    const res = await fetch(`${API_BASE_URL}/awards`, {
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

export default async function Home() {
  const awards = await getAwards();

  return (
    <main>
      <HeroSection />

      <section className="py-10 relative max-w-7xl mx-auto px-6">
        <h2 className="text-center text-[2.5rem] mb-2.5 font-heading font-bold">Active Awards</h2>
        {awards.length === 0 ? (
          <EmptyState simple message="No active awards found right now. Check back later!" />
        ) : (
          <AwardsGrid awards={awards.slice(0, 4)} />
        )}

        {/* Subtle Bottom Gradient Border */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-border-strong to-transparent" />
      </section>
    </main>
  );
}
