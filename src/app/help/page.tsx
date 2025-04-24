import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: '¿Cómo navego entre los módulos?',
    answer: 'Puedes acceder a todos los módulos desde la página "Módulos". Haz clic en "Empezar" o "Continuar" en la tarjeta del módulo que desees. Dentro de un módulo, usa las pestañas (Introducción, Contenido, etc.) o los botones de navegación al final.',
  },
  {
    question: '¿Se guarda mi progreso automáticamente?',
    answer: 'Actualmente, el progreso se indica visualmente pero no se guarda de forma persistente entre sesiones (a menos que se implemente almacenamiento local o una base de datos). La funcionalidad completa de guardado podría añadirse en futuras versiones.',
  },
  {
    question: '¿Dónde encuentro los recursos descargables?',
    answer: 'Cada módulo puede tener una pestaña "Recurso" con materiales específicos. Además, la página "Recursos" en el menú principal contiene una colección general de archivos y enlaces útiles.',
  },
  {
    question: '¿Cómo obtengo mi certificado?',
    answer: 'Una vez que hayas completado todos los módulos, aparecerá una opción para descargar tu certificado o bitácora de aprendizaje en la página "Mi Progreso".',
  },
];

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="font-poppins mb-8 text-3xl font-bold text-secondary md:text-4xl flex items-center gap-3">
         <HelpCircle className="h-8 w-8"/> Ayuda y Contacto
      </h1>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* FAQs Section */}
        <div>
          <h2 className="font-poppins mb-6 text-2xl font-semibold text-primary">Preguntas Frecuentes</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="font-poppins text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="font-open-sans text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Section */}
        <div>
           <h2 className="font-poppins mb-6 text-2xl font-semibold text-primary">Contactar a Soporte</h2>
           <Card className="shadow-sm">
             <CardHeader>
               <CardDescription className="font-open-sans">
                 Si tienes alguna otra pregunta o problema técnico, no dudes en contactarnos.
               </CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
                {/* Option 1: Direct Email Link */}
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                    <Mail className="h-5 w-5 text-primary"/>
                    <div>
                        <p className="font-open-sans text-sm font-medium">Correo Electrónico:</p>
                        <a href="mailto:soporte@institucion.edu" className="font-open-sans text-sm text-primary hover:underline">
                         soporte@institucion.edu
                        </a>
                    </div>
                </div>

                {/* Option 2: Simple Contact Form (Frontend Only Example) */}
                {/* <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Formulario enviado (simulación)'); }}>
                  <div>
                    <Label htmlFor="name" className="font-open-sans">Nombre</Label>
                    <Input id="name" type="text" placeholder="Tu nombre" required />
                  </div>
                  <div>
                    <Label htmlFor="email" className="font-open-sans">Correo Electrónico</Label>
                    <Input id="email" type="email" placeholder="tu.correo@ejemplo.com" required />
                  </div>
                  <div>
                    <Label htmlFor="message" className="font-open-sans">Mensaje</Label>
                    <Textarea id="message" placeholder="Describe tu consulta o problema..." required />
                  </div>
                  <Button type="submit" className="w-full">Enviar Mensaje</Button>
                </form> */}
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
