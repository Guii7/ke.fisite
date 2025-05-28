import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrolled(currentScrollPos > 20);
      
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/80 backdrop-blur-sm py-3'
      } ${visible ? 'transform-none' : '-translate-y-full'}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <NavLink to="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Ke.fi Concept" 
            className="h-12 transition-transform duration-300 hover:scale-105" 
          />
        </NavLink>

        <nav className="hidden md:flex space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-sm font-medium nav-link ${isActive ? 'text-black after:w-full' : 'text-gray-700 hover:text-black'}`
            }
          >
            Início
          </NavLink>
          <NavLink 
            to="/pesquisa" 
            className={({ isActive }) => 
              `text-sm font-medium nav-link ${isActive ? 'text-black after:w-full' : 'text-gray-700 hover:text-black'}`
            }
          >
            Pesquisa de Satisfação
          </NavLink>
          <NavLink 
            to="/sobre" 
            className={({ isActive }) => 
              `text-sm font-medium nav-link ${isActive ? 'text-black after:w-full' : 'text-gray-700 hover:text-black'}`
            }
          >
            Sobre Nós
          </NavLink>
        </nav>

        <button 
          className="md:hidden focus:outline-none transform transition-transform active:scale-90" 
          onClick={toggleMenu}
          aria-label="Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div 
        className={`fixed inset-0 bg-white z-40 md:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } pt-20`}
      >
        <nav className="px-4 py-4">
          <div className="flex flex-col space-y-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-lg font-medium p-2 ${isActive ? 'text-black bg-gray-100' : 'text-gray-700'} animate-slideIn`
              }
              onClick={() => setIsMenuOpen(false)}
              style={{ animationDelay: '100ms' }}
            >
              Início
            </NavLink>
            <NavLink 
              to="/pesquisa" 
              className={({ isActive }) => 
                `text-lg font-medium p-2 ${isActive ? 'text-black bg-gray-100' : 'text-gray-700'} animate-slideIn`
              }
              onClick={() => setIsMenuOpen(false)}
              style={{ animationDelay: '150ms' }}
            >
              Pesquisa de Satisfação
            </NavLink>
            <NavLink 
              to="/sobre" 
              className={({ isActive }) => 
                `text-lg font-medium p-2 ${isActive ? 'text-black bg-gray-100' : 'text-gray-700'} animate-slideIn`
              }
              onClick={() => setIsMenuOpen(false)}
              style={{ animationDelay: '200ms' }}
            >
              Sobre Nós
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;