
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, PlayCircle, CircleDashed, Brain, Wrench, Route, Info, Users, Eye } from 'lucide-react'; // Added Eye icon
import { Badge } from '@/components/ui/badge';

// Mock data for modules - Assuming some progress for demonstration
const modules = [
  { id: '1', title: 'Módulo 1: Smart Learner', description: 'Descubre tu estilo de aprendizaje y lo que eso dice sobre tu forma de estudiar.', status: 'completed', icon: <Brain className="h-10 w-10 text-primary" /> },
  { id: '2', title: 'Módulo 2: Learning Toolkit', description: 'Explora estrategias y técnicas de estudio visuales, escritas y conceptuales.', status: 'in_progress', icon: <Wrench className="h-10 w-10 text-secondary" /> },
  { id: '3', title: 'Módulo 3: Mi Ruta Self-Learning', description: 'Crea tu propio plan de estudio con metas claras y herramientas digitales.', status: 'not_started', icon: <Route className="h-10 w-10 text-accent" /> },
  { id: '4', title: 'Módulo 4: Info-Skills', description: 'Aprende a buscar, organizar y representar información útil y confiable.', status: 'not_started', icon: <Info className="h-10 w-10 text-chart-2" /> }, // Using chart color
  { id: '5', title: 'Módulo 5: Diversos para aprender', description: 'Reconoce tu ritmo, adapta tus métodos y diseña una guía de aprendizaje personalizada.', status: 'not_started', icon: <Users className="h-10 w-10 text-chart-3" /> }, // Using chart color
];

// Function to get status label, icon, and color based on module status
const getStatusInfo = (status: string) => {
  switch (status) {
    case 'completed':
      return { label: 'Completado', icon: <CheckCircle className="h-4 w-4 text-green-600" />, color: 'bg-green-100 text-green-800 border-green-200' };
    case 'in_progress':
      return { label: 'En Progreso', icon: <PlayCircle className="h-4 w-4 text-yellow-600" />, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
    default:
      return { label: 'No Iniciado', icon: <CircleDashed className="h-4 w-4 text-gray-500" />, color: 'bg-gray-100 text-gray-800 border-gray-200' };
  }
};

export default function ModulesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="font-poppins mb-4 text-3xl font-bold text-secondary md:text-4xl">
        Explorar Módulos
      </h1>
      <p className="font-open-sans mb-10 text-lg text-muted-foreground">
        A continuación encontrarás cinco módulos diseñados para ayudarte a explorar y fortalecer tu autonomía como estudiante. Puedes avanzar a tu ritmo. ¡Empieza por el que más te llame la atención!
      </p>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => {
          const statusInfo = getStatusInfo(module.status);
          const buttonLabel = "Ver módulo"; // Changed as per new prompt
          const buttonIcon = <Eye className="mr-2 h-4 w-4" />; // Changed icon to Eye

          return (
            <Card key={module.id} className="flex flex-col justify-between overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                 <div className="flex-shrink-0 rounded-lg bg-muted p-3">{module.icon}</div>
                 <div className="flex-1 space-y-1">
                   <CardTitle className="font-poppins text-xl text-primary">{module.title}</CardTitle>
                 </div>
              </CardHeader>
              <CardContent className="flex-grow pt-0">
                 <CardDescription className="font-open-sans text-sm text-muted-foreground h-10"> {/* Fixed height for alignment */}
                    {module.description}
                 </CardDescription>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4 border-t bg-muted/30 px-6 py-4">
                <Badge variant="outline" className={`flex items-center gap-1.5 text-xs font-medium ${statusInfo.color}`}>
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
