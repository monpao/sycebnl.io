import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Play } from "lucide-react";

interface ModuleCardProps {
  module: {
    id: number;
    title: string;
    description: string;
    orderIndex: number;
  };
  progress?: {
    id: number;
    status: string;
    chapterScore: number;
    moduleScore: number;
  };
  onStart: () => void;
}

export function ModuleCard({ module, progress, onStart }: ModuleCardProps) {
  const isCompleted = progress?.status === "completed";
  const isInProgress = progress?.status === "in_progress";
  const isNotStarted = !progress || progress.status === "not_started";
  
  const chapterScore = progress?.chapterScore || 0;
  const moduleScore = progress?.moduleScore || 0;
  const totalScore = chapterScore + moduleScore;
  
  // Calculate progress percentage based on status
  let progressPercentage = 0;
  if (isCompleted) progressPercentage = 100;
  else if (isInProgress) progressPercentage = 50;
  
  const getStatusBadge = () => {
    if (isCompleted) {
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Terminé
        </Badge>
      );
    } else if (isInProgress) {
      return (
        <Badge className="bg-blue-100 text-blue-800">
          <Clock className="h-3 w-3 mr-1" />
          En cours
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline">
          À commencer
        </Badge>
      );
    }
  };

  const getButtonText = () => {
    if (isCompleted) return "Revoir le module";
    if (isInProgress) return "Continuer le module";
    return "Commencer le module";
  };

  const getButtonIcon = () => {
    if (isCompleted) return <CheckCircle className="h-4 w-4 mr-2" />;
    return <Play className="h-4 w-4 mr-2" />;
  };

  return (
    <Card className={`shadow-lg border-0 ${isInProgress ? 'border-2 border-primary' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{module.title}</h3>
          {getStatusBadge()}
        </div>
        
        <p className="text-gray-600 mb-4">{module.description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progression</span>
            <span>{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="w-full" />
        </div>
        
        {progress && (
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">QCM Chapitre</span>
              <span className="text-sm font-medium">
                {chapterScore > 0 ? `${chapterScore}/20` : "Pas encore"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Devoir Module</span>
              <span className="text-sm font-medium">
                {moduleScore > 0 ? `${moduleScore}/20` : "Pas encore"}
              </span>
            </div>
            {totalScore > 0 && (
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm font-medium text-gray-700">Score Total</span>
                <span className={`text-sm font-bold ${totalScore >= 16 ? 'text-green-600' : 'text-orange-600'}`}>
                  {totalScore}/40
                </span>
              </div>
            )}
          </div>
        )}
        
        <Button 
          onClick={onStart}
          className={`w-full ${
            isCompleted 
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
              : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          {getButtonIcon()}
          {getButtonText()}
        </Button>
      </CardContent>
    </Card>
  );
}
