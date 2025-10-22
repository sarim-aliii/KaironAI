import React, { useState, useCallback } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FileUploader } from '../ui/FileUploader';
import { Loader } from '../ui/Loader';

const MAX_TEXT_LENGTH = 100000; // 100k characters limit for direct input

export const Ingest: React.FC = () => {
  const { ingestText } = useAppContext();
  const [text, setText] = useState('');
  const [studyName, setStudyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileRead = (fileContent: string, fileName: string) => {
    setText(fileContent.substring(0, MAX_TEXT_LENGTH));
    setStudyName(fileName.split('.').slice(0, -1).join('.'));
    if (fileContent.length > MAX_TEXT_LENGTH) {
      addNotification(`File was truncated to ${MAX_TEXT_LENGTH} characters.`, 'info');
    }
  };
  
  const onFileUpload = useCallback((files: File[]) => {
    const file = files[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const fileContent = e.target?.result as string;
          handleFileRead(fileContent, file.name);
        } catch (error) {
          addNotification('Could not read the file.');
        } finally {
            setIsLoading(false);
        }
      };
      reader.onerror = () => {
        addNotification('Error reading file.');
        setIsLoading(false);
      };
      reader.readAsText(file);
    }
  }, []);

  const handleCreateStudy = async () => {
    if (!studyName.trim() || !text.trim()) {
      addNotification('Please provide a name and some text for your study.', 'info');
      return;
    }
    setIsLoading(true);
    await ingestText(studyName, text);
    // Reset state for next study
    setText('');
    setStudyName('');
    setIsLoading(false);
  };
  
  const { addNotification } = useAppContext();

  return (
    <Card title="Start a New Study">
      <div className="space-y-6">
        <p className="text-slate-400">
          Provide your study material below by pasting text directly, or by uploading a plain text file.
        </p>
        
        <input
            type="text"
            value={studyName}
            onChange={(e) => setStudyName(e.target.value)}
            placeholder="Give your study a name (e.g., 'Chapter 5: Cell Biology')"
            className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-slate-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
            disabled={isLoading}
        />

        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-200">Option 1: Paste Text</h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.substring(0, MAX_TEXT_LENGTH))}
              placeholder="Paste your notes, article, or any text here..."
              className="w-full h-48 bg-slate-900 border border-slate-700 rounded-md p-3 text-slate-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition resize-y"
              disabled={isLoading}
            />
             <p className="text-right text-sm text-slate-500">{text.length} / {MAX_TEXT_LENGTH}</p>
        </div>
        
        <div className="flex items-center gap-4">
            <hr className="flex-grow border-slate-700" />
            <span className="text-slate-500 font-semibold">OR</span>
            <hr className="flex-grow border-slate-700" />
        </div>

        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-200">Option 2: Upload File</h3>
            <FileUploader 
                onFileUpload={onFileUpload} 
                acceptedMimeTypes={{ 'text/plain': ['.txt'] }}
                multiple={false}
                onError={addNotification}
                unsupportedFormatError="Only .txt files are supported for now."
            />
        </div>

        <div className="pt-4 border-t border-slate-700/50">
          <Button onClick={handleCreateStudy} disabled={!text.trim() || !studyName.trim() || isLoading} className="w-full sm:w-auto">
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <Loader spinnerClassName="w-5 h-5" />
                    <span>Processing...</span>
                </div>
            ) : 'Create Study & Analyze'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
