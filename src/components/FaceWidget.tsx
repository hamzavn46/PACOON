// src/components/FaceWidget.tsx

import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaceTrackedVideo } from './FaceTrackedVideo';

interface TrackedFace {
  boundingBox: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

interface FaceWidgetProps {
  onCalibrate?: () => void;
  setDesc: (desc: string) => void;
  setEmotions: (emotions: TrackedFace[]) => void;
}

export function FaceWidgets({ onCalibrate, setDesc, setEmotions }: FaceWidgetProps) {
  const socketRef = useRef<WebSocket | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [status, setStatus] = useState<string>('');
  const [trackedFaces, setTrackedFacesState] = useState<TrackedFace[]>([]);

  useEffect(() => {
    connect();

    return () => {
      stopEverything();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connect = () => {
    const socketUrl = `wss://api.hume.ai/v0/stream/models?apikey=${process.env.HUME_API_KEY}`;
    const socket = new WebSocket(socketUrl);
    socketRef.current = socket;

    socket.onopen = socketOnOpen;
    socket.onmessage = socketOnMessage;
    socket.onclose = socketOnClose;
    socket.onerror = socketOnError;
  };

  const socketOnOpen = () => {
    setStatus('Connected to Hume Socket API');
    startMedia();
  };

  const socketOnMessage = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      // Assuming data has a 'face' key with 'predictions'
      if (data.face && data.face.predictions) {
        setEmotions(data.face.predictions);
        setTrackedFacesState(data.face.predictions);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  const socketOnClose = () => {
    setStatus('Socket closed');
  };

  const socketOnError = (error: Event) => {
    console.error('Socket error:', error);
    setStatus('Socket encountered an error');
  };

  const startMedia = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      mediaStreamRef.current = mediaStream;

      // Initialize MediaRecorder
      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start(1000); // Collect data in chunks every second
    } catch (error) {
      console.error('Error accessing media devices.', error);
      setStatus('Error accessing media devices');
    }
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0 && socketRef.current?.readyState === WebSocket.OPEN) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        socketRef.current?.send(base64data);
      };
      reader.readAsDataURL(event.data);
    }
  };

  const stopEverything = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (socketRef.current) {
      socketRef.current.close();
    }
    setStatus('Stopped');
  };

  const onVideoReady = (video: HTMLVideoElement) => {
    console.log('Video is ready:', video);
  };

  return (
    <div>
      <FaceTrackedVideo
        className="mb-6"
        onVideoReady={onVideoReady}
        trackedFaces={trackedFaces}
        width={500}
        height={375}
      />
      <div className="pt-6">{status}</div>
    </div>
  );
}