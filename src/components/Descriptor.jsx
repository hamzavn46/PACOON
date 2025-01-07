import { useStableEmotions } from "../hooks/useStableEmotion";
import { useEffect } from 'react';

const DESCRIPTOR_MAP = new Map([
  ["Admiration", "Admiring"],
  ["Adoration", "Adoring"],
  ["Aesthetic Appreciation", null],
  ["Amusement", "Amused"],
  ["Anger", "Angry"],
  ["Anxiety", "Anxious"],
  ["Awe", null],
  ["Awkwardness", "Awkward"],
  ["Boredom", "Bored"],
  ["Calmness", "Calm"],
  ["Concentration", null],
  ["Confusion", "Confused"],
  ["Contemplation", "Comptemplative"],
  ["Contempt", "Contemptful"],
  ["Contentment", "Contented"],
  ["Craving", "Craving"],
  ["Desire", "Desirous"],
  ["Determination", "Determined"],
  ["Disappointment", "Disappointed"],
  ["Disgust", "Disgusted"],
  ["Distress", "Distressed"],
  ["Doubt", "Doubtful"],
  ["Ecstasy", "Ecstatic"],
  ["Embarrassment", "Embarrassed"],
  ["Empathic Pain", null],
  ["Entrancement", "Entranced"],
  ["Envy", "Envious"],
  ["Excitement", "Excited"],
  ["Fear", "Fearful"],
  ["Guilt", "Guilty"],
  ["Horror", "Horrified"],
  ["Interest", "Interested"],
  ["Joy", "Joyful"],
  ["Love", "Loving"],
  ["Nostalgia", "Nostalgic"],
  ["Pain", "Pained"],
  ["Pride", "Prideful"],
  ["Realization", null],
  ["Relief", "Relieved"],
  ["Romance", "Romantic"],
  ["Sadness", "Sad"],
  ["Satisfaction", "Satisfied"],
  ["Shame", "Shameful"],
  ["Surprise (negative)", "Surprised"],
  ["Surprise (positive)", "Surprised"],
  ["Sympathy", "Sympathetic"],
  ["Tiredness", "Tired"],
  ["Triumph", "Triumphant"]
]);

function getEmotionDescriptor(name) {
  return DESCRIPTOR_MAP.get(name);
}

export function Descriptor({ className, emotions, setDesc }) {
  const emotionDistThreshold = 0.1;
  const embeddingDistThreshold = 0.2;
  const stableEmotions = useStableEmotions(emotions, embeddingDistThreshold);
  const description = createDescription(stableEmotions)
  className = className || "";

  function createDescription(emotions) {
    emotions.sort((a, b) => (a.score < b.score ? 1 : -1));
    if (emotions.length < 2) return "";

    const primaryEmotion = emotions[0];
    let secondaryEmotion = emotions[1];
    let secondaryDescriptor = "";
    for (let i = 1; i < emotions.length; i++) {
      const emotion = emotions[i];
      const descriptor = getEmotionDescriptor(emotion.name);
      if (descriptor !== undefined) {
        secondaryDescriptor = descriptor;
        secondaryEmotion = emotion;
        break;
      }
    }
    if (Math.abs(primaryEmotion.score - secondaryEmotion.score) > emotionDistThreshold) {
      return primaryEmotion.name;
    }
    return `${secondaryDescriptor} ${primaryEmotion.name}`;
  }

  useEffect(() => {
    setDesc(description)
  },[emotions])

  return (
    <div className={`${className} flex`}>
      {emotions.length > 0 && (
        <div className="mb-3 flex rounded-full border border-neutral-200 text-sm shadow">
          <div className="flex justify-center rounded-l-full bg-white py-2 px-3 font-medium text-neutral-800"></div>
          <div className="w-48 bg-neutral-800 px-4 py-2 text-center lowercase text-white">
            <span>{description}</span>
          </div>
          <div className="flex justify-center rounded-r-full bg-white py-2 px-3 font-medium text-neutral-800"></div>
        </div>
      )}
    </div>
  );
}