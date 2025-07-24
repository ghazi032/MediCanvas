# MediCanvas API Documentation

## Overview

The MediCanvas API provides endpoints for medical image management, AI-powered detection, and annotation workflows. All endpoints require authentication unless otherwise specified.

## Base URL

- Development: `http://localhost:3001/api/v1`
- Production: `https://api.medicanvas.com/api/v1`

## Authentication

### JWT Token Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "doctor@hospital.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-123",
    "email": "doctor@hospital.com",
    "name": "Dr. Smith",
    "role": "RADIOLOGIST"
  }
}
```

## Endpoints

### Images

#### Upload Medical Image

```http
POST /images/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "file": <image-file>,
  "patientId": "patient-123",
  "modality": "X_RAY",
  "bodyPart": "Chest",
  "studyDate": "2024-01-15"
}
```

**Response:**
```json
{
  "id": "img-456",
  "filename": "chest_xray_001.jpg",
  "patientId": "patient-123",
  "modality": "X_RAY",
  "bodyPart": "Chest",
  "url": "https://s3.amazonaws.com/bucket/images/img-456.jpg",
  "width": 1024,
  "height": 768,
  "uploadedAt": "2024-01-15T10:30:00Z"
}
```

#### Get Image Details

```http
GET /images/{imageId}
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "img-456",
  "filename": "chest_xray_001.jpg",
  "patient": {
    "id": "patient-123",
    "name": "John Doe",
    "age": 45,
    "gender": "M"
  },
  "modality": "X_RAY",
  "bodyPart": "Chest",
  "studyDate": "2024-01-15",
  "url": "https://s3.amazonaws.com/bucket/images/img-456.jpg",
  "pixelSpacing": 0.14,
  "width": 1024,
  "height": 768,
  "annotations": [...],
  "aiDetections": [...]
}
```

#### List Images

```http
GET /images?patientId=patient-123&modality=X_RAY&limit=10&offset=0
Authorization: Bearer <token>
```

**Response:**
```json
{
  "images": [
    {
      "id": "img-456",
      "filename": "chest_xray_001.jpg",
      "patientId": "patient-123",
      "modality": "X_RAY",
      "bodyPart": "Chest",
      "studyDate": "2024-01-15",
      "thumbnailUrl": "https://s3.amazonaws.com/bucket/thumbnails/img-456.jpg"
    }
  ],
  "total": 25,
  "limit": 10,
  "offset": 0
}
```

### AI Detection

#### Trigger AI Detection

```http
POST /ai/detect
Authorization: Bearer <token>
Content-Type: application/json

{
  "imageId": "img-456",
  "modelName": "chest-xray-v1",
  "options": {
    "confidenceThreshold": 0.7,
    "maxDetections": 10
  }
}
```

**Response:**
```json
{
  "jobId": "job-789",
  "status": "processing",
  "estimatedTime": 30,
  "message": "AI detection started"
}
```

#### Get AI Detection Results

```http
GET /ai/results/{imageId}
Authorization: Bearer <token>
```

**Response:**
```json
{
  "imageId": "img-456",
  "status": "completed",
  "detections": [
    {
      "id": "detection-1",
      "label": "Pulmonary Nodule",
      "confidence": 0.89,
      "boundingBox": {
        "x": 320,
        "y": 180,
        "width": 45,
        "height": 38
      },
      "description": "Small rounded opacity in right upper lobe",
      "severity": "medium"
    }
  ],
  "modelInfo": {
    "name": "chest-xray-v1",
    "version": "1.2.0",
    "processedAt": "2024-01-15T10:35:00Z"
  }
}
```

### Annotations

#### Create Annotation

```http
POST /annotations
Authorization: Bearer <token>
Content-Type: application/json

