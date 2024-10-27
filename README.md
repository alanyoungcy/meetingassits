# Cantonese Meeting Minutes Transcriber

A modern web application that transcribes Cantonese audio recordings into structured meeting minutes, powered by OpenAI Whisper and RAG (Retrieval-Augmented Generation).

![Meeting Minutes Transcriber](https://images.unsplash.com/photo-1517245386807-5ecd26f4a5d4?auto=format&fit=crop&q=80&w=1200)

## Features

- 🎤 **Live Audio Recording**: Record meetings directly from your browser
- 📝 **Audio File Upload**: Support for various audio file formats
- 🇭🇰 **Cantonese Recognition**: Specialized in transcribing Cantonese speech
- 📄 **Document Context**: Upload reference documents to enhance transcription accuracy
- 📋 **Customizable Templates**: Choose from different meeting minutes formats
- 🤖 **AI-Powered**: Uses OpenAI Whisper for accurate speech recognition
- 🔍 **RAG Integration**: Enhances output quality using reference documents

## Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Lucide React for icons
- React Dropzone for file uploads
- React Hot Toast for notifications

### Backend
- Python FastAPI
- OpenAI Whisper for speech recognition
- RAG (Retrieval-Augmented Generation)
- Document processing capabilities

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+
- FFmpeg (for audio processing)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/meeting-minutes-transcriber.git
cd meeting-minutes-transcriber
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

4. Start the development servers:

Frontend:
```bash
npm run dev
```

Backend:
```bash
cd backend
uvicorn main:app --reload
```

## Usage

1. **Record or Upload Audio**
   - Use the built-in recorder for live recording
   - Or upload pre-recorded audio files

2. **Add Reference Documents**
   - Drag and drop or click to upload relevant documents
   - Supports PDF, DOC, DOCX, and TXT formats

3. **Select Template**
   - Choose from available meeting minutes templates
   - Each template has different sections and requirements

4. **Process and Review**
   - Wait for the transcription to complete
   - Review and edit the generated minutes
   - Export or save the final document

## API Endpoints

- `POST /transcribe`: Submit audio for transcription
- `POST /upload-documents`: Upload reference documents
- `GET /templates`: Retrieve available templates
- `GET /minutes/{id}`: Retrieve specific meeting minutes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI Whisper for speech recognition
- React and Vite communities
- Contributors and users of the application