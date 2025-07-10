import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { QuizQuestion } from "@/components/quiz-question";
import { quizQuestions } from "@/lib/quiz-data";
import { ArrowLeft, Clock, CheckCircle, AlertCircle, User, LogOut } from "lucide-react";

export default function Quiz() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const moduleId = parseInt(params.moduleId || "1");
  const quizType = params.type as "chapter" | "module";
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  console.log("moduleId:", moduleId);
  console.log("quizType:", quizType);
  // Get questions for this module and type
  const questions = quizQuestions[moduleId as keyof typeof quizQuestions]?.[quizType] || [];
  console.log("questions.length:", questions.length);
  
  const { data: attempts = [] } = useQuery({
    queryKey: [`/api/quiz/attempts/${moduleId}/${quizType}`],
    queryFn: async () => {
      const response = await fetch(`/api/quiz/attempts/${moduleId}/${quizType}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.json();
    },
  });

  const submitAnswerMutation = useMutation({
    mutationFn: async (answerData: any) => {
      const response = await fetch("/api/quiz/attempt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(answerData),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/quiz/attempts/${moduleId}/${quizType}`] });
    },
  });

  const updateProgressMutation = useMutation({
    mutationFn: async (progressData: any) => {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(progressData),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
    },
  });

  useEffect(() => {
    // Check if quiz was already completed
    if (attempts.length > 0) {
      const latestAttempts = attempts.slice(0, questions.length);
      if (latestAttempts.length === questions.length) {
        setQuizCompleted(true);
        // Populate answers from latest attempt
        const answersFromAttempts: { [key: number]: number } = {};
        latestAttempts.forEach((attempt: any) => {
          const questionIndex = questions.findIndex(q => q.id === attempt.questionId);
          if (questionIndex !== -1) {
            answersFromAttempts[questionIndex] = attempt.selectedAnswer;
          }
        });
        setAnswers(answersFromAttempts);
      }
    }
  }, [attempts, questions]);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Quiz non disponible</h1>
          <Button onClick={() => setLocation(`/module/${moduleId}`)}>
            Retour au module
          </Button>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (!quizCompleted) {
      setAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (Object.keys(answers).length !== questions.length) {
      toast({
        title: "Quiz incomplet",
        description: "Veuillez répondre à toutes les questions avant de soumettre.",
        variant: "destructive",
      });
      return;
    }

    try {
      let totalScore = 0;
      const pointsPerQuestion = quizType === "chapter" ? 2 : 1;

      // Submit each answer
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const selectedAnswer = answers[i];
        const isCorrect = selectedAnswer === question.correctAnswer;
        const score = isCorrect ? pointsPerQuestion : 0;
        totalScore += score;

        await submitAnswerMutation.mutateAsync({
          moduleId,
          questionId: question.id,
          type: quizType,
          selectedAnswer,
          isCorrect,
          score,
        });
      }

      // Update progress if score is sufficient
      const minScore = 16; // Total minimum score across chapter + module
      const currentAttempts = await queryClient.getQueryData([`/api/quiz/attempts/${moduleId}/${quizType}`]) as any[];
      
      // Calculate total score for this module (chapter + module quiz)
      const chapterAttempts = currentAttempts?.filter((a: any) => a.type === "chapter") || [];
      const moduleAttempts = currentAttempts?.filter((a: any) => a.type === "module") || [];
      
      const chapterScore = chapterAttempts.reduce((sum: number, a: any) => sum + a.score, 0);
      const moduleScore = moduleAttempts.reduce((sum: number, a: any) => sum + a.score, 0);
      
      const newChapterScore = quizType === "chapter" ? totalScore : chapterScore;
      const newModuleScore = quizType === "module" ? totalScore : moduleScore;
      const totalModuleScore = newChapterScore + newModuleScore;

      if (totalModuleScore >= minScore) {
        await updateProgressMutation.mutateAsync({
          moduleId,
          status: "completed",
          chapterScore: newChapterScore,
          moduleScore: newModuleScore,
        });
      }

      setQuizCompleted(true);
      setShowResults(true);

      toast({
        title: "Quiz terminé !",
        description: `Score obtenu : ${totalScore}/${questions.length * pointsPerQuestion}${
          totalModuleScore >= minScore ? " - Module validé !" : ""
        }`,
        variant: totalModuleScore >= minScore ? "default" : "destructive",
      });

    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la soumission du quiz.",
        variant: "destructive",
      });
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  };

  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);
  const pointsPerQuestion = quizType === "chapter" ? 2 : 1;
  const maxScore = questions.length * pointsPerQuestion;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setLocation(`/module/${moduleId}`)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au module
              </Button>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quiz Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="outline" className="text-primary border-primary">
              Module {moduleId}
            </Badge>
            <Badge className={quizType === "chapter" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}>
              <Clock className="h-3 w-3 mr-1" />
              {quizType === "chapter" ? "QCM Chapitre" : "Devoir Module"}
            </Badge>
            {quizCompleted && (
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Terminé
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {quizType === "chapter" ? "QCM Chapitre" : "Devoir Module"}
          </h1>
          <p className="text-lg text-gray-600">
            {questions.length} questions • {pointsPerQuestion} point{pointsPerQuestion > 1 ? "s" : ""} par réponse • Score minimum : 16/20 total
          </p>
        </div>

        {!showResults ? (
          <>
            {/* Progress Bar */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Question {currentQuestion + 1} sur {questions.length}
                  </span>
                  <span className="text-sm font-medium text-gray-700">{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </CardContent>
            </Card>

            {/* Question Card */}
            <QuizQuestion
              question={questions[currentQuestion]}
              questionIndex={currentQuestion}
              selectedAnswer={answers[currentQuestion]}
              onAnswerSelect={handleAnswerSelect}
              showCorrectAnswer={quizCompleted}
              pointsPerQuestion={pointsPerQuestion}
            />

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Question précédente
              </Button>

              <div className="flex space-x-4">
                {currentQuestion === questions.length - 1 && !quizCompleted && (
                  <Button
                    onClick={handleSubmitQuiz}
                    className="bg-primary hover:bg-primary/90"
                    disabled={Object.keys(answers).length !== questions.length}
                  >
                    Terminer le quiz
                  </Button>
                )}
              </div>

              <Button
                variant="outline"
                onClick={handleNext}
                disabled={currentQuestion === questions.length - 1}
              >
                Question suivante
              </Button>
            </div>
          </>
        ) : (
          /* Results */
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Résultats du Quiz</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-4xl font-bold text-primary mb-4">
                  {calculateScore() * pointsPerQuestion}/{maxScore}
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Vous avez obtenu {calculateScore()} bonnes réponses sur {questions.length}
                </p>
                
                {calculateScore() * pointsPerQuestion >= (maxScore * 0.8) ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-green-800 font-medium">Excellent travail !</p>
                    <p className="text-green-700 text-sm">Vous maîtrisez bien ce module.</p>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <AlertCircle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                    <p className="text-yellow-800 font-medium">Bon effort !</p>
                    <p className="text-yellow-700 text-sm">Vous pouvez réviser et refaire le quiz si besoin.</p>
                  </div>
                )}

                <div className="flex justify-center space-x-4">
                  <Button onClick={() => setLocation(`/module/${moduleId}`)}>
                    Retour au module
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setLocation("/dashboard")}
                  >
                    Dashboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
