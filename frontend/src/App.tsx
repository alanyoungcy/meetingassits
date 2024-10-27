import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { FileAudio, Loader } from 'lucide-react';
import AudioRecorder from './components/AudioRecorder';
import DocumentUpload from './components/DocumentUpload';
import MinutesTemplate from './components/MinutesTemplate';
import TranscriptionResult from './components/TranscriptionResult';
import { MeetingMinutes, TemplateFormat } from './types';

const TEMPLATES: TemplateFormat[] = [
  {
    id: 'standard',
    name: 'Standard Meeting',
    structure: {
      sections: ['Title', 'Date', 'Participants', 'Agenda', 'Discussion', 'Action Items'],
      required: ['Title', 'Date', 'Discussion']
    }
  },
  {
    id: 'executive',
    name: 'Executive Summary',
    structure: {
      sections: ['Title', 'Date', 'Participants', 'Key Decisions', 'Action Items'],
      required: ['Title', 'Date', 'Key Decisions']
    }
  }
];

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0].id);
  const [minutes, setMinutes] = useState<MeetingMinutes | null>(null);

  const handleAudioUpload = async (blob: Blob) => {
    setIsProcessing(true);
    const formData = new FormData();
    formData.append('audio', blob);
    formData.append('template', selectedTemplate);

    try {
      const response = await fetch('http://localhost:8000/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Transcription failed');

      const result = await response.json();
      setMinutes(result);
      toast.success('Transcription completed successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to process audio. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDocumentUpload = async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => formData.append('documents', file));

    try {
      const response = await fetch('http://localhost:8000/upload-documents', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Document upload failed');
      toast.success('Documents uploaded successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to upload documents. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Cantonese Meeting Minutes Transcriber
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Record or Upload Audio
              </h2>
              <AudioRecorder onRecordingComplete={handleAudioUpload} />
              
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-700">
                    Or upload audio file
                  </h3>
                </div>
                <label className="block">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleAudioUpload(file);
                    }}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </label>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Reference Documents
              </h2>
              <DocumentUpload onUpload={handleDocumentUpload} />
            </section>

            <section className="bg-white rounded-lg shadow p-6">
              <MinutesTemplate
                templates={TEMPLATES}
                selectedTemplate={selectedTemplate}
                onTemplateSelect={setSelectedTemplate}
              />
            </section>
          </div>

          <div className="lg:pl-8">
            {isProcessing ? (
              <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow">
                <div className="text-center">
                  <Loader className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
                  <p className="mt-4 text-gray-600">Processing audio...</p>
                </div>
              </div>
            ) : minutes ? (
              <TranscriptionResult minutes={minutes} />
            ) : (
              <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow">
                <div className="text-center text-gray-500">
                  <FileAudio className="h-12 w-12 mx-auto mb-4" />
                  <p>Record or upload audio to see transcription results</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;