import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail, Phone, MapPin, User, LogOut, Clock, CheckCircle, Star, Globe, Shield, MessageCircle, CreditCard, HelpCircle } from "lucide-react";

export default function Contact() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: user?.fullName || "",
    email: user?.email || "",
    subject: "",
    message: ""
  });

  const submitMessageMutation = useMutation({
    mutationFn: async (messageData: any) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      setFormData({
        name: user?.fullName || "",
        email: user?.email || "",
        subject: "",
        message: ""
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      });
      return;
    }

    await submitMessageMutation.mutateAsync(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-white" />,
      title: "Email",
      value: "sycebnlprojet@gmail.com",
      description: "Réponse sous 24h",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      action: "mailto:sycebnlprojet@gmail.com"
    },
    {
      icon: <Phone className="w-6 h-6 text-white" />,
      title: "Téléphone",
      value: "+229 01 60 58 00 11",
      description: "Lun-Ven 8h-17h",
      bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      action: "tel:+22901605800011"
    },
    {
      icon: <MapPin className="w-6 h-6 text-white" />,
      title: "Adresse",
      value: "Centre de Formation SYCEBNL",
      description: "Bénin",
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
      action: null
    }
  ];

  const faqs = [
    {
      question: "Comment obtenir mon certificat ?",
      answer: "Terminez tous les modules avec un score minimum de 16/20, puis contactez-nous pour le paiement de 30 000 FCFA.",
      icon: <CheckCircle className="w-5 h-5 text-green-500" />
    },
    {
      question: "Combien de temps pour recevoir le certificat ?",
      answer: "Après confirmation du paiement, le certificat est généralement disponible sous 2-3 jours ouvrables.",
      icon: <Clock className="w-5 h-5 text-blue-500" />
    },
    {
      question: "Le certificat est-il reconnu internationalement ?",
      answer: "Oui, le certificat SYCEBNL est reconnu dans tous les pays utilisant ce système comptable.",
      icon: <Globe className="w-5 h-5 text-purple-500" />
    },
    {
      question: "Puis-je refaire un quiz ?",
      answer: "Oui, vous pouvez refaire les quiz autant de fois que nécessaire pour atteindre le score minimum.",
      icon: <Star className="w-5 h-5 text-yellow-500" />
    },
    {
      question: "Y a-t-il une limite de temps pour la formation ?",
      answer: "Non, vous pouvez progresser à votre rythme. L'accès à la formation est illimité.",
      icon: <Shield className="w-5 h-5 text-indigo-500" />
    },
    {
      question: "Comment signaler un problème technique ?",
      answer: "Utilisez ce formulaire avec le sujet 'Question technique' et décrivez le problème en détail.",
      icon: <HelpCircle className="w-5 h-5 text-orange-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setLocation(user ? "/dashboard" : "/")}
                className="hover:bg-blue-50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SYCEBNL Formation
                </h1>
              </div>
            </div>
            {user && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{user.fullName}</span>
                </div>
                <Button variant="outline" size="sm" onClick={logout} className="hover:bg-red-50 hover:border-red-200">
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-4 py-2">
            💬 Support & Contact
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Pour le paiement de votre certification, une question technique ou toute autre demande, 
            notre équipe d'experts est là pour vous accompagner dans votre parcours de formation.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:scale-105 overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 ${method.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{method.title}</h3>
                <p className="text-gray-900 font-medium mb-2">{method.value}</p>
                <p className="text-gray-600 text-sm">{method.description}</p>
                {method.action && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4"
                    onClick={() => window.open(method.action, '_blank')}
                  >
                    Contacter
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Certification Payment Info */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="flex items-center text-xl">
                <CreditCard className="w-6 h-6 mr-3" />
                Certification SYCEBNL
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">Certificat International</h4>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Une fois votre formation complétée avec succès, obtenez votre certificat reconnu internationalement.
                  </p>
                  <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                    <span className="font-semibold text-gray-700">Prix de la certification :</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      30 000 FCFA
                    </span>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-500" />
                    Modalités de paiement sécurisées :
                  </h5>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-orange-50 rounded-lg p-3 text-center">
                      <div className="font-medium text-orange-800">Orange Money</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-3 text-center">
                      <div className="font-medium text-yellow-800">MTN Money</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <div className="font-medium text-blue-800">Virement bancaire</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <div className="font-medium text-green-800">Western Union</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white">
                  <p className="text-sm leading-relaxed">
                    💡 <strong>Astuce :</strong> Contactez-nous avec le sujet "Paiement certification" pour recevoir les détails de paiement personnalisés.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="border-0 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
              <CardTitle className="flex items-center text-xl">
                <MessageCircle className="w-6 h-6 mr-3" />
                Envoyez-nous un message
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-medium">Nom complet *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Votre nom complet"
                      className="mt-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="votre@email.com"
                      className="mt-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-gray-700 font-medium">Sujet *</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                    <SelectTrigger className="mt-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Choisissez un sujet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="payment">💳 Paiement certification (30 000 FCFA)</SelectItem>
                      <SelectItem value="technical">🔧 Question technique</SelectItem>
                      <SelectItem value="account">👤 Problème de compte</SelectItem>
                      <SelectItem value="course">📚 Question sur le cours</SelectItem>
                      <SelectItem value="certificate">🏆 Problème de certificat</SelectItem>
                      <SelectItem value="other">❓ Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-700 font-medium">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Décrivez votre demande en détail..."
                    rows={6}
                    className="mt-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={submitMessageMutation.isPending}
                >
                  {submitMessageMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <CardTitle className="flex items-center text-2xl">
              <HelpCircle className="w-7 h-7 mr-3" />
              Questions fréquentes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {faq.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 leading-tight">{faq.question}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white overflow-hidden">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4">Besoin d'aide immédiate ?</h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Notre équipe de support est disponible pour vous accompagner dans votre parcours de formation SYCEBNL.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3"
                  onClick={() => window.open('tel:+22901605800011')}
                >
                  📞 Appeler maintenant
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3"
                  onClick={() => window.open('mailto:sycebnlprojet@gmail.com')}
                >
                  ✉️ Envoyer un email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

