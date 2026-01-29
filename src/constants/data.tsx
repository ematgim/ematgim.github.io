import {
  Code2,
  Server,
  Zap,
  Layers,
  Cpu,
  Box,
  RefreshCcw,
  Database,
  Battery,
  Anchor,
  Dna,
  Package
} from 'lucide-react';
import { ServiceProps, ExperienceProps, TechStackProps } from '../types';

export const SECTIONS = ['home', 'about', 'services', 'experience', 'contact'];

export const TECH_STACK: TechStackProps[] = [
  { name: 'Angular / Vue.js', icon: <Layers className="text-red-500" /> },
  { name: 'Node.js / Java', icon: <Cpu className="text-green-500" /> },
  { name: 'SAP Integration', icon: <Zap className="text-yellow-400" /> },
  { name: 'K8s / Docker Swarm', icon: <Box className="text-blue-400" /> },
  { name: 'CI / CD Pipelines', icon: <RefreshCcw className="text-emerald-400" /> },
  { name: 'MariaDB / MongoDB', icon: <Database className="text-blue-500" /> }
];

export const SERVICES: ServiceProps[] = [
  {
    title: "Desarrollo de Software Core",
    desc: "Implementación de lógica de negocio de alta complejidad. Código limpio, testeado y listo para soportar flujos industriales masivos.",
    icon: <Code2 className="text-green-500" size={32} />
  },
  {
    title: "Arquitectura & DevOps",
    desc: "Diseño de infraestructuras elásticas mediante contenedores y orquestación. Automatizo el ciclo de vida para entregas sin errores.",
    icon: <Server className="text-green-500" size={32} />
  },
  {
    title: "Integración Enterprise",
    desc: "Conecto arquitecturas modernas con sistemas corporativos como SAP, APIs portuarias y bases de datos transaccionales de alto volumen.",
    icon: <Zap className="text-green-500" size={32} />
  }
];

export const EXPERIENCE: ExperienceProps[] = [
  {
    company: "Power Electronics",
    role: "Senior Full Stack Developer",
    period: "Oct 2025 - Actualidad",
    milestone: "Evolución Sistémica: Power On Support",
    desc: "Evoluciono la plataforma neurálgica de soporte técnico y gestión de stock. Optimización del código core mediante Node.js y Angular, garantizando fiabilidad absoluta e integración fluida con SAP y MongoDB.",
    tags: ["Node.js", "Angular", "MongoDB", "SAP", "CI/CD"],
    icon: <Battery className="text-green-400" />
  },
  {
    company: "Boluda Corporación Marítima",
    role: "Full Stack Developer & Architect",
    period: "Sept 2024 - Oct 2025",
    milestone: "Orquestación Tecnológica Portuaria Global",
    desc: "Arquitecturé la plataforma de control mundial para remolcadores. Integración en tiempo real con APIs portuarias (PCS) y SAP, operando sobre MariaDB y Docker Swarm.",
    tags: ["Docker Swarm", "MariaDB", "SAP", "Spring Boot", "Port APIs"],
    icon: <Anchor className="text-blue-400" />
  },
  {
    company: "Sistemas Genómicos",
    role: "Ayudante de Arquitectura & Full Stack",
    period: "Sept 2022 - Ago 2024",
    milestone: "Ingeniería de Datos para la Ciencia",
    desc: "Colaboré en el diseño de arquitectura orientada a eventos para análisis genómico masivo. Orquestación mediante Kubernetes y procesamiento mediante Kafka y MongoDB.",
    tags: ["Kubernetes", "Kafka", "Java", "MongoDB", "Big Data"],
    icon: <Dna className="text-red-400" />
  },
  {
    company: "DATADEC SA",
    role: "Full Stack Developer",
    period: "Jul 2020 - Ago 2022",
    milestone: "Motor E-commerce de Alta Escalabilidad",
    desc: "Creación de un motor multitenant reutilizable integrado en el ERP corporativo. Optimización extrema de procedimientos en Oracle y lógica transaccional PL/SQL.",
    tags: ["Oracle", "PL/SQL", "Vue.js", "Spring"],
    icon: <Package className="text-orange-400" />
  }
];
