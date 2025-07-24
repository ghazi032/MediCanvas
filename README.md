# MediCanvas: Intelligent Medical Image Annotation Platform

![MediCanvas Logo](https://images.pexels.com/photos/4225920/pexels-photo-4225920.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop)

## 🏥 Overview

MediCanvas is a comprehensive SaaS web application designed for radiologists and healthcare professionals to upload, analyze, and annotate medical images with AI assistance. The platform provides intelligent detection of anomalies, interactive annotation tools, and generates audit-ready reports for clinical workflows.

## ✨ Key Features

### 🤖 AI-Powered Detection
- Automated detection of anomalies in X-rays, CT scans, and MRIs
- Confidence scoring and severity classification
- Support for multiple medical imaging modalities

### 🎨 Interactive Canvas
- Fabric.js-powered annotation interface
- Real-time bounding box creation and editing
- Measurement tools with pixel-to-millimeter conversion
- Zoom, pan, and image manipulation controls

### 📊 Professional Workflow
- Patient information management
- Audit trail tracking for compliance
- Multi-user role support (Radiologist, Technician, Resident)
- Export functionality for EHR integration

### 🔒 Medical-Grade Security
- HIPAA-compliant data handling
- Role-based access control
- Comprehensive audit logging
- Secure image storage and transmission

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Fabric.js** for canvas interactions
- **Lucide React** for medical icons
- **Vite** for development and building

### Backend
- **NestJS** with TypeScript
- **PostgreSQL** for data persistence
- **Prisma** ORM for database management
- **JWT** authentication
- **AWS S3** for image storage

### AI/ML Pipeline
- **Python** with OpenCV for image processing
- **AWS Lambda** for serverless AI inference
- **TensorFlow/PyTorch** for model deployment
- **Claude AI** for diagnostic text generation

### Infrastructure
- **Docker** containerization
- **AWS** cloud services
- **GitHub Actions** CI/CD
- **CloudWatch** monitoring

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+
- Docker (optional)
- AWS CLI (for deployment)

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/medicanvas.git
cd medicanvas

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npm run db:migrate

# Start the server
npm run start:dev
```

### AI Pipeline Setup
```bash
# Navigate to AI directory
cd ai-pipeline

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Deploy Lambda functions
sam build && sam deploy
```

## 📁 Project Structure

```
medicanvas/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── types/          # TypeScript type definitions
│   │   ├── data/           # Mock data and constants
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # NestJS backend API
│   ├── src/
│   │   ├── modules/        # Feature modules
│   │   ├── entities/       # Database entities
│   │   ├── dto/           # Data transfer objects
│   │   └── guards/        # Authentication guards
│   ├── prisma/            # Database schema and migrations
│   └── package.json
├── ai-pipeline/            # Python AI/ML services
│   ├── src/
│   │   ├── models/        # AI model implementations
│   │   ├── preprocessing/ # Image processing utilities
│   │   └── inference/     # Inference endpoints
│   ├── lambda/            # AWS Lambda functions
│   └── requirements.txt
├── docs/                  # Documentation
├── docker-compose.yml     # Local development setup
└── README.md
```

## 🔧 Configuration

### Environment Variables

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001
VITE_AWS_REGION=us-east-1
VITE_S3_BUCKET=medicanvas-images
```

#### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/medicanvas
JWT_SECRET=your-jwt-secret
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
CLAUDE_API_KEY=your-claude-api-key
```

## 🧪 Testing

### Frontend Tests
```bash
npm run test
npm run test:coverage
```

### Backend Tests
```bash
cd backend
npm run test
npm run test:e2e
```

### AI Pipeline Tests
```bash
cd ai-pipeline
python -m pytest tests/
```

## 📊 API Documentation

The backend API is documented using Swagger/OpenAPI. After starting the backend server, visit:
- Development: `http://localhost:3001/api/docs`
- Production: `https://api.medicanvas.com/docs`

### Key Endpoints

#### Authentication
- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get user profile

#### Images
- `POST /images/upload` - Upload medical image
- `GET /images/:id` - Get image details
- `DELETE /images/:id` - Delete image

#### Annotations
- `POST /annotations` - Create annotation
- `PUT /annotations/:id` - Update annotation
- `GET /annotations/image/:imageId` - Get image annotations

#### AI Detection
- `POST /ai/detect` - Trigger AI detection
- `GET /ai/results/:imageId` - Get AI detection results

## 🏥 Medical Compliance

### HIPAA Compliance
- All patient data is encrypted at rest and in transit
- Access logging and audit trails
- Role-based access control
- Data retention policies

### FDA Considerations
- This software is intended for research and educational purposes
- Not approved as a medical device
- Clinical validation required for diagnostic use

## 🚀 Deployment

### Docker Deployment
```bash
# Build and run all services
docker-compose up --build

# Production deployment
docker-compose -f docker-compose.prod.yml up -d
```

### AWS Deployment
```bash
# Deploy infrastructure
cd infrastructure
terraform init && terraform apply

# Deploy application
npm run deploy:prod
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- TypeScript for type safety
- ESLint and Prettier for code formatting
- Jest for testing
- Conventional commits for commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@medicanvas.com
- 💬 Discord: [MediCanvas Community](https://discord.gg/medicanvas)
- 📖 Documentation: [docs.medicanvas.com](https://docs.medicanvas.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/medicanvas/issues)

## 🙏 Acknowledgments

- Medical imaging datasets provided by [NIH](https://www.nih.gov/)
- AI models based on research from [Stanford ML Group](https://stanfordmlgroup.github.io/)
- Icons by [Lucide](https://lucide.dev/)
- Medical expertise consultation from healthcare professionals

## 📈 Roadmap

### Q1 2024
- [ ] DICOM file format support
- [ ] Advanced segmentation tools
- [ ] Multi-language support

### Q2 2024
- [ ] Mobile application
- [ ] Real-time collaboration
- [ ] Advanced AI models

### Q3 2024
- [ ] PACS integration
- [ ] Telemedicine features
- [ ] Advanced reporting

---

**⚠️ Medical Disclaimer**: This software is for educational and research purposes only. It is not intended for clinical diagnosis or treatment decisions. Always consult with qualified healthcare professionals for medical advice.