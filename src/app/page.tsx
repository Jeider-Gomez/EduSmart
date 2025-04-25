import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Lightbulb, CheckSquare, BarChart3 } from 'lucide-react'; // Added icons
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* Text Content */}
        <div className="space-y-6">
          <h1 className="font-poppins text-4xl font-bold tracking-tight text-primary md:text-5xl lg:text-6xl">
            EduSmart: Aprende por tu cuenta, pero con propósito
          </h1>
          <p className="font-open-sans text-lg text-muted-foreground">
             Este curso virtual está diseñado para ayudarte a identificar cómo aprendes mejor, desarrollar estrategias eficaces, planificar tu tiempo, gestionar información y construir tu camino como estudiante autónomo. Ideal para estudiantes de primer semestre que buscan potenciar su desempeño académico desde el inicio.
          </p>
          <blockquote className="font-poppins mt-4 border-l-4 border-accent pl-4 italic text-secondary">
            “La autonomía no es hacer todo solo, es aprender a decidir cómo, cuándo y con qué avanzar.”
          </blockquote>
          <Button asChild size="lg" className="rounded-full shadow-md hover:shadow-lg transition-shadow">
            <Link href="/modules">
              <ArrowRight className="mr-2 h-5 w-5" />
              Comenzar
            </Link>
          </Button>
        </div>

        {/* Image */}
        <div className="flex justify-center md:justify-end h-full max-h-[450px] md:max-h-none"> {/* Adjust max-h for container */}
           <Image
             src="https://cdn.pixabay.com/photo/2018/07/10/10/29/girl-3528292_960_720.jpg" // Updated image source
             alt="Estudiante aprendiendo en línea"
             width={600} // Intrinsic width
             height={400} // Approximate intrinsic height based on typical aspect ratios
             className="rounded-lg shadow-xl object-contain w-full h-full" // Use object-contain, let width/height set aspect ratio
             unoptimized // Explicitly state unoptimized if needed, though config covers it
             // Removed sizes and priority as they are for optimized images
           />
        </div>
      </div>

      {/* Section highlighting key features */}
      <section className="mt-16 md:mt-24">
         <h2 className="font-poppins mb-10 text-center text-3xl font-semibold text-secondary">
           ¿Qué encontrarás en EduSmart?
         </h2>
         <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
           <Card className="shadow-sm transition-shadow hover:shadow-md text-center border-primary/20">
             <CardHeader className="items-center">
                <Lightbulb className="h-10 w-10 text-primary mb-2"/>
               <CardTitle className="font-poppins text-primary">Aprendizaje Autónomo</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="font-open-sans text-muted-foreground">Accede a todos los módulos y recursos cuando quieras, a tu propio ritmo.</p>
             </CardContent>
           </Card>
           <Card className="shadow-sm transition-shadow hover:shadow-md text-center border-secondary/20">
             <CardHeader className="items-center">
                <CheckSquare className="h-10 w-10 text-secondary mb-2"/>
               <CardTitle className="font-poppins text-secondary">Contenido Interactivo</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="font-open-sans text-muted-foreground">Participa en actividades, videos y reflexiones para reforzar tu aprendizaje.</p>
             </CardContent>
           </Card>
           <Card className="shadow-sm transition-shadow hover:shadow-md text-center border-accent/20">
             <CardHeader className="items-center">
                <BarChart3 className="h-10 w-10 text-accent mb-2"/>
               <CardTitle className="font-poppins text-accent">Seguimiento Personal</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="font-open-sans text-muted-foreground">Visualiza tus avances, módulos completados y descarga tu bitácora final.</p>
             </CardContent>
           </Card>
         </div>
       </section>
    </div>
  );
}
