import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { siteData } from '@/data/siteData';

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section id="skills" className="py-24 relative" ref={containerRef}>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Core <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Expertise levels across key technologies
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          {siteData.skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium text-foreground text-lg">{skill.name}</span>
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-sm text-primary font-mono font-bold bg-primary/10 px-3 py-1 rounded-full"
                >
                  {skill.level}%
                </motion.span>
              </div>
              <div className="skill-bar h-4 rounded-full overflow-hidden bg-secondary/50 backdrop-blur-sm">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1.5, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
                  className="skill-bar-fill h-full bg-gradient-to-r from-primary via-emerald-400 to-cyan-400 relative"
                >
                  {/* Animated shine effect */}
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={isInView ? { x: '200%' } : {}}
                    transition={{ 
                      duration: 1.5, 
                      delay: 1 + index * 0.1,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
