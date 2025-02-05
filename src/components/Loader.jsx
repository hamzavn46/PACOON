const RANGE_MAP = new Map([
  ["Admiration", { min: 0.022, max: 0.416 }],
  ["Adoration", { min: 0.016, max: 0.335 }],
  ["Aesthetic Appreciation", { min: 0.017, max: 0.14 }],
  ["Amusement", { min: 0.047, max: 0.892 }],
  ["Anger", { min: 0.008, max: 0.633 }],
  ["Anxiety", { min: 0.033, max: 0.402 }],
  ["Awe", { min: 0.039, max: 0.897 }],
  ["Awkwardness", { min: 0.099, max: 0.336 }],
  ["Boredom", { min: 0.052, max: 0.74 }],
  ["Calmness", { min: 0.047, max: 0.909 }],
  ["Concentration", { min: 0.07, max: 0.582 }],
  ["Confusion", { min: 0.062, max: 1.09 }],
  ["Contemplation", { min: 0.034, max: 0.474 }],
  ["Contempt", { min: 0.034, max: 0.411 }],
  ["Contentment", { min: 0.031, max: 0.452 }],
  ["Craving", { min: 0.026, max: 0.658 }],
  ["Desire", { min: 0.041, max: 0.165 }],
  ["Determination", { min: 0.033, max: 0.581 }],
  ["Disappointment", { min: 0.013, max: 0.849 }],
  ["Disgust", { min: 0.025, max: 0.456 }],
  ["Distress", { min: 0.04, max: 0.764 }],
  ["Doubt", { min: 0.01, max: 0.463 }],
  ["Ecstasy", { min: 0.04, max: 0.589 }],
  ["Embarrassment", { min: 0.011, max: 0.27 }],
  ["Empathic Pain", { min: 0.027, max: 0.16 }],
  ["Entrancement", { min: 0.017, max: 0.061 }],
  ["Envy", { min: 0.016, max: 0.866 }],
  ["Excitement", { min: 0.019, max: 0.566 }],
  ["Fear", { min: 0.012, max: 0.16 }],
  ["Guilt", { min: 0.009, max: 0.683 }],
  ["Horror", { min: 0.07, max: 0.659 }],
  ["Interest", { min: 0.019, max: 0.854 }],
  ["Joy", { min: 0.018, max: 0.484 }],
  ["Love", { min: 0.021, max: 0.114 }],
  ["Nostalgia", { min: 0.009, max: 0.637 }],
  ["Pain", { min: 0.028, max: 0.208 }],
  ["Pride", { min: 0.069, max: 0.275 }],
  ["Realization", { min: 0.017, max: 0.363 }],
  ["Relief", { min: 0.009, max: 0.199 }],
  ["Romance", { min: 0.015, max: 1.057 }],
  ["Sadness", { min: 0.028, max: 0.571 }],
  ["Satisfaction", { min: 0.011, max: 1.046 }],
  ["Shame", { min: 0.013, max: 0.168 }],
  ["Surprise (negative)", { min: 0.013, max: 0.678 }],
  ["Surprise (positive)", { min: 0.013, max: 0.836 }],
  ["Sympathy", { min: 0.02, max: 0.121 }],
  ["Tiredness", { min: 0.044, max: 0.609 }],
  ["Triumph", { min: 0.012, max: 0.242 }],
]);

export function Loader({ className = "", emotions, emotionName, numLevels = 5 }) {
  if (emotions.length === 0) {
    return null;
  }

  function getLevel(scaledEmotions) {
    // Level ranges from 0 to numLevels (inclusive)
    const emotion = scaledEmotions.find((e) => e.name === emotionName);
    if (!emotion) {
      console.error(`Could not find emotion ${emotionName}`);
      return 0;
    }

    const score = emotion.score;
    for (let i = numLevels; i >= 0; i--) {
      const threshold = i / (numLevels + 1);
      if (score > threshold) {
        return i;
      }
    }

    return 0;
  }

  function getIndicators(level) {
    const indicators = new Array(numLevels).fill(false);
    for (let i = 0; i < numLevels; i++) {
      if (i < level) {
        indicators[i] = true;
      }
    }
    return indicators;
  }

  const scaledEmotions = scaleEmotionsToRanges(emotions);
  const level = getLevel(scaledEmotions);
  const indicators = getIndicators(level);
  const emotionDisplayName = emotionName.includes("Surprise") ? "Surprise" : emotionName;


  function scaleEmotionsToRanges(emotions) {
  const scaledEmotions = [];
  for (let i = 0; i < emotions.length; i++) {
    const emotion = emotions[i];
    let range = RANGE_MAP.get(emotion.name);
    if (!range) {
      console.error(`Could not find range for emotion ${emotion.name}`);
      range = { min: 0, max: 0 };
    }
    const scaledScore = scale(emotion.score, range);
    const scaledEmotion = {
      ...emotion,
      score: scaledScore,
    };
    scaledEmotions.push(scaledEmotion);
  }
  return scaledEmotions;
}

function scale(value, range) {
  const clipped = clip(value, range);
  return (clipped - range.min) / (range.max - range.min);
}

function clip(value, range) {
  return Math.max(Math.min(value, range.max), range.min);
}


  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex">
        {indicators.map((indicator, i) => {
          const color = indicator ? "bg-neutral-800" : "bg-neutral-400";
          return (
            <div
              key={i}
              className={`mr-1 resize-none rounded border border-neutral-300 pl-5 pt-5 text-sm text-white shadow ${color}`}
            ></div>
          );
        })}
      </div>
      <div className="ml-2 font-medium lowercase">{emotionDisplayName}</div>
    </div>
  );
}