import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuthModal } from "@/components/auth-modal";
import { BookOpen, Award, Users, TrendingUp, CheckCircle, Star, Globe, Shield, Clock, Target, ArrowRight, Play, Download, Zap } from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <BookOpen className="w-10 h-10 text-white" />,
      title: "Formation Gratuite",
      description: "Accès libre à tous les modules de formation SYCEBNL avec contenu premium et ressources exclusives",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      highlight: "100% Gratuit",
      delay: "delay-100"
    },
    {
      icon: <Award className="w-10 h-10 text-white" />,
      title: "Certification Internationale",
      description: "Certificat reconnu SYCEBNL validé par des experts internationaux et accepté mondialement",
      bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      highlight: "Reconnu Mondialement",
      delay: "delay-200"
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-white" />,
      title: "Apprentissage Adaptatif",
      description: "Intelligence artificielle intégrée pour personnaliser votre parcours d'apprentissage selon vos besoins",
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
      highlight: "Technologie IA",
      delay: "delay-300"
    }
  ];

  const stats = [
    { number: "5000+", label: "Étudiants Formés", icon: <Users className="w-6 h-6" />, color: "text-blue-600" },
    { number: "98%", label: "Taux de Réussite", icon: <Target className="w-6 h-6" />, color: "text-emerald-600" },
    { number: "24/7", label: "Support Disponible", icon: <Clock className="w-6 h-6" />, color: "text-purple-600" },
    { number: "15+", label: "Pays Participants", icon: <Globe className="w-6 h-6" />, color: "text-orange-600" }
  ];

  const modules = [
    {
      number: 1,
      title: "Fondamentaux de la Comptabilité des Projets SYCEBNL",
      description: "Maîtrisez les bases essentielles avec des exemples concrets et des cas d'usage réels du terrain",
      topics: ["Introduction au SYCEBNL", "Architecture du plan comptable", "Principes fondamentaux", "Normes internationales"],
      duration: "4h",
      level: "Débutant",
      color: "from-blue-500 to-cyan-500",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      number: 2,
      title: "Tableau de Flux de Trésorerie",
      description: "Élaborez des tableaux de flux professionnels avec méthodologie avancée et outils modernes",
      topics: ["Méthodologie des flux", "Activités opérationnelles", "Analyses avancées", "Cas pratiques"],
      duration: "5h",
      level: "Intermédiaire",
      color: "from-emerald-500 to-teal-500",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      number: 3,
      title: "Tableau Emplois-Ressources",
      description: "Optimisez la gestion des ressources avec des outils d'analyse performants et stratégiques",
      topics: ["Identification stratégique", "Comptabilisation avancée", "Contrôle budgétaire", "Optimisation"],
      duration: "4h",
      level: "Intermédiaire",
      color: "from-purple-500 to-indigo-500",
      icon: <Target className="w-6 h-6" />
    },
    {
      number: 4,
      title: "Analyse Financière et Ratios",
      description: "Développez une expertise en analyse avec des techniques de pointe et indicateurs avancés",
      topics: ["Ratios avancés", "Indicateurs KPI", "Évaluation performance", "Benchmarking"],
      duration: "6h",
      level: "Avancé",
      color: "from-orange-500 to-red-500",
      icon: <Zap className="w-6 h-6" />
    },
    {
      number: 5,
      title: "Cas Pratiques et Applications",
      description: "Appliquez vos connaissances sur des projets réels avec accompagnement expert personnalisé",
      topics: ["Étude de cas VERDAS", "Projets complexes", "Synthèse experte", "Certification"],
      duration: "8h",
      level: "Expert",
      color: "from-pink-500 to-rose-500",
      icon: <Award className="w-6 h-6" />
    }
  ];

  const testimonials = [
    {
      name: "Marie Kouassi",
      role: "Directrice Financière, ONG Internationale",
      content: "Cette formation a transformé ma compréhension de la comptabilité des projets. Les modules sont exceptionnellement bien structurés et pratiques.",
      rating: 5,
      avatar: "MK",
      company: "Care International"
    },
    {
      name: "Jean-Baptiste Diallo",
      role: "Consultant Senior, Cabinet d'Audit",
      content: "La qualité pédagogique est remarquable. J'ai pu appliquer immédiatement les concepts appris dans mes missions client.",
      rating: 5,
      avatar: "JD",
      company: "KPMG Afrique"
    },
    {
      name: "Fatou Traoré",
      role: "Responsable Comptable, Ministère",
      content: "Formation complète et accessible. Le certificat SYCEBNL a valorisé mon profil professionnel de manière significative.",
      rating: 5,
      avatar: "FT",
      company: "Ministère des Finances"
    }
  ];

  const benefits = [
    "Accès illimité à tous les modules",
    "Support expert 24/7",
    "Certificat international reconnu",
    "Communauté d'apprentissage active",
    "Mises à jour de contenu régulières",
    "Outils pratiques téléchargeables"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation moderne */}
      <nav className={`fixed top-0 w-full z-50 glass border-b border-white/20 transition-all duration-700 ${isVisible ? 'animate-fade-in-down' : 'opacity-0'}`}>
        <div className="container-modern py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">SYCEBNL</h1>
                <p className="text-xs text-muted-foreground">Formation Certifiante</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => setLocation("/contact")}
                className="hover-scale"
              >
                Contact
              </Button>
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="btn-primary"
              >
                Commencer
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section Moderne */}
      <section className="section-padding pt-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container-modern relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge 
              className={`mb-6 bg-primary/10 text-primary border-primary/20 hover-scale ${isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}
            >
              <Star className="w-4 h-4 mr-2" />
              Formation #1 en Comptabilité des Projets
            </Badge>
            
            <h1 className={`text-responsive-xl font-bold mb-6 text-gradient leading-tight ${isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
              Maîtrisez la Comptabilité des Projets SYCEBNL
            </h1>
            
            <p className={`text-responsive-md text-muted-foreground mb-8 leading-relaxed ${isVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
              Formation gratuite avec certification internationale reconnue. 
              Développez votre expertise avec des modules interactifs et des cas pratiques réels.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 ${isVisible ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
              <Button 
                size="lg" 
                onClick={() => setShowAuthModal(true)}
                className="btn-primary text-lg px-8 py-4 hover-glow"
              >
                <Play className="w-5 h-5 mr-2" />
                Commencer Gratuitement
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="hover-lift border-2"
              >
                <Download className="w-5 h-5 mr-2" />
                Télécharger la Brochure
              </Button>
            </div>

            {/* Statistiques Hero */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${isVisible ? 'animate-fade-in-up delay-700' : 'opacity-0'}`}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-soft mb-3 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Améliorée */}
      <section className="section-padding bg-white/50">
        <div className="container-modern">
          <div className="text-center mb-16">
            <h2 className="text-responsive-lg font-bold mb-4 animate-fade-in-up">
              Pourquoi Choisir Notre Formation ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up delay-100">
              Une approche moderne et complète pour maîtriser la comptabilité des projets
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`card-modern hover-lift ${feature.delay} animate-fade-in-up`}>
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 hover-scale`}>
                    {feature.icon}
                  </div>
                  <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                    {feature.highlight}
                  </Badge>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section Modernisée */}
      <section className="section-padding">
        <div className="container-modern">
          <div className="text-center mb-16">
            <h2 className="text-responsive-lg font-bold mb-4 animate-fade-in-up">
              Programme de Formation Complet
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up delay-100">
              5 modules progressifs conçus par des experts pour vous mener de débutant à expert certifié
            </p>
          </div>
          
          <div className="space-y-8">
            {modules.map((module, index) => (
              <Card key={index} className={`card-modern hover-lift animate-fade-in-up delay-${index * 100}`}>
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className={`w-20 h-20 bg-gradient-to-br ${module.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-colored`}>
                        {module.number}
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h3 className="text-xl font-semibold">{module.title}</h3>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          {module.icon}
                          {module.level}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {module.duration}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">{module.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {module.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="outline" className="text-xs">
                            <CheckCircle className="w-3 h-3 mr-1 text-emerald-500" />
                            {topic}
                          </Badge>
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

      {/* Témoignages Modernisés */}
      <section className="section-padding bg-gradient-to-br from-slate-50 to-white">
        <div className="container-modern">
          <div className="text-center mb-16">
            <h2 className="text-responsive-lg font-bold mb-4 animate-fade-in-up">
              Ce Que Disent Nos Étudiants
            </h2>
            <p className="text-xl text-muted-foreground animate-fade-in-up delay-100">
              Plus de 5000 professionnels nous font confiance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className={`card-modern hover-lift animate-fade-in-up delay-${index * 100}`}>
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-xs text-primary font-medium">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Finale */}
      <section className="section-padding bg-gradient-to-br from-primary to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container-modern relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-responsive-lg font-bold mb-6 animate-fade-in-up">
              Prêt à Transformer Votre Carrière ?
            </h2>
            <p className="text-xl mb-8 opacity-90 animate-fade-in-up delay-100">
              Rejoignez des milliers de professionnels qui ont déjà obtenu leur certification SYCEBNL
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="text-left">
                <h4 className="font-semibold mb-3">Ce que vous obtenez :</h4>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3 text-emerald-300" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">0€</div>
                  <div className="text-lg opacity-90">Formation Gratuite</div>
                  <div className="text-sm opacity-75">Certification payante</div>
                </div>
              </div>
            </div>
            
            <Button 
              size="lg" 
              onClick={() => setShowAuthModal(true)}
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 hover-glow animate-fade-in-up delay-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Commencer Maintenant
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Moderne */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container-modern">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">SYCEBNL</h3>
                  <p className="text-sm text-slate-400">Formation Certifiante</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                La référence en formation comptabilité des projets avec certification internationale reconnue.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Formation</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Modules</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Certification</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>support@sycebnl.com</li>
                <li>+33 1 23 45 67 89</li>
                <li>Paris, France</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 SYCEBNL. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </div>
  );
}

