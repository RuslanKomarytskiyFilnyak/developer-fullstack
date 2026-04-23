import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

export function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects = [
    {
      title: 'Dreieck Consultora',
      description: 'Landing page premium para consultora de Business Intelligence: diseño corporativo, análisis de datos y servicios de transformación digital.',
      image: '/images/dreieck-consultora.png',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      demo: 'https://dreieck-consultora.github.io/dreieck-consultora/',
    },
    {
      title: 'Bebé Tracker',
      description: 'App de seguimiento completo para bebés: alimentación, sueño, pañales, salud y crecimiento. Dashboard en tiempo real con historial detallado.',
      image: '/images/bebe-tracker-cover.png',
      tech: ['React', 'TypeScript', 'Supabase', 'Charts'],
      demo: 'https://bebe-tracker-six.vercel.app',
    },
    {
      title: 'Nail Flow',
      description: 'SaaS premium para salones de uñas: landing page de lujo en segundos, gestión de citas, pagos con Stripe y WhatsApp automático.',
      image: '/images/nail-flow-cover.png',
      imagePosition: 'object-top',
      tech: ['Next.js', 'Supabase', 'Stripe', 'WhatsApp API'],
      demo: 'https://nail-flow-phi.vercel.app',
    },
    {
      title: 'MyPymeApp',
      description: 'Sistema de gestión integral para pymes: control de inventario, facturación, clientes y reportes analíticos en tiempo real.',
      image: '/images/my-pyme-app.png',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      demo: 'https://mypymeapp-front.vercel.app/',
    },
    {
      title: 'Mail Flow',
      description: 'Sistema inteligente de automatización de correos electrónicos y gestión de campañas marketing con IA integrada.',
      image: '/images/mail-flow-cover.png',
      tech: ['Next.js', 'Resend', 'OpenAI', 'PostgreSQL'],
      demo: '#',
      status: 'development'
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-slate-800/30 backdrop-blur-sm"></div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Mis <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Proyectos</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Una selección de proyectos que demuestran mis habilidades y experiencia en desarrollo full stack
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const isDevelopment = project.status === 'development';
            
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => !isDevelopment && setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className={`bg-slate-800 rounded-lg overflow-hidden border border-slate-700 transition-all duration-300 group ${
                  isDevelopment ? 'opacity-70 saturate-0 cursor-not-allowed grayscale' : 'hover:border-cyan-500'
                }`}
                style={{
                  transform: (!isDevelopment && hoveredIndex === index) ? 'translateY(-8px)' : 'translateY(0)',
                }}
              >
                <div className="relative overflow-hidden h-48">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover ${'imagePosition' in project ? (project as any).imagePosition : 'object-center'} ${!isDevelopment && 'group-hover:scale-110'} transition-transform duration-300`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                  
                  {isDevelopment && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="px-6 py-2 bg-slate-900/90 border border-white/10 rounded-full text-white font-bold text-sm backdrop-blur-md">
                        PRÓXIMAMENTE
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl text-white">{project.title}</h3>
                    {isDevelopment && (
                      <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded text-[10px] font-bold uppercase tracking-wider">
                        En desarrollo
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 mb-4 h-12 overflow-hidden text-sm">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-slate-700 text-slate-400 rounded-lg text-[11px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {isDevelopment ? (
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-medium italic">
                        Desarrollo en curso...
                      </div>
                    ) : (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
                      >
                        <ExternalLink size={20} />
                        <span>Demo Directa</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}