import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { Users, Award, DollarSign, TrendingUp, LogOut, User, Search, Bell, Settings, BarChart3, Calendar, Filter, Download, Eye, FileText, Star, Activity } from "lucide-react";

export default function AdminDashboardImproved() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { user, logout } = useAuth();

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

  // Process user data for display
  const processedUsers = users.map((userData: any) => {
    const userProgress = userData.progress || [];
    const completedModules = userProgress.filter((p: any) => p.status === "completed").length;
    const totalModules = 4; // We know there are 4 modules
    const progressPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
    
    // Calculate average score
    const scoresSum = userProgress.reduce((sum: number, p: any) => sum + (p.chapterScore || 0) + (p.moduleScore || 0), 0);
    const totalPossibleScore = userProgress.length * 40; // 20 points per chapter + 20 points per module
    const averageScore = totalPossibleScore > 0 ? Math.round((scoresSum / totalPossibleScore) * 20) : 0;
    
    let status = "Débutant";
    if (progressPercentage === 100) {
      status = userData.certificate ? "Certifié" : "Terminé";
    } else if (progressPercentage > 0) {
      status = "En cours";
    }

    return {
      ...userData,
      progressPercentage,
      averageScore,
      status,
      completedModules,
      totalModules
    };
  });

  // Filter users based on search and status
  const filteredUsers = processedUsers.filter((user: any) => {
    const matchesSearch = user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount);
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      "Certifié": "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg",
      "Terminé": "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg", 
      "En cours": "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg",
      "Débutant": "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg"
    };
    
    return (
      <Badge className={`${variants[status] || "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg"} px-3 py-1 font-medium`}>
        {status}
      </Badge>
    );
  };

  if (statsLoading || usersLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    SYCEBNL Formation
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">Administration</p>
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
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-800">{user?.fullName}</span>
                  <p className="text-xs text-gray-500">Administrateur</p>
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
                Dashboard Administrateur
              </h1>
              <p className="text-gray-600 text-lg">Gestion des apprenants et des certifications SYCEBNL</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 shadow-lg">
                <Activity className="w-4 h-4 mr-2" />
                Système actif
              </Badge>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Total Apprenants</p>
                  <p className="text-3xl font-bold">{formatCurrency(stats?.totalUsers || 0)}</p>
                  <p className="text-blue-100 text-xs mt-1">+12% ce mois</p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Users className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-emerald-100 text-sm font-medium mb-1">Certifications</p>
                  <p className="text-3xl font-bold">{stats?.totalCertificates || 0}</p>
                  <p className="text-emerald-100 text-xs mt-1">+8% ce mois</p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Award className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-purple-100 text-sm font-medium mb-1">Revenus</p>
                  <p className="text-3xl font-bold">{formatCurrency(stats?.totalRevenue || 0)}</p>
                  <p className="text-purple-100 text-xs mt-1">FCFA</p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-orange-100 text-sm font-medium mb-1">Taux de Réussite</p>
                  <p className="text-3xl font-bold">{stats?.successRate || 0}%</p>
                  <p className="text-orange-100 text-xs mt-1">Excellent</p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Students Table */}
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-800">Liste des Apprenants</CardTitle>
                  <p className="text-sm text-gray-600">Gestion et suivi des étudiants</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher un apprenant..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="cours">En cours</SelectItem>
                    <SelectItem value="terminé">Terminé</SelectItem>
                    <SelectItem value="certifié">Certifié</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Apprenant
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Progression
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Score Moyen
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Inscription
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredUsers.map((userData: any, index: number) => (
                    <tr key={userData.id} className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                              {userData.fullName ? userData.fullName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'NA'}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">{userData.fullName || 'N/A'}</div>
                            <div className="text-sm text-gray-500">{userData.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-1 bg-gray-200 rounded-full h-3 mr-3 w-20 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 shadow-sm" 
                              style={{ width: `${userData.progressPercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{userData.progressPercentage}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-semibold text-gray-900">{userData.averageScore}/20</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(userData.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('fr-FR') : 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Voir
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className={userData.certificate ? "text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 transition-colors" : "text-gray-400 cursor-not-allowed"}
                            disabled={!userData.certificate}
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            Certificat
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg font-medium">Aucun apprenant trouvé</p>
                  <p className="text-gray-400 text-sm">Essayez de modifier vos critères de recherche</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Contact Messages Section */}
        {messages.length > 0 && (
          <Card className="mt-8 border-0 shadow-2xl bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-800">Messages de Contact Récents</CardTitle>
                  <p className="text-sm text-gray-600">Dernières demandes des apprenants</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {messages.slice(0, 5).map((message: any, index: number) => (
                  <div key={message.id} className="group hover:shadow-lg transition-all duration-200 rounded-xl p-4 border border-gray-100 hover:border-purple-200 bg-gradient-to-r from-white to-purple-50/30">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                            {message.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{message.name}</p>
                            <p className="text-sm text-gray-600">{message.email}</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-purple-800 mb-1">{message.subject}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
                      </div>
                      <div className="text-xs text-gray-500 ml-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(message.createdAt).toLocaleDateString('fr-FR')}</span>
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

