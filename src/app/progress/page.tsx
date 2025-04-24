'use client'; // Needed for potential localStorage access or client-side chart rendering

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle, CircleDashed, Download, Award } from 'lucide-react';
import Link from 'next/link';

// Mock data - replace with actual progress fetching (e.g., from localStorage or API)
const initialModulesStatus = [
  { id: '1', title: 'Módulo 1: Introducción a la IA', completed: true },
  { id: '2', title: 'Módulo 2: Aprendizaje Automático', completed: true },
  { id: '3', title: 'Módulo 3: Redes Neuronales', completed: false },
  { id: '4', title: 'Módulo 4: Procesamiento del Lenguaje Natural', completed: false },
  { id: '5', title: 'Módulo 5: Ética en la IA', completed: false },
];

export default function ProgressPage() {
  const [modulesStatus, setModulesStatus] = useState(initialModulesStatus);

  // Simulate fetching progress data on component mount
   useEffect(() => {
     // Replace this with actual logic to get progress
     // Example: const savedProgress = JSON.parse(localStorage.getItem('eduSmartProgress') || 'null');
     // if (savedProgress) setModulesStatus(savedProgress);
     console.log("Fetching or setting initial progress...");
   }, []);


  const completedModules = modulesStatus.filter(m => m.completed).length;
  const totalModules = modulesStatus.length;
  const progressPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
  const allModulesCompleted = completedModules === totalModules;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="font-poppins mb-8 text-3xl font-bold text-secondary md:text-4xl">
        Mi Progreso
      </h1>

      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle className="font-poppins text-xl text-primary">Resumen General</CardTitle>
          <CardDescription className="font-open-sans">
            Has completado {completedModules} de {totalModules} módulos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Progress value={progressPercentage} className="w-full h-3" />
            <span className="font-poppins font-semibold text-lg text-primary">{progressPercentage}%</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
         <CardHeader>
           <CardTitle className="font-poppins text-xl text-primary">Estado de los Módulos</CardTitle>
         </CardHeader>
         <CardContent>
           <ul className="space-y-4">
             {modulesStatus.map((module) => (
               <li key={module.id} className="flex items-center justify-between rounded-md border p-4">
                  <div className="flex items-center gap-3">
                     {module.completed ? (
                       <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                     ) : (
                       <CircleDashed className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                     )}
                     <span className={`font-open-sans ${module.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                       {module.title}
                     </span>
                  </div>
                  {!module.completed && (
                      <Button variant="link" size="sm" asChild>
                         <Link href={`/modules/${module.id}`}>Continuar</Link>
                       </Button>
                  )}
               </li>
             ))}
           </ul>
         </CardContent>
         {allModulesCompleted && (
            <CardContent className="border-t pt-6 text-center">
                 <Award className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
                 <h3 className="font-poppins text-lg font-semibold text-primary mb-2">¡Felicidades!</h3>
                 <p className="font-open-sans text-muted-foreground mb-4">Has completado todos los módulos del OVA EduSmart.</p>
                 <Button>
                   <Download className="mr-2 h-4 w-4" />
                   Descargar Certificado / Bitácora
                 </Button>
            </CardContent>
         )}
      </Card>
    </div>
  );
}
