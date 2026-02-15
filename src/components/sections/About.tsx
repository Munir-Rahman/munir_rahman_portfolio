import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Briefcase, Users, FolderKanban, Trophy } from 'lucide-react';
import { siteData } from '@/data/siteData';

function AnimatedCounter({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="counter">
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const stats = [
    { icon: Users, label: 'Happy Clients', value: siteData.stats.happyClients, suffix: '+' },
    { icon: FolderKanban, label: 'Projects Completed', value: siteData.stats.completedProjects, suffix: '+' },
    { icon: Trophy, label: 'Years Experience', value: siteData.stats.yearsExperience, suffix: '+' },
    { icon: Briefcase, label: 'Technologies', value: siteData.stats.technologiesMastered, suffix: '+' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={containerRef}>
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Get to know the person behind the code
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - About Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-primary" size={20} />
                <span className="text-muted-foreground">{siteData.location}</span>
              </div>

              <p className="text-foreground/90 leading-relaxed text-lg mb-6">
                {siteData.about}
              </p>

              <div className="flex flex-wrap gap-3">
                {siteData.roles.map((role, index) => (
                  <motion.span
                    key={role}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="badge"
                  >
                    {role}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="glass-card p-6 rounded-2xl text-center card-hover"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
