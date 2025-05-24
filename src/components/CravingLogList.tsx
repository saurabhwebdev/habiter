import { CravingLog } from "@/lib/types";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { 
  AlertTriangle, 
  Calendar, 
  MapPin, 
  ThermometerSun,
  Heart
} from "lucide-react";

interface CravingLogListProps {
  logs: CravingLog[];
  loading: boolean;
}

const CravingLogList = ({ logs, loading }: CravingLogListProps) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading craving logs...</p>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No craving logs found.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-350px)]">
      <div className="space-y-4 pr-4">
        {logs.map((log) => (
          <CravingLogCard key={log.id} log={log} />
        ))}
      </div>
    </ScrollArea>
  );
};

interface CravingLogCardProps {
  log: CravingLog;
}

const CravingLogCard = ({ log }: CravingLogCardProps) => {
  // Determine intensity level for styling
  const getIntensityColor = (intensity: number) => {
    if (intensity <= 3) return "bg-green-100 text-green-800";
    if (intensity <= 6) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const intensityColor = getIntensityColor(log.intensity);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">
              {log.trigger}
            </CardTitle>
            <CardDescription>
              <div className="flex items-center mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                {format(log.timestamp, "MMM d, yyyy 'at' h:mm a")}
              </div>
            </CardDescription>
          </div>
          <Badge className={intensityColor}>
            <ThermometerSun className="h-3 w-3 mr-1" />
            Intensity: {log.intensity}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Heart className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="font-medium">Emotion:</span>
              <span className="ml-2">{log.emotion}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="font-medium">Location:</span>
              <span className="ml-2">{log.location}</span>
            </div>
          </div>
          <div>
            <div className="text-sm">
              <span className="font-medium">Response:</span>
              <p className="mt-1">{log.action}</p>
            </div>
            {log.notes && (
              <div className="mt-2 text-sm">
                <span className="font-medium">Notes:</span>
                <p className="mt-1 text-muted-foreground">{log.notes}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4 p-2 bg-amber-50 rounded-md border border-amber-200">
          <div className="flex items-start">
            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 mr-2" />
            <div className="text-sm text-amber-800">
              <p className="font-medium">Pattern Insight:</p>
              <p>This craving occurred when you were feeling <strong>{log.emotion.toLowerCase()}</strong> at <strong>{log.location.toLowerCase()}</strong>. Consider preparing an alternative response for similar situations.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CravingLogList; 