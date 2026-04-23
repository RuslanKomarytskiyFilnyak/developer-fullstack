import { Header } from './Header';
import { Hero } from './Hero';
import { About } from './About';
import { Projects } from './Projects';
import { Technologies } from './Technologies';
import { Footer } from './Footer';
import { ScrollProgress } from './ui/ScrollProgress';
import { ScrollToTop } from './ui/ScrollToTop';

export function Home() {
    return (
        <>
            <ScrollProgress />
            <ScrollToTop />
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
