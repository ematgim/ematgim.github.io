import { Terminal } from 'lucide-react';
import { NavLinkProps } from '../types';

const NavLink = ({ href, children, isActive }: NavLinkProps) => (
  <a 
    href={href}
    className={`text-sm font-medium transition-colors hover:text-green-400 ${
      isActive ? 'text-green-400' : 'text-gray-400'
    }`}
  >
    {children}
  </a>
);

interface NavbarProps {
  isScrolled: boolean;
  activeSection: string;
}

export const Navbar = ({ isScrolled, activeSection }: NavbarProps) => {
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
      isScrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-gray-800' : 'bg-transparent border-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(34,197,94,0.4)]">
            <Terminal size={18} className="text-[#0a0a0a] font-bold" />
          </div>
          <span className="font-mono text-xl font-bold tracking-tighter">
            EMILIO<span className="text-green-500">.dev</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="#home" isActive={activeSection === 'home'}>
            Inicio
          </NavLink>
          <NavLink href="#about" isActive={activeSection === 'about'}>
            Filosofía
          </NavLink>
          <NavLink href="#services" isActive={activeSection === 'services'}>
            Expertise
          </NavLink>
          <NavLink href="#experience" isActive={activeSection === 'experience'}>
            Trayectoria
          </NavLink>
          <a 
            href="#contact" 
            className="px-5 py-2 rounded-full border border-green-500 text-green-500 hover:bg-green-500 hover:text-[#0a0a0a] transition-all text-sm font-bold shadow-[0_0_10px_rgba(34,197,94,0.2)]"
          >
            Consultoría
          </a>
        </div>
      </div>
    </nav>
  );
};
