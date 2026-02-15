import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { siteData } from '@/data/siteData';
import { 
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiTailwindcss,
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiBootstrap,
  SiMongodb, SiMysql, SiPostgresql
} from 'react-icons/si';
import { Database } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const iconMap: Record<string, React.ElementType> = {
  html: SiHtml5,
  css: SiCss3,
  javascript: SiJavascript,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  react: SiReact,
  nextjs: SiNextdotjs,
  nodejs: SiNodedotjs,
  express: SiExpress,
  bootstrap: SiBootstrap,
  mongodb: SiMongodb,
  mysql: SiMysql,
  sqlserver: Database,
  postgresql: SiPostgresql,
};

const colorMap: Record<string, string> = {
  html: '#E34F26',
  css: '#1572B6',
  javascript: '#F7DF1E',
  typescript: '#3178C6',
  tailwind: '#06B6D4',
  react: '#61DAFB',
  nextjs: '#FFFFFF',
  nodejs: '#339933',
  express: '#FFFFFF',
  bootstrap: '#7952B3',
  mongodb: '#47A248',
  mysql: '#4479A1',
  sqlserver: '#CC2927',
  postgresql: '#4169E1',
};

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section id="tech" className="py-24 relative" ref={containerRef}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Technologies I use to bring ideas to life
          </p>
        </motion.div>

        <TooltipProvider delayDuration={0}>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 sm:gap-6">
            {siteData.technologies.map((tech, index) => {
              const Icon = iconMap[tech.icon];
              const color = colorMap[tech.icon];

              return (
                <Tooltip key={tech.name}>
                  <TooltipTrigger asChild>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.05,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      whileHover={{ 
                        scale: 1.15,
                        y: -8,
                        rotateY: 15,
                      }}
                      className="tech-icon cursor-pointer group relative"
                    >
                      {Icon && (
                        <Icon 
                          className="w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 group-hover:drop-shadow-[0_0_15px_currentColor]"
                          style={{ color: color }}
                        />
                      )}
                      {/* Skill level indicator */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                        className="absolute -bottom-2 left-0 right-0 h-1 bg-secondary rounded-full overflow-hidden"
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${tech.level}%` } : {}}
                          transition={{ delay: 0.7 + index * 0.05, duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full"
                        />
                      </motion.div>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="bottom" 
                    className="glass-card border-primary/20"
                  >
                    <div className="text-center">
                      <p className="font-medium text-foreground">{tech.name}</p>
                      <p className="text-xs text-primary">{tech.proficiency} • {tech.level}%</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}
