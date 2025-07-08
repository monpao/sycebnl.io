import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { Users, Award, DollarSign, TrendingUp, LogOut, User, Search, BookOpen, BarChart3, MessageSquare, Calendar, Download, Eye, Filter, RefreshCw, Settings, Bell, Shield, Zap, Target, Globe, Activity, UserCheck, UserX, Mail, Phone, MapPin, Clock, Star, ChevronRight, Plus, Edit, Trash2, MoreVertical } from "lucide-react";

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { user, logout } = useAuth();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/admin/stats"],
    queryFn: async () => {
      const response = await fetch("/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.json();
    },
  });

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["/api/admin/users"],
    queryFn: async () => {
      const response = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.json();
    },
  });

  const { data: messages = [] } = useQuery({
    queryKey: ["/api/admin/messages"],
    queryFn: async () => {
      const response = await fetch("/api/admin/messages", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.json();
    },
  });

  const filteredUsers = users.filter((user: any) => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const dashboardStats = [
    {
      title: "Utilisateurs Actifs",
      value: stats?.totalUsers || 0,
      change: "+12%",
      trend: "up",
      icon: <Users className="w-8 h-8" />,
      gradient: "from-blue-500 to-blue-600",
      description: "Étudiants inscrits"
    },
    {
      title: "Certifications Délivrées",
      value: stats?.totalCertificates || 0,
      change: "+8%",
      trend: "up",
      icon: <Award className="w-8 h-8" />,
      gradient: "from-emerald-500 to-emerald-600",
      description: "Ce mois-ci"
    },
    {
      title: "Revenus Mensuels",
      value: `${stats?.monthlyRevenue || 0}€`,
      change: "+15%",
      trend: "up",
      icon: <DollarSign className="w-8 h-8" />,
      gradient: "from-purple-500 to-purple-600",
      description: "Certifications payées"
    },
    {
      title: "Taux de Réussite",
      value: `${stats?.successRate || 98}%`,
      change: "+2%",
      trend: "up",
      icon: <Target className="w-8 h-8" />,
      gradient: "from-orange-500 to-orange-600",
      description: "Moyenne globale"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "certification",
      user: "Marie Kouassi",
      action: "a obtenu sa certification SYCEBNL",
      time: "Il y a 2 heures",
      avatar: "MK",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      id: 2,
      type: "registration",
      user: "Jean Dupont",
      action: "s'est inscrit à la formation",
      time: "Il y a 4 heures",
      avatar: "JD",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 3,
      type: "completion",
      user: "Fatou Traoré",
      action: "a terminé le Module 3",
      time: "Il y a 6 heures",
      avatar: "FT",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      type: "message",
      user: "Ahmed Ben Ali",
      action: "a envoyé un message de support",
      time: "Il y a 8 heures",
      avatar: "AB",
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  const navigationItems = [
    { id: "overview", label: "Vue d'ensemble", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "users", label: "Utilisateurs", icon: <Users className="w-5 h-5" /> },
    { id: "certificates", label: "Certifications", icon: <Award className="w-5 h-5" /> },
    { id: "messages", label: "Messages", icon: <MessageSquare className="w-5 h-5" /> },
    { id: "analytics", label: "Analytiques", icon: <TrendingUp className="w-5 h-5" /> },
    { id: "settings", label: "Paramètres", icon: <Settings className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header Ultra-Moderne */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="container-modern py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                  <p className="text-sm text-slate-500">Panneau d'administration SYCEBNL</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>
              
              <div className="flex items-center space-x-3 px-4 py-2 bg-slate-100 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-slate-800">{user?.name || 'Admin'}</div>
                  <div className="text-slate-500">Administrateur</div>
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
                      <Badge className={`${stat.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'} border-0`}>
                        {stat.change}
                      </Badge>
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

            {/* Activités Récentes et Graphiques */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Activités Récentes */}
              <Card className="lg:col-span-2 dashboard-card">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-slate-800">Activités Récentes</CardTitle>
                    <Button variant="outline" size="sm" className="hover-scale">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Actualiser
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={activity.id} className={`flex items-center space-x-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200 animate-fade-in-up delay-${index * 50}`}>
                      <div className={`w-12 h-12 bg-gradient-to-br ${activity.gradient} rounded-xl flex items-center justify-center text-white font-semibold shadow-lg`}>
                        {activity.avatar}
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-semibold text-slate-800">
                          <span className="text-blue-600">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Statistiques Rapides */}
              <Card className="dashboard-card">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-slate-800">Aperçu Rapide</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">Modules Actifs</p>
                          <p className="text-xs text-slate-500">En cours</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-slate-800">5</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                          <UserCheck className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">Nouveaux Inscrits</p>
                          <p className="text-xs text-slate-500">Cette semaine</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-slate-800">23</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">Messages Non Lus</p>
                          <p className="text-xs text-slate-500">Support</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-slate-800">{messages.length}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">Croissance</p>
                          <p className="text-xs text-slate-500">Ce mois</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-emerald-600">+15%</span>
                    </div>
                  </div>
                  
                  <Button className="w-full btn-modern btn-primary">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Voir Analytiques Détaillées
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Gestion des Utilisateurs */}
        {activeTab === "users" && (
          <div className="space-y-6">
            {/* Filtres et Recherche */}
            <Card className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center space-x-4 flex-grow">
                    <div className="relative flex-grow max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="Rechercher un utilisateur..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 input-modern"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-48">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filtrer par statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        <SelectItem value="active">Actif</SelectItem>
                        <SelectItem value="inactive">Inactif</SelectItem>
                        <SelectItem value="certified">Certifié</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="hover-scale">
                      <Download className="w-4 h-4 mr-2" />
                      Exporter
                    </Button>
                    <Button size="sm" className="btn-modern btn-primary">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouvel Utilisateur
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liste des Utilisateurs */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-800">
                  Utilisateurs ({filteredUsers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {usersLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl animate-pulse">
                        <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
                        <div className="flex-grow space-y-2">
                          <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                          <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                        </div>
                        <div className="w-20 h-6 bg-slate-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredUsers.map((user: any, index: number) => (
                      <div key={user.id} className={`flex items-center space-x-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all duration-200 animate-fade-in-up delay-${index * 25}`}>
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
                          {user.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-slate-800">{user.name}</h3>
                            {user.certified && (
                              <Badge className="bg-emerald-100 text-emerald-700 border-0">
                                <Award className="w-3 h-3 mr-1" />
                                Certifié
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-slate-500">
                            <span className="flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {user.email}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              Inscrit le {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                            {user.status === 'active' ? 'Actif' : 'Inactif'}
                          </Badge>
                          <Button variant="ghost" size="sm" className="hover-scale">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover-scale">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Messages de Support */}
        {activeTab === "messages" && (
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800">
                Messages de Support ({messages.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message: any, index: number) => (
                  <div key={message.id} className={`p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200 animate-fade-in-up delay-${index * 50}`}>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-semibold">
                        {message.name?.charAt(0) || 'U'}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-slate-800">{message.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {message.subject}
                          </Badge>
                          <span className="text-xs text-slate-500">
                            {new Date(message.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{message.message}</p>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" className="hover-scale">
                            Répondre
                          </Button>
                          <Button size="sm" variant="ghost" className="hover-scale">
                            Marquer comme lu
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

