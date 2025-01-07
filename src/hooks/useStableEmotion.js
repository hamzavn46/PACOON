import {useState, useEffect} from 'react'

export const CANONICAL_EMOTION_NAMES = [
  "Admiration",
  "Adoration",
  "Aesthetic Appreciation",
  "Amusement",
  "Anger",
  "Anxiety",
  "Awe",
  "Awkwardness",
  "Boredom",
  "Calmness",
  "Concentration",
  "Confusion",
  "Contemplation",
  "Contempt",
  "Contentment",
  "Craving",
  "Desire",
  "Determination",
  "Disappointment",
  "Disgust",
  "Distress",
  "Doubt",
  "Ecstasy",
  "Embarrassment",
  "Empathic Pain",
  "Entrancement",
  "Envy",
  "Excitement",
  "Fear",
  "Guilt",
  "Horror",
  "Interest",
  "Joy",
  "Love",
  "Nostalgia",
  "Pain",
  "Pride",
  "Realization",
  "Relief",
  "Romance",
  "Sadness",
  "Satisfaction",
  "Shame",
  "Surprise (negative)",
  "Surprise (positive)",
  "Sympathy",
  "Tiredness",
  "Triumph",
];

export function useStableEmotions(emotions, embeddingDistThreshold) {
  const [stableEmotions, setStableEmotions] = useState([]);

  useEffect(() => {
    if (emotions.length === 0) return;

    if (stableEmotions.length === 0) {
      setStableEmotions(emotions);
    } else {
      const dist = emotionDist(emotions, stableEmotions);
      if (dist > embeddingDistThreshold) {
        setStableEmotions(emotions);
      }
    }
  }, [emotions]);

  return stableEmotions;
}


function emotionsToEmbedding(emotions) {
  const scoreMap = emotionsToScoreMap(emotions);
  const embedding = [];
  for (let i = 0; i < CANONICAL_EMOTION_NAMES.length; i++) {
    const emotionName = CANONICAL_EMOTION_NAMES[i];
    const score = scoreMap.get(emotionName);
    if (score === undefined) {
      console.error(`Could not find emotion ${emotionName} in embedding`);
      break;
    }
    embedding.push(score);
  }
  return embedding;
}

function emotionDist(emotionsA, emotionsB) {
  return embeddingDist(emotionsToEmbedding(emotionsA), emotionsToEmbedding(emotionsB));
}

function emotionsToScoreMap(emotions) {
  const m = new Map();
  for (let i = 0; i < emotions.length; i++) {
    const emotion = emotions[i];
    m.set(emotion.name, emotion.score);
  }
  return m;
}

function embeddingDist(embeddingA, embeddingB) {
  // Not really the distance, actually sum of squared errors
  let s = 0;
  for (let i = 0; i < embeddingA.length; i++) {
    const a = embeddingA[i];
    const b = embeddingB[i];
    s += (b - a) * (b - a);
  }
  return s;
}
