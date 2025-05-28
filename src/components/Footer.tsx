import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageCircle, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="animate-fadeIn" style={{ animationDelay: '100ms' }}>
            <h3 className="text-lg font-semibold mb-4">Localização</h3>
            <p className="mb-3">Rua Duque de Caxias, 522B - Centro<br />Uberlândia, MG - CEP 38400-142</p>
            <div className="map-container hover-scale">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.225916365111!2d-48.28169918873752!3d-18.92135098218131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94a444f89f2a2555%3A0x738779a59e993306!2sR.%20Duque%20de%20Caxias%2C%20522b%20-%20Centro%2C%20Uberl%C3%A2ndia%20-%20MG%2C%2038400-142!5e0!3m2!1spt-BR!2sbr!4v1716850002754!5m2!1spt-BR!2sbr" 
                allowFullScreen 
                loading="lazy" 
                title="Localização da Ke.fi Concept"
              ></iframe>
            </div>
          </div>

          <div className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
            <h3 className="text-lg font-semibold mb-4">Contato & Menu</h3>
            <nav className="mb-6">
              <ul className="space-y-2">
                <li>
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                      `text-gray-300 hover:text-white transition-all inline-block ${isActive ? 'translate-x-1' : ''}`
                    }
                  >
                    Início
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/pesquisa" 
                    className={({ isActive }) => 
                      `text-gray-300 hover:text-white transition-all inline-block ${isActive ? 'translate-x-1' : ''}`
                    }
                  >
                    Pesquisa de Satisfação
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/sobre" 
                    className={({ isActive }) => 
                      `text-gray-300 hover:text-white transition-all inline-block ${isActive ? 'translate-x-1' : ''}`
                    }
                  >
                    Sobre Nós
                  </NavLink>
                </li>
              </ul>
            </nav>
            <a 
              href="https://wa.me/5534996991253" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all transform hover:scale-105 active:scale-95"
            >
              <MessageCircle size={18} className="mr-2" />
              WhatsApp
            </a>
          </div>

          <div className="flex flex-col items-center justify-center animate-fadeIn" style={{ animationDelay: '300ms' }}>
            <img 
              src="/logo.png" 
              alt="Ke.fi Concept" 
              className="h-20 mb-4 hover-scale"
            />
            <div className="flex items-center justify-center mb-2">
              <Heart className="text-white mr-1" size={16} />
              <Heart className="text-white" size={16} />
            </div>
            <p className="text-sm text-center text-gray-400">
              &copy; {new Date().getFullYear()} Ke.fi Concept<br />
              Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;