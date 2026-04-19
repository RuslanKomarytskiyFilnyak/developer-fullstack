import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-300 py-12 px-4 md:px-8">
            <div className="container mx-auto max-w-4xl">
                <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    Volver al inicio
                </Link>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Política de Privacidad</h1>

                <div className="space-y-8 bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">1. Responsable del Tratamiento</h2>
                        <p>
                            En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPD-GDD), se informa que el responsable del tratamiento de sus datos es:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-slate-400">
                            <li><strong>Titular:</strong> [TU NOMBRE COMPLETO]</li>
                            <li><strong>NIF/NIE:</strong> [TU NIF/NIE]</li>
                            <li><strong>Dirección:</strong> [TU DIRECCIÓN COMPLETA]</li>
                            <li><strong>Email:</strong> [TU EMAIL]</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">2. Finalidad del Tratamiento</h2>
                        <p>Tratamos la información que nos facilita con el fin de:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-slate-400">
                            <li>Gestionar las consultas realizadas a través del formulario de contacto.</li>
                            <li>Analizar el tráfico web para mejorar la experiencia de usuario (Google Analytics).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">3. Legitimación</h2>
                        <p>La base legal para el tratamiento de sus datos es:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-slate-400">
                            <li><strong>Consentimiento del interesado:</strong> Al enviar el formulario de contacto o aceptar las cookies analíticas.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">4. Destinatarios</h2>
                        <p>No se cederán datos a terceros, salvo obligación legal o proveedores de servicios necesarios para el funcionamiento de la web (encargados del tratamiento), como:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-slate-400">
                            <li><strong>Google Analytics:</strong> Servicio de analítica web prestado por Google Ireland Limited.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">5. Derechos</h2>
                        <p>Usted tiene derecho a acceder, rectificar y suprimir los datos, así como otros derechos (limitación, portabilidad, oposición), enviando un email a [TU EMAIL].</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
