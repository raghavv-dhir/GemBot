import { useState } from 'react';
import ChatResponse from './components/ChatResponse';
import { fetchChatResponse } from './services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons'; // solid version

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuestionSubmit = async (question) => {
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
    <div className="gembot-container">
      <header className="gembot-header">
        <h1 className="gembot-title">
          <FontAwesomeIcon icon={faMessage} className="gembot-icon" style={{ color: '#ffffff', marginRight: '10px' }} />
          GemBot
        </h1>
        <p className="gembot-subtitle">Your 24/7 AI Assistant!</p>
      </header>

      <main>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const question = e.target.question.value;
            if (question.trim()) {
              handleQuestionSubmit(question);
              e.target.reset();
            }
          }}
          className="gembot-input-container"
        >
          <input
            type="text"
            name="question"
            placeholder="What would you like to know today?"
            className="gembot-input"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="gembot-button"
          >
            {loading ? 'Loading...' : 'Ask'}
          </button>
        </form>

        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Loading response...</p>
          </div>
        )}

        {response && <ChatResponse response={response} />}
      </main>
    </div>
  );
}

export default App;
