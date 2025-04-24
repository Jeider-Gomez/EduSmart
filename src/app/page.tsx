import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        {/* Text Content */}
        <div className="space-y-6">
          <h1 className="font-poppins text-4xl font-bold tracking-tight text-primary md:text-5xl">
            EduSmart Hub
          </h1>
          <p className="font-poppins text-xl font-semibold text-secondary">
            Aprende por tu cuenta, pero con propósito
          </p>
          <p className="font-open-sans text-lg text-muted-foreground">
            Explora nuestros módulos interactivos diseñados para estudiantes universitarios. Aprende a tu propio ritmo, refuerza tus conocimientos y sigue tu progreso de forma autónoma.
          </p>
          <Button asChild size="lg" className="rounded-full shadow-md hover:shadow-lg transition-shadow">
            <Link href="/modules">
              <ArrowRight className="mr-2 h-5 w-5" />
              Empezar a Aprender
            </Link>
          </Button>
        </div>

        {/* Image */}
        <div className="flex justify-center md:justify-end">
           <Image
             src="https://picsum.photos/seed/edusmart/600/400"
             alt="EduSmart learning illustration"
             width={600}
             height={400}
             className="rounded-lg shadow-lg"
             priority // Load the main image faster
           />
        </div>
      </div>

      {/* Optional: Add a section highlighting key features or benefits */}
      <section className="mt-16 md:mt-24">
         <h2 className="font-poppins mb-8 text-center text-3xl font-semibold text-secondary">
           ¿Por qué EduSmart?
         </h2>
         <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
           <Card className="shadow-sm transition-shadow hover:shadow-md">
             <CardHeader>
               <CardTitle className="font-poppins text-primary">Aprendizaje Autónomo</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="font-open-sans text-muted-foreground">Accede a todos los módulos y recursos cuando quieras, sin horarios fijos.</p>
             </CardContent>
           </Card>
           <Card className="shadow-sm transition-shadow hover:shadow-md">
             <CardHeader>
               <CardTitle className="font-poppins text-primary">Contenido Interactivo</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="font-open-sans text-muted-foreground">Participa en actividades, videos y evaluaciones para reforzar tu aprendizaje.</p>
             </CardContent>
           </Card>
           <Card className="shadow-sm transition-shadow hover:shadow-md">
             <CardHeader>
               <CardTitle className="font-poppins text-primary">Seguimiento de Progreso</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="font-open-sans text-muted-foreground">Visualiza tus avances y módulos completados fácilmente.</p>
             </CardContent>
           </Card>
         </div>
       </section>
    </div>
  );
}
