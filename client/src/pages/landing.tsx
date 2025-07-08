import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuthModal } from "@/components/auth-modal";
import { BookOpen, Award, Users, TrendingUp, CheckCircle, Star, Globe, Shield, Clock, Target } from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const features = [
    {
      icon: <BookOpen className="w-10 h-10 text-white" />,
      title: "Formation Gratuite",
      description: "Accès libre à tous les modules de formation SYCEBNL avec contenu premium",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      highlight: "100% Gratuit"
    },
    {
      icon: <Award className="w-10 h-10 text-white" />,
      title: "Certification Internationale",
      description: "Certificat reconnu SYCEBNL validé par des experts internationaux",
      bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      highlight: "Reconnu Mondialement"
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-white" />,
      title: "Apprentissage Adaptatif",
      description: "IA intégrée pour personnaliser votre parcours d'apprentissage",
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
      highlight: "Technologie IA"
    }
  ];

  const stats = [
    { number: "5000+", label: "Étudiants Formés", icon: <Users className="w-6 h-6" /> },
    { number: "98%", label: "Taux de Réussite", icon: <Target className="w-6 h-6" /> },
    { number: "24/7", label: "Support Disponible", icon: <Clock className="w-6 h-6" /> },
    { number: "15+", label: "Pays Participants", icon: <Globe className="w-6 h-6" /> }
  ];

  const modules = [
    {
      number: 1,
      title: "Fondamentaux de la Comptabilité des Projets SYCEBNL",
      description: "Maîtrisez les bases essentielles avec des exemples concrets et des cas d'usage réels",
      topics: ["Introduction au SYCEBNL", "Architecture du plan comptable", "Principes fondamentaux", "Normes internationales"],
      duration: "4h",
      level: "Débutant",
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: 2,
      title: "Tableau de Flux de Trésorerie",
      description: "Élaborez des tableaux de flux professionnels avec méthodologie avancée",
      topics: ["Méthodologie des flux", "Activités opérationnelles", "Analyses avancées", "Cas pratiques"],
      duration: "5h",
      level: "Intermédiaire",
      color: "from-emerald-500 to-teal-500"
    },
    {
      number: 3,
      title: "Tableau Emplois-Ressources",
      description: "Optimisez la gestion des ressources avec des outils d'analyse performants",
      topics: ["Identification stratégique", "Comptabilisation avancée", "Contrôle budgétaire", "Optimisation"],
      duration: "4h",
      level: "Intermédiaire",
      color: "from-purple-500 to-indigo-500"
    },
    {
      number: 4,
      title: "Analyse Financière et Ratios",
      description: "Développez une expertise en analyse avec des techniques de pointe",
      topics: ["Ratios avancés", "Indicateurs KPI", "Évaluation performance", "Benchmarking"],
      duration: "6h",
      level: "Avancé",
      color: "from-orange-500 to-red-500"
    },
    {
      number: 5,
      title: "Cas Pratiques et Applications",
      description: "Appliquez vos connaissances sur des projets réels avec accompagnement expert",
      topics: ["Étude de cas VERDAS", "Projets complexes", "Synthèse experte", "Certification"],
      duration: "8h",
      level: "Expert",
      color: "from-pink-500 to-rose-500"
    }
  ];

  const testimonials = [
    {
      name: "Marie Kouassi",
      role: "Directrice Financière, ONG Internationale",
      content: "Cette formation a transformé ma compréhension de la comptabilité des projets. Les modules sont exceptionnellement bien structurés.",
      rating: 5,
      avatar: "MK"
    },
    {
      name: "Jean-Baptiste Togo",
      role: "Consultant en Gestion de Projets",
      content: "La certification SYCEBNL m'a ouvert de nouvelles opportunités professionnelles. Je recommande vivement cette formation.",
      rating: 5,
      avatar: "JT"
    },
    {
      name: "Fatou Diallo",
      role: "Responsable Comptable",
      content: "L'approche pratique et les cas concrets font toute la différence. Une formation de qualité internationale.",
      rating: 5,
      avatar: "FD"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg fixed w-full top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SYCEBNL Formation
                </h1>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Accueil
              </a>
              <a href="#formation" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Formation
              </a>
              <a href="#temoignages" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Témoignages
              </a>
              <button 
                onClick={() => setLocation("/contact")}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Contact
              </button>
            </div>
            <Button 
              onClick={() => setShowAuthModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
            >
              Connexion
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-4 py-2">
              🎓 Formation Certifiante Internationale
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
              Maîtrisez la Comptabilité
              <span className="block text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                des Projets SYCEBNL
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Formation complète et certifiante pour devenir expert en comptabilité des projets selon les normes internationales SYCEBNL
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={() => setShowAuthModal(true)}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                🚀 Commencer Maintenant
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 text-lg font-semibold px-8 py-4"
                onClick={() => document.getElementById('formation')?.scrollIntoView({ behavior: 'smooth' })}
              >
                📖 Découvrir le Programme
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2 text-blue-600">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-0">
              ✨ Avantages Exclusifs
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Pourquoi choisir notre formation ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une expérience d'apprentissage révolutionnaire avec des technologies de pointe et un accompagnement personnalisé
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:scale-105 overflow-hidden">
                <CardContent className="p-8 text-center relative">
                  <Badge className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 text-xs">
                    {feature.highlight}
                  </Badge>
                  <div className={`w-20 h-20 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Structure */}
      <section id="formation" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-purple-100 text-purple-800 border-0">
              📚 Programme Complet
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Programme de Formation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              5 modules progressifs conçus par des experts pour vous mener de débutant à expert certifié
            </p>
          </div>
          <div className="space-y-8">
            {modules.map((module, index) => (
              <Card key={module.number} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${module.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0`}>
                      {module.number}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-gray-900">{module.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {module.duration}
                        </Badge>
                        <Badge className={`text-xs ${
                          module.level === 'Débutant' ? 'bg-green-100 text-green-800' :
                          module.level === 'Intermédiaire' ? 'bg-yellow-100 text-yellow-800' :
                          module.level === 'Avancé' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {module.level}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4 text-lg leading-relaxed">{module.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {module.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center text-sm text-gray-600 bg-white rounded-lg px-3 py-2 shadow-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="temoignages" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-green-100 text-green-800 border-0">
              💬 Témoignages
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ce que disent nos étudiants
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les retours d'expérience de professionnels qui ont transformé leur carrière grâce à notre formation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à transformer votre carrière ?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Rejoignez plus de 5000 professionnels qui ont déjà maîtrisé la comptabilité des projets SYCEBNL et boosté leur carrière
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => setShowAuthModal(true)}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg font-semibold px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              🎯 S'inscrire Maintenant
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg font-semibold px-8 py-4"
              onClick={() => setLocation("/contact")}
            >
              💬 Nous Contacter
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">SYCEBNL Formation</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                La référence en formation certifiante pour la comptabilité des projets selon les normes internationales SYCEBNL.
              </p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4 text-white">Formation</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Modules de formation</li>
                <li className="hover:text-white transition-colors cursor-pointer">Évaluations QCM</li>
                <li className="hover:text-white transition-colors cursor-pointer">Certification</li>
                <li className="hover:text-white transition-colors cursor-pointer">Support pédagogique</li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">FAQ</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
                <li className="hover:text-white transition-colors cursor-pointer">Documentation</li>
                <li className="hover:text-white transition-colors cursor-pointer">Assistance 24/7</li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4 text-white">Informations</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Conditions d'utilisation</li>
                <li className="hover:text-white transition-colors cursor-pointer">Politique de confidentialité</li>
                <li className="hover:text-white transition-colors cursor-pointer">Certification internationale</li>
                <li className="hover:text-white transition-colors cursor-pointer">Tarifs</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">&copy; 2024 SYCEBNL Formation. Tous droits réservés.</p>
            <div className="flex items-center space-x-4">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">Certification sécurisée et reconnue</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}

