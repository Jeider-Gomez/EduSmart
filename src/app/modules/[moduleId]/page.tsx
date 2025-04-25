
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ModuleClientView from '@/components/modules/ModuleClientView'; // Import the client component

// Mock data - Ensure this is accessible server-side
// Consider moving this to a separate lib/data.ts file if it grows large
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

// Server Component: Fetch data and render basic structure
// REMOVED 'use client' directive. This component MUST be a Server Component.
export default async function ModulePage({ params }: { params: { moduleId: string } }) {
  const moduleId = params.moduleId;
  const currentModule = moduleData[moduleId];

  if (!currentModule) {
    notFound(); // Use Next.js notFound for 404
  }

  // Determine prev/next module IDs on the server
  const moduleIds = Object.keys(moduleData);
  const currentModuleIndex = moduleIds.indexOf(moduleId);
  const nextModuleId = currentModuleIndex < moduleIds.length - 1 ? moduleIds[currentModuleIndex + 1] : null;
  const prevModuleId = currentModuleIndex > 0 ? moduleIds[currentModuleIndex - 1] : null;


  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <Button variant="outline" size="sm" asChild className="mb-6">
            <Link href="/modules">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Módulos
            </Link>
        </Button>
        {/* Pass data to the Client Component */}
        <ModuleClientView
            moduleId={moduleId}
            moduleData={currentModule}
            prevModuleId={prevModuleId}
            nextModuleId={nextModuleId}
        />
    </div>
  );
}

// generateStaticParams should be defined in the Server Component (page.tsx)
export async function generateStaticParams() {
  // Fetch or define your module IDs here
  const paths = Object.keys(moduleData).map((id) => ({
    moduleId: id,
  }));
  return paths;
}

// Optional: Generate metadata server-side
export async function generateMetadata({ params }: { params: { moduleId: string } }): Promise<Metadata> {
  const module = moduleData[params.moduleId];
  return {
    title: module ? `${module.title} | EduSmart` : 'Módulo | EduSmart',
    description: module ? module.introduction.text : 'Detalles del módulo de EduSmart',
  };
}
