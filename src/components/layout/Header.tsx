'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, BookOpen, BarChart3, Download, HelpCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Inicio', icon: <BookOpen className="h-4 w-4" /> },
  { href: '/modules', label: 'Módulos', icon: <BookOpen className="h-4 w-4" /> },
  { href: '/resources', label: 'Recursos', icon: <Download className="h-4 w-4" /> },
  { href: '/progress', label: 'Mi progreso', icon: <BarChart3 className="h-4 w-4" /> },
  { href: '/help', label: 'Ayuda / Contacto', icon: <HelpCircle className="h-4 w-4" /> },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
           <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="text-primary">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10"/>
              <path d="M30 70 Q 50 90 70 70" fill="none" stroke="currentColor" strokeWidth="8"/>
              <path d="M35 50 Q 50 65 65 50" fill="none" stroke="currentColor" strokeWidth="8"/>
              <path d="M40 30 Q 50 40 60 30" fill="none" stroke="currentColor" strokeWidth="8"/>
            </svg>
          <span className="font-poppins text-lg font-semibold text-primary">
            EduSmart Hub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'font-open-sans text-sm font-medium transition-colors hover:text-primary',
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
           <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
             <SheetTrigger asChild>
               <Button variant="ghost" size="icon">
                 <Menu className="h-6 w-6" />
                 <span className="sr-only">Abrir menú</span>
               </Button>
             </SheetTrigger>
             <SheetContent side="left" className="w-3/4 p-4">
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center mb-6">
                         <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                           <svg width="24" height="24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10"/>
                              <path d="M30 70 Q 50 90 70 70" fill="none" stroke="currentColor" strokeWidth="8"/>
                              <path d="M35 50 Q 50 65 65 50" fill="none" stroke="currentColor" strokeWidth="8"/>
                              <path d="M40 30 Q 50 40 60 30" fill="none" stroke="currentColor" strokeWidth="8"/>
                           </svg>
                           <span className="font-poppins text-md font-semibold text-primary">EduSmart Hub</span>
                         </Link>
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                           <X className="h-5 w-5" />
                           <span className="sr-only">Cerrar menú</span>
                         </Button>
                    </div>
                   <nav className="flex flex-col gap-4">
                     {navItems.map((item) => (
                       <Link
                         key={item.href}
                         href={item.href}
                         className={cn(
                           'flex items-center gap-3 rounded-md p-2 font-open-sans text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                           pathname === item.href ? 'bg-accent text-accent-foreground' : 'text-foreground'
                         )}
                         onClick={() => setIsMobileMenuOpen(false)}
                       >
                         {item.icon}
                         {item.label}
                       </Link>
                     ))}
                   </nav>
                </div>
             </SheetContent>
           </Sheet>
        </div>
      </div>
    </header>
  );
}
