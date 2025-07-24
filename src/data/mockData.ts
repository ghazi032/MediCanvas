import { MedicalImage, AIDetection, Patient, User, AuditEntry } from '../types/medical';

export const mockMedicalImage: MedicalImage = {
  id: '1',
  filename: 'chest_xray_001.dcm',
  patientId: 'PT-2024-001',
  studyDate: '2024-01-15',
  modality: 'X-RAY',
  bodyPart: 'Chest',
  url: 'https://images.pexels.com/photos/4225920/pexels-photo-4225920.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
  pixelSpacing: 0.14, // mm per pixel
  width: 800,
  height: 600
};

export const mockAIDetections: AIDetection[] = [
  {
    id: 'ai-1',
    label: 'Pulmonary Nodule',
    confidence: 0.89,
    boundingBox: { x: 320, y: 180, width: 45, height: 38 },
    description: 'Small rounded opacity in right upper lobe',
    severity: 'medium'
  },
  {
    id: 'ai-2',
    label: 'Consolidation',
    confidence: 0.76,
    boundingBox: { x: 480, y: 280, width: 68, height: 52 },
    description: 'Area of increased opacity suggesting consolidation',
    severity: 'high'
  },
  {
    id: 'ai-3',
    label: 'Calcification',
    confidence: 0.92,
    boundingBox: { x: 380, y: 220, width: 12, height: 15 },
    description: 'Small calcified granuloma',
    severity: 'low'
  }
];

export const mockPatient: Patient = {
  id: 'pt-1',
  name: 'John Smith',
  age: 54,
  gender: 'M',
  patientId: 'PT-2024-001'
};

export const mockUser: User = {
  id: 'user-1',
  name: 'Dr. Sarah Johnson',
  role: 'radiologist',
  email: 'sarah.johnson@hospital.com'
};

export const mockAuditEntries: AuditEntry[] = [
  {
    id: 'audit-1',
    action: 'AI Detection Completed',
    userId: 'system',
    timestamp: '2024-01-15T10:30:00Z',
    details: 'AI detected 3 potential findings with confidence scores'
  },
  {
    id: 'audit-2',
    action: 'Annotation Modified',
    userId: 'user-1',
    timestamp: '2024-01-15T10:35:00Z',
    details: 'Adjusted bounding box for pulmonary nodule'
  },
  {
    id: 'audit-3',
    action: 'Annotation Verified',
    userId: 'user-1',
    timestamp: '2024-01-15T10:38:00Z',
    details: 'Confirmed consolidation finding'
  }
];