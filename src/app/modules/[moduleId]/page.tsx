'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea'; // Import Textarea
import { Label } from '@/components/ui/label'; // Import Label
import { Download, FileText, Play, CheckSquare, ArrowLeft, ArrowRight, Target, BookOpen, Activity, Lightbulb, FileDown, MessageSquare, Video, Image as ImageIcon, ListChecks } from 'lucide-react'; // Added more icons
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

// Mock data - Refined structure based on new prompt ideas
const moduleData: { [key: string]: any } = {
  '1': {
    title: 'Módulo 1: Smart Learner',
    introduction: {
      text: '¿Sabías que no todos aprendemos de la misma forma? Este módulo te ayudará a conocerte mejor como estudiante y a descubrir las claves para un aprendizaje más efectivo y adaptado a ti.',
      objective: 'Identificar el estilo de aprendizaje predominante y relacionarlo con estrategias eficaces.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_video_id_1', // Example placeholder
      quote: '“Conócete a ti mismo y conocerás el universo y a los dioses.” - Sócrates (adaptado)',
    },
    contents: [ // Array for multiple content blocks
        {
            id: '1-1',
            title: 'Modelos de Estilos de Aprendizaje',
            type: 'text_infographic',
            text: 'Existen diferentes modelos para entender los estilos de aprendizaje (VARK, Kolb, etc.). Conocer tu preferencia (visual, auditiva, kinestésica, lectura/escritura) te permite seleccionar técnicas que se ajusten mejor a tu forma de procesar la información. Por ejemplo, si eres visual, los mapas mentales y diagramas serán tus grandes aliados.',
            infographicUrl: 'https://picsum.photos/seed/estilos/800/400', // Placeholder
        },
        {
            id: '1-2',
            title: 'Identificando tu Estilo',
            type: 'interactive_quiz',
            description: 'Realiza este breve test para identificar tu estilo de aprendizaje principal.',
            toolUrl: 'https://link.to.your/external/quiz', // Link to external quiz
            feedbackPrompt: '¿El resultado coincide con lo que pensabas?'
        },
    ],
    activity: {
        id: '1-act',
        title: 'Aplicación Práctica',
        type: 'reflection',
        description: 'Basado en el resultado del test y la información del módulo, reflexiona:',
        reflectionPrompt: '¿Cómo puedes usar esta información sobre tu estilo para mejorar tus sesiones de estudio? Menciona 2 estrategias concretas.',
        // saveKey: 'module1_reflection' // Key for potential localStorage saving
    },
    resource: {
        id: '1-res',
        name: 'Ficha_Resumen_Estilos.pdf',
        url: '/downloads/ficha_estilos_resumen.pdf', // Example URL
    },
    closure: {
        summary: 'Conocer tu estilo es el primer paso para un aprendizaje más inteligente. ¡Ahora tienes herramientas para elegir mejor!',
        finalReflection: '¿Qué estrategia basada en tu estilo vas a probar primero esta semana?',
    },
  },
   // --- Módulo 2 Data ---
   '2': {
     title: 'Módulo 2: Learning Toolkit',
     introduction: {
       text: 'Tener las herramientas adecuadas marca la diferencia. Aquí explorarás un arsenal de técnicas de estudio para potenciar tu comprensión y memoria.',
       objective: 'Conocer y aplicar diversas estrategias de estudio visuales, escritas y conceptuales.',
       videoUrl: 'https://www.youtube.com/embed/placeholder_video_id_2', // Example placeholder
       quote: '“La organización es la clave del éxito.” - Benjamin Franklin (adaptado)',
     },
     contents: [
       {
         id: '2-1',
         title: 'Estrategias Visuales',
         type: 'text_examples',
         text: 'Los mapas mentales, conceptuales y diagramas de flujo ayudan a visualizar relaciones y estructuras. Son ideales para temas complejos.',
         examples: [
           { title: 'Mapa Mental (Idea Central)', imageUrl: 'https://picsum.photos/seed/mapa/400/200' },
           { title: 'Diagrama de Flujo (Proceso)', imageUrl: 'https://picsum.photos/seed/flujo/400/200' },
         ]
       },
       {
         id: '2-2',
         title: 'Estrategias Escritas',
         type: 'text_examples',
         text: 'Resúmenes, esquemas y fichas de lectura son excelentes para sintetizar información y facilitar el repaso.',
          examples: [
            { title: 'Resumen Cornell', imageUrl: 'https://picsum.photos/seed/cornell/400/200' },
            { title: 'Esquema Numérico', imageUrl: 'https://picsum.photos/seed/esquema/400/200' },
          ]
       },
        {
            id: '2-3',
            title: 'Técnicas Activas',
            type: 'text_only',
            text: 'El método Feynman (explicar con palabras sencillas), la autointerrogación y la práctica distribuida (estudiar en intervalos) mejoran la retención a largo plazo.',
        },
     ],
     activity: {
         id: '2-act',
         title: 'Manos a la Obra',
         type: 'practical_exercise_template',
         description: 'Elige un tema de una de tus asignaturas y aplica dos técnicas diferentes vistas en este módulo (ej. un mapa mental y un resumen Cornell) usando la plantilla.',
         toolSuggestion: 'Puedes usar la plantilla adjunta o herramientas digitales como Miro o Canva.',
         resource: { // Specific resource for activity
             id: '2-act-res',
             name: 'Plantilla_Tecnicas.pdf',
             url: '/downloads/plantilla_tecnicas.pdf',
         },
         // saveKey: 'module2_activity'
     },
     resource: { // General resource for the module (can be same as activity or different)
        id: '2-res',
        name: 'Guia_Rapida_Tecnicas.pdf',
        url: '/downloads/guia_tecnicas.pdf',
     },
     closure: {
       summary: 'Has descubierto un abanico de técnicas. La clave es experimentar y encontrar las que mejor se adaptan a ti y al material.',
       finalReflection: '¿Cuál de estas herramientas crees que incorporarás más a menudo a tu rutina de estudio?',
     },
   },
   // --- Módulo 3 Data ---
   '3': {
       title: 'Módulo 3: Mi Ruta Self-Learning',
       introduction: {
           text: 'La autonomía requiere planificación. En este módulo, aprenderás a diseñar tu propio camino de aprendizaje estableciendo metas claras y utilizando herramientas digitales para mantenerte organizado.',
           objective: 'Crear un plan de estudio personalizado estableciendo metas SMART y seleccionando herramientas digitales de apoyo.',
           videoUrl: 'https://www.youtube.com/embed/placeholder_video_id_3',
           quote: '“Un objetivo sin un plan es solo un deseo.” - Antoine de Saint-Exupéry',
       },
       contents: [
           {
               id: '3-1',
               title: 'Definiendo Metas SMART',
               type: 'text_infographic',
               text: 'Para que tus objetivos sean efectivos, deben ser Específicos, Medibles, Alcanzables, Relevantes y con Plazo definido (SMART). Esto te da claridad y te permite seguir tu progreso.',
               infographicUrl: 'https://picsum.photos/seed/smart/800/300',
           },
           {
               id: '3-2',
               title: 'Herramientas de Planificación',
               type: 'text_examples',
               text: 'Utiliza calendarios digitales (Google Calendar, Outlook) para bloquear tiempos de estudio y gestores de tareas (Todoist, Trello, Notion) para desglosar proyectos y asignar fechas límite.',
               examples: [
                    { title: 'Google Calendar', imageUrl: 'https://picsum.photos/seed/gcal/300/150' },
                    { title: 'Trello Board', imageUrl: 'https://picsum.photos/seed/trello/300/150' },
                ]
           },
       ],
       activity: {
           id: '3-act',
           title: 'Crea tu Plan Semanal',
           type: 'planning_template',
           description: 'Descarga la plantilla de plan de estudio semanal y complétala con tus metas académicas y personales para la próxima semana. Define al menos 2 metas SMART.',
           resource: {
               id: '3-act-res',
               name: 'Plantilla_Plan_Semanal.pdf',
               url: '/downloads/plantilla_plan_semanal.pdf',
           },
           reflectionPrompt: '¿Te parece realista tu plan? ¿Qué posibles obstáculos identificas y cómo podrías superarlos?',
           // saveKey: 'module3_plan'
       },
       resource: { // General resource
           id: '3-res',
           name: 'Checklist_Planificacion.pdf',
           url: '/downloads/checklist_planificacion.pdf',
       },
       closure: {
           summary: 'Un buen plan es tu mapa hacia el éxito. Recuerda revisarlo y ajustarlo según sea necesario.',
           finalReflection: '¿Cómo te sientes al tener una visión más clara de tus próximas tareas y objetivos?',
       },
   },
    // --- Módulo 4 Data ---
    '4': {
        title: 'Módulo 4: Info-Skills',
        introduction: {
            text: 'En la era de la información, saber buscar, evaluar y organizar fuentes es crucial. Este módulo te dará las claves para convertirte en un detective de la información confiable y útil.',
            objective: 'Desarrollar habilidades para buscar, evaluar la confiabilidad y organizar información académica de manera eficiente.',
            videoUrl: 'https://www.youtube.com/embed/placeholder_video_id_4',
            quote: '“La información es poder, pero la sabiduría es saber cómo usarla.”',
        },
        contents: [
            {
                id: '4-1',
                title: 'Búsqueda Efectiva',
                type: 'text_only',
                text: 'Aprende a usar operadores booleanos (AND, OR, NOT) en bases de datos académicas (Scopus, Web of Science, Google Scholar) y bibliotecas digitales para refinar tus búsquedas y encontrar exactamente lo que necesitas.',
            },
            {
                id: '4-2',
                title: 'Evaluando Fuentes (Criterios CRAAP)',
                type: 'text_infographic',
                text: 'No toda la información es igual. Usa los criterios CRAAP (Actualidad, Relevancia, Autoridad, Exactitud, Propósito) para evaluar la calidad y confiabilidad de tus fuentes.',
                infographicUrl: 'https://picsum.photos/seed/craap/800/350',
            },
            {
                id: '4-3',
                title: 'Gestores de Referencias',
                type: 'text_examples',
                text: 'Herramientas como Zotero, Mendeley o EndNote te ayudan a organizar tus referencias bibliográficas, generar citas y bibliografías automáticamente en diferentes estilos (APA, MLA, etc.).',
                 examples: [
                    { title: 'Zotero Interface', imageUrl: 'https://picsum.photos/seed/zotero/300/150' },
                    { title: 'Mendeley Library', imageUrl: 'https://picsum.photos/seed/mendeley/300/150' },
                ]
            },
        ],
        activity: {
            id: '4-act',
            title: 'Análisis Crítico',
            type: 'information_evaluation_template',
            description: 'Busca dos artículos sobre un tema académico de tu interés (uno de base de datos, otro de búsqueda general). Evalúa su confiabilidad usando los criterios CRAAP y completa la ficha de lectura crítica adjunta.',
            resource: {
                id: '4-act-res',
                name: 'Ficha_Lectura_Critica.pdf',
                url: '/downloads/ficha_lectura_critica.pdf',
            },
            reflectionPrompt: '¿Qué diferencias significativas encontraste entre las fuentes? ¿Qué criterio fue más útil o difícil de aplicar?',
            // saveKey: 'module4_evaluation'
        },
        resource: { // General resource
            id: '4-res',
            name: 'Guia_Bases_Datos.pdf',
            url: '/downloads/guia_bases_datos.pdf',
        },
        closure: {
            summary: 'Manejar la información de forma crítica y organizada te ahorrará tiempo y mejorará la calidad de tus trabajos.',
            finalReflection: '¿Cómo aplicarás estos criterios de evaluación en tu próxima investigación o tarea?',
        },
    },
     // --- Módulo 5 Data ---
     '5': {
         title: 'Módulo 5: Diversos para aprender',
         introduction: {
             text: 'Cada estudiante es único, con su propio ritmo y preferencias. Este módulo final te invita a integrar todo lo aprendido y a diseñar una guía personalizada que respete tu diversidad como aprendiz.',
             objective: 'Reconocer el propio ritmo de aprendizaje y diseñar una guía personalizada integrando estilos, estrategias y herramientas.',
             videoUrl: 'https://www.youtube.com/embed/placeholder_video_id_5',
             quote: '“El viaje de aprendizaje es personal. Honra tu propio camino.”',
         },
         contents: [
             {
                 id: '5-1',
                 title: 'Reconociendo tu Ritmo',
                 type: 'text_reflection_points',
                 text: 'No hay una fórmula única. Reflexiona sobre tus momentos de mayor concentración, tus horarios más productivos, los tipos de descanso que te revitalizan y si prefieres estudiar solo o acompañado para ciertas tareas.',
                 reflectionPoints: [
                     "¿En qué momentos del día te sientes más enfocado?",
                     "¿Cuánto tiempo puedes mantener la concentración antes de necesitar un descanso?",
                     "¿Qué tipo de descansos (activo, pasivo) te funcionan mejor?",
                     "¿Hay tareas que haces mejor solo/a y otras en grupo?"
                 ]
             },
             {
                 id: '5-2',
                 title: 'Construyendo tu Guía Personal',
                 type: 'text_only',
                 text: 'Ahora, combina todo: tu estilo de aprendizaje (M1), tus técnicas favoritas (M2), tu método de planificación (M3) y tus habilidades de manejo de información (M4). Plasmarlo en una guía te servirá como recordatorio y compromiso.',
             },
         ],
         activity: {
             id: '5-act',
             title: 'Mi Guía del Estudiante Autónomo',
             type: 'guide_creation_template',
             description: 'Utilizando la plantilla proporcionada, elabora tu "Guía del Estudiante Autónomo". Incluye tu estilo, tus 3-5 estrategias preferidas, tu horario ideal de estudio/descanso, las herramientas digitales que usarás y cómo manejarás los desafíos.',
             resource: {
                 id: '5-act-res',
                 name: 'Plantilla_Guia_Autonoma.pdf',
                 url: '/downloads/plantilla_guia_autonoma.pdf',
             },
             reflectionPrompt: 'Revisa tu guía. ¿Es realista y flexible? ¿Refleja genuinamente tus necesidades y preferencias? ¿Qué compromiso haces contigo mismo/a para seguirla?',
            //  saveKey: 'module5_guide'
         },
         resource: { // General resource (can be same as activity)
             id: '5-res',
             name: 'Plantilla_Guia_Autonoma_Final.pdf', // Maybe a slightly different name
             url: '/downloads/plantilla_guia_autonoma.pdf',
         },
         closure: {
             summary: '¡Felicidades! Has completado EduSmart. Ahora tienes un conjunto de herramientas y una mayor conciencia sobre cómo aprender de manera efectiva y autónoma.',
             finalReflection: '¿Qué es lo más valioso que te llevas de este recorrido para tu vida universitaria y más allá?',
         },
     },
};

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;
  const [currentModule, setCurrentModule] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('introduction');
  const [reflectionText, setReflectionText] = useState(''); // State for textarea


  useEffect(() => {
    const data = moduleData[moduleId];
    if (data) {
      setCurrentModule(data);
      setActiveTab('introduction'); // Reset tab on module change
       // Potential: Load saved reflection from localStorage
       // const savedReflection = localStorage.getItem(data.activity?.saveKey || '');
       // if (savedReflection) setReflectionText(savedReflection);
       // else setReflectionText('');
       setReflectionText(''); // Reset reflection text for now
    } else {
       router.push('/modules'); // Redirect if module ID is invalid
    }
  }, [moduleId, router]);

  // Potential: Save reflection to localStorage on change
   // useEffect(() => {
   //   if (currentModule?.activity?.saveKey) {
   //     localStorage.setItem(currentModule.activity.saveKey, reflectionText);
   //   }
   // }, [reflectionText, currentModule]);

  if (!currentModule) {
    return <div className="container mx-auto px-4 py-8 text-center font-open-sans text-muted-foreground">Cargando módulo...</div>;
  }

  const moduleIds = Object.keys(moduleData);
  const currentModuleIndex = moduleIds.indexOf(moduleId);
  const nextModuleId = currentModuleIndex < moduleIds.length - 1 ? moduleIds[currentModuleIndex + 1] : null;
  const prevModuleId = currentModuleIndex > 0 ? moduleIds[currentModuleIndex - 1] : null;

  // Function to mark module as complete (example, replace with actual logic)
  const handleMarkComplete = () => {
    console.log(`Module ${moduleId} marked as complete.`);
    // Potential: Update progress in localStorage or state management
    // localStorage.setItem(`module_${moduleId}_status`, 'completed');
    if (nextModuleId) {
        router.push(`/modules/${nextModuleId}`);
      } else {
        router.push('/progress'); // Go to progress page if it's the last module
      }
  };

  const handleNext = () => {
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

   const renderContentBlock = (content: any) => {
     switch (content.type) {
       case 'text_infographic':
         return (
           <div key={content.id} className="mb-6 p-4 border rounded-lg bg-card">
             <h4 className="font-poppins text-lg font-semibold text-secondary mb-2">{content.title}</h4>
             <p className="font-open-sans whitespace-pre-line text-foreground mb-4">{content.text}</p>
             {content.infographicUrl && (
               <Image src={content.infographicUrl} alt={`Infografía: ${content.title}`} width={800} height={400} className="rounded-md border" />
             )}
           </div>
         );
       case 'text_examples':
         return (
           <div key={content.id} className="mb-6 p-4 border rounded-lg bg-card">
              <h4 className="font-poppins text-lg font-semibold text-secondary mb-2">{content.title}</h4>
             <p className="font-open-sans whitespace-pre-line text-foreground mb-4">{content.text}</p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {content.examples?.map((ex: any, idx: number) => (
                 <div key={idx} className="text-center">
                    <Image src={ex.imageUrl} alt={ex.title} width={300} height={150} className="rounded-md border mx-auto mb-1" />
                    <p className="font-open-sans text-sm text-muted-foreground">{ex.title}</p>
                 </div>
               ))}
             </div>
           </div>
         );
        case 'interactive_quiz':
            return (
               <div key={content.id} className="mb-6 p-4 border rounded-lg bg-card">
                 <h4 className="font-poppins text-lg font-semibold text-secondary mb-2">{content.title}</h4>
                 <p className="font-open-sans text-foreground mb-3">{content.description}</p>
                 <Button asChild variant="outline" size="sm">
                    <a href={content.toolUrl} target="_blank" rel="noopener noreferrer">
                        <ListChecks className="mr-2 h-4 w-4" /> Realizar Test
                    </a>
                 </Button>
                 {content.feedbackPrompt && <p className="font-open-sans text-sm text-muted-foreground mt-3 italic">{content.feedbackPrompt}</p>}
               </div>
            );
        case 'text_only':
            return (
               <div key={content.id} className="mb-6 p-4 border rounded-lg bg-card">
                 <h4 className="font-poppins text-lg font-semibold text-secondary mb-2">{content.title}</h4>
                 <p className="font-open-sans whitespace-pre-line text-foreground">{content.text}</p>
               </div>
            );
         case 'text_reflection_points':
              return (
                 <div key={content.id} className="mb-6 p-4 border rounded-lg bg-card">
                     <h4 className="font-poppins text-lg font-semibold text-secondary mb-2">{content.title}</h4>
                     <p className="font-open-sans text-foreground mb-3">{content.text}</p>
                     <ul className="list-disc list-inside space-y-1 font-open-sans text-sm text-muted-foreground pl-4">
                         {content.reflectionPoints.map((point: string, idx: number) => (
                             <li key={idx}>{point}</li>
                         ))}
                     </ul>
                 </div>
              );
       default:
         return null;
     }
   };

   const renderActivityBlock = (activity: any) => {
     if (!activity) return <p className="font-open-sans text-muted-foreground">No hay actividad específica para este módulo.</p>;

     return (
       <div className="space-y-4">
         <h4 className="font-poppins text-lg font-semibold text-secondary">{activity.title}</h4>
         <p className="font-open-sans text-foreground">{activity.description}</p>

          {/* Specific Activity Types */}
         {activity.type === 'reflection' && (
            <div className="space-y-2">
               <Label htmlFor="reflection-area" className="font-open-sans text-sm font-medium text-primary">{activity.reflectionPrompt}</Label>
               <Textarea
                 id="reflection-area"
                 placeholder="Escribe tu reflexión aquí..."
                 value={reflectionText}
                 onChange={(e) => setReflectionText(e.target.value)}
                 rows={5}
                 className="bg-background"
               />
                 {/* Optional: Button to save reflection */}
                 {/* <Button size="sm" variant="outline" onClick={() => alert('Reflexión guardada (simulación)')}>Guardar Reflexión</Button> */}
             </div>
         )}

         {activity.type === 'practical_exercise_template' && (
           <>
             {activity.toolSuggestion && (
               <p className="font-open-sans text-sm text-muted-foreground">Sugerencia: {activity.toolSuggestion}</p>
             )}
             {activity.resource && (
               <Button asChild variant="outline" size="sm">
                 <a href={activity.resource.url} download={activity.resource.name}>
                   <FileDown className="mr-2 h-4 w-4" /> Descargar {activity.resource.name}
                 </a>
               </Button>
             )}
           </>
         )}

          {(activity.type === 'planning_template' || activity.type === 'information_evaluation_template' || activity.type === 'guide_creation_template') && activity.resource && (
             <>
                <Button asChild variant="outline" size="sm">
                    <a href={activity.resource.url} download={activity.resource.name}>
                      <FileDown className="mr-2 h-4 w-4" /> Descargar {activity.resource.name}
                    </a>
                </Button>
                {activity.reflectionPrompt &&
                    <div className="mt-4 space-y-2 p-3 border rounded-md bg-accent/10">
                        <Label htmlFor="reflection-area-activity" className="font-open-sans text-sm font-medium text-accent-foreground">{activity.reflectionPrompt}</Label>
                        <Textarea
                            id="reflection-area-activity"
                            placeholder="Escribe tu reflexión aquí..."
                            value={reflectionText}
                            onChange={(e) => setReflectionText(e.target.value)}
                            rows={4}
                            className="bg-white" // Use white bg for better contrast inside accent bg
                        />
                     </div>
                }
             </>
         )}

         {/* General Resource Download (if different from activity resource) */}
         {currentModule.resource && (!activity.resource || currentModule.resource.id !== activity.resource.id) && (
             <div className="pt-4">
                 <h5 className="font-poppins text-md font-medium text-primary mb-2">Recurso Adicional del Módulo:</h5>
                 <Button asChild variant="link" size="sm" className="p-0 h-auto">
                     <a href={currentModule.resource.url} download={currentModule.resource.name}>
                         <Download className="mr-1 h-3 w-3" /> {currentModule.resource.name}
                     </a>
                 </Button>
             </div>
         )}
       </div>
     );
   };


  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Button variant="outline" size="sm" onClick={() => router.push('/modules')} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a Módulos
      </Button>

      <Card className="overflow-hidden shadow-lg border-primary/10">
        <CardHeader className="bg-gradient-to-r from-primary/80 to-secondary/80 text-primary-foreground p-6">
          <CardTitle className="font-poppins text-3xl font-bold">{currentModule.title}</CardTitle>
           {currentModule.introduction.objective && (
              <CardDescription className="font-open-sans text-primary-foreground/80 pt-1">
                <Target className="inline-block h-4 w-4 mr-1" /> {currentModule.introduction.objective}
              </CardDescription>
           )}
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="introduction" value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tabs List with Icons */}
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 rounded-none border-b bg-muted/50 h-auto py-1">
               <TabsTrigger value="introduction" className="text-xs sm:text-sm"><Play className="mr-1 h-4 w-4" /> Introducción</TabsTrigger>
               <TabsTrigger value="content" className="text-xs sm:text-sm"><BookOpen className="mr-1 h-4 w-4" /> Contenidos</TabsTrigger>
               <TabsTrigger value="activity" className="text-xs sm:text-sm"><Activity className="mr-1 h-4 w-4" /> Actividad</TabsTrigger>
               <TabsTrigger value="closure" className="text-xs sm:text-sm"><Lightbulb className="mr-1 h-4 w-4" /> Cierre</TabsTrigger>
             </TabsList>

            {/* Introduction Tab */}
            <TabsContent value="introduction" className="p-6 space-y-5">
              {/* <h3 className="font-poppins text-xl font-semibold text-secondary">Bienvenida</h3> */}
              <p className="font-open-sans text-foreground text-base">{currentModule.introduction.text}</p>
               {currentModule.introduction.quote && (
                  <blockquote className="font-poppins border-l-4 border-secondary pl-4 italic text-muted-foreground text-sm">
                      {currentModule.introduction.quote}
                  </blockquote>
               )}
               {currentModule.introduction.videoUrl && (
                 <div className="aspect-video overflow-hidden rounded-lg border shadow-md">
                   <iframe
                     width="100%"
                     height="100%"
                     src={currentModule.introduction.videoUrl.replace('watch?v=', 'embed/')} // Ensure embed URL
                     title="Video Introductorio"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen>
                    </iframe>
                 </div>
               )}
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="p-6 space-y-6 bg-muted/20">
              <h3 className="font-poppins text-xl font-semibold text-secondary mb-4">Explora los Contenidos</h3>
               {currentModule.contents?.map((content: any) => renderContentBlock(content))}
               {!currentModule.contents?.length && (
                    <p className="font-open-sans text-muted-foreground">No hay contenidos específicos definidos para este módulo.</p>
               )}
            </TabsContent>


            {/* Activity Tab */}
            <TabsContent value="activity" className="p-6 space-y-5">
                <h3 className="font-poppins text-xl font-semibold text-secondary mb-4">Ponlo en Práctica</h3>
                {renderActivityBlock(currentModule.activity)}
            </TabsContent>


            {/* Closure Tab */}
            <TabsContent value="closure" className="p-6 space-y-5">
                <h3 className="font-poppins text-xl font-semibold text-secondary">Cierre del Módulo</h3>
                {currentModule.closure.summary && (
                    <p className="font-open-sans text-foreground">{currentModule.closure.summary}</p>
                )}
                 {currentModule.closure.finalReflection && (
                   <div className="mt-4 rounded-md border p-4 bg-accent/10 space-y-2">
                        <Label htmlFor="final-reflection-area" className="font-open-sans text-sm font-medium text-accent-foreground">{currentModule.closure.finalReflection}</Label>
                        <Textarea
                         id="final-reflection-area"
                         placeholder="Tu reflexión final..."
                         rows={3}
                         className="bg-white"
                         // Potentially link this to the same state as activity reflection or a new one
                       />
                    </div>
                 )}

                <Separator className="my-6" />

                {/* Navigation and Completion Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
                    <Button variant="outline" onClick={handlePrev} disabled={!prevModuleId} className="w-full sm:w-auto">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Módulo Anterior
                    </Button>
                    {/* Changed logic: Always show "Mark Complete" on last tab */}
                    <Button onClick={handleMarkComplete} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white">
                         <CheckSquare className="mr-2 h-4 w-4" />
                         Marcar como Completado {nextModuleId ? "& Siguiente" : "& Ver Progreso"}
                     </Button>
                     {/* Conditionally show "Next Module" if not completing */}
                     {/* {nextModuleId && (
                         <Button onClick={handleNext} className="w-full sm:w-auto">
                            Siguiente Módulo
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                     )} */}
                </div>
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
```