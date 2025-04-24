'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, Play, CheckSquare, ArrowLeft, ArrowRight, Target, BookOpen, Activity, Lightbulb, FileDown } from 'lucide-react'; // Added more specific icons
import Image from 'next/image';
import { Separator } from '@/components/ui/separator'; // Import Separator

// Mock data - Updated based on prompt
const moduleData: { [key: string]: any } = {
  '1': {
    title: 'Módulo 1: Smart Learner',
    introduction: {
      text: '¿Sabías que no todos aprendemos de la misma forma? Este módulo te ayudará a conocerte mejor como estudiante y a descubrir las claves para un aprendizaje más efectivo y adaptado a ti.',
      objective: 'Identificar el estilo de aprendizaje predominante y relacionarlo con estrategias eficaces.',
      // Optional: videoUrl: 'https://www.youtube.com/embed/...'
    },
    content: {
      type: 'text_infographic', // Example type
      text: 'Existen diferentes modelos para entender los estilos de aprendizaje (VARK, Kolb, etc.). Conocer tu preferencia (visual, auditiva, kinestésica, lectura/escritura) te permite seleccionar técnicas que se ajusten mejor a tu forma de procesar la información. Por ejemplo, si eres visual, los mapas mentales y diagramas serán tus grandes aliados.',
      infographicUrl: 'https://picsum.photos/seed/estilos/800/400', // Placeholder
    },
    activity: {
      type: 'quiz_reflection', // Example type
      description: 'Realiza este breve test para identificar tu estilo de aprendizaje principal y reflexiona sobre cómo aplicarlo.',
      toolUrl: 'https://link.to.your/quiz', // Link to external quiz or form
      feedback: '¿El resultado coincide con lo que pensabas? ¿Cómo puedes usar esta información para mejorar tus sesiones de estudio?',
    },
    resource: {
      name: 'Ficha_Estilos_Aprendizaje.pdf',
      url: '/downloads/ficha_estilos.pdf',
    },
    closure: '¿Qué descubriste sobre ti? ¿Qué estrategia basada en tu estilo vas a probar primero?',
  },
  '2': {
    title: 'Módulo 2: Learning Toolkit',
    introduction: {
      text: 'Tener las herramientas adecuadas marca la diferencia. Aquí explorarás un arsenal de técnicas de estudio para potenciar tu comprensión y memoria.',
      objective: 'Conocer y aplicar diversas estrategias de estudio visuales, escritas y conceptuales.',
    },
    content: {
      type: 'text_examples',
      text: 'Desde los clásicos mapas conceptuales y resúmenes hasta técnicas como la UVE heurística o el método Feynman. Aprenderás a elegir la mejor estrategia según el tipo de contenido y tu objetivo (memorizar, comprender, analizar). ¡Experimenta y encuentra tus favoritas!',
      examples: [ // Example structure for multiple visuals
        { title: 'Mapa Mental', imageUrl: 'https://picsum.photos/seed/mapa/400/200' },
        { title: 'Resumen Estructurado', imageUrl: 'https://picsum.photos/seed/resumen/400/200' },
      ]
    },
    activity: {
      type: 'practical_exercise',
      description: 'Elige un tema de una de tus asignaturas y aplica dos técnicas de estudio diferentes vistas en este módulo (ej. un mapa mental y un resumen).',
      toolSuggestion: 'Puedes usar Canva, Miro o simplemente papel y lápiz.',
      feedback: '¿Qué técnica te resultó más útil para este tema en particular? ¿Por qué?',
    },
    resource: {
      name: 'Ejemplo_UVE_Heuristica.pdf',
      url: '/downloads/ejemplo_uve.pdf',
    },
    closure: '¿Cuál de estas herramientas crees que incorporarás a tu rutina? ¿Cómo te ayudará a organizar mejor tus ideas?',
  },
  '3': {
      title: 'Módulo 3: Mi Ruta Self-Learning',
      introduction: {
          text: 'La autonomía requiere planificación. En este módulo, aprenderás a diseñar tu propio camino de aprendizaje estableciendo metas claras y utilizando herramientas digitales para mantenerte organizado.',
          objective: 'Crear un plan de estudio personalizado estableciendo metas SMART y seleccionando herramientas digitales de apoyo.',
      },
      content: {
          type: 'text_steps',
          text: 'Un buen plan de estudio considera tus objetivos, el tiempo disponible y las tareas específicas. Aprende a definir metas SMART (Específicas, Medibles, Alcanzables, Relevantes, con Plazo). Utiliza calendarios digitales (Google Calendar, Outlook Calendar) y gestores de tareas (Todoist, Trello) para visualizar tu progreso y no perder de vista tus compromisos.',
          // Optional: Add visual step-by-step guide images or a short video tutorial link
      },
      activity: {
          type: 'planning_template',
          description: 'Descarga la plantilla de plan de estudio y complétala con tus metas para las próximas dos semanas. Define al menos 3 metas SMART.',
          toolSuggestion: 'Usa la plantilla PDF editable o créala en tu herramienta digital preferida.',
          feedback: '¿Te parece realista tu plan? ¿Qué ajustes podrías hacer si surge un imprevisto?',
      },
      resource: {
          name: 'Plantilla_Plan_Estudio.pdf',
          url: '/downloads/plantilla_plan_estudio.pdf', // Link to the planning template
      },
      closure: 'Tener un plan te da claridad. ¿Cómo te sientes al visualizar tu ruta de aprendizaje de las próximas semanas?',
  },
   '4': {
       title: 'Módulo 4: Info-Skills',
       introduction: {
           text: 'En la era de la información, saber buscar, evaluar y organizar fuentes es crucial. Este módulo te dará las claves para convertirte en un detective de la información confiable y útil.',
           objective: 'Desarrollar habilidades para buscar, evaluar la confiabilidad y organizar información académica de manera eficiente.',
       },
       content: {
           type: 'text_infographic',
           text: 'Aprende a usar bases de datos académicas (Scopus, Web of Science, Google Scholar), a identificar fuentes confiables (autoridad, actualidad, objetividad) y a organizar tus referencias con gestores como Zotero o Mendeley. Representar la información visualmente (esquemas, fichas) también facilita su comprensión.',
           infographicUrl: 'https://picsum.photos/seed/infoskills/800/400', // Placeholder for infographic
       },
       activity: {
           type: 'information_evaluation',
           description: 'Busca dos artículos sobre un tema de tu interés, uno en una base de datos académica y otro en Google general. Evalúa su confiabilidad usando los criterios vistos y completa una ficha de lectura para cada uno.',
           toolSuggestion: 'Utiliza la plantilla de ficha de lectura o crea la tuya.',
           feedback: '¿Encontraste diferencias significativas en la calidad de las fuentes? ¿Qué criterio fue más difícil de aplicar?',
       },
       resource: {
           name: 'Modelo_Ficha_Lectura.pdf',
           url: '/downloads/modelo_ficha_lectura.pdf', // Link to the reading record template
       },
       closure: '¿Qué herramienta de gestión de referencias te parece más práctica? ¿Cómo aplicarás los criterios de confiabilidad en tus futuras búsquedas?',
   },
    '5': {
        title: 'Módulo 5: Diversos para aprender',
        introduction: {
            text: 'Cada estudiante es único, con su propio ritmo y preferencias. Este módulo final te invita a integrar todo lo aprendido y a diseñar una guía personalizada que respete tu diversidad como aprendiz.',
            objective: 'Reconocer el propio ritmo de aprendizaje y diseñar una guía personalizada integrando estilos, estrategias y herramientas.',
        },
        content: {
            type: 'text_reflection_points',
            text: 'No hay una fórmula única para el éxito académico. Reflexiona sobre tus momentos de mayor concentración, tus horarios más productivos y las estrategias que mejor te han funcionado. Combina tu estilo de aprendizaje, tus herramientas preferidas y tu planificación para crear una "Guía del Estudiante Autónomo" que sea verdaderamente tuya.',
            reflectionPoints: [ // Example structure
                "¿En qué momentos del día te concentras mejor?",
                "¿Qué tipo de descansos te ayudan a recargar energías?",
                "¿Prefieres estudiar solo o acompañado en ciertas tareas?",
                "¿Qué herramientas digitales se han vuelto indispensables para ti?"
            ]
        },
        activity: {
            type: 'guide_creation',
            description: 'Utilizando la plantilla proporcionada, elabora tu "Guía del Estudiante Autónomo". Incluye tu estilo, tus 3-5 estrategias favoritas, tu horario ideal y las herramientas que usarás.',
            toolSuggestion: 'Descarga y edita la plantilla.',
            feedback: 'Revisa tu guía. ¿Es flexible? ¿Refleja tus necesidades y preferencias? ¡Este es tu mapa personal para aprender con propósito!',
        },
        resource: {
            name: 'Plantilla_Guia_Autonoma.pdf',
            url: '/downloads/plantilla_guia_autonoma.pdf', // Link to the personalized guide template
        },
        closure: '¡Felicidades! Has completado tu recorrido. ¿Qué es lo más valioso que te llevas de EduSmart para tu vida universitaria?',
    },
};

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;
  const [currentModule, setCurrentModule] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('introduction');

  useEffect(() => {
    const data = moduleData[moduleId];
    if (data) {
      setCurrentModule(data);
      setActiveTab('introduction'); // Reset tab on module change
    } else {
       router.push('/modules');
    }
  }, [moduleId, router]);

  if (!currentModule) {
    return <div className="container mx-auto px-4 py-8 text-center">Cargando módulo...</div>;
  }

  const moduleIds = Object.keys(moduleData);
  const currentModuleIndex = moduleIds.indexOf(moduleId);
  const nextModuleId = currentModuleIndex < moduleIds.length - 1 ? moduleIds[currentModuleIndex + 1] : null;
  const prevModuleId = currentModuleIndex > 0 ? moduleIds[currentModuleIndex - 1] : null;

  const handleNext = () => {
    console.log(`Module ${moduleId} potentially completed.`);
    if (nextModuleId) {
      router.push(`/modules/${nextModuleId}`);
    } else {
        router.push('/progress');
    }
  };

  const handlePrev = () => {
     if (prevModuleId) {
       router.push(`/modules/${prevModuleId}`);
     }
   };


  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Button variant="outline" onClick={() => router.push('/modules')} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a Módulos
      </Button>

      <Card className="overflow-hidden shadow-md">
        <CardHeader className="bg-muted/50">
          <CardTitle className="font-poppins text-2xl text-primary">{currentModule.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="introduction" value={activeTab} onValueChange={setActiveTab} className="w-full">
             {/* Updated TabsList for better semantics and icons */}
            <TabsList className="grid w-full grid-cols-5 rounded-none border-b">
               <TabsTrigger value="introduction"><Play className="mr-1 h-4 w-4" /> Introducción</TabsTrigger>
               <TabsTrigger value="objective"><Target className="mr-1 h-4 w-4" /> Objetivo</TabsTrigger>
               <TabsTrigger value="content"><BookOpen className="mr-1 h-4 w-4" /> Contenido</TabsTrigger>
               <TabsTrigger value="activity"><Activity className="mr-1 h-4 w-4" /> Actividad</TabsTrigger>
               <TabsTrigger value="closure"><Lightbulb className="mr-1 h-4 w-4" /> Cierre</TabsTrigger>
             </TabsList>

            {/* Introduction Tab */}
            <TabsContent value="introduction" className="p-6 space-y-4">
              <h3 className="font-poppins text-xl font-semibold text-secondary">Introducción</h3>
              <p className="font-open-sans text-foreground">{currentModule.introduction.text}</p>
               {/* Optional Video */}
               {currentModule.introduction.videoUrl && (
                 <div className="aspect-video overflow-hidden rounded-lg border">
                   <iframe width="100%" height="100%" src={currentModule.introduction.videoUrl} title="Introducción Video" allowFullScreen></iframe>
                 </div>
               )}
            </TabsContent>

             {/* Objective Tab */}
             <TabsContent value="objective" className="p-6 space-y-4">
               <h3 className="font-poppins text-xl font-semibold text-secondary">Objetivo del Módulo</h3>
               <p className="font-open-sans text-muted-foreground">{currentModule.introduction.objective}</p>
             </TabsContent>


            {/* Content Tab */}
            <TabsContent value="content" className="p-6 space-y-4">
              <h3 className="font-poppins text-xl font-semibold text-secondary">Contenido Principal</h3>
              {currentModule.content.text && (
                 <p className="font-open-sans whitespace-pre-line text-foreground">{currentModule.content.text}</p>
              )}
               {/* Handle different content types */}
               {currentModule.content.type === 'text_infographic' && currentModule.content.infographicUrl && (
                 <Image src={currentModule.content.infographicUrl} alt="Infografía del módulo" width={800} height={400} className="rounded-lg border mt-4" />
               )}
               {currentModule.content.type === 'text_examples' && currentModule.content.examples?.map((ex: any, idx: number) => (
                   <div key={idx} className="mt-4">
                       <h4 className="font-poppins font-medium text-primary mb-2">{ex.title}</h4>
                       <Image src={ex.imageUrl} alt={ex.title} width={400} height={200} className="rounded-lg border" />
                   </div>
               ))}
                {currentModule.content.type === 'text_steps' && (
                     <div className="mt-4 space-y-2">
                        {/* Placeholder for steps or visual guide */}
                        <p className="font-open-sans text-sm text-muted-foreground italic"> (Aquí iría una guía paso a paso visual o enlaces a tutoriales) </p>
                    </div>
                )}
                {currentModule.content.type === 'text_reflection_points' && currentModule.content.reflectionPoints && (
                     <div className="mt-4 space-y-2 rounded-md border p-4 bg-muted/30">
                         <h4 className="font-poppins font-medium text-primary mb-2">Puntos para Reflexionar:</h4>
                         <ul className="list-disc list-inside space-y-1 font-open-sans text-sm text-muted-foreground">
                         {currentModule.content.reflectionPoints.map((point: string, idx: number) => (
                             <li key={idx}>{point}</li>
                         ))}
                         </ul>
                     </div>
                 )}
                {/* Add more content type handlers as needed */}
            </TabsContent>


            {/* Activity Tab */}
            <TabsContent value="activity" className="p-6 space-y-4">
              <h3 className="font-poppins text-xl font-semibold text-secondary">Actividad Práctica</h3>
              {currentModule.activity ? (
                 <>
                   <p className="font-open-sans text-foreground">{currentModule.activity.description}</p>
                   {currentModule.activity.toolSuggestion && (
                       <p className="font-open-sans text-sm text-muted-foreground">Herramienta sugerida: {currentModule.activity.toolSuggestion}</p>
                   )}
                   {/* Link to external tool or downloadable resource */}
                   {currentModule.activity.toolUrl && (
                      <Button asChild variant="outline" size="sm">
                         <a href={currentModule.activity.toolUrl} target="_blank" rel="noopener noreferrer">
                            <CheckSquare className="mr-2 h-4 w-4" /> Acceder Herramienta / Test
                         </a>
                      </Button>
                   )}
                    {/* Downloadable resource related to activity */}
                    {currentModule.resource && (
                        <Button asChild variant="outline" size="sm">
                        <a href={currentModule.resource.url} download={currentModule.resource.name}>
                            <FileDown className="mr-2 h-4 w-4" /> Descargar {currentModule.resource.name}
                        </a>
                        </Button>
                    )}

                   {/* Feedback/Reflection prompt */}
                   {currentModule.activity.feedback && (
                       <div className="mt-4 rounded-md border p-3 bg-accent/10">
                           <p className="font-open-sans text-sm font-medium text-accent-foreground">{currentModule.activity.feedback}</p>
                       </div>
                   )}
                 </>
              ) : (
                 <p className="font-open-sans text-muted-foreground">No hay actividad específica para este módulo.</p>
              )}
            </TabsContent>

            {/* Closure Tab */}
            <TabsContent value="closure" className="p-6 space-y-4">
                <h3 className="font-poppins text-xl font-semibold text-secondary">Cierre y Reflexión</h3>
                <p className="font-open-sans text-foreground">{currentModule.closure}</p>

                <Separator className="my-6" />

                {/* Navigation Buttons within the last tab */}
                <div className="flex justify-between pt-2">
                 <Button variant="outline" onClick={handlePrev} disabled={!prevModuleId}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Módulo Anterior
                  </Button>
                  <Button onClick={handleNext}>
                    {nextModuleId ? 'Siguiente Módulo' : 'Ver Progreso Final'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
            </TabsContent>


          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
