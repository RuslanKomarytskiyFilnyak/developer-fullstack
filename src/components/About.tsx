import { motion } from 'motion/react';
import { Code2, Lightbulb, Rocket, Users } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Code2,
      title: 'Clean Code',
      description: 'Código limpio, mantenible y siguiendo las mejores prácticas',
    },
    {
      icon: Rocket,
      title: 'Performance',
      description: 'Aplicaciones optimizadas y de alta velocidad',
    },
    {
      icon: Lightbulb,
      title: 'Innovación',
      description: 'Soluciones creativas para problemas complejos',
    },
    {
      icon: Users,
      title: 'Colaboración',
      description: 'Trabajo en equipo efectivo y comunicación clara',
    },
  ];

  return (
    <section id="about" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Sobre <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Mí</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg transform rotate-3"></div>
              <div className="relative bg-slate-800 p-8 rounded-lg">
                <p className="text-slate-300 mb-4">
                  Soy un desarrollador full stack apasionado por crear soluciones tecnológicas que marquen la diferencia. Con experiencia en el desarrollo de aplicaciones web y móviles, me especializo en convertir ideas en productos digitales funcionales y atractivos.
                </p>
                <p className="text-slate-300 mb-4">
                  Mi enfoque se centra en escribir código limpio, escalable y eficiente, mientras mantengo una constante actualización con las últimas tendencias y tecnologías del desarrollo web.
                </p>
                <p className="text-slate-300">
                  Busco oportunidades donde pueda aportar valor, aprender continuamente y colaborar con equipos talentosos en proyectos desafiantes.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:scale-105"
              >
                <feature.icon className="text-cyan-400 mb-3" size={32} />
                <h3 className="text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}