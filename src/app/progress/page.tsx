'use client'; // Needed for potential localStorage access or client-side chart rendering

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'; // Added CardFooter
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle, CircleDashed, Download, Award, FileText, CircleDot } from 'lucide-react'; // Added CircleDot for in progress
import Link from 'next/link';

// Mock data - updated module titles based on previous changes
const initialModulesStatus = [
  { id: '1', title: 'Módulo 1: Smart Learner', completed: true },
  { id: '2', title: 'Módulo 2: Learning Toolkit', completed: true },
  { id: '3', title: 'Módulo 3: Mi Ruta Self-Learning', completed: false, inProgress: true }, // Added inProgress state
  { id: '4', title: 'Módulo 4: Info-Skills', completed: false, inProgress: false },
  { id: '5', title: 'Módulo 5: Diversos para aprender', completed: false, inProgress: false },
];

export default function ProgressPage() {
  // Simulate state based on mock data or localStorage
  const [modulesStatus, setModulesStatus] = useState(() => {
    // In a real app, you'd fetch this from localStorage or backend
    // Example localStorage logic (uncomment and adapt):
    /*
    if (typeof window !== 'undefined') {
        const savedProgress = localStorage.getItem('eduSmartProgress');
        if (savedProgress) {
            try {
                const parsedProgress = JSON.parse(savedProgress);
                // Basic validation: Ensure it's an array and has expected keys
                if (Array.isArray(parsedProgress) && parsedProgress.every(m => m.id && m.title && typeof m.completed === 'boolean')) {
                    // Merge with initial data to ensure all modules are present
                     const currentStatus = initialModulesStatus.map(initialModule => {
                        const savedModule = parsedProgress.find(p => p.id === initialModule.id);
                        return savedModule ? { ...initialModule, completed: savedModule.completed, inProgress: savedModule.inProgress ?? false } : initialModule;
                    });
                    return currentStatus;
                }
            } catch (e) {
                console.error("Failed to parse progress from localStorage", e);
            }
        }
    }
    */
    return initialModulesStatus; // Fallback to initial mock data
  });


  const completedModules = modulesStatus.filter(m => m.completed).length;
  const totalModules = modulesStatus.length;
  const progressPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
  const allModulesCompleted = completedModules === totalModules;

  // Function to determine status icon and text
   const getStatusDisplay = (module: typeof initialModulesStatus[0]) => {
     if (module.completed) {
       return { icon: <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" aria-label="Completado"/>, text: 'Completado', color: 'text-green-600' };
     } else if (module.inProgress) {
       return { icon: <CircleDot className="h-5 w-5 text-yellow-600 flex-shrink-0" aria-label="En curso"/>, text: 'En curso', color: 'text-yellow-600' };
     } else {
       return { icon: <CircleDashed className="h-5 w-5 text-muted-foreground flex-shrink-0" aria-label="No iniciado"/>, text: 'No iniciado', color: 'text-muted-foreground' };
     }
   };


  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="font-poppins mb-4 text-3xl font-bold text-secondary md:text-4xl">
        Mi Progreso en EduSmart
      </h1>
       <p className="font-open-sans mb-8 text-lg text-muted-foreground">
           Aquí puedes ver cuánto has avanzado en el OVA y acceder a tu bitácora de aprendizaje personalizada al finalizar todos los módulos.
       </p>

      {/* Progress Summary Card */}
      <Card className="mb-8 shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="font-poppins text-xl text-primary">Resumen de Avance</CardTitle>
          <CardDescription className="font-open-sans">
             Has completado {completedModules} de {totalModules} módulos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
             <Progress value={progressPercentage} className="flex-1 h-3 rounded-full" aria-label={`${progressPercentage}% completado`} />
             <span className="font-poppins font-semibold text-lg text-primary">{progressPercentage}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Module Status List Card */}
      <Card className="shadow-lg border-secondary/20">
         <CardHeader>
           <CardTitle className="font-poppins text-xl text-primary">Estado Detallado por Módulo</CardTitle>
         </CardHeader>
         <CardContent>
           <ul className="space-y-3">
             {modulesStatus.map((module) => {
                const statusDisplay = getStatusDisplay(module);
                return (
                   <li key={module.id} className="flex items-center justify-between rounded-md border p-4 transition-colors hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                         {statusDisplay.icon}
                         <span className={`font-open-sans ${module.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                           {module.title}
                         </span>
                      </div>
                      <div className="flex items-center gap-4">
                         <span className={`text-sm font-medium ${statusDisplay.color}`}>{statusDisplay.text}</span>
                         <Button variant="outline" size="sm" asChild className="px-3 py-1 h-auto">
                           <Link href={`/modules/${module.id}`}>
                                Ver Módulo
                           </Link>
                         </Button>
                      </div>
                   </li>
                );
             })}
           </ul>
         </CardContent>

         {/* Final Section - Shown only when all modules are completed */}
         {allModulesCompleted && (
            <CardFooter className="flex flex-col items-center border-t bg-gradient-to-tr from-green-50 to-blue-50 py-8 px-6 text-center">
                 <Award className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
                 <h3 className="font-poppins text-2xl font-semibold text-primary mb-3">¡Felicidades por completar tu camino con EduSmart!</h3>
                 <p className="font-open-sans text-muted-foreground mb-6 max-w-prose mx-auto">
                     Este documento reúne tus reflexiones, estrategias y planificación. Guárdalo como guía para el resto de tu vida universitaria.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4">
                     {/* Button to download the learning log */}
                     <Button size="lg" onClick={() => alert('Funcionalidad de descarga de Bitácora no implementada.')}>
                       <FileText className="mr-2 h-5 w-5" />
                       Descargar Bitácora
                     </Button>
                     {/* Button to download symbolic certificate */}
                      <Button size="lg" variant="secondary" onClick={() => alert('Funcionalidad de descarga de Certificado no implementada.')}>
                       <Award className="mr-2 h-5 w-5" />
                       Descargar Constancia
                     </Button>
                 </div>
            </CardFooter>
         )}
      </Card>
    </div>
  );
}
