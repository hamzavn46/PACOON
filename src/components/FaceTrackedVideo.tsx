import React, { useEffect, useRef } from 'react';

interface TrackedFace {
  boundingBox: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

interface FaceTrackedVideoProps {
  className?: string;
  trackedFaces: TrackedFace[];
  onVideoReady: (video: HTMLVideoElement) => void;
  width: number;
  height: number;
}

export function FaceTrackedVideo({ className = '', trackedFaces, onVideoReady, width, height }: FaceTrackedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      console.error('Missing video element');
      return;
    }
    onVideoReady(videoElement);
  }, [onVideoReady]);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const videoElement = videoRef.current;
    const graphics = canvasElement?.getContext('2d');

    if (!canvasElement || !videoElement || !graphics) {
      return;
    }

    canvasElement.width = videoElement.videoWidth || width;
    canvasElement.height = videoElement.videoHeight || height;

    graphics.clearRect(0, 0, canvasElement.width, canvasElement.height);

    if (trackedFaces.length > 0) {
      graphics.fillStyle = 'rgba(40, 40, 40, 0.5)';
      graphics.fillRect(0, 0, canvasElement.width, canvasElement.height);
    }

    trackedFaces.forEach((trackedFace) => {
      const bbox = trackedFace.boundingBox;
      const scale = 20;
      const b = {
        x: bbox.x - scale,
        y: bbox.y - scale,
        w: bbox.w + 2 * scale,
        h: bbox.h + 2 * scale,
      };

      const cx = b.x + b.w / 2;
      const cy = b.y + b.h / 2;
      const rx = b.w / 2;
      const ry = b.h / 2;

      graphics.beginPath();
      graphics.lineWidth = 5;
      graphics.strokeStyle = 'rgba(250, 250, 250, 0.1)';
      graphics.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI);
      graphics.stroke();

      graphics.globalCompositeOperation = 'destination-out';
      graphics.fillStyle = 'rgba(0, 0, 0, 1)';
      graphics.fill();
      graphics.globalCompositeOperation = 'source-over';
    });

    return () => {
      graphics.clearRect(0, 0, canvasElement.width, canvasElement.height);
    };
  }, [trackedFaces, width, height]);

  return (
    <div className={`relative h-[200px] w-full overflow-hidden rounded-lg border border-neutral-300 bg-black align-top shadow md:h-[355px] md:w-[500px]  ${className}`}>
      <video className="absolute -scale-x-[1]" ref={videoRef} autoPlay playsInline muted />
      <canvas className="absolute" ref={canvasRef} />
    </div>
  );
}