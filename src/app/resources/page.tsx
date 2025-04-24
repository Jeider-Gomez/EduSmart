import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'; // Corrected import
import { Button } from '@/components/ui/button';
import { Download, Link as LinkIcon, FileText, Image as ImageIcon, Calendar, Brain, SearchCheck, FileSignature } from 'lucide-react'; // Added more specific icons

// Updated resources data based on the prompt
const resources = [
  // Técnicas de estudio
  { id: 'res1', type: 'pdf', title: 'Plantillas de Mapas Mentales', description: 'Modelos visuales para organizar ideas.', url: '/downloads/plantillas_mapas_mentales.pdf', category: '🧠 Técnicas de estudio' },
  { id: 'res2', type: 'pdf', title: 'Ejemplo de UVE Heurística', description: 'Guía visual para analizar conceptos.', url: '/downloads/ejemplo_uve_heuristica.pdf', category: '🧠 Técnicas de estudio' },
  { id: 'res3', type: 'pdf', title: 'PDF de Resumen Estructurado', description: 'Formato para sintetizar información clave.', url: '/downloads/resumen_estructurado.pdf', category: '🧠 Técnicas de estudio' },

  // Planificación y organización
  { id: 'res4', type: 'pdf', title: 'Plantilla Editable - Plan de Estudio', description: 'Organiza tus semanas académicas.', url: '/downloads/plantilla_plan_estudio_editable.pdf', category: '📅 Planificación y organización' },
  { id: 'res5', type: 'link', title: 'Tutorial Google Calendar', description: 'Aprende a gestionar tu tiempo online.', url: 'https://support.google.com/calendar/answer/2465776?hl=es', category: '📅 Planificación y organización' },
  { id: 'res6', type: 'pdf', title: 'Cuadro de Metas SMART', description: 'Define objetivos claros y alcanzables.', url: '/downloads/cuadro_metas_smart.pdf', category: '📅 Planificación y organización' },

  // Gestión de la información
  { id: 'res7', type: 'link', title: 'Guía para usar Zotero', description: 'Gestiona tus referencias bibliográficas.', url: 'https://www.zotero.org/support/quick_start_guide', category: '🔎 Gestión de la información' },
  { id: 'res8', type: 'image', title: 'Infografía: Fuentes Confiables', description: 'Claves para identificar información veraz.', url: '/downloads/infografia_fuentes_confiables.png', category: '🔎 Gestión de la información' },
  { id: 'res9', type: 'pdf', title: 'Modelo de Ficha de Lectura Crítica', description: 'Analiza textos de forma profunda.', url: '/downloads/modelo_ficha_lectura_critica.pdf', category: '🔎 Gestión de la información' },
];

const getIconForCategory = (category: string) => {
    if (category.includes('Técnicas de estudio')) return <Brain className="h-5 w-5 text-primary" />;
    if (category.includes('Planificación')) return <Calendar className="h-5 w-5 text-secondary" />;
    if (category.includes('Gestión de la información')) return <SearchCheck className="h-5 w-5 text-accent" />;
    return <FileText className="h-5 w-5 text-muted-foreground" />;
};

const getIconForType = (type: string) => {
  switch (type) {
    case 'pdf': return <FileText className="h-4 w-4 text-red-600" />;
    case 'link': return <LinkIcon className="h-4 w-4 text-blue-600" />;
    case 'image': return <ImageIcon className="h-4 w-4 text-purple-600" />;
    default: return <FileText className="h-4 w-4 text-gray-600" />;
  }
};

export default function ResourcesPage() {
  // Group resources by category
  const groupedResources = resources.reduce((acc, resource) => {
    const category = resource.category || 'Otros';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(resource);
    return acc;
  }, {} as { [key: string]: typeof resources });

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="font-poppins mb-4 text-3xl font-bold text-secondary md:text-4xl">
        Recursos Adicionales
      </h1>
      <p className="font-open-sans mb-8 text-muted-foreground">
        Aquí encontrarás materiales complementarios que puedes usar durante o después del OVA para profundizar en tu aprendizaje.
      </p>

      {Object.entries(groupedResources).map(([category, items]) => (
         <section key={category} className="mb-12">
           <h2 className="font-poppins mb-6 flex items-center gap-3 text-2xl font-semibold text-primary border-b pb-2">
            {getIconForCategory(category)} {category.substring(category.indexOf(' ')+1)} {/* Extract category name */}
            </h2>
           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
             {items.map((resource) => (
               <Card key={resource.id} className="flex flex-col overflow-hidden shadow-sm transition-shadow hover:shadow-md">
                 <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-3">
                    <div className="mt-1"> {getIconForType(resource.type)}</div>
                    <div className="flex-1 space-y-1">
                      <CardTitle className="font-poppins text-base">{resource.title}</CardTitle>
                      <CardDescription className="font-open-sans text-xs">{resource.description}</CardDescription>
                    </div>
                 </CardHeader>
                 <CardContent className="flex-grow">
                    {/* Add preview or more details if needed */}
                 </CardContent>
                 <CardFooter className="pt-3">
                   <Button asChild variant="outline" size="sm" className="w-full">
                     {resource.type === 'link' ? (
                       <a href={resource.url} target="_blank" rel="noopener noreferrer">
                         <LinkIcon className="mr-2 h-4 w-4" />
                         Visitar Enlace
                       </a>
                     ) : (
                       <a href={resource.url} download={resource.title + '.' + resource.type}> {/* Added dynamic download name */}
                         <Download className="mr-2 h-4 w-4" />
                         Descargar
                       </a>
                     )}
                   </Button>
                 </CardFooter>
               </Card>
             ))}
           </div>
         </section>
      ))}
    </div>
  );
}
