import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'; // Corrected import
import { Button } from '@/components/ui/button';
import { Download, Link as LinkIcon, FileText, Image as ImageIcon, Calendar, Brain, SearchCheck, Video } from 'lucide-react'; // Added Video icon

// Updated resources data based on the new detailed prompt
const resources = [
  // Técnicas de estudio
  { id: 'res1', type: 'pdf', title: 'Plantillas de Mapas Mentales', description: 'Modelos visuales para organizar ideas.', url: '/downloads/plantillas_mapas_mentales.pdf', category: '🧠 Técnicas de estudio' },
  { id: 'res2', type: 'pdf', title: 'Ejemplo de UVE Heurística', description: 'Guía visual para analizar conceptos.', url: '/downloads/ejemplo_uve_heuristica.pdf', category: '🧠 Técnicas de estudio' },
  { id: 'res3', type: 'pdf', title: 'PDF de Resumen Estructurado', description: 'Formato para sintetizar información clave.', url: '/downloads/resumen_estructurado.pdf', category: '🧠 Técnicas de estudio' },
   // { id: 'res_video_tech', type: 'video', title: 'Video: Técnica Pomodoro', description: 'Gestiona tu tiempo en bloques.', url: 'https://www.youtube.com/embed/placeholder_pomodoro', category: '🧠 Técnicas de estudio' },


  // Planificación y organización
  { id: 'res4', type: 'pdf', title: 'Plantilla Editable - Plan de Estudio', description: 'Organiza tus semanas académicas.', url: '/downloads/plantilla_plan_estudio_editable.pdf', category: '📅 Planificación y organización' },
  { id: 'res5', type: 'link', title: 'Tutorial Google Calendar', description: 'Aprende a gestionar tu tiempo online.', url: 'https://support.google.com/calendar/answer/2465776?hl=es', category: '📅 Planificación y organización' },
  { id: 'res6', type: 'pdf', title: 'Cuadro de Metas SMART', description: 'Define objetivos claros y alcanzables.', url: '/downloads/cuadro_metas_smart.pdf', category: '📅 Planificación y organización' },
   // { id: 'res_video_plan', type: 'video', title: 'Video: Organizando con Trello', description: 'Gestión visual de tareas.', url: 'https://www.youtube.com/embed/placeholder_trello', category: '📅 Planificación y organización' },

  // Gestión de la información
  { id: 'res7', type: 'link', title: 'Guía para usar Zotero', description: 'Gestiona tus referencias bibliográficas.', url: 'https://www.zotero.org/support/quick_start_guide', category: '🔎 Gestión de la información' },
  { id: 'res8', type: 'image', title: 'Infografía: ¿Cómo identificar Fuentes Confiables?', description: 'Claves para identificar información veraz.', url: '/downloads/infografia_fuentes_confiables.png', category: '🔎 Gestión de la información' }, // Assuming PNG, adjust if needed
  { id: 'res9', type: 'pdf', title: 'Modelo de Ficha de Lectura Crítica', description: 'Analiza textos de forma profunda.', url: '/downloads/modelo_ficha_lectura_critica.pdf', category: '🔎 Gestión de la información' },
   // { id: 'res_video_info', type: 'video', title: 'Video: Búsqueda Avanzada en Google Scholar', description: 'Encuentra artículos relevantes.', url: 'https://www.youtube.com/embed/placeholder_scholar', category: '🔎 Gestión de la información' },
];

// Function to get an icon based on the category name
const getIconForCategory = (category: string) => {
    if (category.includes('Técnicas de estudio')) return <Brain className="h-6 w-6 text-primary" />;
    if (category.includes('Planificación')) return <Calendar className="h-6 w-6 text-secondary" />;
    if (category.includes('Gestión de la información')) return <SearchCheck className="h-6 w-6 text-accent" />;
    return <FileText className="h-6 w-6 text-muted-foreground" />; // Default icon
};

// Function to get an icon based on the resource type
const getIconForType = (type: string) => {
  switch (type) {
    case 'pdf': return <FileText className="h-5 w-5 text-red-600" />;
    case 'link': return <LinkIcon className="h-5 w-5 text-blue-600" />;
    case 'image': return <ImageIcon className="h-5 w-5 text-purple-600" />;
    case 'video': return <Video className="h-5 w-5 text-green-600" />;
    default: return <FileText className="h-5 w-5 text-gray-600" />;
  }
};

export default function ResourcesPage() {
  // Group resources by category
  const groupedResources = resources.reduce((acc, resource) => {
    const category = resource.category || 'Otros'; // Fallback category
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(resource);
    return acc;
  }, {} as { [key: string]: typeof resources });

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="font-poppins mb-4 text-3xl font-bold text-secondary md:text-4xl">
        Biblioteca de Recursos
      </h1>
      <p className="font-open-sans mb-12 text-lg text-muted-foreground">
        Aquí encontrarás materiales complementarios que puedes usar durante o después del OVA para profundizar en tu aprendizaje y práctica.
      </p>

      {Object.entries(groupedResources).map(([category, items]) => (
         <section key={category} className="mb-12">
            {/* Category Header */}
           <div className="flex items-center gap-3 border-b-2 border-primary/30 pb-3 mb-6">
               {getIconForCategory(category)}
               <h2 className="font-poppins text-2xl font-semibold text-primary">
                   {category.substring(category.indexOf(' ') + 1)} {/* Extract category name */}
               </h2>
           </div>

           {/* Resource Cards Grid */}
           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
             {items.map((resource) => (
               <Card key={resource.id} className="flex flex-col overflow-hidden shadow-md transition-shadow hover:shadow-xl border border-border/50">
                 <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-2">
                    {/* Icon representing the type */}
                    <div className="mt-1 flex-shrink-0"> {getIconForType(resource.type)}</div>
                    {/* Title and Description */}
                    <div className="flex-1 space-y-1">
                      <CardTitle className="font-poppins text-md leading-snug">{resource.title}</CardTitle>
                      <CardDescription className="font-open-sans text-xs h-8 overflow-hidden"> {/* Fixed height */}
                          {resource.description}
                      </CardDescription>
                    </div>
                 </CardHeader>
                 <CardContent className="flex-grow">
                    {/* Optional: Add preview for images or videos if needed */}
                     {/* Example for image preview: */}
                     {resource.type === 'image' && (
                         <div className="mt-2">
                             <Image src={resource.url} alt={resource.title} width={200} height={100} className="rounded border mx-auto"/>
                         </div>
                     )}
                      {/* Example for video embed preview: */}
                     {resource.type === 'video' && (
                         <div className="mt-2 aspect-video w-full overflow-hidden rounded border">
                             <iframe width="100%" height="100%" src={resource.url.replace('watch?v=', 'embed/')} title={resource.title} allowFullScreen className="w-full h-full"></iframe>
                         </div>
                     )}
                 </CardContent>
                 <CardFooter className="bg-muted/30 p-3">
                   <Button asChild variant={resource.type === 'link' || resource.type === 'video' ? "secondary" : "outline"} size="sm" className="w-full">
                     {resource.type === 'link' || resource.type === 'video' ? (
                       <a href={resource.url} target="_blank" rel="noopener noreferrer">
                         <LinkIcon className="mr-2 h-4 w-4" />
                         {resource.type === 'video' ? 'Ver Video' : 'Visitar Enlace'}
                       </a>
                     ) : (
                       <a href={resource.url} download /* Let browser handle filename */ >
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
```