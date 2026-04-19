import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Send, Github, Linkedin } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    setStatus('success');
    setTimeout(() => {
      setStatus('idle');
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/RuslanKomarytskiyFilnyak',
      href: 'https://github.com/RuslanKomarytskiyFilnyak/',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/ruslan-komarytskiy-1665011ba/',
      href: 'https://www.linkedin.com/in/ruslan-komarytskiy-1665011ba/',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'kruslan55569@gmail.com',
      href: 'mailto:kruslan55569@gmail.com',
    },
    {
      icon: Phone,
      label: 'Teléfono',
      value: '618 478 435',
      href: null,
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: 'Valencia, España',
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 relative">
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Contacto</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? Hablemos y hagámoslo realidad
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl text-white mb-6">Información de Contacto</h3>
            <p className="text-slate-400 mb-8">
              Estoy disponible para nuevas oportunidades. No dudes en contactarme si quieres colaborar en un proyecto o simplemente conversar sobre tecnología.
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  {info.href ? (
                    <a
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 group"
                    >
                      <info.icon className="text-white" size={24} />
                    </a>
                  ) : (
                    <div 
                      className="relative p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                      onMouseEnter={(e) => {
                        const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;
                        if (tooltip) tooltip.style.opacity = '1';
                      }}
                      onMouseLeave={(e) => {
                        const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;
                        if (tooltip) tooltip.style.opacity = '0';
                      }}
                    >
                      <info.icon className="text-white" size={24} />
                      {info.label === "Teléfono" || info.label === "Ubicación" ? (
                        <span 
                          className="tooltip absolute top-1/2 left-full -translate-y-1/2 ml-12 px-4 py-2 bg-slate-800 text-cyan-400 text-xs rounded-md transition-opacity duration-300 whitespace-nowrap z-[60] border border-cyan-500/30 min-w-max"
                          style={{ opacity: 0 }}
                        >
                          {info.value}
                        </span>
                      ) : null}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          {/* <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-slate-300 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-slate-300 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  placeholder="Cuéntame sobre tu proyecto..."
                />
              </div>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400"
                >
                  ¡Mensaje enviado con éxito! Te contactaré pronto.
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Enviar Mensaje</span>
                <Send size={20} />
              </button>
            </form>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}