import { motion } from 'framer-motion';
import { ArrowDown, ExternalLink } from 'lucide-react';
import { siteData } from '@/data/siteData';
import TypewriterText from '@/components/ui/TypewriterText';

export default function Hero() {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 badge mb-6"
            >
              <span className="text-sm">I am</span>
              <TypewriterText 
                texts={siteData.roles}
                typingSpeed={80}
                deletingSpeed={40}
                pauseDuration={2000}
                className="font-semibold text-primary"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
            >
              Hi, I'm{' '}
              <span className="gradient-text glow-text block sm:inline">
                {siteData.name}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {siteData.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={scrollToProjects}
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                View Projects
                <ExternalLink size={18} />
              </button>
              <button
                onClick={scrollToContact}
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                Contact Me
              </button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 mt-12 justify-center lg:justify-start"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">
                  {siteData.stats.completedProjects}+
                </div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">
                  {siteData.stats.happyClients}+
                </div>
                <div className="text-sm text-muted-foreground">Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">
                  {siteData.stats.yearsExperience}+
                </div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Image with 3D Frame */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Animated Background Ring */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -inset-4 sm:-inset-6 rounded-full border-2 border-dashed border-primary/30"
              />
              
              {/* Glow Effect */}
              <div className="absolute -inset-8 bg-primary/20 blur-3xl rounded-full" />
              
              {/* Profile Image Container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
              >
                {/* 3D Frame */}
                <div className="absolute inset-0 glass-card rounded-3xl transform rotate-6 opacity-60" />
                <div className="absolute inset-0 glass-card rounded-3xl transform -rotate-3 opacity-80" />
                
                {/* Main Image */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-primary/50 animate-pulse-glow">
                  <img
                    src={siteData.profileImage}
                    alt={siteData.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 glass-card px-4 py-2 rounded-xl"
              >
                <span className="text-sm font-medium gradient-text">Available for work</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={20} className="text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
