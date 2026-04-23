import { Header } from './Header';
import { Hero } from './Hero';
import { About } from './About';
import { Projects } from './Projects';
import { Technologies } from './Technologies';
import { Footer } from './Footer';

export function Home() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <About />
                <Projects />
                <Technologies />
            </main>
            <Footer />
        </>
    );
}
