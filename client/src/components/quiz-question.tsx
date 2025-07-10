import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizQuestionProps {
  question: Question;
  questionIndex: number;
  selectedAnswer?: number;
  onAnswerSelect: (questionIndex: number, answerIndex: number) => void;
  showCorrectAnswer?: boolean;
  pointsPerQuestion: number;
}

export function QuizQuestion({ 
  question, 
  questionIndex, 
  selectedAnswer, 
  onAnswerSelect, 
  showCorrectAnswer = false,
  pointsPerQuestion 
}: QuizQuestionProps) {
  
  const getOptionIcon = (optionIndex: number) => {
    if (!showCorrectAnswer) return null;
    
    if (optionIndex === question.correctAnswer) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (optionIndex === selectedAnswer && selectedAnswer !== question.correctAnswer) {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  const getOptionStyles = (optionIndex: number) => {
    if (!showCorrectAnswer) {
      return selectedAnswer === optionIndex
        ? "border-primary bg-primary/5 text-primary"
        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50";
    }

    if (optionIndex === question.correctAnswer) {
      return "border-green-500 bg-green-50 text-green-900";
    } else if (optionIndex === selectedAnswer && selectedAnswer !== question.correctAnswer) {
      return "border-red-500 bg-red-50 text-red-900";
    } else {
      return "border-gray-200 bg-gray-50 text-gray-600";
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            Question {questionIndex + 1}
          </CardTitle>
          <Badge variant="outline" className="text-primary border-primary">
            {pointsPerQuestion} point{pointsPerQuestion > 1 ? "s" : ""}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-gray-900 text-lg leading-relaxed">
          {question.question}
        </div>

        <div className="space-y-3">
          {question.options.map((option, optionIndex) => (
            <Button
              key={optionIndex}
              variant="outline"
              className={`w-full text-left p-4 h-auto justify-start ${getOptionStyles(optionIndex)}`}
              onClick={() => !showCorrectAnswer && onAnswerSelect(questionIndex, optionIndex)}
              disabled={showCorrectAnswer}
            >
              <div className="flex items-center space-x-3 w-full">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium ${
                  selectedAnswer === optionIndex && !showCorrectAnswer
                    ? "border-primary bg-primary text-white"
                    : "border-gray-300 text-gray-600"
                }`}>
                  {String.fromCharCode(65 + optionIndex)}
                </div>
                <span className="flex-1">{option}</span>
                {getOptionIcon(optionIndex)}
              </div>
            </Button>
          ))}
        </div>

        {showCorrectAnswer && question.explanation && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Explication</h4>
                <p className="text-blue-800 text-sm">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {showCorrectAnswer && (
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-sm text-gray-600">
              Réponse correcte : {String.fromCharCode(65 + question.correctAnswer)}
            </span>
            <span className={`text-sm font-medium ${
              selectedAnswer === question.correctAnswer ? "text-green-600" : "text-red-600"
            }`}>
              {selectedAnswer === question.correctAnswer 
                ? `+${pointsPerQuestion} point${pointsPerQuestion > 1 ? "s" : ""}` 
                : "0 point"
              }
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
