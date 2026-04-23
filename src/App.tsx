import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Header } from './components/Header';
import { initGA } from './utils/analytics';

export default function App() {
  useEffect(() => {
    // Initialize Google Analytics with a placeholder ID
    // Replace 'G-XXXXXXXXXX' with your actual Measurement ID
    initGA('G-XXXXXXXXXX');
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <AnimatedBackground />
      <Header />
      <div className="relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </div>
  );
}