'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, Play, CheckSquare, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';

// Mock data - replace with actual data fetching based on moduleId
const moduleData: { [key: string]: any } = {
  '1': {
    title: 'Módulo 1: Introducción a la IA',
    introduction: {
      objective: 'Comprender los conceptos fundamentales de la Inteligencia Artificial y sus principales áreas de aplicación en el mundo actual.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Example video
    },
    content: {
      type: 'text_infographic', // or 'video', 'activity'
      text: 'La Inteligencia Artificial (IA) es un campo de la informática que se enfoca en la creación de sistemas capaces de realizar tareas que típicamente requieren inteligencia humana. Esto incluye el aprendizaje, la resolución de problemas, la percepción, el razonamiento y la toma de decisiones. \n\nÁreas clave: \n- Machine Learning\n- Deep Learning\n- Procesamiento del Lenguaje Natural\n- Visión por Computadora',
      infographicUrl: 'https://picsum.photos/seed/infographic1/800/400',
    },
    resource: {
      name: 'Glosario de Términos de IA.pdf',
      url: '/downloads/glosario_ia.pdf', // Placeholder path
    },
    activity: {
      type: 'quiz', // or 'practical_exercise'
      description: 'Pon a prueba tus conocimientos sobre los conceptos básicos de IA.',
      questions: [
        { q: '¿Qué es la IA?', a: 'Un campo de la informática...' },
        { q: 'Nombra un área de la IA', a: 'Machine Learning' },
      ] // Simplified quiz structure
    },
  },
   '2': {
    title: 'Módulo 2: Aprendizaje Automático',
    introduction: {
        objective: 'Explorar los diferentes tipos de algoritmos de aprendizaje automático y sus casos de uso.',
        videoUrl: 'https://www.youtube.com/embed/ukzFI9rgwfU', // Another example
      },
      content: {
        type: 'video',
        text: 'El Aprendizaje Automático (Machine Learning) es una rama de la IA que permite a los sistemas aprender de los datos sin ser explícitamente programados. Veremos algoritmos supervisados, no supervisados y por refuerzo.',
        videoUrl: 'https://www.youtube.com/embed/aircAruvnKk',
      },
      resource: {
        name: 'Cheat Sheet - Algoritmos ML.png',
        url: '/downloads/ml_cheatsheet.png',
      },
      activity: {
        type: 'practical_exercise',
        description: 'Implementa un modelo simple de regresión lineal (simulado).',
        instructions: 'Sigue los pasos indicados en el notebook adjunto.'
      },
   },
  // Add data for modules 3, 4, 5 similarly
};

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;
  const [currentModule, setCurrentModule] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('introduction');

  useEffect(() => {
    // Fetch module data based on moduleId
    // In this mock setup, we just retrieve from the object
    const data = moduleData[moduleId];
    if (data) {
      setCurrentModule(data);
    } else {
      // Handle module not found, e.g., redirect or show error
       router.push('/modules'); // Redirect back if module doesn't exist
    }
  }, [moduleId, router]);

  if (!currentModule) {
    // Optional: Add a loading state
    return <div className="container mx-auto px-4 py-8 text-center">Cargando módulo...</div>;
  }

  const nextModuleId = parseInt(moduleId) + 1;
  const prevModuleId = parseInt(moduleId) - 1;
  const totalModules = Object.keys(moduleData).length; // Assuming moduleData has all modules

  const handleNext = () => {
    // Logic to mark module as completed (e.g., save to localStorage or DB)
    console.log(`Module ${moduleId} potentially completed.`);
    if (nextModuleId <= totalModules) {
      router.push(`/modules/${nextModuleId}`);
    } else {
        router.push('/progress'); // Go to progress page after last module
    }
  };

  const handlePrev = () => {
     if (prevModuleId >= 1) {
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
          {/* Optional: Progress bar within the module? */}
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="introduction" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 rounded-none border-b">
              <TabsTrigger value="introduction"><Play className="mr-1 h-4 w-4" /> Introducción</TabsTrigger>
              <TabsTrigger value="content"><FileText className="mr-1 h-4 w-4" /> Contenido</TabsTrigger>
              <TabsTrigger value="resource"><Download className="mr-1 h-4 w-4" /> Recurso</TabsTrigger>
              <TabsTrigger value="activity"><CheckSquare className="mr-1 h-4 w-4" /> Actividad</TabsTrigger>
            </TabsList>

            {/* Introduction Tab */}
            <TabsContent value="introduction" className="p-6 space-y-4">
              <h3 className="font-poppins text-xl font-semibold text-secondary">Objetivo del Módulo</h3>
              <p className="font-open-sans text-muted-foreground">{currentModule.introduction.objective}</p>
              {currentModule.introduction.videoUrl && (
                <div className="aspect-video overflow-hidden rounded-lg border">
                  <iframe
                    width="100%"
                    height="100%"
                    src={currentModule.introduction.videoUrl}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="p-6 space-y-4">
              <h3 className="font-poppins text-xl font-semibold text-secondary">Contenido Principal</h3>
              {currentModule.content.text && (
                 <p className="font-open-sans whitespace-pre-line text-foreground">{currentModule.content.text}</p>
              )}
               {currentModule.content.type === 'text_infographic' && currentModule.content.infographicUrl && (
                 <Image src={currentModule.content.infographicUrl} alt="Infografía del módulo" width={800} height={400} className="rounded-lg border" />
               )}
               {currentModule.content.type === 'video' && currentModule.content.videoUrl && (
                  <div className="aspect-video overflow-hidden rounded-lg border">
                    <iframe
                      width="100%"
                      height="100%"
                      src={currentModule.content.videoUrl}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
               )}
            </TabsContent>

            {/* Resource Tab */}
            <TabsContent value="resource" className="p-6 space-y-4">
              <h3 className="font-poppins text-xl font-semibold text-secondary">Recurso Descargable</h3>
              {currentModule.resource ? (
                <Button asChild variant="outline">
                  <a href={currentModule.resource.url} download={currentModule.resource.name}>
                    <Download className="mr-2 h-4 w-4" />
                    Descargar {currentModule.resource.name}
                  </a>
                </Button>
              ) : (
                <p className="font-open-sans text-muted-foreground">No hay recursos descargables para este módulo.</p>
              )}
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="p-6 space-y-4">
              <h3 className="font-poppins text-xl font-semibold text-secondary">Actividad Práctica / Evaluación</h3>
              {currentModule.activity ? (
                 <>
                   <p className="font-open-sans text-muted-foreground">{currentModule.activity.description}</p>
                   {/* Render activity/quiz component here based on type */}
                   {currentModule.activity.type === 'quiz' && (
                     <div className="rounded-md border p-4 space-y-2">
                       <p className="font-medium">Preguntas (Ejemplo):</p>
                       {currentModule.activity.questions.map((q: any, index: number) => (
                          <p key={index} className="text-sm">{index + 1}. {q.q}</p>
                       ))}
                       <Button size="sm">Iniciar Quiz</Button>
                     </div>
                   )}
                    {currentModule.activity.type === 'practical_exercise' && (
                     <div className="rounded-md border p-4 space-y-2">
                       <p className="font-medium">Ejercicio Práctico:</p>
                       <p className="text-sm">{currentModule.activity.instructions}</p>
                       <Button size="sm">Ver Instrucciones</Button>
                     </div>
                   )}
                 </>
              ) : (
                 <p className="font-open-sans text-muted-foreground">No hay actividad para este módulo.</p>
              )}

               {/* Navigation Buttons within the last tab */}
               <div className="mt-8 flex justify-between pt-6 border-t">
                 <Button variant="outline" onClick={handlePrev} disabled={prevModuleId < 1}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Módulo Anterior
                  </Button>
                  <Button onClick={handleNext}>
                    {nextModuleId > totalModules ? 'Ver Progreso' : 'Siguiente Módulo'}
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
