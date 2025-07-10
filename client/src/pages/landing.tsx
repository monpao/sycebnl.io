import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuthModal } from "@/components/auth-modal";
import { BookOpen, Award, Users, TrendingUp, CheckCircle, Star, Globe, Shield, Clock, Target, ArrowRight, Play, Download, Zap, Sparkles, Rocket, Brain } from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Formation Gratuite Premium",
      description: "Accès illimité à tous les modules avec contenu exclusif, exercices interactifs et ressources téléchargeables",
      bgGradient: "from-blue-500 via-blue-600 to-indigo-600",
      highlight: "100% Gratuit",
      delay: "delay-100",
      stats: "5000+ étudiants"
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Certification Internationale",
      description: "Certificat SYCEBNL reconnu mondialement par les entreprises et institutions financières internationales",
      bgGradient: "from-emerald-500 via-emerald-600 to-teal-600",
      highlight: "Reconnu Mondialement",
      delay: "delay-200",
      stats: "98% de réussite"
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: "IA Personnalisée",
      description: "Intelligence artificielle avancée qui adapte le parcours d'apprentissage selon votre rythme et vos objectifs",
      bgGradient: "from-purple-500 via-purple-600 to-indigo-600",
      highlight: "Technologie IA",
      delay: "delay-300",
      stats: "Apprentissage adaptatif"
    }
  ];

  const stats = [
    { 
      number: "5000+", 
      label: "Étudiants Formés", 
      icon: <Users className="w-8 h-8" />, 
      color: "from-blue-500 to-blue-600",
      description: "Professionnels certifiés"
    },
    { 
      number: "98%", 
      label: "Taux de Réussite", 
      icon: <Target className="w-8 h-8" />, 
      color: "from-emerald-500 to-emerald-600",
      description: "Certification obtenue"
    },
    { 
      number: "24/7", 
      label: "Support Expert", 
      icon: <Clock className="w-8 h-8" />, 
      color: "from-purple-500 to-purple-600",
      description: "Assistance disponible"
    },
    { 
      number: "15+", 
      label: "Pays Participants", 
      icon: <Globe className="w-8 h-8" />, 
      color: "from-orange-500 to-orange-600",
      description: "Présence internationale"
    }
  ];

  const modules = [
    {
      number: 1,
      title: "Fondamentaux SYCEBNL",
      description: "Maîtrisez les bases essentielles avec des exemples concrets et une méthodologie éprouvée",
      topics: ["Introduction au SYCEBNL", "Architecture comptable", "Principes fondamentaux", "Normes internationales"],
      duration: "4h",
      level: "Débutant",
      gradient: "from-blue-500 to-cyan-500",
      icon: <BookOpen className="w-8 h-8" />,
      progress: 100,
      students: "2500+"
    },
    {
      number: 2,
      title: "Tableau de Flux de Trésorerie",
      description: "Élaborez des tableaux de flux professionnels avec méthodologie avancée et outils modernes",
      topics: ["Méthodologie des flux", "Activités opérationnelles", "Analyses avancées", "Cas pratiques"],
      duration: "5h",
      level: "Intermédiaire",
      gradient: "from-emerald-500 to-teal-500",
      icon: <TrendingUp className="w-8 h-8" />,
      progress: 85,
      students: "2100+"
    },
    {
      number: 3,
      title: "Tableau Emplois-Ressources",
      description: "Optimisez la gestion des ressources avec des outils d'analyse performants et stratégiques",
      topics: ["Identification stratégique", "Comptabilisation avancée", "Contrôle budgétaire", "Optimisation"],
      duration: "4h",
      level: "Intermédiaire",
      gradient: "from-purple-500 to-indigo-500",
      icon: <Target className="w-8 h-8" />,
      progress: 78,
      students: "1800+"
    },
    {
      number: 4,
      title: "Analyse Financière Avancée",
      description: "Développez une expertise en analyse avec des techniques de pointe et indicateurs avancés",
      topics: ["Ratios avancés", "Indicateurs KPI", "Évaluation performance", "Benchmarking"],
      duration: "6h",
      level: "Avancé",
      gradient: "from-orange-500 to-red-500",
      icon: <Zap className="w-8 h-8" />,
      progress: 92,
      students: "1500+"
    },
    {
      number: 5,
      title: "Certification & Cas Pratiques",
      description: "Appliquez vos connaissances sur des projets réels avec accompagnement expert personnalisé",
      topics: ["Étude de cas VERDAS", "Projets complexes", "Synthèse experte", "Certification finale"],
      duration: "8h",
      level: "Expert",
      gradient: "from-pink-500 to-rose-500",
      icon: <Award className="w-8 h-8" />,
      progress: 95,
      students: "1200+"
    }
  ];

  const testimonials = [
    {
      name: "Marie Kouassi",
      role: "Directrice Financière",
      content: "Cette formation a révolutionné ma compréhension de la comptabilité des projets. Les modules sont exceptionnellement bien structurés et les cas pratiques sont d'une qualité remarquable.",
      rating: 5,
      avatar: "MK",
      company: "Care International",
      location: "Abidjan, Côte d'Ivoire",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      name: "Jean-Baptiste Diallo",
      role: "Consultant Senior",
      content: "La qualité pédagogique est exceptionnelle. J'ai pu appliquer immédiatement les concepts appris dans mes missions client avec des résultats impressionnants.",
      rating: 5,
      avatar: "JD",
      company: "KPMG Afrique",
      location: "Dakar, Sénégal",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      name: "Fatou Traoré",
      role: "Responsable Comptable",
      content: "Formation complète et accessible. Le certificat SYCEBNL a considérablement valorisé mon profil professionnel et ouvert de nouvelles opportunités.",
      rating: 5,
      avatar: "FT",
      company: "Ministère des Finances",
      location: "Bamako, Mali",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const benefits = [
    { text: "Accès illimité à tous les modules", icon: <CheckCircle className="w-5 h-5" /> },
    { text: "Support expert 24/7", icon: <Shield className="w-5 h-5" /> },
    { text: "Certificat international reconnu", icon: <Award className="w-5 h-5" /> },
    { text: "Communauté d'apprentissage active", icon: <Users className="w-5 h-5" /> },
    { text: "Mises à jour de contenu régulières", icon: <Rocket className="w-5 h-5" /> },
    { text: "Outils pratiques téléchargeables", icon: <Download className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Effet de curseur lumineux */}
      <div 
        className="fixed pointer-events-none z-0 w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Navigation Ultra-Moderne */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-white/20 transition-all duration-700 ${isVisible ? 'animate-fade-in-down' : 'opacity-0'}`}>
        <div className="container-modern py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-float">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SYCEBNL
                </h1>
                <p className="text-xs text-slate-500 font-medium">Formation Certifiante Premium</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#modules" className="nav-item">Modules</a>
              <a href="#temoignages" className="nav-item">Témoignages</a>
              <a href="#certification" className="nav-item">Certification</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => setLocation("/contact")}
                className="hover-scale hidden sm:flex"
              >
                Contact
              </Button>
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="btn-modern btn-primary shadow-lg hover-glow"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Commencer
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section Ultra-Moderne */}
      <section className="section-padding pt-32 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container-modern relative">
          <div className="text-center max-w-5xl mx-auto">
            <Badge 
              className={`mb-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-6 py-2 text-sm font-semibold hover-scale ${isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}
            >
              <Star className="w-4 h-4 mr-2 animate-spin-slow" />
              Formation #1 en Comptabilité des Projets
            </Badge>
            
            <h1 className={`text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight ${isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient">
                Maîtrisez
              </span>
              <br />
              <span className="text-slate-800">
                la Comptabilité
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                SYCEBNL
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto ${isVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
              Formation gratuite avec certification internationale reconnue. 
              Développez votre expertise avec des modules interactifs, 
              une IA personnalisée et des cas pratiques réels.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 ${isVisible ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
              <Button 
                size="lg" 
                onClick={() => setShowAuthModal(true)}
                className="btn-modern btn-primary text-lg px-10 py-5 shadow-xl hover-glow relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Play className="w-6 h-6 mr-3 relative z-10" />
                <span className="relative z-10">Commencer Gratuitement</span>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="btn-modern border-2 border-slate-300 hover:border-blue-500 text-lg px-10 py-5 hover-lift"
              >
                <Download className="w-6 h-6 mr-3" />
                Télécharger la Brochure
              </Button>
            </div>

            {/* Statistiques Hero Modernisées */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${isVisible ? 'animate-fade-in-up delay-700' : 'opacity-0'}`}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${stat.color} shadow-xl mb-4 hover-scale group-hover:shadow-2xl transition-all duration-300`}>
                    <div className="text-white">
                      {stat.icon}
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-1">{stat.number}</div>
                  <div className="text-sm font-semibold text-slate-600 mb-1">{stat.label}</div>
                  <div className="text-xs text-slate-500">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Ultra-Moderne */}
      <section className="section-padding bg-gradient-to-br from-white to-blue-50/50">
        <div className="container-modern">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pourquoi Nous Choisir ?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto animate-fade-in-up delay-100">
              Une approche révolutionnaire pour maîtriser la comptabilité des projets
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <Card key={index} className={`card-modern hover-lift ${feature.delay} animate-fade-in-up group relative overflow-hidden border-0 shadow-xl`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <CardContent className="p-10 relative z-10">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.bgGradient} rounded-3xl flex items-center justify-center mb-8 hover-scale shadow-lg text-white`}>
                    {feature.icon}
                  </div>
                  <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-1">
                    {feature.highlight}
                  </Badge>
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-4 text-lg">{feature.description}</p>
                  <div className="text-sm font-semibold text-blue-600">{feature.stats}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section Ultra-Modernisée */}
      <section id="modules" className="section-padding">
        <div className="container-modern">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Programme Complet
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto animate-fade-in-up delay-100">
              5 modules progressifs conçus par des experts pour vous mener de débutant à expert certifié
            </p>
          </div>
          
          <div className="space-y-10">
            {modules.map((module, index) => (
              <Card key={index} className={`card-modern hover-lift animate-fade-in-up delay-${index * 100} group border-0 shadow-xl overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${module.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <CardContent className="p-10 relative z-10">
                  <div className="flex flex-col xl:flex-row gap-8">
                    <div className="flex-shrink-0">
                      <div className={`w-24 h-24 bg-gradient-to-br ${module.gradient} rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-xl hover-scale`}>
                        {module.number}
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-800">{module.title}</h3>
                        <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
                          {module.icon}
                          {module.level}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-2 px-4 py-2">
                          <Clock className="w-4 h-4" />
                          {module.duration}
                        </Badge>
                        <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 px-4 py-2">
                          {module.students} étudiants
                        </Badge>
                      </div>
                      
                      <p className="text-slate-600 mb-6 leading-relaxed text-lg">{module.description}</p>
                      
                      <div className="flex flex-wrap gap-3 mb-6">
                        {module.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="outline" className="text-sm px-3 py-1 hover-scale">
                            <CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />
                            {topic}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex-grow">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-600">Progression moyenne</span>
                            <span className="font-semibold text-slate-800">{module.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${module.gradient} transition-all duration-1000`}
                              style={{ width: `${module.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <Button variant="outline" className="hover-scale">
                          Voir le détail
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages Ultra-Modernisés */}
      <section id="temoignages" className="section-padding bg-gradient-to-br from-slate-50 to-white">
        <div className="container-modern">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Témoignages
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 animate-fade-in-up delay-100">
              Plus de 5000 professionnels nous font confiance dans le monde entier
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className={`card-modern hover-lift animate-fade-in-up delay-${index * 100} group border-0 shadow-xl overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-slate-600 mb-8 leading-relaxed text-lg italic">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="flex items-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${testimonial.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-lg">{testimonial.name}</div>
                      <div className="text-slate-600 mb-1">{testimonial.role}</div>
                      <div className="text-sm font-semibold text-blue-600">{testimonial.company}</div>
                      <div className="text-xs text-slate-500">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Ultra-Moderne */}
      <section id="certification" className="section-padding bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container-modern relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 animate-fade-in-up">
              Prêt à Transformer Votre Carrière ?
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 animate-fade-in-up delay-100">
              Rejoignez des milliers de professionnels qui ont déjà obtenu leur certification SYCEBNL
            </p>
            
            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <div className="text-left">
                <h4 className="text-2xl font-bold mb-6">Ce que vous obtenez :</h4>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center text-lg">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-4 text-emerald-300">
                        {benefit.icon}
                      </div>
                      {benefit.text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <div className="text-6xl font-bold mb-4">0€</div>
                  <div className="text-2xl font-semibold mb-2">Formation Gratuite</div>
                  <div className="text-lg opacity-75 mb-4">Certification payante</div>
                  <Badge className="bg-emerald-500 text-white border-0 px-4 py-2">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Offre Limitée
                  </Badge>
                </div>
              </div>
            </div>
            
            <Button 
              size="lg" 
              onClick={() => setShowAuthModal(true)}
              className="bg-white text-blue-600 hover:bg-white/90 text-xl px-12 py-6 shadow-2xl hover-glow animate-fade-in-up delay-300 font-bold"
            >
              <Rocket className="w-6 h-6 mr-3" />
              Commencer Maintenant
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Ultra-Moderne */}
      <footer className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="container-modern relative z-10">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    SYCEBNL
                  </h3>
                  <p className="text-slate-400">Formation Certifiante Premium</p>
                </div>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                La référence mondiale en formation comptabilité des projets avec certification internationale reconnue par les plus grandes entreprises.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Formation</h4>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors hover-scale inline-block">Modules</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover-scale inline-block">Certification</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover-scale inline-block">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover-scale inline-block">Communauté</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Contact</h4>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                  support@sycebnl.com
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  +33 1 23 45 67 89
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Paris, France
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p className="text-slate-400">
              &copy; 2024 SYCEBNL. Tous droits réservés. 
              <span className="mx-2">•</span>
              Conçu avec ❤️ pour l'excellence
            </p>
          </div>
        </div>
      </footer>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </div>
  );
}

