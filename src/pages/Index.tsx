import { Suspense, lazy } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import TechStack from '@/components/sections/TechStack';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/chatbot/Chatbot';

// Lazy load 3D background for better performance
const Scene3DBackground = lazy(() => import('@/components/3d/Scene3DBackground'));

function LoadingFallback() {
  return (
    <div className="fixed inset-0 -z-10 bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
    </div>
  );
}

export default function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* 3D Background */}
      <Suspense fallback={<LoadingFallback />}>
        <Scene3DBackground />
      </Suspense>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <Hero />
      <About />
      <TechStack />
      <Services />
      <Projects />
      <Skills />
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Chatbot */}
      <Chatbot />
    </main>
  );
}
