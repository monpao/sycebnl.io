import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { X, Mail, Lock, User, Eye, EyeOff, Shield, CheckCircle, Star, BookOpen } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
    acceptTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast({
          title: "🎉 Connexion réussie",
          description: "Bienvenue sur la plateforme SYCEBNL !",
        });
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Les mots de passe ne correspondent pas");
        }
        if (!formData.acceptTerms) {
          throw new Error("Vous devez accepter les conditions d'utilisation");
        }
        if (formData.password.length < 6) {
          throw new Error("Le mot de passe doit contenir au moins 6 caractères");
        }
        await register(formData.email, formData.password, formData.fullName);
        toast({
          title: "🎉 Inscription réussie",
          description: "Votre compte a été créé avec succès ! Vous pouvez maintenant accéder à la formation.",
        });
      }
      onClose();
      // Reset form
      setFormData({
        email: "",
        password: "",
        fullName: "",
        confirmPassword: "",
        acceptTerms: false
      });
    } catch (error: any) {
      toast({
        title: "❌ Erreur",
        description: error.message || "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const benefits = [
    {
      icon: <BookOpen className="w-4 h-4 text-blue-500" />,
      text: "Accès à tous les modules de formation"
    },
    {
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
      text: "Quiz interactifs et évaluations"
    },
    {
      icon: <Star className="w-4 h-4 text-yellow-500" />,
      text: "Certification internationale reconnue"
    },
    {
      icon: <Shield className="w-4 h-4 text-purple-500" />,
      text: "Support pédagogique 24/7"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl max-h-[95vh] p-0 overflow-hidden bg-white border-0 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left Side - Branding (Hidden on mobile) */}
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 p-6 lg:p-8 text-white relative overflow-hidden hidden lg:block">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-center">
              <div className="flex items-center space-x-2 mb-8">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">SYCEBNL Formation</h2>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">
                  {isLogin ? "Bon retour !" : "Rejoignez-nous"}
                </h3>
                <p className="text-white/90 leading-relaxed">
                  {isLogin 
                    ? "Connectez-vous pour continuer votre parcours de formation en comptabilité des projets SYCEBNL."
                    : "Créez votre compte gratuit et commencez votre formation certifiante en comptabilité des projets SYCEBNL."
                  }
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Avec votre compte :</h4>
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-white/20 rounded-lg p-2 flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <span className="text-sm text-white/90">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {!isLogin && (
                <div className="mt-8 bg-white/10 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-300" />
                    <span className="font-semibold">Formation 100% Gratuite</span>
                  </div>
                  <p className="text-sm text-white/80">
                    Accès illimité à tous les contenus. Seule la certification est payante (30 000 FCFA).
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-6 lg:p-8 overflow-y-auto max-h-[95vh] flex flex-col">
            {/* Mobile Header */}
            <div className="lg:hidden mb-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SYCEBNL Formation
                </h2>
              </div>
            </div>

            <DialogHeader className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-2xl font-bold text-gray-900">
                    {isLogin ? "Connexion" : "Inscription"}
                  </DialogTitle>
                  <p className="text-gray-600 mt-1">
                    {isLogin ? "Accédez à votre espace formation" : "Créez votre compte en quelques secondes"}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-100 flex-shrink-0">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-gray-700 font-medium">Nom complet *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="Votre nom complet"
                        className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="votre@email.com"
                      className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Mot de passe * {!isLogin && <span className="text-xs text-gray-500">(min. 6 caractères)</span>}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder={isLogin ? "Votre mot de passe" : "Choisissez un mot de passe"}
                      className="pl-10 pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-gray-100"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirmer le mot de passe *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        placeholder="Confirmez votre mot de passe"
                        className="pl-10 pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-gray-100"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-xs text-red-500">Les mots de passe ne correspondent pas</p>
                    )}
                  </div>
                )}
                
                {isLogin && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm text-gray-600">
                        Se souvenir de moi
                      </Label>
                    </div>
                    <Button variant="link" className="text-sm p-0 text-blue-600 hover:text-blue-800">
                      Mot de passe oublié ?
                    </Button>
                  </div>
                )}
                
                {!isLogin && (
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="acceptTerms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => handleInputChange("acceptTerms", checked)}
                        required
                        className="mt-1"
                      />
                      <Label htmlFor="acceptTerms" className="text-sm text-gray-600 leading-relaxed">
                        J'accepte les{" "}
                        <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">
                          conditions d'utilisation
                        </Button>{" "}
                        et la{" "}
                        <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">
                          politique de confidentialité
                        </Button>
                      </Label>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Vos données sont sécurisées</span>
                      </div>
                      <p className="text-xs text-green-700 mt-1">
                        Nous utilisons un chiffrement de niveau bancaire pour protéger vos informations.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="space-y-3 pt-2">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading || (!isLogin && !formData.acceptTerms)}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {isLogin ? "Connexion..." : "Création du compte..."}
                      </>
                    ) : (
                      <>
                        {isLogin ? (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Se connecter
                          </>
                        ) : (
                          <>
                            <User className="w-4 h-4 mr-2" />
                            Créer mon compte gratuit
                          </>
                        )}
                      </>
                    )}
                  </Button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">ou</span>
                    </div>
                  </div>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-gray-200 hover:bg-gray-50 font-medium py-3"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setFormData({
                        email: "",
                        password: "",
                        fullName: "",
                        confirmPassword: "",
                        acceptTerms: false
                      });
                    }}
                  >
                    {isLogin ? (
                      <>
                        <User className="w-4 h-4 mr-2" />
                        Créer un nouveau compte
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        J'ai déjà un compte
                      </>
                    )}
                  </Button>
                </div>
              </form>

              {!isLogin && (
                <div className="mt-6 text-center">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    🎓 Plus de 5000 étudiants nous font confiance
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

