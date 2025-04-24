import Link from 'next/link';
import { Mail, Facebook, Twitter, Linkedin, Phone } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator'; // Separator might not be needed if everything is stacked

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-muted/40 py-6">
      <div className="container mx-auto px-4">
        {/* Main container: Stack elements vertically and center them horizontally */}
        <div className="flex flex-col items-center gap-4 text-center">

          {/* Logo */}
          <Link href="/">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Unicor.svg/1200px-Unicor.svg.png"
                alt="Logo Universidad de Córdoba"
                width={120} // Slightly larger logo for better visibility
                height={31} // Adjust height proportionally
                className="h-8 w-auto" // Control height
              />
          </Link>

          {/* Contact Info */}
          <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-x-4">
             <a
               href="mailto:soporteova@unicor.edu.co"
               className="flex items-center gap-1 font-open-sans text-xs text-muted-foreground hover:text-primary"
             >
               <Mail className="h-3.5 w-3.5" />
               soporteova@unicor.edu.co
             </a>
             <a
               href="tel:+573052760851"
               className="flex items-center gap-1 font-open-sans text-xs text-muted-foreground hover:text-primary"
             >
               <Phone className="h-3.5 w-3.5" />
               (+57) 305 276 0851
             </a>
          </div>

          {/* Social Media Links */}
          <div className="flex gap-3">
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

           {/* Copyright */}
           <p className="font-open-sans text-xs text-muted-foreground">
               © {new Date().getFullYear()} EduSmart. Universidad de Córdoba.
           </p>

        </div>
      </div>
    </footer>
  );
}
