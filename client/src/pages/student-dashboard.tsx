import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";
import { ProgressCard } from "@/components/progress-card";
import { ModuleCard } from "@/components/module-card";
import { BookOpen, Award, TrendingUp, LogOut, User } from "lucide-react";

export default function StudentDashboard() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();
  
  const { data: modules = [] } = useQuery({
    queryKey: ["/api/modules"],
    queryFn: async () => {
      const response = await fetch("/api/modules", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.json();
    },
  });

  const { data: progress = [] } = useQuery({
    queryKey: ["/api/progress"],
    queryFn: async () => {
      const response = await fetch("/api/progress", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.json();
    },
  });

  const { data: certificate } = useQuery({
    queryKey: ["/api/certificate"],
    queryFn: async () => {
      const response = await fetch("/api/certificate", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 404) return null;
      return response.json();
    },
  });

  // Calculate overall progress
  const completedModules = progress.filter((p: any) => p.status === "completed").length;
  const totalModules = modules.length;
  const overallProgress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
  
  // Calculate average score
  const scoresSum = progress.reduce((sum: number, p: any) => sum + (p.chapterScore || 0) + (p.moduleScore || 0), 0);
  const totalPossibleScore = progress.length * 40; // 20 points per chapter + 20 points per module
  const averageScore = totalPossibleScore > 0 ? Math.round((scoresSum / totalPossibleScore) * 20) : 0;

  const canGetCertificate = completedModules === totalModules && averageScore >= 16;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Étudiant</h1>
          <p className="text-gray-600">
            Bienvenue <span className="font-semibold">{user?.fullName}</span>, suivez votre progression
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <ProgressCard
            title="Progression Globale"
            value={`${overallProgress}%`}
            progress={overallProgress}
            color="primary"
          />
          <ProgressCard
            title="Modules Terminés"
            value={`${completedModules}/${totalModules}`}
            subtitle="modules completés"
            color="secondary"
          />
          <ProgressCard
            title="Score Moyen"
            value={`${averageScore}/20`}
            subtitle={averageScore >= 16 ? "Excellent niveau" : averageScore >= 12 ? "Bon niveau" : "À améliorer"}
            color="accent"
          />
          <ProgressCard
            title="Statut"
            value={
              <Badge 
                variant={canGetCertificate ? "default" : overallProgress > 0 ? "secondary" : "outline"}
                className={canGetCertificate ? "bg-green-100 text-green-800" : ""}
              >
                {canGetCertificate ? "Prêt pour certification" : overallProgress > 0 ? "En cours" : "Débutant"}
              </Badge>
            }
            subtitle={canGetCertificate ? "Félicitations !" : "Continuez vos efforts"}
            color="default"
          />
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {modules.map((module: any) => {
            const moduleProgress = progress.find((p: any) => p.moduleId === module.id);
            return (
              <ModuleCard
                key={module.id}
                module={module}
                progress={moduleProgress}
                onStart={() => setLocation(`/module/${module.id}`)}
              />
            );
          })}
        </div>

        {/* Certification Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-500" />
              <span>Certification SYCEBNL</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Votre Statut</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${
                      completedModules === totalModules ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                    <span className="text-sm">
                      {completedModules === totalModules ? 'Tous les modules terminés' : `${completedModules}/${totalModules} modules terminés`}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${
                      averageScore >= 16 ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                    <span className="text-sm">
                      {averageScore >= 16 ? 'Score suffisant atteint' : `Score actuel: ${averageScore}/20 (minimum 16)`}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${
                      canGetCertificate ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <span className="text-sm">
                      {canGetCertificate ? 'Certification disponible' : 'Certification non disponible'}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Obtenir votre certificat</h3>
                <p className="text-gray-600 mb-4">
                  Une fois tous les modules terminés avec succès (score minimum 16/20), vous pourrez télécharger votre certificat international SYCEBNL pour 30 000 FCFA.
                </p>
                {canGetCertificate ? (
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => setLocation("/contact")}
                  >
                    Demander le certificat
                  </Button>
                ) : (
                  <Button disabled className="bg-gray-300 text-gray-500 cursor-not-allowed">
                    Terminer d'abord tous les modules
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
