import React from 'react';

const ChatResponse = ({ response }) => {
  if (!response) return null;

  const { candidates, usageMetadata } = response;

  const removeStarsAndBackticks = (text) => {
    return text.replace(/[\*`]/g, '');
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {candidates.map((candidate, index) => (
        <div 
          key={index} 
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <h2 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 'bold',
            marginBottom: '15px'
          }}>
            <strong>Response</strong>
          </h2>
          
          <div style={{ 
            color: '#374151',
            marginBottom: '20px',
            whiteSpace: 'pre-wrap'
          }}>
            {removeStarsAndBackticks(candidate.content.parts[0].text)}
          </div>

          {candidate?.citationMetadata?.citationSources?.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ 
                fontWeight: 'bold',
                marginBottom: '10px'
              }}>
                <strong>Citations:</strong>
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {candidate.citationMetadata.citationSources.map((source, idx) => (
                  <li key={idx} style={{ marginBottom: '8px', fontSize: '0.9rem' }}>
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#2563eb', textDecoration: 'underline' }}
                    >
                      {source.url}
                    </a>
                    <span style={{ color: '#6b7280', marginLeft: '8px' }}>
                      (Indexes: {source.startIndex} - {source.endIndex})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ 
            borderTop: '1px solid #e5e7eb',
            paddingTop: '15px'
          }}>
            <h3 style={{ 
              fontWeight: 'bold',
              marginBottom: '10px'
            }}>
              <strong>Usage Metadata</strong>
            </h3>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '15px',
              fontSize: '0.9rem'
            }}>
              <div>
                <p style={{ color: '#6b7280' }}>Prompt Tokens</p>
                <p style={{ fontWeight: 'bold' }}>{usageMetadata.promptTokenCount}</p>
              </div>
              <div>
                <p style={{ color: '#6b7280' }}>Response Tokens</p>
                <p style={{ fontWeight: 'bold' }}>{usageMetadata.candidatesTokenCount}</p>
              </div>
              <div>
                <p style={{ color: '#6b7280' }}>Total Tokens</p>
                <p style={{ fontWeight: 'bold' }}>{usageMetadata.totalTokenCount}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatResponse;
