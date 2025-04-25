
'use client'; // THIS COMPONENT MUST BE A CLIENT COMPONENT

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Download, FileText, Play, CheckSquare, ArrowLeft, ArrowRight, Target, BookOpen, Activity, Lightbulb, FileDown, MessageSquare, Video, Image as ImageIcon, ListChecks } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

interface ModuleClientViewProps {
  moduleId: string;
  moduleData: any; // Consider defining a more specific type for moduleData
  prevModuleId: string | null;
  nextModuleId: string | null;
}

export default function ModuleClientView({ moduleId, moduleData: currentModule, prevModuleId, nextModuleId }: ModuleClientViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('introduction');
  const [reflectionText, setReflectionText] = useState(''); // State for textarea
  const [finalReflectionText, setFinalReflectionText] = useState(''); // State for closure reflection

  // Reset state when module changes (if needed, e.g., clearing text areas)
  useEffect(() => {
    setActiveTab('introduction'); // Reset tab on module change
    setReflectionText(''); // Reset reflection text
    setFinalReflectionText('');
     // Potential: Load saved reflection from localStorage
     // const savedReflection = localStorage.getItem(currentModule.activity?.saveKey || `module_${moduleId}_reflection`);
     // if (savedReflection) setReflectionText(savedReflection);
     // const savedFinalReflection = localStorage.getItem(`module_${moduleId}_final_reflection`);
     // if (savedFinalReflection) setFinalReflectionText(savedFinalReflection);
  }, [moduleId]); // Removed currentModule dependency as it's passed as prop now


  // Potential: Save reflections to localStorage on change
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //      localStorage.setItem(`module_${moduleId}_reflection`, reflectionText);
  //   }
  // }, [reflectionText, moduleId]);

  // useEffect(() => {
  //     if (typeof window !== 'undefined') {
  //       localStorage.setItem(`module_${moduleId}_final_reflection`, finalReflectionText);
  //     }
  //   }, [finalReflectionText, moduleId]);

  // Function to mark module as complete (example, replace with actual logic)
  const handleMarkComplete = () => {
    console.log(`Module ${moduleId} marked as complete.`);
    // Potential: Update progress in localStorage or state management
    // if (typeof window !== 'undefined') {
    //   // More robust progress update: Store an object/array of module statuses
    //   const progressKey = 'eduSmartProgress';
    //   let progress: any[] = [];
    //   try {
    //     const saved = localStorage.getItem(progressKey);
    //     progress = saved ? JSON.parse(saved) : [];
    //     if (!Array.isArray(progress)) progress = []; // Ensure it's an array
    //   } catch {
    //     progress = []; // Reset if parsing fails
    //   }
    //   const moduleIndex = progress.findIndex(m => m.id === moduleId);
    //   if (moduleIndex > -1) {
    //     progress[moduleIndex].completed = true;
    //     progress[moduleIndex].inProgress = false; // Mark as not in progress anymore
    //   } else {
    //     // Find the corresponding title from moduleData (or pass module list if needed)
    //     const title = currentModule.title; // Assuming currentModule is available
    //     progress.push({ id: moduleId, title: title, completed: true, inProgress: false });
    //   }
    //   localStorage.setItem(progressKey, JSON.stringify(progress));
    // }

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
                // Note: Using unoptimized prop for picsum photos based on config
               <Image src={content.infographicUrl} alt={`Infografía: ${content.title}`} width={800} height={400} className="rounded-md border" unoptimized/>
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
                     {/* Note: Using unoptimized prop for picsum photos based on config */}
                    <Image src={ex.imageUrl} alt={ex.title} width={300} height={150} className="rounded-md border mx-auto mb-1" unoptimized/>
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
                            value={reflectionText} // Link to the main reflection state for simplicity, or create a new one
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
                         value={finalReflectionText}
                         onChange={(e) => setFinalReflectionText(e.target.value)}
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
                    <Button onClick={handleMarkComplete} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white">
                         <CheckSquare className="mr-2 h-4 w-4" />
                         Marcar como Completado {nextModuleId ? "& Siguiente" : "& Ver Progreso"}
                     </Button>
                </div>
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>
  );
}
