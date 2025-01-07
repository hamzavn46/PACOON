import { useEffect, useRef } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { toast } from 'react-hot-toast'

const WebSocketAudioComponent = (desc, socketRef, mediaRecorderRef) => {
//   const mediaRecorderRef = useRef(null);
//   const socketRef = useRef(null);

  // Effect for API calls when transcription or desc changes
  const sendTranscriptionToAPI = async (transcription) => {
    if (transcription === '') return;
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:5000/get-response',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          transcription,
          emotion: desc
        }
      });
      
      const reply = res.data.reply;
      toast(reply, {
        position: 'bottom-center'
      });
      
      if ('speechSynthesis' in window) {
        // Speech Synthesis supported
        // const utterance = new SpeechSynthesisUtterance(reply);
        // setVoiceAndSpeak(utterance);
      } else {
        console.log('Sorry, your browser does not support speech synthesis.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const debouncedSendTranscription = debounce(sendTranscriptionToAPI, 100);

  // Effect for WebSocket setup and cleanup
  useEffect(() => {
    const key = '684d0b34e241c3f689796e7b81704986fee60890';
    socketRef.current = new WebSocket('wss://api.deepgram.com/v1/listen?punctuate=true', [
      'token',
      key,
    ]);

    socketRef.current.onopen = () => {
      console.log('WebSocket connection opened');
    };

    socketRef.current.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.channel && data.channel.alternatives[0]) {
        const newTranscription = data.channel.alternatives[0].transcript;
        setTranscription(newTranscription);
        debouncedSendTranscription(newTranscription);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      const mediaRecorder = mediaRecorderRef.current;
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
    };
  }, []); // Only run on mount and unmount

  const setVoiceAndSpeak = (utterance) => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder) {
      if (mediaRecorder.state === 'recording' && typeof mediaRecorder.pause === 'function') {
        mediaRecorder.pause();
        console.log('MediaRecorder paused');
      } else if (mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        console.log('MediaRecorder stopped');
      }
    }

    utterance.onend = () => {
      console.log('Speech synthesis ended');
      const mediaRecorder = mediaRecorderRef.current;
      if (mediaRecorder && mediaRecorder.state === 'paused') {
        console.log('MediaRecorder resumed');
      } else {
        startMediaRecorder();
        console.log('MediaRecorder restarted');
      }
    };

    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find((voice) => voice.lang === 'en-US' && voice.name.includes('Female'));
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  return null; // Or any UI elements you need
};

export default WebSocketAudioComponent;