import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressCardProps {
  title: string;
  value: string | React.ReactNode;
  subtitle?: string;
  progress?: number;
  color: "primary" | "secondary" | "accent" | "default";
}

export function ProgressCard({ title, value, subtitle, progress, color }: ProgressCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "text-primary";
      case "secondary":
        return "text-secondary";
      case "accent":
        return "text-accent";
      default:
        return "text-gray-900";
    }
  };

  return (
    <Card className="bg-white shadow-lg border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className={`text-2xl font-bold ${getColorClasses(color)}`}>
            {value}
          </div>
        </div>
        {progress !== undefined && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                color === "primary" ? "bg-primary" : 
                color === "secondary" ? "bg-secondary" : 
                color === "accent" ? "bg-accent" : "bg-gray-600"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        {subtitle && (
          <div className="text-sm text-gray-600">{subtitle}</div>
        )}
      </CardContent>
    </Card>
  );
}
