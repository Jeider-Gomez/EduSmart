'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Compass, Library, BarChart3, HelpCircle, X } from 'lucide-react'; // Updated icons
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

// Updated nav items based on new prompt structure
const navItems = [
  { href: '/', label: 'Inicio', icon: <Home className="h-5 w-5" /> },
  { href: '/modules', label: 'Explorar módulos', icon: <Compass className="h-5 w-5" /> }, // Changed label
  { href: '/resources', label: 'Recursos', icon: <Library className="h-5 w-5" /> }, // Changed Icon
  { href: '/progress', label: 'Mi progreso', icon: <BarChart3 className="h-5 w-5" /> },
  { href: '/help', label: 'Ayuda / Contacto', icon: <HelpCircle className="h-5 w-5" /> },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
           {/* Simple EduSmart Logo */}
           <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="text-primary">
               <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
               <circle cx="50" cy="50" r="45" fill="url(#grad1)" />
               <path d="M30 65 Q 50 85 70 65" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round"/>
               <path d="M35 48 Q 50 60 65 48" fill="none" stroke="white" strokeWidth="7" strokeLinecap="round"/>
               <path d="M42 32 Q 50 40 58 32" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round"/>
            </svg>
          <span className="font-poppins text-xl font-bold text-primary hidden sm:inline">
            EduSmart Hub
          </span>
           <span className="font-poppins text-lg font-bold text-primary sm:hidden">
            EduSmart
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-1">
          {navItems.map((item) => (
             <Button key={item.href} asChild variant="ghost"
               className={cn(
                'font-open-sans text-sm font-medium transition-colors h-9 px-4 py-2',
                pathname === item.href
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              )}
            >
               <Link href={item.href}>
                  <item.icon.type {...item.icon.props} className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
             </Button>
          ))}
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
           <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
             <SheetTrigger asChild>
               <Button variant="ghost" size="icon">
                 <Menu className="h-6 w-6 text-primary" />
                 <span className="sr-only">Abrir menú</span>
               </Button>
             </SheetTrigger>
             <SheetContent side="left" className="w-full max-w-xs p-0 bg-background">
                <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                         <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                            {/* Simple EduSmart Logo */}
                            <svg width="24" height="24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                                <defs>
                                    <linearGradient id="grad1mob" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))', stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                            <circle cx="50" cy="50" r="45" fill="url(#grad1mob)" />
                            <path d="M30 65 Q 50 85 70 65" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round"/>
                            <path d="M35 48 Q 50 60 65 48" fill="none" stroke="white" strokeWidth="7" strokeLinecap="round"/>
                            <path d="M42 32 Q 50 40 58 32" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                            </svg>
                           <span className="font-poppins text-lg font-semibold text-primary">EduSmart Hub</span>
                         </Link>
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="h-8 w-8">
                           <X className="h-5 w-5 text-muted-foreground" />
                           <span className="sr-only">Cerrar menú</span>
                         </Button>
                    </div>
                    {/* Mobile Menu Links */}
                   <nav className="flex flex-col gap-1 p-4">
                     {navItems.map((item) => (
                       <Link
                         key={item.href}
                         href={item.href}
                         className={cn(
                           'flex items-center gap-3 rounded-md px-3 py-2.5 font-open-sans text-base font-medium transition-colors',
                           pathname === item.href
                             ? 'bg-primary/10 text-primary'
                             : 'text-foreground hover:bg-muted hover:text-foreground'
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
