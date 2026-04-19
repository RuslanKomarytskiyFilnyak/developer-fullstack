import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

export function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects = [
    {
      title: 'Bebé Tracker',
      description: 'App de seguimiento completo para bebés: alimentación, sueño, pañales, salud y crecimiento. Dashboard en tiempo real con historial detallado.',
      image: '/images/bebe-tracker-cover.png',
      tech: ['React', 'TypeScript', 'Supabase', 'Charts'],
      github: 'https://github.com',
      demo: 'https://bebe-tracker-six.vercel.app',
    },
    {
      title: 'Nail Flow',
      description: 'SaaS premium para salones de uñas: landing page de lujo en segundos, gestión de citas, pagos con Stripe y WhatsApp automático.',
      image: '/images/nail-flow-cover.png',
      imagePosition: 'object-top',
      tech: ['Next.js', 'Supabase', 'Stripe', 'WhatsApp API'],
      github: 'https://github.com',
      demo: 'https://nail-flow-phi.vercel.app',
    },
    {
      title: 'MyPymeApp',
      description: 'Sistema de gestión integral para pymes: control de inventario, facturación, clientes y reportes analíticos en tiempo real.',
      image: '/images/my-pyme-app.png',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com',
      demo: 'https://mypymeapp-front.vercel.app/',
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

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-cyan-500 transition-all duration-300 group"
              style={{
                transform: hoveredIndex === index ? 'translateY(-8px)' : 'translateY(0)',
              }}
            >
              <div className="relative overflow-hidden h-48">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover ${'imagePosition' in project ? (project as any).imagePosition : 'object-center'} group-hover:scale-110 transition-transform duration-300`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl text-white mb-3">{project.title}</h3>
                <p className="text-slate-400 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-700 text-cyan-400 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    <Github size={20} />
                    <span>Código</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    <ExternalLink size={20} />
                    <span>Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}