import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'; // Added CardFooter import
import { Button } from '@/components/ui/button';
import { Download, Link as LinkIcon, FileText, Image as ImageIcon } from 'lucide-react';

// Mock data for resources - replace with actual data
const resources = [
  { id: 'res1', type: 'pdf', title: 'Guía Completa de IA', description: 'Un PDF detallado cubriendo todos los módulos.', url: '/downloads/guia_completa_ia.pdf', category: 'Guías' },
  { id: 'res2', type: 'link', title: 'Awesome AI List', description: 'Repositorio con herramientas y recursos de IA.', url: 'https://github.com/example/awesome-ai', category: 'Enlaces Útiles' },
  { id: 'res3', type: 'image', title: 'Infografía - Ética en IA', description: 'Resumen visual sobre consideraciones éticas.', url: '/downloads/etica_ia_infografia.png', category: 'Infografías' },
  { id: 'res4', type: 'pdf', title: 'Plantilla - Propuesta de Proyecto IA', description: 'Modelo para estructurar tus propuestas.', url: '/downloads/plantilla_proyecto_ia.pdf', category: 'Plantillas' },
  { id: 'res5', type: 'link', title: 'Blog de IA News', description: 'Mantente actualizado con las últimas noticias.', url: 'https://example-ai-news.com', category: 'Enlaces Útiles' },
];

const getIconForType = (type: string) => {
  switch (type) {
    case 'pdf': return <FileText className="h-5 w-5 text-red-600" />;
    case 'link': return <LinkIcon className="h-5 w-5 text-blue-600" />;
    case 'image': return <ImageIcon className="h-5 w-5 text-purple-600" />;
    default: return <FileText className="h-5 w-5 text-gray-600" />;
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
      <h1 className="font-poppins mb-8 text-3xl font-bold text-secondary md:text-4xl">
        Recursos Adicionales
      </h1>

      {Object.entries(groupedResources).map(([category, items]) => (
         <section key={category} className="mb-12">
           <h2 className="font-poppins mb-6 text-2xl font-semibold text-primary border-b pb-2">{category}</h2>
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
                       <a href={resource.url} download>
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
