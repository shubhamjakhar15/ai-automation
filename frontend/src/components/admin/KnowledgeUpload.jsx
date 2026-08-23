import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { Database, UploadCloud, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function KnowledgeUpload() {
  const { getToken } = useAuth();
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadMode, setUploadMode] = useState('text'); // 'text' or 'file'
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleUpload = async (e) => {
    e.preventDefault();
    if (uploadMode === 'text' && !text.trim()) return;
    if (uploadMode === 'file' && !file) return;

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const token = await getToken();
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      
      let response;
      if (uploadMode === 'text') {
        response = await axios.post(
          `${API_URL}/api/admin/knowledge`,
          { text, source },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        const formData = new FormData();
        formData.append("file", file);
        response = await axios.post(
          `${API_URL}/api/admin/knowledge/file`,
          formData,
          { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
        );
      }

      if (response.data.success) {
        setMessage({ text: response.data.message, type: 'success' });
        setText('');
        setSource('');
        setFile(null);
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || 'Failed to upload knowledge. Ensure you have admin rights.';
      setMessage({ text: errorMsg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 max-w-3xl">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
          <Database size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Knowledge Base Sync</h2>
          <p className="text-sm text-slate-500">Add new rules, FAQs, or content to the AI brain.</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setUploadMode('text')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg ${uploadMode === 'text' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          Paste Text
        </button>
        <button 
          onClick={() => setUploadMode('file')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg ${uploadMode === 'file' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          Upload Document (PDF/DOCX/TXT)
        </button>
      </div>

      <form onSubmit={handleUpload} className="space-y-4">
        {uploadMode === 'text' ? (
          <>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Source Label (Optional)</label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g., Company FAQ 2026, Internal Rules"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Knowledge Content</label>
              <p className="text-xs text-slate-500 mb-2">Separate distinct topics by double newlines (paragraphs) for better AI recall.</p>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here..."
                rows={8}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-y text-black"
                required={uploadMode === 'text'}
              />
            </div>
          </>
        ) : (
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Select Document</label>
            <p className="text-xs text-slate-500 mb-4">Supported formats: .pdf, .docx, .txt, .csv, .md</p>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept=".pdf,.docx,.txt,.csv,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/*"
              className="w-full px-4 py-3 rounded-xl border border-dashed border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black cursor-pointer hover:bg-gray-50"
              required={uploadMode === 'file'}
            />
            {file && <p className="text-sm mt-2 text-blue-600 font-medium">Selected: {file.name}</p>}
          </div>
        )}

        {message.text && (
          <div className={`p-4 rounded-xl flex items-start gap-3 text-sm font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
            {message.type === 'success' ? <CheckCircle size={18} className="mt-0.5 shrink-0" /> : <AlertCircle size={18} className="mt-0.5 shrink-0" />}
            <p>{message.text}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || (uploadMode === 'text' ? !text.trim() : !file)}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
          {loading ? 'Processing & Embedding...' : 'Sync to AI Brain'}
        </button>
      </form>
    </div>
  );
}
