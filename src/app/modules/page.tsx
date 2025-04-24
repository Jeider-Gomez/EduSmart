import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, PlayCircle, CircleDashed } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for modules - replace with actual data fetching later
const modules = [
  { id: '1', title: 'Módulo 1: Introducción a la IA', description: 'Conceptos básicos y aplicaciones de la Inteligencia Artificial.', status: 'completed', icon: '🧠' },
  { id: '2', title: 'Módulo 2: Aprendizaje Automático', description: 'Explora los algoritmos y técnicas fundamentales del Machine Learning.', status: 'in_progress', icon: '⚙️' },
  { id: '3', title: 'Módulo 3: Redes Neuronales', description: 'Sumérgete en el mundo del Deep Learning y las redes neuronales.', status: 'not_started', icon: '🕸️' },
  { id: '4', title: 'Módulo 4: Procesamiento del Lenguaje Natural', description: 'Comprende cómo las máquinas procesan y entienden el lenguaje humano.', status: 'not_started', icon: '🗣️' },
  { id: '5', title: 'Módulo 5: Ética en la IA', description: 'Reflexiona sobre los desafíos éticos y sociales de la IA.', status: 'not_started', icon: '⚖️' },
];

const getStatusInfo = (status: string) => {
  switch (status) {
    case 'completed':
      return { label: 'Completado', icon: <CheckCircle className="h-4 w-4 text-green-600" />, color: 'bg-green-100 text-green-800' };
    case 'in_progress':
      return { label: 'En Progreso', icon: <PlayCircle className="h-4 w-4 text-yellow-600" />, color: 'bg-yellow-100 text-yellow-800' };
    default:
      return { label: 'No Iniciado', icon: <CircleDashed className="h-4 w-4 text-gray-500" />, color: 'bg-gray-100 text-gray-800' };
  }
};

export default function ModulesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="font-poppins mb-8 text-3xl font-bold text-secondary md:text-4xl">
        Módulos Disponibles
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => {
          const statusInfo = getStatusInfo(module.status);
          const buttonLabel = module.status === 'not_started' ? 'Empezar' : 'Continuar';
          const buttonIcon = module.status === 'not_started' ? <PlayCircle className="mr-2 h-4 w-4" /> : <PlayCircle className="mr-2 h-4 w-4" />;

          return (
            <Card key={module.id} className="flex flex-col justify-between overflow-hidden shadow-sm transition-shadow hover:shadow-lg">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
                 <div className="text-4xl">{module.icon}</div>
                 <div className="flex-1 space-y-1">
                   <CardTitle className="font-poppins text-lg text-primary">{module.title}</CardTitle>
                   <CardDescription className="font-open-sans text-sm text-muted-foreground">{module.description}</CardDescription>
                 </div>
              </CardHeader>
              <CardContent className="flex-grow">
                {/* Content if needed, e.g., estimated time */}
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4 pt-4">
                <Badge variant="outline" className={`flex items-center gap-1.5 ${statusInfo.color} border-none`}>
                  {statusInfo.icon}
                  {statusInfo.label}
                </Badge>
                <Button asChild className="w-full rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <Link href={`/modules/${module.id}`}>
                    {buttonIcon}
                    {buttonLabel}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
