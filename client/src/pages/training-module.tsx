import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { Slideshow } from "@/components/slideshow";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, Clock, LogOut, User } from "lucide-react";

export default function TrainingModule() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const moduleId = parseInt(params.id || "1");
  
  const [currentChapter, setCurrentChapter] = useState(0);

  const { data: moduleData } = useQuery({
    queryKey: [`/api/modules/${moduleId}`],
    queryFn: async () => {
      const response = await fetch(`/api/modules/${moduleId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.json();
    },
  });

  const { data: progress } = useQuery({
    queryKey: [`/api/progress`],
    queryFn: async () => {
      const response = await fetch("/api/progress", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.json();
    },
  });

  // Get module content from API
  const module = moduleData;
  const moduleProgress = progress?.find((p: any) => p.moduleId === moduleId);
  
  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Module non trouvé</h1>
          <Button onClick={() => setLocation("/dashboard")}>
            Retour au dashboard
          </Button>
        </div>
      </div>
    );
  }

  const chapters = (module.content as any)?.chapters || [];
  const currentChapterData = chapters[currentChapter];
  const totalChapters = chapters.length;

  if (!currentChapterData && chapters.length > 0) {
    setCurrentChapter(0);
    return null;
  }
  const chapterProgress = Math.round(((currentChapter + 1) / totalChapters) * 100);

  const handleNextChapter = () => {
    if (currentChapter < totalChapters - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const handleStartQuiz = (type: "chapter" | "module") => {
    setLocation(`/quiz/${moduleId}/${type}`);
  };

  const isChapterCompleted = moduleProgress?.status === "completed";
  const canTakeModuleQuiz = currentChapter === totalChapters - 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setLocation("/dashboard")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <h1 className="text-xl font-bold text-primary">SYCEBNL Formation</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{user?.fullName}</span>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Module Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="outline" className="text-primary border-primary">
              Module {moduleId}
            </Badge>
            {isChapterCompleted && (
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Terminé
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{module.title}</h1>
          <p className="text-lg text-gray-600">{module.description}</p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Chapitre {currentChapter + 1} sur {totalChapters}
              </span>
              <span className="text-sm font-medium text-gray-700">{chapterProgress}%</span>
            </div>
            <Progress value={chapterProgress} className="w-full" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chapter Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Chapitres</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {chapters.map((chapter: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentChapter(index)}
                      className={`w-full text-left px-6 py-3 hover:bg-gray-50 transition-colors ${
                        currentChapter === index ? 'bg-primary/10 border-r-2 border-primary' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          currentChapter === index ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <span className={`text-sm ${
                          currentChapter === index ? 'font-medium text-primary' : 'text-gray-700'
                        }`}>
                          {chapter.title}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>{currentChapterData.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Slideshow 
                  content={currentChapterData.content}
                  moduleId={moduleId}
                  chapterIndex={currentChapter}
                />
              </CardContent>
            </Card>

            {/* Chapter Navigation Buttons */}
            <div className="flex justify-between items-center mb-6">
              <Button
                variant="outline"
                onClick={handlePrevChapter}
                disabled={currentChapter === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Chapitre précédent
              </Button>

              <div className="flex space-x-4">
                <Button
                  onClick={() => handleStartQuiz("chapter")}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  QCM Chapitre
                </Button>

                {canTakeModuleQuiz && (
                  <Button
                    onClick={() => handleStartQuiz("module")}
                    className="bg-secondary hover:bg-secondary/90"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Devoir Module
                  </Button>
                )}
              </div>

              <Button
                variant="outline"
                onClick={handleNextChapter}
                disabled={currentChapter === totalChapters - 1}
              >
                Chapitre suivant
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Quiz Information */}
            <Card>
              <CardHeader>
                <CardTitle>Évaluations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">QCM Chapitre</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 10 questions</li>
                      <li>• 2 points par réponse correcte</li>
                      <li>• Score minimum : 16/20</li>
                      <li>• Temps illimité</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">Devoir Module</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 10 questions</li>
                      <li>• 1 point par réponse correcte</li>
                      <li>• Score minimum : 16/20 total</li>
                      <li>• Temps illimité</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Important :</strong> Vous devez obtenir au moins 16 points sur 20 au total (QCM Chapitre + Devoir Module) 
                    pour valider ce module et passer au suivant.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
