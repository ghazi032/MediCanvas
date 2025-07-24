import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { MedicalImage, AIDetection, Annotation } from '../types/medical';

interface AnnotationCanvasProps {
  image: MedicalImage;
  detections: AIDetection[];
  visibleDetections: Set<string>;
  activeTool: string;
  zoom: number;
  onAnnotationCreate: (annotation: Annotation) => void;
  onZoomChange: (zoom: number) => void;
}

export const AnnotationCanvas: React.FC<AnnotationCanvasProps> = ({
  image,
  detections,
  visibleDetections,
  activeTool,
  zoom,
  onAnnotationCreate,
  onZoomChange
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Fabric.js canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#1e293b'
    });

    fabricCanvasRef.current = canvas;

    // Load background image
    fabric.Image.fromURL(image.url, (img) => {
      if (!img) return;
      
      img.set({
        left: 0,
        top: 0,
        selectable: false,
        evented: false
      });
      
      canvas.add(img);
      canvas.sendToBack(img);
      canvas.renderAll();
    });

    // Mouse event handlers for drawing
    canvas.on('mouse:down', (options) => {
      if (activeTool === 'bbox' && options.e) {
        setIsDrawing(true);
        const pointer = canvas.getPointer(options.e);
        setStartPoint(pointer);
      }
    });

    canvas.on('mouse:move', (options) => {
      if (!isDrawing || !startPoint || activeTool !== 'bbox' || !options.e) return;

      const pointer = canvas.getPointer(options.e);
      
      // Remove temporary rectangle if it exists
      const objects = canvas.getObjects();
      const tempRect = objects.find(obj => obj.name === 'temp-rect');
      if (tempRect) {
        canvas.remove(tempRect);
      }

      // Create temporary rectangle
      const rect = new fabric.Rect({
        left: Math.min(startPoint.x, pointer.x),
        top: Math.min(startPoint.y, pointer.y),
        width: Math.abs(pointer.x - startPoint.x),
        height: Math.abs(pointer.y - startPoint.y),
        fill: 'transparent',
        stroke: '#3b82f6',
        strokeWidth: 2,
        strokeDashArray: [5, 5],
        name: 'temp-rect'
      });

      canvas.add(rect);
      canvas.renderAll();
    });

    canvas.on('mouse:up', (options) => {
      if (!isDrawing || !startPoint || activeTool !== 'bbox' || !options.e) return;

      const pointer = canvas.getPointer(options.e);
      
      // Remove temporary rectangle
      const objects = canvas.getObjects();
      const tempRect = objects.find(obj => obj.name === 'temp-rect');
      if (tempRect) {
        canvas.remove(tempRect);
      }

      // Create final annotation if rectangle is large enough
      const width = Math.abs(pointer.x - startPoint.x);
      const height = Math.abs(pointer.y - startPoint.y);
      
      if (width > 10 && height > 10) {
        const annotation: Annotation = {
          id: `annotation-${Date.now()}`,
          type: 'bounding-box',
          coordinates: {
            x: Math.min(startPoint.x, pointer.x),
            y: Math.min(startPoint.y, pointer.y),
            width,
            height
          },
          label: 'Manual Annotation',
          isAIGenerated: false,
          userId: 'user-1',
          timestamp: new Date().toISOString()
        };

        onAnnotationCreate(annotation);
        addAnnotationToCanvas(annotation);
      }

      setIsDrawing(false);
      setStartPoint(null);
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  // Update zoom
  useEffect(() => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.setZoom(zoom);
      fabricCanvasRef.current.renderAll();
    }
  }, [zoom]);

  // Update visible detections
  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    
    // Remove existing AI detection rectangles
    const objects = canvas.getObjects();
    const aiRects = objects.filter(obj => obj.name?.startsWith('ai-detection-'));
    aiRects.forEach(rect => canvas.remove(rect));

    // Add visible AI detections
    detections.forEach(detection => {
      if (visibleDetections.has(detection.id)) {
        addAIDetectionToCanvas(detection);
      }
    });

    canvas.renderAll();
  }, [visibleDetections, detections]);

  const addAIDetectionToCanvas = (detection: AIDetection) => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    const { x, y, width, height } = detection.boundingBox;
    
    // Get color based on severity
    const getColor = (severity: string) => {
      switch (severity) {
        case 'high': return '#ef4444';
        case 'medium': return '#f59e0b';
        case 'low': return '#10b981';
        default: return '#6b7280';
      }
    };

    const rect = new fabric.Rect({
      left: x,
      top: y,
      width,
      height,
      fill: 'transparent',
      stroke: getColor(detection.severity),
      strokeWidth: 2,
      selectable: true,
      name: `ai-detection-${detection.id}`
    });

    // Add label
    const label = new fabric.Text(`${detection.label} (${Math.round(detection.confidence * 100)}%)`, {
      left: x,
      top: y - 20,
      fontSize: 12,
      fill: getColor(detection.severity),
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      name: `ai-label-${detection.id}`
    });

    canvas.add(rect);
    canvas.add(label);
  };

  const addAnnotationToCanvas = (annotation: Annotation) => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    const { x, y, width, height } = annotation.coordinates;

    const rect = new fabric.Rect({
      left: x,
      top: y,
      width: width || 0,
      height: height || 0,
      fill: 'transparent',
      stroke: '#22d3ee',
      strokeWidth: 2,
      selectable: true,
      name: `annotation-${annotation.id}`
    });

    const label = new fabric.Text(annotation.label, {
      left: x,
      top: y - 20,
      fontSize: 12,
      fill: '#22d3ee',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      name: `annotation-label-${annotation.id}`
    });

    canvas.add(rect);
    canvas.add(label);
    canvas.renderAll();
  };

  return (
    <div className="flex-1 bg-slate-900 rounded-lg p-4 overflow-hidden">
      <div className="w-full h-full flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="border border-slate-600 rounded cursor-crosshair"
        />
      </div>
    </div>
  );
};