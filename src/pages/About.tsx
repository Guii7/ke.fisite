import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ArrowLeft } from 'lucide-react';

const About: React.FC = () => {
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
    <div className="pt-20 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 fade-in-section">
          <h1 className="text-3xl font-semibold mb-4">Nosso Conceito</h1>
          <div className="flex justify-center mb-6">
            <Heart className="text-black mr-2 animate-pulse" size={20} />
            <Heart className="text-black mr-2 animate-pulse" style={{ animationDelay: '0.3s' }} size={20} />
            <Heart className="text-black animate-pulse" style={{ animationDelay: '0.6s' }} size={20} />
          </div>
        </div>
        
        <div className="prose prose-lg mx-auto mb-12">
          <p className="text-gray-700 leading-relaxed mb-6 fade-in-section" style={{ transitionDelay: '100ms' }}>
            A <strong>Ke.fi Concept</strong> nasceu da paixão pela moda feminina contemporânea e do desejo de oferecer peças que combinam elegância, conforto e personalidade. Nosso nome representa a união de estilo e sofisticação em cada detalhe.
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-6 fade-in-section" style={{ transitionDelay: '200ms' }}>
            Nossa filosofia é baseada na curadoria cuidadosa de peças que traduzem a essência da mulher moderna: independente, versátil e autêntica. Não seguimos apenas tendências, criamos experiências através da moda.
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-6 fade-in-section" style={{ transitionDelay: '300ms' }}>
            Em cada coleção, buscamos trazer o equilíbrio entre o minimalismo elegante e detalhes marcantes que fazem toda a diferença. Nossas peças são pensadas para mulheres que valorizam qualidade e exclusividade.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-black mb-6 transform transition-all hover:shadow-md fade-in-section" style={{ transitionDelay: '400ms' }}>
            <h2 className="flex items-center text-xl font-medium mb-3">
              <Star className="text-black mr-2" size={20} />
              Nossos Valores
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li className="animate-slideIn" style={{ animationDelay: '500ms' }}>Qualidade acima da quantidade</li>
              <li className="animate-slideIn" style={{ animationDelay: '550ms' }}>Atenção aos detalhes e acabamentos</li>
              <li className="animate-slideIn" style={{ animationDelay: '600ms' }}>Compromisso com a satisfação das clientes</li>
              <li className="animate-slideIn" style={{ animationDelay: '650ms' }}>Atendimento personalizado</li>
              <li className="animate-slideIn" style={{ animationDelay: '700ms' }}>Valorização da moda consciente</li>
            </ul>
          </div>
          
          <p className="text-gray-700 leading-relaxed fade-in-section" style={{ transitionDelay: '500ms' }}>
            Estamos trabalhando intensamente para trazer em breve nossa curadoria especial para você. Enquanto isso, convidamos você a nos acompanhar nessa jornada e a deixar suas sugestões através de nossa <Link to="/pesquisa" className="text-black font-medium underline transition-all hover:text-gray-700">pesquisa de satisfação</Link>.
          </p>
        </div>
        
        <div className="text-center fade-in-section" style={{ transitionDelay: '600ms' }}>
          <Link 
            to="/" 
            className="inline-flex items-center btn btn-primary"
          >
            <ArrowLeft size={16} className="mr-2" />
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;