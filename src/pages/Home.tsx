import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };
    
    observerRef.current = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });
    
    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
      observerRef.current?.observe(section);
    });
    
    return () => {
      if (observerRef.current) {
        sections.forEach(section => {
          observerRef.current?.unobserve(section);
        });
      }
    };
  }, []);

  return (
    <div className="pt-20 min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-20 text-center">
        <img 
          src="/logo.png" 
          alt="Ke.fi Concept" 
          className="w-48 mb-12 animate-fadeIn hover-scale"
        />
        
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-light mb-6 fade-in-section">
            Nossa curadoria de peças incríveis está quase pronta. Em breve, você poderá explorar uma nova experiência de moda conosco!
          </h1>
          
          <p className="text-xl mb-12 text-gray-700 fade-in-section" style={{ transitionDelay: '200ms' }}>
            Em breve, um novo conceito de moda para você. Aguarde!
          </p>
          
          <Link 
            to="/sobre" 
            className="inline-flex items-center text-black border-b-2 border-black hover:text-gray-700 hover:border-gray-700 transition-all group fade-in-section"
            style={{ transitionDelay: '400ms' }}
          >
            Conheça mais sobre nós 
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;