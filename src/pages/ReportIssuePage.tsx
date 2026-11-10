import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { analyzeCivicImage } from '@/utils/ai';
import { issueCategories, issueCategoryEmoji, urgencyLevels, puneLocations } from '@/data/mockData';
import type { CivicIssue, IssueCategory, Urgency } from '@/types';
import { Sparkles, Upload, MapPin, Camera, Check, X } from 'lucide-react';

export function ReportIssuePage() {
  const { navigate, addCivicIssue, user, showSuccess } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<IssueCategory>('Potholes');
  const [location, setLocation] = useState('Shivajinagar');
  const [imageUploaded, setImageUploaded] = useState(false);
  const [aiResult, setAiResult] = useState<{ detection: string; confidence: number; category: IssueCategory; priority: Urgency } | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleImageUpload = () => {
    setImageUploaded(true);
    setAnalyzing(true);
    setTimeout(() => {
      const result = analyzeCivicImage();
      setAiResult(result);
      setCategory(result.category);
      setAnalyzing(false);
    }, 1200);
  };

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) return;
    const newIssue: CivicIssue = {
      id: `ci-new-${Date.now()}`,
      title, description, category,
      status: 'Reported',
      priority: aiResult?.priority || 'Medium',
      location, distance: Math.round(Math.random() * 3 + 0.3 * 10) / 10,
      reportedAt: 'Just now', reportedBy: user,
      affectedCount: 1, confirmedBy: ['u1'],
      aiConfidence: aiResult?.confidence,
      aiCategory: aiResult?.detection,
    };
    addCivicIssue(newIssue);
    setSubmitted(true);
    showSuccess({ title: 'Issue Reported!', body: 'Your civic issue has been reported. Community members can now verify it.', points: 20, badge: 'Civic Watcher' });
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 lg:px-6 py-12 pb-24 lg:pb-12 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center animate-bounce-in">
          <Check className="w-10 h-10 text-primary-600" />
        </div>
        <h2 className="text-2xl font-extrabold text-surface-800 mb-2">Issue Reported Successfully!</h2>
        <p className="text-surface-500 mb-6">Your report has been submitted. Community members can verify it, and it will be reviewed by administrators.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate('civic')} className="btn-primary">View All Issues</button>
          <button onClick={() => navigate('home')} className="btn-outline">Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-8">
      <h1 className="text-2xl font-extrabold text-surface-800 mb-1">Report a Civic Issue</h1>
      <p className="text-sm text-surface-500 mb-6">Upload a photo and our AI will help categorize the issue.</p>

      <div className="space-y-5">
        {/* Image Upload with AI */}
        <div className="card p-4">
          <label className="block text-sm font-medium text-surface-700 mb-2">Upload Photo</label>
          <div
            onClick={imageUploaded ? undefined : handleImageUpload}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              imageUploaded ? 'border-primary-400 bg-primary-50/30 cursor-default' : 'border-surface-300 cursor-pointer hover:border-primary-400 hover:bg-primary-50/30'
            }`}
          >
            {analyzing ? (
              <div className="flex flex-col items-center gap-3">
                <Camera className="w-10 h-10 text-primary-600 animate-pulse" />
                <p className="text-sm text-primary-600 font-medium">AI is analyzing the image...</p>
              </div>
            ) : imageUploaded ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-surface-200 to-surface-300 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-surface-500" />
                </div>
                <p className="text-sm text-surface-600">photo.jpg uploaded</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-10 h-10 text-surface-400" />
                <p className="text-sm text-surface-500">Drag & drop or click to upload</p>
                <p className="text-xs text-surface-400">AI will automatically detect the issue type</p>
              </div>
            )}
          </div>

          {/* AI Detection result */}
          {aiResult && !analyzing && (
            <div className="mt-3 rounded-xl border border-primary-200 bg-primary-50/50 p-4 animate-scale-in">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary-600" />
                  <span className="text-sm font-semibold text-primary-700">AI Detected</span>
                </div>
                <button onClick={() => setAiResult(null)} className="text-surface-400 hover:text-surface-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-surface-700 mb-2">"{aiResult.detection}"</p>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-xs text-surface-500">Confidence</p>
                  <p className="font-semibold text-primary-700">{aiResult.confidence}%</p>
                </div>
                <div>
                  <p className="text-xs text-surface-500">Category</p>
                  <p className="font-semibold text-surface-800">{issueCategoryEmoji[aiResult.category]} {aiResult.category}</p>
                </div>
                <div>
                  <p className="text-xs text-surface-500">Priority</p>
                  <p className="font-semibold text-surface-800">{aiResult.priority}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="card p-4">
          <label className="block text-sm font-medium text-surface-700 mb-2">What is the issue?</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Brief title" className="input-field" />
        </div>

        {/* Category */}
        <div className="card p-4">
          <label className="block text-sm font-medium text-surface-700 mb-2">Category</label>
          <select value={category} onChange={e => setCategory(e.target.value as IssueCategory)} className="input-field">
            {issueCategories.map(c => <option key={c} value={c}>{issueCategoryEmoji[c]} {c}</option>)}
          </select>
        </div>

        {/* Description */}
        <div className="card p-4">
          <label className="block text-sm font-medium text-surface-700 mb-2">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the issue in detail..." rows={4} className="input-field resize-none" />
        </div>

        {/* Location */}
        <div className="card p-4">
          <label className="block text-sm font-medium text-surface-700 mb-2">Location</label>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent-600" />
            <select value={location} onChange={e => setLocation(e.target.value)} className="input-field flex-1">
              {puneLocations.map(l => <option key={l} value={l}>{l}, Pune</option>)}
            </select>
          </div>
        </div>

        {/* Submit */}
        <button onClick={handleSubmit} disabled={!title.trim() || !description.trim()} className="btn-accent w-full text-base py-3">
          Confirm & Submit
        </button>
      </div>
    </div>
  );
}
