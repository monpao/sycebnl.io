import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";
import { ProgressCard } from "@/components/progress-card";
import { ModuleCard } from "@/components/module-card";
import { BookOpen, Award, TrendingUp, LogOut, User, Target, Clock, Star, Trophy, Zap, BarChart3, Calendar, Download, Play, CheckCircle, ArrowRight, Sparkles, Brain, Globe, Users, MessageSquare, Bell, Settings, ChevronRight, Plus, Eye, Rocket, Shield } from "lucide-react";

export default function StudentDashboardModern() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
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
      return response.json();
    },
  });

  const overallProgress = progress.length > 0 
    ? Math.round(progress.reduce((acc: number, p: any) => acc + p.progress, 0) / progress.length)
    : 0;

  const completedModules = progress.filter((p: any) => p.progress === 100).length;
  const totalModules = modules.length;

  const dashboardStats = [
    {
      title: "Progression Globale",
      value: `${overallProgress}%`,
      description: "Avancement total",
      icon: <Target className="w-8 h-8" />,
      gradient: "from-blue-500 to-blue-600",
      progress: overallProgress
    },
    {
      title: "Modules Terminés",
      value: `${completedModules}/${totalModules}`,
      description: "Modules complétés",
      icon: <BookOpen className="w-8 h-8" />,
      gradient: "from-emerald-500 to-emerald-600",
      progress: totalModules > 0 ? (completedModules / totalModules) * 100 : 0
    },
    {
      title: "Temps d'Étude",
      value: "24h",
      description: "Cette semaine",
      icon: <Clock className="w-8 h-8" />,
      gradient: "from-purple-500 to-purple-600",
      progress: 75
    },
    {
      title: "Certification",
      value: certificate ? "Obtenue" : "En cours",
      description: certificate ? "Félicitations !" : "Continuez vos efforts",
      icon: <Award className="w-8 h-8" />,
      gradient: certificate ? "from-yellow-500 to-yellow-600" : "from-slate-400 to-slate-500",
      progress: certificate ? 100 : overallProgress
    }
  ];

  const recentAchievements = [
    {
      id: 1,
      title: "Premier Module Terminé",
      description: "Vous avez complété votre premier module SYCEBNL",
      icon: <BookOpen className="w-6 h-6" />,
      gradient: "from-blue-500 to-blue-600",
      date: "Il y a 2 jours"
    },
    {
      id: 2,
      title: "Quiz Parfait",
      description: "Score de 100% au quiz du Module 2",
      icon: <Star className="w-6 h-6" />,
      gradient: "from-yellow-500 to-yellow-600",
      date: "Il y a 1 semaine"
    },
    {
      id: 3,
      title: "Étudiant Assidu",
      description: "7 jours consécutifs de connexion",
      icon: <Trophy className="w-6 h-6" />,
      gradient: "from-purple-500 to-purple-600",
      date: "Il y a 1 semaine"
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Quiz Module 3",
      description: "Évaluation sur les Emplois-Ressources",
      dueDate: "Dans 2 jours",
      priority: "high",
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 2,
      title: "Cas Pratique VERDAS",
      description: "Étude de cas complète",
      dueDate: "Dans 1 semaine",
      priority: "medium",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: 3,
      title: "Examen Final",
      description: "Certification SYCEBNL",
      dueDate: "Dans 2 semaines",
      priority: "high",
      icon: <Award className="w-5 h-5" />
    }
  ];

  const navigationItems = [
    { id: "overview", label: "Vue d'ensemble", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "modules", label: "Modules", icon: <BookOpen className="w-5 h-5" /> },
    { id: "progress", label: "Progression", icon: <TrendingUp className="w-5 h-5" /> },
    { id: "certificate", label: "Certification", icon: <Award className="w-5 h-5" /> },
    { id: "community", label: "Communauté", icon: <Users className="w-5 h-5" /> },
    { id: "support", label: "Support", icon: <MessageSquare className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header Ultra-Moderne */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="container-modern py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-float">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Mon Espace SYCEBNL
                  </h1>
                  <p className="text-sm text-slate-500">Tableau de bord étudiant</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"></div>
              </Button>
              
              <div className="flex items-center space-x-3 px-4 py-2 bg-slate-100 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.charAt(0) || 'E'}
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-slate-800">{user?.name || 'Étudiant'}</div>
                  <div className="text-slate-500">Apprenant SYCEBNL</div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="hover-scale"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-modern py-8">
        {/* Message de Bienvenue */}
        <div className={`mb-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 text-white border-0 shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    Bonjour {user?.name?.split(' ')[0] || 'Étudiant'} ! 👋
                  </h2>
                  <p className="text-xl opacity-90 mb-4">
                    Continuez votre parcours vers l'excellence en comptabilité des projets
                  </p>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Target className="w-5 h-5" />
                      <span>Progression: {overallProgress}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5" />
                      <span>{completedModules}/{totalModules} modules</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5" />
                      <span>{certificate ? 'Certifié' : 'En formation'}</span>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="w-32 h-32 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                    <Rocket className="w-16 h-16 text-white animate-float" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8 bg-white/50 backdrop-blur-sm rounded-2xl p-2 border border-slate-200/50">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-white hover:text-slate-800 hover:shadow-sm'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Vue d'ensemble */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Statistiques Principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => (
                <Card key={index} className={`dashboard-card animate-fade-in-up delay-${index * 100} group`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {stat.icon}
                      </div>
                      {stat.progress !== undefined && (
                        <div className="text-right">
                          <div className="text-xs text-slate-500 mb-1">Progression</div>
                          <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${stat.gradient} transition-all duration-1000`}
                              style={{ width: `${stat.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                      <p className="text-sm font-semibold text-slate-600">{stat.title}</p>
                      <p className="text-xs text-slate-500">{stat.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contenu Principal */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Modules en Cours */}
              <Card className="lg:col-span-2 dashboard-card">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-slate-800">Modules en Cours</CardTitle>
                    <Button variant="outline" size="sm" className="hover-scale">
                      <Eye className="w-4 h-4 mr-2" />
                      Voir Tout
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {modules.slice(0, 3).map((module: any, index: number) => {
                    const moduleProgress = progress.find((p: any) => p.moduleId === module.id)?.progress || 0;
                    return (
                      <div key={module.id} className={`p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all duration-200 animate-fade-in-up delay-${index * 50} group cursor-pointer`}>
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            {index + 1}
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-semibold text-slate-800">{module.title}</h4>
                              {moduleProgress === 100 && (
                                <Badge className="bg-emerald-100 text-emerald-700 border-0">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Terminé
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 mb-3">{module.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex-grow mr-4">
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-slate-500">Progression</span>
                                  <span className="font-semibold text-slate-700">{moduleProgress}%</span>
                                </div>
                                <Progress value={moduleProgress} className="h-2" />
                              </div>
                              <Button 
                                size="sm" 
                                onClick={() => setLocation(`/module/${module.id}`)}
                                className="btn-modern btn-primary"
                              >
                                {moduleProgress === 0 ? 'Commencer' : 'Continuer'}
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Tâches à Venir */}
              <Card className="dashboard-card">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-slate-800">Tâches à Venir</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingTasks.map((task, index) => (
                    <div key={task.id} className={`p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200 animate-fade-in-up delay-${index * 100}`}>
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          task.priority === 'high' 
                            ? 'bg-gradient-to-br from-red-500 to-red-600' 
                            : 'bg-gradient-to-br from-blue-500 to-blue-600'
                        } text-white shadow-lg`}>
                          {task.icon}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-semibold text-slate-800 mb-1">{task.title}</h4>
                          <p className="text-sm text-slate-600 mb-2">{task.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">{task.dueDate}</span>
                            <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                              {task.priority === 'high' ? 'Urgent' : 'Normal'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button className="w-full btn-modern btn-secondary mt-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    Voir Planning Complet
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Réalisations Récentes */}
            <Card className="dashboard-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-slate-800">Réalisations Récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {recentAchievements.map((achievement, index) => (
                    <div key={achievement.id} className={`p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all duration-200 animate-fade-in-up delay-${index * 100} group`}>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${achievement.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {achievement.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800">{achievement.title}</h4>
                          <p className="text-xs text-slate-500">{achievement.date}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Modules */}
        {activeTab === "modules" && (
          <div className="space-y-6">
            <div className="grid gap-6">
              {modules.map((module: any, index: number) => {
                const moduleProgress = progress.find((p: any) => p.moduleId === module.id)?.progress || 0;
                return (
                  <ModuleCard 
                    key={module.id} 
                    module={module} 
                    progress={moduleProgress}
                    className={`animate-fade-in-up delay-${index * 100}`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Progression */}
        {activeTab === "progress" && (
          <div className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-800">Votre Progression</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {progress.map((p: any, index: number) => (
                    <ProgressCard 
                      key={p.id} 
                      progress={p}
                      className={`animate-fade-in-up delay-${index * 100}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Certification */}
        {activeTab === "certificate" && (
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800">Certification SYCEBNL</CardTitle>
            </CardHeader>
            <CardContent>
              {certificate ? (
                <div className="text-center py-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Award className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Félicitations !</h3>
                  <p className="text-slate-600 mb-6">Vous avez obtenu votre certification SYCEBNL</p>
                  <Button className="btn-modern btn-primary">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger le Certificat
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Target className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Certification en Cours</h3>
                  <p className="text-slate-600 mb-6">
                    Complétez tous les modules pour obtenir votre certification
                  </p>
                  <div className="max-w-md mx-auto mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progression globale</span>
                      <span className="font-semibold">{overallProgress}%</span>
                    </div>
                    <Progress value={overallProgress} className="h-3" />
                  </div>
                  <Button 
                    onClick={() => setActiveTab("modules")}
                    className="btn-modern btn-primary"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Continuer la Formation
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

