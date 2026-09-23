import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | C7Dev_ — Desarrollador Web Colombia',
  description: 'Contáctame para proyectos web, colaboraciones freelance o consultas técnicas. Desarrollador Full Stack en Colombia — respondo en menos de 24 horas.',
  alternates: { canonical: '/contacto' },
  openGraph: {
    title: 'Contacto | C7Dev_',
    description: '¿Tienes un proyecto web? Escríbeme y lo hacemos realidad. Respondo en menos de 24 horas.',
    url: 'https://c7dev-portfolio.vercel.app/contacto',
  },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
