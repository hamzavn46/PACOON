import React, { useEffect, useRef, useState } from 'react'

import { FaceWidgets } from '../../components/FaceWidget';
import { Dashboard } from '../../components/Dashboard';
import debounce from 'lodash.debounce';
import AllChatsShow from '../../components/allchatsshow/AllChatsShow';
import EditorNavbar from '../../components/ui/EditorNavbar';
import axios from 'axios';
import toast from 'react-hot-toast';


interface Emotion {
    name: string;
    score: number;
}

const MainDashboard = () => {

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const socketRef = useRef<WebSocket | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const [emotions, setEmotions] = useState<Emotion[]>([]);
    const [transcription, setTranscription] = useState<string>('');
    const [llmResponse, setLlmResponse] = useState<string>('');
    const [closeCodeEditor, setCloseCodeEditor] = useState(false);
    const [desc, setDesc] = useState<string>('');
    const descRef = useRef<string>('');

    useEffect(() => {
        descRef.current = desc;
    }, [desc]);

    const debouncedSendTranscription = useRef(
        debounce(async (transcription: string) => {
            if (transcription === '') return;

            try {
                const response = await axios.post<{ response: string }>('http://localhost:5000/get-response', {
                    transcription,
                    emotions,
                });

                setLlmResponse(response.data.response);
            } catch (error) {
                console.error('Error sending transcription:', error);
                toast.error('Failed to get LLM response');
            }
        }, 1000)
    ).current;

    useEffect(() => {
        if (transcription) {
            debouncedSendTranscription(transcription);
        }
    }, [transcription, debouncedSendTranscription]);

    const handleStop = () => {
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
        }
        if (socketRef.current) {
            socketRef.current.close();
        }
        console.log('Stop button clicked');
    };
    return (
        <div className="flex w-full bg-gray-100 min-h-screen overflow-y-hidden">
            <AllChatsShow closeCodeEditor={closeCodeEditor} />
            <div>
                <div>

                    <div className='mb-2'>
                        {closeCodeEditor == false && (
                            <>
                                <EditorNavbar closeCodeEditor={closeCodeEditor} setCloseCodeEditor={setCloseCodeEditor} />
                                <div className="w-1/3">
                                    <Dashboard
                                        emotions={emotions}
                                        transcription={transcription}
                                        llmResponse={llmResponse}
                                    />
                                </div>
                            </>
                        )
                        }
                    </div>
                </div>
                {/* Add margin-left to account for sidebar */}
                {/* <div className="w-2/3 p-4 ml-16">
            <FaceWidgets
              setDesc={setDesc}
              setEmotions={setEmotions}
            />
            <button
              onClick={handleStop}
              className="mt-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600"
            >
              Stop
            </button>
          </div> */}



            </div>

        </div>
    )
}

export default MainDashboard
