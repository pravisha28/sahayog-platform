import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { analyzeHelpRequest } from '@/utils/ai';
import { helpCategories, urgencyLevels, categoryEmoji, puneLocations } from '@/data/mockData';
import type { HelpRequest, Urgency, HelpCategory } from '@/types';
import { Sparkles, Upload, MapPin, Check, X, Image as ImageIcon } from 'lucide-react';

export function CreateRequestPage() {
  const { navigate, addHelpRequest, user, showSuccess } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<HelpCategory>('Food');
  const [urgency, setUrgency] = useState<Urgency>('Medium');
  const [location, setLocation] = useState('Kothrud');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [aiResult, setAiResult] = useState<{ category: HelpCategory; urgency: Urgency; skill: string } | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [posted, setPosted] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleAnalyze = () => {
    if (!description.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      const result = analyzeHelpRequest(description);
      setAiResult(result);
      setCategory(result.category);
      setUrgency(result.urgency);
      setAnalyzing(false);
    }, 800);
  };

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) return;

    const newReq: HelpRequest = {
      id: `hr-new-${Date.now()}`,
      title,
      description,
      category,
      urgency,
      status: 'Posted',
      location,
      distance: Math.round(Math.random() * 3 + 0.5 * 10) / 10,
      estimatedTime: time || '1 hour',
      requiredDate: date || 'Today',
      postedBy: user,
      postedAt: 'Just now',
      points: urgency === 'Urgent' ? 150 : urgency === 'High' ? 100 : 50,
    };

    addHelpRequest(newReq);
    setPosted(true);
  };

  if (posted) {
    return (
      <div className="max-w-2xl mx-auto px-4 lg:px-6 py-12 pb-24 lg:pb-12 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center animate-bounce-in">
          <Check className="w-10 h-10 text-primary-600" />
        </div>
        <h2 className="text-2xl font-extrabold text-surface-800 mb-2">Request Posted Successfully!</h2>
        <p className="text-surface-500 mb-6">Your help request has been posted. AI is matching nearby volunteers for you.</p>
        <div className="card p-4 mb-6 text-left">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">AI Matching in Progress</span>
          </div>
          <p className="text-sm text-surface-500">We found 3 suitable volunteers nearby. You'll be notified when someone accepts.</p>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate('help')} className="btn-primary">View All Requests</button>
          <button onClick={() => navigate('home')} className="btn-outline">Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-8">
      <h1 className="text-2xl font-extrabold text-surface-800 mb-1">Ask for Help</h1>
      <p className="text-sm text-surface-500 mb-6">Fill in the details and our AI will help categorize your request.</p>

      <div className="space-y-5">
        {/* Title */}
        <div className="card p-4">
          <label className="block text-sm font-medium text-surface-700 mb-2">What do you need help with?</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Brief title for your request"
            className="input-field"
          />
        </div>

        {/* Description */}
        <div className="card p-4">
          <label className="block text-sm font-medium text-surface-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            onBlur={handleAnalyze}
            placeholder="Describe what you need help with in detail..."
            rows={4}
            className="input-field resize-none"
          />
          {analyzing && (
            <div className="flex items-center gap-2 mt-2 text-primary-600 text-sm">
              <Sparkles className="w-4 h-4 animate-pulse" />
              AI is analyzing your request...
            </div>
          )}
        </div>

        {/* AI Categorization */}
        {aiResult && !analyzing && (
          <div className="rounded-xl border border-primary-200 bg-primary-50/50 p-4 animate-scale-in">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-semibold text-primary-700">AI Detected</span>
              </div>
              <button onClick={() => setAiResult(null)} className="text-surface-400 hover:text-surface-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-xs text-surface-500">Category</p>
                <p className="font-semibold text-surface-800">{categoryEmoji[aiResult.category]} {aiResult.category}</p>
              </div>
              <div>
                <p className="text-xs text-surface-500">Urgency</p>
                <p className="font-semibold text-surface-800">{aiResult.urgency}</p>
              </div>
              <div>
                <p className="text-xs text-surface-500">Required Skill</p>
                <p className="font-semibold text-surface-800">{aiResult.skill}</p>
              </div>
            </div>
            <p className="text-xs text-surface-400 mt-2">You can edit these suggestions below.</p>
          </div>
        )}

        {/* Category dropdown */}
        <div className="card p-4">
          <label className="block text-sm font-medium text-surface-700 mb-2">Category</label>
          <select value={category} onChange={e => setCategory(e.target.value as HelpCategory)} className="input-field">
            {helpCategories.map(c => <option key={c} value={c}>{categoryEmoji[c]} {c}</option>)}
          </select>
        </div>

        {/* Urgency */}
        <div className="card p-4">
          <label className="block text-sm font-medium text-surface-700 mb-2">Urgency Level</label>
          <div className="grid grid-cols-4 gap-2">
            {urgencyLevels.map(u => (
              <button
                key={u}
                onClick={() => setUrgency(u as Urgency)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  urgency === u
                    ? u === 'Urgent' ? 'bg-error-500 text-white' :
                      u === 'High' ? 'bg-accent-500 text-white' :
                      u === 'Medium' ? 'bg-warning-500 text-white' : 'bg-surface-400 text-white'
                    : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="card p-4">
          <label className="block text-sm font-medium text-surface-700 mb-2">Location</label>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-primary-600" />
            <select value={location} onChange={e => setLocation(e.target.value)} className="input-field flex-1">
              {puneLocations.map(l => <option key={l} value={l}>{l}, Pune</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 text-xs text-surface-500">
            <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded accent-primary-600" />
            Use approximate location (your exact address won't be shared publicly)
          </label>
        </div>

        {/* Date / Time */}
        <div className="card p-4">
          <label className="block text-sm font-medium text-surface-700 mb-2">When is help required?</label>
          <div className="grid grid-cols-2 gap-3">
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input-field" />
            <input type="time" value={time} onChange={e => setTime(e.target.value)} className="input-field" />
          </div>
        </div>

        {/* Image Upload */}
        <div className="card p-4">
          <label className="block text-sm font-medium text-surface-700 mb-2">Upload Images (Optional)</label>
          <div
            onClick={() => setImageUploaded(!imageUploaded)}
            className="border-2 border-dashed border-surface-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition-all"
          >
            {imageUploaded ? (
              <div className="flex flex-col items-center gap-2">
                <Check className="w-8 h-8 text-primary-600" />
                <p className="text-sm text-surface-600">image.jpg uploaded</p>
                <p className="text-xs text-surface-400">Click to remove</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-surface-400" />
                <p className="text-sm text-surface-500">Drag & drop or click to upload</p>
                <p className="text-xs text-surface-400">PNG, JPG up to 5MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!title.trim() || !description.trim()}
          className="btn-primary w-full text-base py-3"
        >
          Post Help Request
        </button>
      </div>
    </div>
  );
}
