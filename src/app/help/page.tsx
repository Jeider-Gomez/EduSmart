import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, HelpCircle, Phone } from 'lucide-react'; // Added Phone icon

const faqs = [
  {
    question: '¿Cómo navego entre los módulos?',
    answer: 'Puedes acceder a todos los módulos desde la página "Módulos". Haz clic en "Iniciar Módulo" o "Continuar" en la tarjeta del módulo que desees. Dentro de un módulo, usa las pestañas (Introducción, Objetivo, Contenido, Actividad, Cierre) o los botones de navegación al final de la pestaña "Cierre".',
  },
  {
    question: '¿Se guarda mi progreso automáticamente?',
    answer: 'Tu progreso (módulos completados) se muestra en la página "Mi Progreso". Sin embargo, las respuestas específicas a las actividades o reflexiones dentro de cada módulo no se guardan automáticamente en esta versión. Te recomendamos guardar tus respuestas o la bitácora final.',
  },
  {
    question: '¿Dónde encuentro los recursos descargables?',
    answer: 'Cada módulo puede tener un recurso específico en la pestaña "Actividad". Además, la página "Recursos" en el menú principal contiene una colección general de plantillas, guías y enlaces útiles organizados por categoría.',
  },
  {
    question: '¿Cómo obtengo mi Bitácora de Aprendizaje?',
    answer: 'Una vez que hayas marcado como completados todos los módulos en la página "Mi Progreso", aparecerá un botón para descargar tu "Bitácora de Aprendizaje". Este documento consolida aspectos clave de tu recorrido.',
  },
];

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="font-poppins mb-8 text-3xl font-bold text-secondary md:text-4xl flex items-center gap-3">
         <HelpCircle className="h-8 w-8"/> ¿Necesitas ayuda?
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
                 Si tienes dudas técnicas o necesitas apoyo para acceder a los contenidos, puedes escribir a:
               </CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
                {/* Option 1: Direct Email Link */}
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                    <Mail className="h-5 w-5 text-primary"/>
                    <div>
                        <p className="font-open-sans text-sm font-medium">Correo Electrónico:</p>
                        <a href="mailto:soporteova@unicor.edu.co" className="font-open-sans text-sm text-primary hover:underline">
                         soporteova@unicor.edu.co
                        </a>
                    </div>
                </div>

                 {/* Option 2: Phone Link */}
                 <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                    <Phone className="h-5 w-5 text-primary"/>
                    <div>
                        <p className="font-open-sans text-sm font-medium">Línea TIC:</p>
                         <a href="tel:+573052760851" className="font-open-sans text-sm text-primary hover:underline">
                          (+57) 305 276 0851
                         </a>
                    </div>
                </div>

                {/* Simple Contact Form (Frontend Only Example - Commented Out) */}
                {/* Consider removing or implementing backend logic if needed */}
                {/*
                <form className="space-y-4 pt-4 border-t" onSubmit={(e) => { e.preventDefault(); alert('Formulario enviado (simulación)'); }}>
                  <h3 className="font-poppins text-lg font-medium text-primary pt-2">O envíanos un mensaje:</h3>
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
                </form>
                */}
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
