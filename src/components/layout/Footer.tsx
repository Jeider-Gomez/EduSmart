import Link from 'next/link';
import { Mail, Facebook, Twitter, Linkedin, Phone } from 'lucide-react'; // Added Phone
import Image from 'next/image'; // Import next/image

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-background/95 py-8">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 text-center md:grid-cols-3 md:text-left">
        {/* Institutional Logos & Credits */}
        <div className="flex flex-col items-center md:items-start">
           <div className="flex items-center gap-2 mb-2">
             {/* University of Córdoba Logo */}
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Unicor.svg/1200px-Unicor.svg.png"
                alt="Logo Universidad de Córdoba"
                width={120} // Adjust width for footer
                height={32} // Adjust height for footer
                className="h-8 w-auto"
              />
             {/* <span className="font-poppins text-sm font-semibold text-primary">Universidad de Córdoba</span> */}
           </div>
           <p className="font-open-sans text-xs text-muted-foreground">
             © {new Date().getFullYear()} EduSmart Hub. Una iniciativa de la Universidad de Córdoba.
           </p>
        </div>

        {/* Quick Links (Optional) */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-poppins mb-2 font-medium text-secondary">Enlaces Rápidos</h4>
          <nav className="flex flex-col gap-1">
            <Link href="/modules" className="font-open-sans text-sm text-muted-foreground hover:text-primary">
              Módulos
            </Link>
            <Link href="/resources" className="font-open-sans text-sm text-muted-foreground hover:text-primary">
              Recursos
            </Link>
            <Link href="/progress" className="font-open-sans text-sm text-muted-foreground hover:text-primary">
              Mi Progreso
            </Link>
             <Link href="/help" className="font-open-sans text-sm text-muted-foreground hover:text-primary">
               Ayuda
             </Link>
          </nav>
        </div>

        {/* Contact & Socials */}
        <div className="flex flex-col items-center md:items-end">
          <h4 className="font-poppins mb-2 font-medium text-secondary">Contacto</h4>
          <a
            href="mailto:soporteova@unicor.edu.co" // Updated Email
            className="mb-2 flex items-center gap-2 font-open-sans text-sm text-muted-foreground hover:text-primary"
          >
            <Mail className="h-4 w-4" />
            soporteova@unicor.edu.co
          </a>
          <a
            href="tel:+573052760851" // Added Phone
            className="mb-4 flex items-center gap-2 font-open-sans text-sm text-muted-foreground hover:text-primary"
          >
            <Phone className="h-4 w-4" />
             (+57) 305 276 0851
          </a>
          {/* Replace # with actual institutional social media links */}
          <div className="flex gap-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
               <span className="sr-only">Twitter</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
               <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
