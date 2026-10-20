import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="py-24 md:py-36 text-center relative overflow-hidden mb-8 border-b border-border-subtle z-0">
      {/* Cinematic Stage Background */}
      <div 
        className="absolute inset-0 -z-20 bg-cover bg-center" 
        style={{ backgroundImage: 'url(/hero-bg.jpg)' }} 
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-bg-base/80 to-bg-base" />

      <h1 className="text-5xl md:text-7xl mb-6 bg-linear-to-b from-text-main to-text-muted bg-clip-text text-transparent font-heading font-extrabold tracking-tight relative z-10">Celebrate True Excellence</h1>
      <p className="text-xl text-text-muted max-w-150 mx-auto mb-10 relative z-10">Join us in recognizing the individuals and organizations shaping our future. Cast your vote and fund the visionaries of tomorrow.</p>
      <Link href="/awards" className="relative z-10 rounded-sm inline-block btn-primary">Explore All Awards</Link>

      {/* Subtle Bottom Gradient Border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-border-strong to-transparent" />
    </section>
  );
}
