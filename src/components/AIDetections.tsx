import React from 'react';
import { Brain, Eye, EyeOff, CheckCircle, AlertTriangle } from 'lucide-react';
import { AIDetection } from '../types/medical';

interface AIDetectionsProps {
  detections: AIDetection[];
  visibleDetections: Set<string>;
  onToggleDetection: (id: string) => void;
  onSelectDetection: (detection: AIDetection) => void;
}

export const AIDetections: React.FC<AIDetectionsProps> = ({
  detections,
  visibleDetections,
  onToggleDetection,
  onSelectDetection
}) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/10';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10';
      case 'low': return 'text-green-400 bg-green-500/10';
      default: return 'text-slate-400 bg-slate-500/10';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">AI Detections</h3>
        <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
          {detections.length} findings
        </span>
      </div>
      
      <div className="space-y-3">
        {detections.map((detection) => (
          <div
            key={detection.id}
            className="bg-slate-700/50 rounded-lg p-3 border border-slate-600 hover:border-slate-500 transition-colors cursor-pointer"
            onClick={() => onSelectDetection(detection)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`px-2 py-1 rounded-full text-xs flex items-center space-x-1 ${getSeverityColor(detection.severity)}`}>
                  {getSeverityIcon(detection.severity)}
                  <span className="capitalize">{detection.severity}</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleDetection(detection.id);
                }}
                className="p-1 hover:bg-slate-600 rounded transition-colors"
              >
                {visibleDetections.has(detection.id) ? (
                  <Eye className="w-4 h-4 text-blue-400" />
                ) : (
                  <EyeOff className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>
            
            <div className="space-y-1">
              <h4 className="font-medium text-white text-sm">{detection.label}</h4>
              <p className="text-slate-300 text-xs">{detection.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Confidence: {(detection.confidence * 100).toFixed(1)}%
                </span>
                <span className="text-slate-400">
                  Size: {detection.boundingBox.width}×{detection.boundingBox.height}px
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};