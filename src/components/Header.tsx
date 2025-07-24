import React from 'react';
import { User, Settings, FileText, Download } from 'lucide-react';
import { User as UserType } from '../types/medical';

interface HeaderProps {
  user: UserType;
  onExport: () => void;
  onSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onExport, onSettings }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">MediCanvas</h1>
            <p className="text-sm text-slate-400">Medical Image Annotation Platform</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={onExport}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
          
          <button
            onClick={onSettings}
            className="p-2 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3 pl-4 border-l border-slate-700">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-slate-400 capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};