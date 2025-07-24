import React from 'react';
import { Calendar, User, FileText } from 'lucide-react';
import { Patient, MedicalImage } from '../types/medical';

interface PatientInfoProps {
  patient: Patient;
  image: MedicalImage;
}

export const PatientInfo: React.FC<PatientInfoProps> = ({ patient, image }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-4 space-y-4">
      <div className="flex items-center space-x-2 mb-3">
        <User className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Patient Information</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <label className="text-slate-400">Name</label>
          <p className="text-white font-medium">{patient.name}</p>
        </div>
        <div>
          <label className="text-slate-400">Patient ID</label>
          <p className="text-white font-medium">{patient.patientId}</p>
        </div>
        <div>
          <label className="text-slate-400">Age</label>
          <p className="text-white font-medium">{patient.age} years</p>
        </div>
        <div>
          <label className="text-slate-400">Gender</label>
          <p className="text-white font-medium">{patient.gender === 'M' ? 'Male' : 'Female'}</p>
        </div>
      </div>
      
      <div className="border-t border-slate-700 pt-4">
        <div className="flex items-center space-x-2 mb-3">
          <FileText className="w-4 h-4 text-green-400" />
          <h4 className="font-medium text-white">Study Details</h4>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label className="text-slate-400">Modality</label>
            <p className="text-white font-medium">{image.modality}</p>
          </div>
          <div>
            <label className="text-slate-400">Body Part</label>
            <p className="text-white font-medium">{image.bodyPart}</p>
          </div>
          <div>
            <label className="text-slate-400">Study Date</label>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <p className="text-white font-medium">{new Date(image.studyDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div>
            <label className="text-slate-400">Resolution</label>
            <p className="text-white font-medium">{image.width} × {image.height}</p>
          </div>
        </div>
      </div>
    </div>
  );
};