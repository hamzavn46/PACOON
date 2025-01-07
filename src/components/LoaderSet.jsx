import { Loader } from "./Loader";

export function LoaderSet({ className = "", emotions, emotionNames, numLevels }) {
  return (
    <div className={className}>
      {emotionNames.map((emotionName, i) => (
        <Loader key={i} emotions={emotions} emotionName={emotionName} numLevels={numLevels} />
      ))}
    </div>
  );
}
