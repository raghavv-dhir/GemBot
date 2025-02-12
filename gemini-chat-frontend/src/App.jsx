import { useState } from 'react';
import ChatResponse from './components/ChatResponse';
import { fetchChatResponse } from './services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setLoading(true);
    setResponse(null);
    
    try {
      const apiResponse = await fetchChatResponse(question);
      setResponse(apiResponse);
    } catch (error) {
      console.error('Error:', error);
      alert("Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <header className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-6 mb-6 text-center">
        <h1 className="text-2xl text-white font-medium flex items-center justify-center gap-2 mb-1">
          <FontAwesomeIcon icon={faMessage} className="text-white" />
          GemBot
        </h1>
        <p className="text-slate-200 text-sm">Your 24/7 AI Assistant!</p>
      </header>

      <main>
        <form 
          onSubmit={handleQuestionSubmit}
          className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 mb-6 flex gap-3"
        >
          <input
            type="text"
            name="question"
            placeholder="What would you like to know?"
            value={question}
            onChange={handleQuestionChange}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-colors"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Ask'}
          </button>
        </form>

        {loading && (
          <div className="text-center text-gray-500 py-8">
            Loading response...
          </div>
        )}

        {response && <ChatResponse response={response} />}
      </main>
    </div>
  );
}

export default App;