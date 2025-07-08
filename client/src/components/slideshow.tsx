import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

interface SlideshowProps {
  content: string;
  moduleId: number;
  chapterIndex: number;
  onDownloadSummary?: () => void;
}

export function Slideshow({ content, moduleId, chapterIndex, onDownloadSummary }: SlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  if (!content) {
    return <div className="p-8 text-center text-gray-500">Contenu non disponible</div>;
  }
  
  // Parse slides from HTML content
  const slides = content.match(/<div class="slide">[\s\S]*?<\/div>/g) || [content];
  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const downloadSummary = async () => {
    try {
      const response = await fetch(`/api/modules/${moduleId}/chapters/${chapterIndex}/summary`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = response.headers.get('Content-Disposition')?.split('filename=')[1]?.replace(/"/g, '') || 'resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        if (onDownloadSummary) onDownloadSummary();
      }
    } catch (error) {
      console.error('Error downloading summary:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      {/* Slideshow Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            Précédent
          </Button>
          <span className="text-sm text-gray-600">
            {currentSlide + 1} / {totalSlides}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
          >
            Suivant
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={downloadSummary}
          className="text-primary hover:bg-primary/5"
        >
          <Download className="h-4 w-4 mr-2" />
          Télécharger le résumé
        </Button>
      </div>

      {/* Slide Content */}
      <div className="p-8 min-h-[400px]">
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: slides[currentSlide]?.replace(/<div class="slide">|<\/div>/g, '') || content 
          }}
        />
      </div>

      {/* Slide Navigation Dots */}
      <div className="flex justify-center pb-4">
        <div className="flex space-x-2">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide 
                  ? 'bg-primary' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}