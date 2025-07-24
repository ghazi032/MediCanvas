"""
AWS Lambda handler for medical image AI detection.
"""

import json
import boto3
import os
from typing import Dict, Any
import tempfile
from src.models.chest_xray_detector import ChestXrayDetector


def lambda_handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    AWS Lambda handler for processing medical image detection requests.
    
    Args:
        event: Lambda event containing S3 bucket and key information
        context: Lambda context object
        
    Returns:
        Detection results with bounding boxes and confidence scores
    """
    
    try:
        # Extract S3 information from event
        bucket_name = event.get('bucket_name')
        object_key = event.get('object_key')
        image_id = event.get('image_id')
        pixel_spacing = event.get('pixel_spacing', 0.14)
        
        if not all([bucket_name, object_key, image_id]):
            return {
                'statusCode': 400,
                'body': json.dumps({
                    'error': 'Missing required parameters: bucket_name, object_key, image_id'
                })
            }
        
        # Initialize S3 client
        s3_client = boto3.client('s3')
        
        # Download image from S3 to temporary file
        with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as temp_file:
            s3_client.download_file(bucket_name, object_key, temp_file.name)
            temp_image_path = temp_file.name
        
        # Initialize AI detector
        detector = ChestXrayDetector()
        
        # Perform detection
        detections = detector.detect_anomalies(temp_image_path)
        measurements = detector.extract_measurements(temp_image_path, pixel_spacing)
        
        # Clean up temporary file
        os.unlink(temp_image_path)
        
        # Prepare response
        response_data = {
            'image_id': image_id,
            'detections': detections,
            'measurements': measurements,
            'model_info': {
                'name': 'ChestXrayDetector',
                'version': '1.0.0',
                'timestamp': context.aws_request_id
            },
            'processing_time_ms': context.get_remaining_time_in_millis()
        }
        
        # Store results back to S3 (optional)
        results_key = f"ai-results/{image_id}/detections.json"
        s3_client.put_object(
            Bucket=bucket_name,
            Key=results_key,
            Body=json.dumps(response_data),
            ContentType='application/json'
        )
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(response_data)
        }
        
    except Exception as e:
        print(f"Error processing image: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': f'Internal server error: {str(e)}'
            })
        }


def claude_analysis_handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Lambda handler for Claude AI analysis of detection results.
    """
    
    try:
        detections = event.get('detections', [])
        patient_info = event.get('patient_info', {})
        
        # Simulate Claude AI analysis
        # In production, this would call the actual Claude API
        analysis = {
            'summary': generate_diagnostic_summary(detections, patient_info),
            'recommendations': generate_recommendations(detections),
            'icd_codes': extract_icd_codes(detections),
            'confidence_assessment': assess_overall_confidence(detections)
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(analysis)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': f'Analysis error: {str(e)}'
            })
        }


def generate_diagnostic_summary(detections: list, patient_info: dict) -> str:
    """Generate diagnostic summary based on AI detections."""
    
    if not detections:
        return "No significant abnormalities detected in the chest X-ray."
    
    high_severity = [d for d in detections if d.get('severity') == 'high']
    medium_severity = [d for d in detections if d.get('severity') == 'medium']
    
    summary = f"Chest X-ray analysis reveals {len(detections)} findings. "
    
    if high_severity:
        summary += f"High priority findings include {', '.join([d['label'] for d in high_severity])}. "
    
    if medium_severity:
        summary += f"Additional findings of moderate concern: {', '.join([d['label'] for d in medium_severity])}. "
    
    summary += "Clinical correlation and follow-up imaging may be warranted."
    
    return summary


def generate_recommendations(detections: list) -> list:
    """Generate clinical recommendations based on detections."""
    
    recommendations = []
    
    for detection in detections:
        if detection['severity'] == 'high':
            recommendations.append(f"Urgent clinical correlation recommended for {detection['label']}")
        elif detection['severity'] == 'medium':
            recommendations.append(f"Follow-up imaging in 3-6 months for {detection['label']}")
    
    if not recommendations:
        recommendations.append("Routine follow-up as clinically indicated")
    
    return recommendations


def extract_icd_codes(detections: list) -> list:
    """Extract relevant ICD codes based on detections."""
    
    icd_mapping = {
        'Pulmonary Nodule': 'R91.1',
        'Consolidation': 'J18.9',
        'Pleural Effusion': 'J94.8',
        'Pneumothorax': 'J93.9',
        'Cardiomegaly': 'I51.7'
    }
    
    codes = []
    for detection in detections:
        if detection['label'] in icd_mapping:
            codes.append({
                'code': icd_mapping[detection['label']],
                'description': detection['label'],
                'confidence': detection['confidence']
            })
    
    return codes


def assess_overall_confidence(detections: list) -> dict:
    """Assess overall confidence in the AI analysis."""
    
    if not detections:
        return {'level': 'high', 'score': 0.95}
    
    avg_confidence = sum(d['confidence'] for d in detections) / len(detections)
    
    if avg_confidence >= 0.85:
        level = 'high'
    elif avg_confidence >= 0.70:
        level = 'medium'
    else:
        level = 'low'
    
    return {
        'level': level,
        'score': round(avg_confidence, 2),
        'note': f"Based on {len(detections)} detections with average confidence {avg_confidence:.2f}"
    }