import Link from 'next/link';
import { Mail, Facebook, Twitter, Linkedin, Phone } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const Separator = () => <span className="mx-2 text-muted-foreground/60">|</span>;

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-muted/40 py-4"> {/* Reduced vertical padding */}
      <div className="container mx-auto px-4">
        {/* Main container: Single row, centered items, allows wrapping on small screens */}
        <div className="flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-xs">

          {/* Logo */}
          <Link href="/" className="flex flex-shrink-0 items-center">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Unicor.svg/1200px-Unicor.svg.png"
                alt="Logo Universidad de Córdoba"
                width={100} // Reduced size slightly
                height={26} // Adjust height proportionally
                className="h-6 w-auto" // Control height
              />
          </Link>

          <Separator />

           {/* Copyright */}
           <p className="font-open-sans text-muted-foreground">
               © {new Date().getFullYear()} EduSmart. Unicor. {/* Shortened */}
           </p>

            <Separator />

            {/* Email Contact */}
            <a
               href="mailto:soporteova@unicor.edu.co"
               className="flex items-center gap-1 font-open-sans text-muted-foreground hover:text-primary"
               aria-label="Email de soporte"
            >
               <Mail className="h-3.5 w-3.5 flex-shrink-0" />
               <span className="hidden sm:inline">soporteova@unicor.edu.co</span>
               <span className="sm:hidden">Email</span> {/* Shorter label for mobile */}
            </a>

            <Separator />

             {/* Phone Contact */}
             <a
               href="tel:+573052760851"
               className="flex items-center gap-1 font-open-sans text-muted-foreground hover:text-primary"
               aria-label="Teléfono de soporte"
             >
               <Phone className="h-3.5 w-3.5 flex-shrink-0" />
               <span className="hidden sm:inline">(+57) 305 276 0851</span>
                <span className="sm:hidden">Teléfono</span> {/* Shorter label for mobile */}
             </a>

            <Separator />

          {/* Social Media Links */}
          <div className="flex flex-row items-center gap-3">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/80 hover:text-primary">
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/80 hover:text-primary">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/80 hover:text-primary">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
