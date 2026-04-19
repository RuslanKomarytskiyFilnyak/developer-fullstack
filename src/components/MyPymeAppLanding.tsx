import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, BarChart, Users, Shield, Zap } from 'lucide-react';

export function MyPymeAppLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg"></div>
            <span className="text-white text-xl font-bold">My PYME App</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Inicio</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Nosotros</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Contacto</a>
            <button className="text-slate-300 hover:text-white transition-colors">Login</button>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all">
              Regístrate Gratis
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Control Total,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Complejidad Cero
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Diseñado para emprendedores que valoran su tiempo. Con una interfaz intuitiva y amigable, 
              nuestra aplicación simplifica la gestión de tu negocio para que puedas concentrarte en lo que realmente importa: crecer.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-semibold text-lg hover:from-cyan-500 hover:to-blue-600 transition-all shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2"
            >
              No esperes más, comienza ahora
              <ArrowRight size={20} />
            </motion.button>

            <div className="flex items-center gap-8 mt-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-slate-300">Gratis por 14 días</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-slate-300">Sin tarjeta de crédito</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-3xl opacity-20"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                <div className="h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-lg border border-cyan-500/30"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-20 bg-slate-700 rounded-lg"></div>
                  <div className="h-20 bg-slate-700 rounded-lg"></div>
                  <div className="h-20 bg-slate-700 rounded-lg"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Todo lo que tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">PYME</span> necesita
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Herramientas potentes y fáciles de usar para impulsar tu negocio
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: BarChart,
              title: "Análisis en Tiempo Real",
              description: "Toma decisiones informadas con datos actualizados al instante"
            },
            {
              icon: Users,
              title: "Gestión de Clientes",
              description: "Organiza y segmenta tu base de clientes de manera eficiente"
            },
            {
              icon: Shield,
              title: "Seguridad Garantizada",
              description: "Tus datos protegidos con encriptación de nivel empresarial"
            },
            {
              icon: Zap,
              title: "Automatización Inteligente",
              description: "Ahorra tiempo con procesos automáticos y flujos de trabajo"
            },
            {
              icon: CheckCircle,
              title: "Fácil de Usar",
              description: "Interfaz intuitiva diseñada para usuarios sin experiencia técnica"
            },
            {
              icon: ArrowRight,
              title: "Escalable",
              description: "Crece con tu negocio, desde startups hasta empresas consolidadas"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl p-12 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Únete a miles de emprendedores que ya están optimizando sus operaciones con My PYME App
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold text-lg hover:bg-slate-100 transition-all shadow-xl"
          >
            Comenzar Prueba Gratuita
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
