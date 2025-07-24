# Contributing to MediCanvas

Thank you for your interest in contributing to MediCanvas! This document provides guidelines and information for contributors.

## 🤝 Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please read and follow our Code of Conduct.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+
- Python 3.9+ (for AI pipeline)
- Docker (optional, for containerized development)
- AWS CLI (for deployment)

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/medicanvas.git
   cd medicanvas
   ```

2. **Install Dependencies**
   ```bash
   # Frontend
   npm install
   
   # Backend
   cd backend && npm install
   
   # AI Pipeline
   cd ../ai-pipeline && pip install -r requirements.txt
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Database Setup**
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Start Development Servers**
   ```bash
   # Option 1: Using Docker Compose
   docker-compose up
   
   # Option 2: Manual startup
   npm run dev              # Frontend
   cd backend && npm run start:dev  # Backend
   cd ai-pipeline && uvicorn src.main:app --reload  # AI Service
   ```

## 📋 Development Guidelines

### Code Style
- **TypeScript/JavaScript**: Use ESLint and Prettier configurations
- **Python**: Follow PEP 8 with Black formatter
- **Commits**: Use Conventional Commits format

### Branch Naming
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `docs/description` - Documentation updates

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clean, documented code
   - Add tests for new functionality
   - Update documentation as needed

3. **Test Your Changes**
   ```bash
   # Frontend tests
   npm run test
   
   # Backend tests
   cd backend && npm run test
   
   # AI Pipeline tests
   cd ai-pipeline && python -m pytest
   ```

4. **Submit Pull Request**
   - Provide clear description of changes
   - Reference related issues
   - Ensure CI passes
   - Request review from maintainers

## 🧪 Testing

### Frontend Testing
```bash
npm run test              # Run tests
npm run test:coverage     # Coverage report
npm run test:watch        # Watch mode
```

### Backend Testing
```bash
cd backend
npm run test              # Unit tests
npm run test:e2e          # End-to-end tests
npm run test:cov          # Coverage report
```

### AI Pipeline Testing
```bash
cd ai-pipeline
python -m pytest tests/  # Run all tests
python -m pytest --cov   # With coverage
```

## 📚 Documentation

### Code Documentation
- Use JSDoc for TypeScript/JavaScript
- Use docstrings for Python
- Document complex algorithms and medical logic
- Include examples for public APIs

### Medical Context
- Provide medical context for healthcare-specific features
- Reference relevant medical standards (DICOM, HL7, etc.)
- Include citations for medical algorithms

## 🏥 Medical Compliance

### HIPAA Considerations
- Never commit real patient data
- Use synthetic/anonymized data for testing
- Follow data encryption requirements
- Document privacy measures

### FDA Guidelines
- Mark experimental features clearly
- Include appropriate medical disclaimers
- Document validation processes
- Maintain audit trails

## 🐛 Bug Reports

### Before Submitting
- Check existing issues
- Verify bug in latest version
- Test in clean environment

### Bug Report Template
```markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. iOS]
- Browser [e.g. chrome, safari]
- Version [e.g. 22]

**Medical Context**
- Image type: [e.g. Chest X-ray]
- Modality: [e.g. CT, MRI]
- Workflow step: [e.g. annotation, AI detection]
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Medical Use Case**
Describe the medical workflow or use case.

**Additional context**
Add any other context or screenshots.
```

## 🔒 Security

### Reporting Security Issues
- **DO NOT** create public issues for security vulnerabilities
- Email security@medicanvas.com with details
- Include steps to reproduce
- Allow time for fix before disclosure

### Security Guidelines
- Never commit secrets or API keys
- Use environment variables for configuration
- Follow OWASP security practices
- Implement proper authentication/authorization

## 📦 Release Process

### Version Numbering
We follow Semantic Versioning (SemVer):
- `MAJOR.MINOR.PATCH`
- Major: Breaking changes
- Minor: New features (backward compatible)
- Patch: Bug fixes

### Release Checklist
- [ ] Update version numbers
- [ ] Update CHANGELOG.md
- [ ] Run full test suite
- [ ] Update documentation
- [ ] Create release notes
- [ ] Tag release
- [ ] Deploy to staging
- [ ] Deploy to production

## 🎯 Areas for Contribution

### High Priority
- [ ] DICOM file format support
- [ ] Advanced segmentation tools
- [ ] Performance optimizations
- [ ] Mobile responsiveness
- [ ] Accessibility improvements

### AI/ML Improvements
- [ ] New detection models
- [ ] Model accuracy improvements
- [ ] Multi-modal support
- [ ] Real-time inference optimization

### Integration
- [ ] PACS system integration
- [ ] EHR system connectors
- [ ] HL7 FHIR support
- [ ] Third-party AI model support

### Documentation
- [ ] API documentation
- [ ] Medical workflow guides
- [ ] Deployment guides
- [ ] Video tutorials

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation
- Annual contributor highlights

## 📞 Getting Help

- **Discord**: [MediCanvas Community](https://discord.gg/medicanvas)
- **Email**: developers@medicanvas.com
- **Issues**: GitHub Issues for bugs and features
- **Discussions**: GitHub Discussions for questions

## 📄 License

By contributing to MediCanvas, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to MediCanvas and helping improve medical imaging technology! 🏥✨