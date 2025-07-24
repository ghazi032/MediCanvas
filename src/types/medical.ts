export interface MedicalImage {
  id: string;
  filename: string;
  patientId: string;
  studyDate: string;
  modality: 'X-RAY' | 'CT' | 'MRI' | 'ULTRASOUND';
  bodyPart: string;
  url: string;
  pixelSpacing?: number; // mm per pixel
  width: number;
  height: number;
}

export interface Annotation {
  id: string;
  type: 'bounding-box' | 'measurement' | 'label';
  coordinates: {
    x: number;
    y: number;
    width?: number;
    height?: number;
    x2?: number;
    y2?: number;
  };
  label: string;
  confidence?: number;
  isAIGenerated: boolean;
  userId: string;
  timestamp: string;
  notes?: string;
}

export interface AIDetection {
  id: string;
  label: string;
  confidence: number;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  patientId: string;
}

export interface User {
  id: string;
  name: string;
  role: 'radiologist' | 'technician' | 'resident';
  email: string;
}

export interface AuditEntry {
  id: string;
  action: string;
  userId: string;
  timestamp: string;
  details: string;
}