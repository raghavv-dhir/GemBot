import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy } from 'react-icons/fa';

const ChatResponse = ({ response }) => {
  if (!response) return null;

  const { candidates, usageMetadata } = response;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatResponse = (text) => {
    const lines = text.split('\n');
    let insideCodeBlock = false;
    let formattedResponse = [];
    let codeBlockContent = [];

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (insideCodeBlock) {
          formattedResponse.push(
            <div key={index} className="relative">
              <CopyToClipboard text={codeBlockContent.join('\n')} onCopy={handleCopy}>
                <button className="absolute top-2 right-2 text-white opacity-70 hover:opacity-100 transition">
                  <FaCopy />
                </button>
              </CopyToClipboard>
              {copied && <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">Copied!</span>}
              <pre className="bg-gray-900 text-white p-3 rounded-md overflow-auto">
                <code className="whitespace-pre-wrap">{codeBlockContent.join('\n')}</code>
              </pre>
            </div>
          );
          codeBlockContent = [];
        }
        insideCodeBlock = !insideCodeBlock;
      } else if (insideCodeBlock) {
        codeBlockContent.push(line);
      } else if (line.trim() === '') {
        formattedResponse.push(<br key={index} />);
      } else {
        const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formattedResponse.push(
          <p key={index} className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedLine }}></p>
        );
      }
    });
    return formattedResponse;
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
      {candidates.map((candidate, index) => (
        <div key={index}>
          <div className="mb-6">
            <h2 className="text-lg text-gray-700 font-medium mb-4">Response</h2>
            <div className="space-y-4">
              {formatResponse(candidate.content.parts[0].text)}
            </div>
          </div>

          {candidate?.citationMetadata?.citationSources?.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-lg text-gray-700 font-medium mb-3">Citations</h3>
              <div className="text-gray-500 text-sm">
                {candidate.citationMetadata.citationSources.map((source, idx) => (
                  <div key={idx} className="mb-2">
                    (Indexes: {source.startIndex} - {source.endIndex})
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="text-lg text-gray-700 font-medium mb-4">Usage Metadata</h3>
            <div className="grid grid-cols-3 gap-4 bg-white p-4 rounded-lg">
              <div>
                <p className="text-gray-500 text-sm mb-1">Prompt Tokens</p>
                <p className="text-gray-700 font-medium">{usageMetadata.promptTokenCount}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Response Tokens</p>
                <p className="text-gray-700 font-medium">{usageMetadata.candidatesTokenCount}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Tokens</p>
                <p className="text-gray-700 font-medium">{usageMetadata.totalTokenCount}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatResponse;