{
  "imageId": "img-456",
  "type": "BOUNDING_BOX",
  "coordinates": {
    "x": 100,
    "y": 150,
    "width": 50,
    "height": 40
  },
  "label": "Suspicious Area",
  "notes": "Requires follow-up"
}
```

**Response:**
```json
{
  "id": "annotation-123",
  "imageId": "img-456",
  "type": "BOUNDING_BOX",
  "coordinates": {
    "x": 100,
    "y": 150,
    "width": 50,
    "height": 40
  },
  "label": "Suspicious Area",
  "notes": "Requires follow-up",
  "userId": "user-123",
  "createdAt": "2024-01-15T10:40:00Z"
}
```

#### Update Annotation

```http
PUT /annotations/{annotationId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "coordinates": {
    "x": 105,
    "y": 155,
    "width": 55,
    "height": 45
  },
  "label": "Confirmed Nodule",
  "notes": "Updated after review"
}
```

#### Delete Annotation

```http
DELETE /annotations/{annotationId}
Authorization: Bearer <token>
```

### Patients

#### Create Patient

```http
POST /patients
Authorization: Bearer <token>
Content-Type: application/json

{
  "patientId": "PT-2024-001",
  "name": "John Doe",
  "age": 45,
  "gender": "M"
}
```

#### Get Patient Details

```http
GET /patients/{patientId}
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "patient-123",
  "patientId": "PT-2024-001",
  "name": "John Doe",
  "age": 45,
  "gender": "M",
  "createdAt": "2024-01-15T09:00:00Z",
  "images": [
    {
      "id": "img-456",
      "modality": "X_RAY",
      "bodyPart": "Chest",
      "studyDate": "2024-01-15"
    }
  ]
}
```

### Reports

#### Generate Report

```http
POST /reports/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "imageId": "img-456",
  "includeAI": true,
  "includeAnnotations": true,
  "format": "PDF"
}
```

**Response:**
```json
{
  "reportId": "report-789",
  "status": "generating",
  "downloadUrl": null,
  "estimatedTime": 60
}
```

#### Download Report

```http
GET /reports/{reportId}/download
Authorization: Bearer <token>
```

Returns the report file (PDF, JSON, or DICOM-SR format).

## Error Responses

### Standard Error Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "path": "/api/v1/auth/login"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Unprocessable Entity
- `429` - Too Many Requests
- `500` - Internal Server Error

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Authentication**: 5 requests per minute
- **Image Upload**: 10 requests per minute
- **AI Detection**: 20 requests per hour
- **General API**: 100 requests per minute

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248000
```

## Webhooks

### AI Detection Complete

When AI detection is completed, a webhook is sent to your configured endpoint:

```json
{
  "event": "ai.detection.completed",
  "data": {
    "imageId": "img-456",
    "jobId": "job-789",
    "detections": [...],
    "completedAt": "2024-01-15T10:35:00Z"
  }
}
```

### Annotation Created

```json
{
  "event": "annotation.created",
  "data": {
    "annotationId": "annotation-123",
    "imageId": "img-456",
    "userId": "user-123",
    "createdAt": "2024-01-15T10:40:00Z"
  }
}
```

## SDKs and Libraries

### JavaScript/TypeScript

```bash
npm install @medicanvas/sdk
```

```typescript
import { MediCanvasClient } from '@medicanvas/sdk';

const client = new MediCanvasClient({
  apiUrl: 'https://api.medicanvas.com',
  apiKey: 'your-api-key'
});

const image = await client.images.upload(file, {
  patientId: 'patient-123',
  modality: 'X_RAY'
});
```

### Python

```bash
pip install medicanvas-python
```

```python
from medicanvas import MediCanvasClient

client = MediCanvasClient(
    api_url='https://api.medicanvas.com',
    api_key='your-api-key'
)

image = client.images.upload(
    file_path='chest_xray.jpg',
    patient_id='patient-123',
    modality='X_RAY'
)
```

## Testing

### Postman Collection

Import our Postman collection for easy API testing:
[Download Collection](https://api.medicanvas.com/postman/collection.json)

### Test Environment

Use our sandbox environment for testing:
- Base URL: `https://sandbox-api.medicanvas.com`
- Test credentials provided upon request

---

For more information, visit our [Developer Portal](https://developers.medicanvas.com) or contact our support team.