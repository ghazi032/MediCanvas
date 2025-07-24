import React, { useState } from 'react';
import { Header } from './components/Header';
import { PatientInfo } from './components/PatientInfo';
import { AIDetections } from './components/AIDetections';
import { ToolPanel } from './components/ToolPanel';
import { AnnotationCanvas } from './components/AnnotationCanvas';
import { AuditPanel } from './components/AuditPanel';
import { 
  mockMedicalImage, 
  mockAIDetections, 
  mockPatient, 
  mockUser, 
  mockAuditEntries 
} from './data/mockData';
import { Annotation, AIDetection } from './types/medical';

function App() {
  const [activeTool, setActiveTool] = useState('select');
  const [zoom, setZoom] = useState(1);
  const [visibleDetections, setVisibleDetections] = useState<Set<string>>(
    new Set(mockAIDetections.map(d => d.id))
  );
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectedDetection, setSelectedDetection] = useState<AIDetection | null>(null);

  const handleToggleDetection = (id: string) => {
    const newVisible = new Set(visibleDetections);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisibleDetections(newVisible);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.1));
  };

  const handleResetView = () => {
    setZoom(1);
  };

  const handleAnnotationCreate = (annotation: Annotation) => {
    setAnnotations(prev => [...prev, annotation]);
  };

  const handleSelectDetection = (detection: AIDetection) => {
    setSelectedDetection(detection);
  };

  const handleExport = () => {
    const report = {
      patient: mockPatient,
      image: mockMedicalImage,
      aiDetections: mockAIDetections,
      userAnnotations: annotations,
      auditTrail: mockAuditEntries,
      timestamp: new Date().toISOString(),
      radiologist: mockUser.name
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medical-report-${mockPatient.patientId}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSettings = () => {
    alert('Settings panel would open here');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header 
        user={mockUser}
        onExport={handleExport}
        onSettings={handleSettings}
      />
      
      <div className="flex h-[calc(100vh-88px)]">
        {/* Left Sidebar */}
        <div className="w-80 p-4 space-y-4 overflow-y-auto">
          <PatientInfo patient={mockPatient} image={mockMedicalImage} />
          <AIDetections
            detections={mockAIDetections}
            visibleDetections={visibleDetections}
            onToggleDetection={handleToggleDetection}
            onSelectDetection={handleSelectDetection}
          />
          <AuditPanel auditEntries={mockAuditEntries} />
        </div>
        
        {/* Main Canvas */}
        <div className="flex-1 p-4">
          <AnnotationCanvas
            image={mockMedicalImage}
            detections={mockAIDetections}
            visibleDetections={visibleDetections}
            activeTool={activeTool}
            zoom={zoom}
            onAnnotationCreate={handleAnnotationCreate}
            onZoomChange={setZoom}
          />
        </div>
        
        {/* Right Sidebar */}
        <div className="w-64 p-4">
          <ToolPanel
            activeTool={activeTool}
            onToolChange={setActiveTool}
            zoom={zoom}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onReset={handleResetView}
          />
        </div>
      </div>
    </div>
  );
}

export default App;