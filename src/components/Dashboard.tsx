// src/components/Dashboard.tsx

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, MessageCircle } from 'lucide-react';

interface Emotion {
  name: string;
  score: number;
}

interface DashboardProps {
  emotions: Emotion[];
  transcription: string;
  llmResponse: string;
}

export function Dashboard({ emotions, transcription, llmResponse }: DashboardProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  // Get top 3 emotions sorted by score
  const topEmotions = [...emotions]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const suggestions = [
    { text: 'Your perspective is **valuable**. Could you elaborate further?', icon: <MessageCircle className="w-5 h-5" /> },
    { text: "I appreciate your **insight**. Let's explore some potential solutions together.", icon: <MessageCircle className="w-5 h-5" /> },
    { text: 'Your point is **intriguing**. How did you arrive at this conclusion?', icon: <MessageCircle className="w-5 h-5" /> },
    { text: 'Your **enthusiasm** is evident. Would you share a specific example?', icon: <MessageCircle className="w-5 h-5" /> },
    { text: 'This clearly matters to you. Please, tell me more about its importance.', icon: <MessageCircle className="w-5 h-5" /> },
  ];

  const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

  return (
    <div className={`fixed right-0 top-[89px] h-[87svh] z-40 transition-all duration-300 ${isCollapsed ? 'w-12' : 'w-[28rem]'} bg-[#000000] text-[#ffffff] font-mono border border-[#4ec9b0] shadow-[0_0_10px_#4ec9b0] rounded-lg`}>
      <div className="h-full p-3 flex flex-col">
        <button
          className="absolute rounded-l-lg -left-10 top-1/2 transform -translate-y-1/2 bg-[#1e1e1e] text-[#ffffff] hover:bg-[#2d2d2d] w-10 h-20 flex items-center justify-center z-50"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
        </button>

        {!isCollapsed && (
          <>
            {/* EVIA Logo */}
            <div className="flex justify-center items-center mb-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20schwarz-n5JuQCOvw7Zr35T83Ox84VuFWwQtNr.png"
                alt="EVIA Logo"
                width={100}
                height={40}
                className="invert"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 overflow-y-auto pr-6 -mr-6">
              {/* Suggested Response Section */}
              <div className="p-4 bg-[#1e1e1e] rounded-lg transition-all duration-500 ease-in-out backdrop-blur-sm border border-[#4ec9b0] shadow-[0_0_5px_#4ec9b0]">
                <h3 className="text-lg font-normal mb-2 flex items-center gap-2 text-[#4ec9b0]">
                  {randomSuggestion.icon}
                  Suggested Response
                </h3>
                <p
                  className="text-base leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: randomSuggestion.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#4ec9b0]">$1</strong>'),
                  }}
                />
              </div>

              {/* Emotions Section */}
              <div className="space-y-2 p-4 bg-[#1e1e1e] rounded-lg border border-[#4ec9b0] shadow-[0_0_5px_#4ec9b0]">
                <h3 className="text-lg font-normal text-[#4ec9b0]">Top Detected Emotions</h3>
                <div className="space-y-2">
                  {topEmotions.length > 0 ? (
                    topEmotions.map((emotion, index) => (
                      <div key={`${emotion.name}-${index}`} className="flex items-center justify-between">
                        <span className="text-[#ffffff]">{index + 1}</span>
                        <span className="text-[#ffffff] capitalize">{emotion.name}</span>
                        <span className="text-[#4ec9b0]">{emotion.score.toFixed(3)}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-[#ffffff]">No emotions detected</p>
                  )}
                </div>
              </div>

              {/* Call Transcript Section */}
              <div>
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="w-full bg-[#4ec9b0] text-[#000000] hover:bg-[#3da892] border border-[#4ec9b0] shadow-[0_0_5px_#4ec9b0] px-4 py-2 rounded-lg"
                >
                  {showTranscript ? 'Hide' : 'View'} Call Transcript
                </button>
                {showTranscript && (
                  <div className="mt-2 bg-[#1e1e1e] p-3 rounded-lg border border-[#4ec9b0] shadow-[0_0_5px_#4ec9b0]">
                    <h3 className="text-lg font-normal text-[#4ec9b0] mb-2">Call Transcript</h3>
                    <p className="text-sm text-[#ffffff]">{transcription}</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Collapsed view */}
        {isCollapsed && (
          <div className="rotate-90 whitespace-nowrap text-lg font-normal text-[#4ec9b0] flex items-center h-full">
            EVIA Assistant
          </div>
        )}
      </div>
    </div>
  );
}