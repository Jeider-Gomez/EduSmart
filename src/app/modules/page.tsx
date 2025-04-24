import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, PlayCircle, CircleDashed, Brain, Wrench, Route, Info, Users } from 'lucide-react'; // Updated icons
import { Badge } from '@/components/ui/badge';

// Updated module data based on the prompt
const modules = [
  { id: '1', title: 'Módulo 1: Smart Learner', description: 'Descubre tu estilo de aprendizaje y lo que eso dice sobre tu forma de estudiar.', status: 'completed', icon: <Brain className="h-8 w-8 text-primary" /> },
  { id: '2', title: 'Módulo 2: Learning Toolkit', description: 'Explora estrategias y técnicas de estudio visuales, escritas y conceptuales.', status: 'in_progress', icon: <Wrench className="h-8 w-8 text-secondary" /> },
  { id: '3', title: 'Módulo 3: Mi Ruta Self-Learning', description: 'Crea tu propio plan de estudio con metas claras y herramientas digitales.', status: 'not_started', icon: <Route className="h-8 w-8 text-accent" /> },
  { id: '4', title: 'Módulo 4: Info-Skills', description: 'Aprende a buscar, organizar y representar información útil y confiable.', status: 'not_started', icon: <Info className="h-8 w-8 text-yellow-600" /> }, // Using yellow color directly as theme doesn't have many variations easily accessible
  { id: '5', title: 'Módulo 5: Diversos para aprender', description: 'Reconoce tu ritmo, adapta tus métodos y diseña una guía de aprendizaje personalizada.', status: 'not_started', icon: <Users className="h-8 w-8 text-purple-600" /> }, // Using purple color directly
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
      <h1 className="font-poppins mb-4 text-3xl font-bold text-secondary md:text-4xl">
        Módulos Disponibles
      </h1>
      <p className="font-open-sans mb-8 text-muted-foreground">
        A continuación encontrarás cinco módulos diseñados para ayudarte a explorar y fortalecer tu autonomía como estudiante. Puedes avanzar a tu ritmo. ¡Empieza por el que más te llame la atención!
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => {
          const statusInfo = getStatusInfo(module.status);
          const buttonLabel = module.status === 'not_started' ? 'Iniciar módulo' : 'Continuar'; // Updated button labels slightly
          const buttonIcon = <PlayCircle className="mr-2 h-4 w-4" />; // Simplified icon logic

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
