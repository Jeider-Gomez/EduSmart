import Link from 'next/link';
import { Mail, Facebook, Twitter, Linkedin, Phone } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-muted/40 py-4 md:py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Left Side: Logo & Copyright */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Link href="/" className="mb-2">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Unicor.svg/1200px-Unicor.svg.png"
                alt="Logo Universidad de Córdoba"
                width={100} // Slightly smaller logo
                height={26}
                className="h-7 w-auto" // Adjust height
              />
            </Link>
            <p className="font-open-sans text-xs text-muted-foreground">
              © {new Date().getFullYear()} EduSmart. Universidad de Córdoba.
            </p>
          </div>

          {/* Right Side: Contact & Socials */}
          <div className="flex flex-col items-center gap-3 md:items-end">
            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 md:justify-end">
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
          </div>
        </div>

        {/* Optional Separator & Quick Links (Simpler version) */}
        {/* <Separator className="my-4 bg-border/60" />
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1">
           <Link href="/modules" className="font-open-sans text-xs text-muted-foreground hover:text-primary">Módulos</Link>
           <Link href="/resources" className="font-open-sans text-xs text-muted-foreground hover:text-primary">Recursos</Link>
           <Link href="/progress" className="font-open-sans text-xs text-muted-foreground hover:text-primary">Progreso</Link>
           <Link href="/help" className="font-open-sans text-xs text-muted-foreground hover:text-primary">Ayuda</Link>
        </nav> */}
      </div>
    </footer>
  );
}
