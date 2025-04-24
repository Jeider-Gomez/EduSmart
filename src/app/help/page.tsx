import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Mail, HelpCircle, Phone } from 'lucide-react';

// Optional: Define FAQs if needed, otherwise this section can be removed or simplified.
const faqs = [
  {
    question: '¿Cómo sé si mi progreso se guarda?',
    answer: 'Tu progreso general (módulos completados) se actualiza automáticamente y puedes verlo en la sección "Mi Progreso". Las reflexiones escritas en las actividades no se guardan permanentemente en esta versión, pero puedes copiarlas para tu bitácora final.',
  },
  {
    question: '¿Puedo repetir un módulo ya completado?',
    answer: '¡Sí! Puedes volver a visitar cualquier módulo, revisar los contenidos o rehacer las actividades cuantas veces quieras. Tu estado de "Completado" en la página de progreso se mantendrá.',
  },
  {
    question: '¿Dónde encuentro la "Bitácora de Aprendizaje"?',
    answer: 'Una vez que hayas completado los 5 módulos, aparecerá un botón para descargar tu Bitácora en la página "Mi Progreso". También podrás descargar una constancia simbólica de finalización.',
  },
];

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      {/* Page Title */}
      <div className="flex items-center gap-3 mb-10">
          <HelpCircle className="h-8 w-8 text-primary"/>
          <h1 className="font-poppins text-3xl font-bold text-secondary md:text-4xl">
            ¿Necesitas ayuda?
          </h1>
      </div>


      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">

        {/* Contact Information Section */}
        <div>
           <h2 className="font-poppins mb-6 text-2xl font-semibold text-primary">Contacto de Soporte</h2>
           <Card className="shadow-md border-secondary/20">
             <CardHeader>
               <CardDescription className="font-open-sans text-lg">
                 Si tienes dudas técnicas o necesitas apoyo para acceder a los contenidos, puedes comunicarte a través de:
               </CardDescription>
             </CardHeader>
             <CardContent className="space-y-5 pt-2">
                {/* Email Contact */}
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Mail className="h-6 w-6 text-secondary mt-1 flex-shrink-0"/>
                    <div>
                        <p className="font-poppins text-md font-medium text-secondary mb-1">Correo Electrónico:</p>
                        <a href="mailto:soporteova@unicor.edu.co" className="font-open-sans text-base text-primary hover:underline break-all">
                         soporteova@unicor.edu.co
                        </a>
                    </div>
                </div>

                 {/* Phone Contact */}
                 <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0"/>
                    <div>
                        <p className="font-poppins text-md font-medium text-primary mb-1">Línea TIC:</p>
                         <a href="tel:+573052760851" className="font-open-sans text-base text-primary hover:underline">
                          (+57) 305 276 0851
                         </a>
                    </div>
                </div>
             </CardContent>
           </Card>
        </div>

         {/* FAQs Section (Optional) */}
         {faqs.length > 0 && (
             <div>
               <h2 className="font-poppins mb-6 text-2xl font-semibold text-primary">Preguntas Frecuentes</h2>
               <Card className="shadow-md border-primary/20">
                  <CardContent className="p-0">
                     <Accordion type="single" collapsible className="w-full">
                       {faqs.map((faq, index) => (
                         <AccordionItem key={index} value={`item-${index}`} className={index === faqs.length - 1 ? "border-b-0" : ""}>
                           <AccordionTrigger className="font-poppins text-left px-6 py-4 text-base hover:bg-muted/50">
                             {faq.question}
                           </AccordionTrigger>
                           <AccordionContent className="font-open-sans text-muted-foreground px-6 pb-4">
                             {faq.answer}
                           </AccordionContent>
                         </AccordionItem>
                       ))}
                     </Accordion>
                  </CardContent>
                </Card>
             </div>
         )}

      </div>
    </div>
  );
}
```