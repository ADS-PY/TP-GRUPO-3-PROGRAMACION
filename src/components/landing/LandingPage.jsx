// src/components/landing/LandingPage.jsx
import Header from './Header';
import HeroSection from './HeroSection';
import AuthCard from './AuthCard';
import InfoCard from './InfoCard';
import SecurityCard from './SecurityCard';
import StatsBar from './StatsBar';
import Footer from './Footer';

/**
 * LandingPage
 *
 * Top-level page component that assembles the full marketing / auth
 * landing screen from its dedicated sub-components:
 *
 *  ┌─────────────────────────────────────┐
 *  │  Header (fixed navigation)          │
 *  ├─────────────────────────────────────┤
 *  │  HeroSection (kinetic gradient)     │
 *  ├──────────────────┬──────────────────┤
 *  │  AuthCard (8/12) │ InfoCard         │
 *  │                  │ SecurityCard     │
 *  ├──────────────────┴──────────────────┤
 *  │  StatsBar (4-column KPI grid)       │
 *  ├─────────────────────────────────────┤
 *  │  Footer                             │
 *  └─────────────────────────────────────┘
 */
function LandingPage() {
  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col">
      {/* ── Fixed top navigation ─────────────────────────── */}
      <Header />

      <main className="flex-grow pt-20">
        {/* ── Hero banner ──────────────────────────────────── */}
        <HeroSection
          title="Gestión de Alto Impacto"
          subtitle="Potenciamos su crecimiento institucional con precisión matemática y visión estratégica de mercado."
          showLogo
          minHeight="h-[65vh]"
        />

        {/* ── Bento-grid action canvas ─────────────────────── */}
        <section className="max-w-7xl mx-auto px-margin-desktop relative z-20 pb-3xl">
          {/* Primary bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
            {/* Left: Login / Register card (8 cols) */}
            <AuthCard />

            {/* Right: stacked info cards (4 cols) */}
            <div className="md:col-span-4 flex flex-col gap-lg">
              <InfoCard />
              <SecurityCard />
            </div>
          </div>

          {/* ── Stats / KPI bar ────────────────────────────── */}
          <StatsBar />
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────── */}
      <Footer />
    </div>
  );
}

export default LandingPage;
