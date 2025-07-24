import React from 'react';
import { 
  MousePointer, 
  Square, 
  Type, 
  Ruler, 
  Move, 
  ZoomIn, 
  ZoomOut,
  RotateCw,
  Palette
} from 'lucide-react';

interface ToolPanelProps {
  activeTool: string;
  onToolChange: (tool: string) => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export const ToolPanel: React.FC<ToolPanelProps> = ({
  activeTool,
  onToolChange,
  zoom,
  onZoomIn,
  onZoomOut,
  onReset
}) => {
  const tools = [
    { id: 'select', icon: MousePointer, label: 'Select' },
    { id: 'bbox', icon: Square, label: 'Bounding Box' },
    { id: 'label', icon: Type, label: 'Label' },
    { id: 'measure', icon: Ruler, label: 'Measure' },
    { id: 'pan', icon: Move, label: 'Pan' },
  ];

  return (
    <div className="bg-slate-800 rounded-lg p-4 space-y-4">
      <div>
        <h3 className="text-sm font-medium text-white mb-3">Tools</h3>
        <div className="grid grid-cols-2 gap-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onToolChange(tool.id)}
              className={`flex items-center space-x-2 p-2 rounded-lg text-sm transition-colors ${
                activeTool === tool.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
              }`}
            >
              <tool.icon className="w-4 h-4" />
              <span>{tool.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="border-t border-slate-700 pt-4">
        <h3 className="text-sm font-medium text-white mb-3">View Controls</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">Zoom: {Math.round(zoom * 100)}%</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onZoomOut}
              className="flex-1 flex items-center justify-center p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={onZoomIn}
              className="flex-1 flex items-center justify-center p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={onReset}
            className="w-full flex items-center justify-center space-x-2 p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded transition-colors"
          >
            <RotateCw className="w-4 h-4" />
            <span>Reset View</span>
          </button>
        </div>
      </div>
      
      <div className="border-t border-slate-700 pt-4">
        <h3 className="text-sm font-medium text-white mb-3">Display</h3>
        <div className="space-y-2">
          <button className="w-full flex items-center justify-center space-x-2 p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded transition-colors">
            <Palette className="w-4 h-4" />
            <span>Invert Colors</span>
          </button>
        </div>
      </div>
    </div>
  );
};