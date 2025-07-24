import React from 'react';
import { Clock, User, Activity } from 'lucide-react';
import { AuditEntry } from '../types/medical';

interface AuditPanelProps {
  auditEntries: AuditEntry[];
}

export const AuditPanel: React.FC<AuditPanelProps> = ({ auditEntries }) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getActionIcon = (action: string) => {
    if (action.includes('AI')) return <Activity className="w-4 h-4 text-purple-400" />;
    if (action.includes('Modified')) return <User className="w-4 h-4 text-blue-400" />;
    if (action.includes('Verified')) return <User className="w-4 h-4 text-green-400" />;
    return <Clock className="w-4 h-4 text-slate-400" />;
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="w-5 h-5 text-slate-400" />
        <h3 className="text-lg font-semibold text-white">Audit Trail</h3>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {auditEntries.map((entry) => (
          <div key={entry.id} className="flex items-start space-x-3 p-3 bg-slate-700/50 rounded-lg">
            {getActionIcon(entry.action)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-white truncate">{entry.action}</h4>
                <span className="text-xs text-slate-400">{formatTime(entry.timestamp)}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">{entry.details}</p>
              <p className="text-xs text-slate-400 mt-1">
                {entry.userId === 'system' ? 'System' : 'Dr. Sarah Johnson'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};