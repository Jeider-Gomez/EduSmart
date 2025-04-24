'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Compass, Library, BarChart3, HelpCircle, X } from 'lucide-react'; // Updated icons
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Image from 'next/image'; // Import next/image

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
           {/* University of Córdoba Logo */}
           <Image
             src="https://cintia.unicordoba.edu.co/wp-content/uploads/2023/02/unicordoba_logo.png"
             alt="Logo Universidad de Córdoba"
             width={150} // Adjust width as needed
             height={40} // Adjust height as needed
             className="h-10 w-auto" // Maintain aspect ratio
             priority
           />
          <span className="font-poppins text-xl font-bold text-primary hidden sm:inline ml-2">
            EduSmart Hub
          </span>
           <span className="font-poppins text-lg font-bold text-primary sm:hidden ml-1">
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
                             {/* University of Córdoba Logo (Mobile) */}
                            <Image
                                src="https://cintia.unicordoba.edu.co/wp-content/uploads/2023/02/unicordoba_logo.png"
                                alt="Logo Universidad de Córdoba"
                                width={100} // Smaller width for mobile menu
                                height={26} // Adjust height accordingly
                                className="h-7 w-auto"
                            />
                           {/* <span className="font-poppins text-lg font-semibold text-primary">EduSmart Hub</span> */}
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
