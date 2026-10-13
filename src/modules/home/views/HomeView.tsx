import { Header } from '../components/Header/Header';
import { Hero } from '../components/Hero/Hero';
import { Features } from '../components/Features/Features';
import { HowItWorks } from '../components/HowItWorks/HowItWorks';
import { ClosingCta } from '../components/ClosingCta/ClosingCta';
import { Footer } from '../components/Footer/Footer';

export function HomeView() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
