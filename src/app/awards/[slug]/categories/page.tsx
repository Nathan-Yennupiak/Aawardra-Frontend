import Link from 'next/link';
import React from 'react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getAwardCategories(slug: string) {
  try {
    const res = await fetch(`http://localhost:4000/api/v1/awards/${slug}/categories`, { cache: 'no-store' });
    if (!res.ok) {
      return null;
    }
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return null;
  }
}

async function getAward(slug: string) {
  try {
    const res = await fetch(`http://localhost:4000/api/v1/awards/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    return null;
  }
}

export default async function AwardCategoriesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const [award, categories] = await Promise.all([
    getAward(slug),
    getAwardCategories(slug)
  ]);

  if (!award || !categories) {
    notFound();
  }

  // Removed icons mapping

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-25">
      <div className="mb-6">
        <Link href={`/awards/${slug}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-surface backdrop-blur-md border border-border-subtle text-sm font-bold text-text-main hover:text-primary-accent hover:border-primary-accent transition-all">
          <span className="text-primary-accent">&larr;</span> Back to {award.name}
        </Link>
      </div>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 bg-linear-to-r from-text-main to-primary-accent bg-clip-text text-transparent font-heading font-bold px-2 tracking-tight">
          {award.name} 
        </h1>
        <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto px-4 leading-relaxed">
          Explore the categories for this award and find the perfect category to nominate outstanding candidates.
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center mt-12.5 text-text-muted glass-panel p-10 max-w-2xl mx-auto">
          No categories have been created for this award yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category: any) => {
            const count = category._count?.awardCandidates || 0;
            return (
              <Link href={`/awards/${slug}?category=${category.slug}`} key={category.id} className="group h-full flex">
                <div className="glass-panel w-full p-8 flex flex-col items-start transition-all duration-300 hover:shadow-[0_8px_30px_rgba(229,163,61,0.15)] hover:border-primary-accent/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-primary-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md" />
                  

                  
                  <h3 className="text-2xl font-bold font-heading mb-3 text-text-main group-hover:text-primary-accent transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  <p className="text-text-muted text-sm leading-relaxed grow mb-6">
                    {category.description || 'Recognizing excellence in this category.'}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between w-full pt-4 border-t border-border-subtle group-hover:border-primary-accent/20 transition-colors duration-300">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                        View Nominees
                      </span>
                      <span className="inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-bold rounded-full bg-primary-accent/10 text-primary-accent border border-primary-accent/20">
                        {count}
                      </span>
                    </div>
                    <span className="text-primary-accent opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 font-bold">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
