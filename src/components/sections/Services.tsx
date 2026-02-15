import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Palette, Code, Rocket } from 'lucide-react';
import { siteData } from '@/data/siteData';

const phaseIcons = [Search, Palette, Code, Rocket];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section id="services" className="py-24 relative" ref={containerRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Development <span className="gradient-text">Approach</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A systematic approach to delivering exceptional results
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {siteData.developmentPhases.map((phase, index) => {
              const Icon = phaseIcons[index];
              
              return (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="glass-card p-6 rounded-2xl h-full card-hover">
                    {/* Phase Number */}
                    <div className="absolute -top-4 left-6">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {phase.phase}
                      </div>
                    </div>

                    <div className="pt-4">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        {phase.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-muted-foreground text-sm mb-4">
                        {phase.summary}
                      </p>

                      {/* Deliverables */}
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-primary uppercase tracking-wider">
                          Deliverables
                        </p>
                        <ul className="space-y-1">
                          {phase.deliverables.map((item, i) => (
                            <li 
                              key={i} 
                              className="text-sm text-muted-foreground flex items-center gap-2"
                            >
                              <span className="w-1 h-1 rounded-full bg-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
