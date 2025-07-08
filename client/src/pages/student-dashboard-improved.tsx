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
import { BookOpen, Award, TrendingUp, LogOut, User, Star, Target, Calendar, Clock, Trophy, Zap, CheckCircle, PlayCircle, Settings, Bell } from "lucide-react";

export default function StudentDashboardImproved() {
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

  // Get user's initials for avatar
  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    SYCEBNL Formation
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">Plateforme d'apprentissage</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-colors">
                <Bell className="h-5 w-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-colors">
                <Settings className="h-5 w-5 text-gray-600" />
              </Button>
              <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl px-4 py-2 border border-blue-100">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {user?.fullName ? getUserInitials(user.fullName) : 'U'}
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-800">{user?.fullName}</span>
                  <p className="text-xs text-gray-500">Étudiant</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-2">
                Dashboard Étudiant
              </h1>
              <p className="text-gray-600 text-lg">
                Bienvenue <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user?.fullName}</span>, continuez votre parcours d'excellence
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 shadow-lg">
                <Zap className="w-4 h-4 mr-2" />
                En formation
              </Badge>
            </div>
          </div>
        </div>

        {/* Enhanced Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Progression Globale</p>
                  <p className="text-3xl font-bold">{overallProgress}%</p>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${overallProgress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Target className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-emerald-100 text-sm font-medium mb-1">Modules Terminés</p>
                  <p className="text-3xl font-bold">{completedModules}/{totalModules}</p>
                  <p className="text-emerald-100 text-xs mt-1">modules completés</p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-purple-100 text-sm font-medium mb-1">Score Moyen</p>
                  <p className="text-3xl font-bold">{averageScore}/20</p>
                  <p className="text-purple-100 text-xs mt-1">
                    {averageScore >= 16 ? "Excellent niveau" : averageScore >= 12 ? "Bon niveau" : "À améliorer"}
                  </p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Star className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-orange-100 text-sm font-medium mb-1">Statut</p>
                  <div className="mb-2">
                    <Badge 
                      className={`${canGetCertificate ? "bg-white/20 text-white border-white/30" : overallProgress > 0 ? "bg-white/20 text-white border-white/30" : "bg-white/20 text-white border-white/30"} px-2 py-1 text-xs`}
                    >
                      {canGetCertificate ? "Prêt pour certification" : overallProgress > 0 ? "En cours" : "Débutant"}
                    </Badge>
                  </div>
                  <p className="text-orange-100 text-xs">
                    {canGetCertificate ? "Félicitations !" : "Continuez vos efforts"}
                  </p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Modules Grid */}
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm overflow-hidden mb-8">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-800">Modules de Formation</CardTitle>
                <p className="text-sm text-gray-600">Votre parcours d'apprentissage SYCEBNL</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map((module: any, index: number) => {
                const moduleProgress = progress.find((p: any) => p.moduleId === module.id);
                const isCompleted = moduleProgress?.status === "completed";
                const isInProgress = moduleProgress && moduleProgress.status !== "completed";
                
                return (
                  <Card 
                    key={module.id} 
                    className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden group cursor-pointer ${
                      isCompleted ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' :
                      isInProgress ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200' :
                      'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200'
                    }`}
                    onClick={() => setLocation(`/module/${module.id}`)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isCompleted ? 'bg-gradient-to-br from-green-500 to-emerald-500' :
                              isInProgress ? 'bg-gradient-to-br from-blue-500 to-purple-500' :
                              'bg-gradient-to-br from-gray-400 to-gray-500'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle className="w-4 h-4 text-white" />
                              ) : isInProgress ? (
                                <PlayCircle className="w-4 h-4 text-white" />
                              ) : (
                                <BookOpen className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <Badge className={`text-xs ${
                              isCompleted ? 'bg-green-100 text-green-800' :
                              isInProgress ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              Module {index + 1}
                            </Badge>
                          </div>
                          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {module.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {module.description}
                          </p>
                        </div>
                      </div>
                      
                      {moduleProgress && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Progression</span>
                            <span>{Math.round((moduleProgress.chapterScore + moduleProgress.moduleScore) / 40 * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                isCompleted ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                'bg-gradient-to-r from-blue-500 to-purple-500'
                              }`}
                              style={{ width: `${Math.round((moduleProgress.chapterScore + moduleProgress.moduleScore) / 40 * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>~2h de formation</span>
                        </div>
                        <Button 
                          size="sm"
                          className={`${
                            isCompleted ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600' :
                            isInProgress ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600' :
                            'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
                          } text-white shadow-lg`}
                        >
                          {isCompleted ? 'Revoir' : isInProgress ? 'Continuer' : 'Commencer'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Certification Section */}
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <span>Certification SYCEBNL</span>
                <p className="text-sm text-yellow-100 font-normal">Votre passeport vers l'excellence professionnelle</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                  Votre Statut de Certification
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 rounded-xl bg-white shadow-lg">
                    <div className={`w-4 h-4 rounded-full mr-4 ${
                      completedModules === totalModules ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-900">
                        {completedModules === totalModules ? '✅ Tous les modules terminés' : `📚 ${completedModules}/${totalModules} modules terminés`}
                      </span>
                      {completedModules !== totalModules && (
                        <p className="text-xs text-gray-500 mt-1">Terminez tous les modules pour débloquer la certification</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 rounded-xl bg-white shadow-lg">
                    <div className={`w-4 h-4 rounded-full mr-4 ${
                      averageScore >= 16 ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-900">
                        {averageScore >= 16 ? '⭐ Score suffisant atteint' : `📊 Score actuel: ${averageScore}/20 (minimum 16)`}
                      </span>
                      {averageScore < 16 && (
                        <p className="text-xs text-gray-500 mt-1">Améliorez vos scores pour atteindre le minimum requis</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 rounded-xl bg-white shadow-lg">
                    <div className={`w-4 h-4 rounded-full mr-4 ${
                      canGetCertificate ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-900">
                        {canGetCertificate ? '🎉 Certification disponible' : '⏳ Certification non disponible'}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {canGetCertificate ? 'Félicitations ! Vous pouvez maintenant demander votre certificat' : 'Complétez les exigences ci-dessus'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Obtenir votre certificat
                </h3>
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Award className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Certificat International SYCEBNL</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Une fois tous les modules terminés avec succès (score minimum 16/20), vous pourrez obtenir votre certificat reconnu internationalement.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">Prix de la certification :</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                        30 000 FCFA
                      </span>
                    </div>
                  </div>
                  
                  {canGetCertificate ? (
                    <Button 
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => setLocation("/contact")}
                    >
                      <Award className="w-5 h-5 mr-2" />
                      Demander le certificat
                    </Button>
                  ) : (
                    <Button 
                      disabled 
                      className="w-full bg-gray-300 text-gray-500 cursor-not-allowed py-3"
                    >
                      <Clock className="w-5 h-5 mr-2" />
                      Terminer d'abord tous les modules
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

