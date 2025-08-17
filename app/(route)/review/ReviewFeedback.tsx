import { useFormContext } from "react-hook-form";
import { PiCopy, PiSpeakerHigh } from "react-icons/pi";
import { BeatLoader } from "react-spinners";

import { REVIEW_FORM_VALUES } from "@/constants";
import useGrammarApi from "@/hooks/useGrammarApi";
import { ReviewFormValues } from "@/types";

type Props = {
  grammarApi: ReturnType<typeof useGrammarApi>;
};

const ReviewFeedback = ({ grammarApi }: Props) => {
  // React Hook Form
  const methods = useFormContext<ReviewFormValues>();
  const { setFocus, setValue } = methods;

  // React Query
  const { reviewData, isReviewPending } = grammarApi;

  /**
   * Returns a callback that sets the input value and focuses the input field.
   *
   * @param sentence - The sentence string to set as the input value
   * @returns A function that executes the value setting and focus when called
   */
  const handleClick = (sentence: string) => () => {
    setFocus(REVIEW_FORM_VALUES.TEXT);
    setValue(REVIEW_FORM_VALUES.TEXT, sentence);
  };

  /**
   * Returns a callback that speaks the given text using the browser's speech synthesis.
   *
   * The speech is configured to use US English with specified rate and volume.
   * It selects the "Google US English" voice if available, otherwise falls back to the default voice.
   *
   * @param text - The text string to be spoken
   * @returns A function that triggers the speech synthesis when called
   */
  const speakWithVoice = (text: string) => () => {
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    utterance.volume = 0.8;

    const voices = window.speechSynthesis
      .getVoices()
      .filter((v) => v.lang === "en-US");
    const voice =
      voices.find((v) => v.voiceURI === "Google US English") ||
      voices.find((v) => v.default) ||
      voices[0];

    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
  };

  /**
   * Returns a callback that copies the given text to the clipboard asynchronously.
   *
   * Logs an error to the console if the copy operation fails.
   *
   * @param text - The text string to copy to the clipboard
   * @returns A function that performs the copy action when called
   */
  const copyToClipboard = (text: string) => async () => {
    try {
      await window.navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Failed copy to clipboard", error);
    }
  };

  if (isReviewPending) {
    return <BeatLoader className="py-6" size={12} />;
  }

  return (
    <div className="flex flex-col gap-12">
      {reviewData?.feedback && (
        <section>
          <h2 className="flex items-center text-xl font-semibold mb-4">
            <span className="block w-1 h-6 bg-black mr-3" />
            Feedback
          </h2>
          <p>{reviewData.feedback}</p>
        </section>
      )}

      {reviewData?.recommendedSentences && (
        <section>
          <h2 className="flex items-center text-xl font-semibold mb-4">
            <span className="block w-1 h-6 bg-black mr-3" />
            Recommended Sentences
          </h2>
          <ul className="space-y-6">
            {reviewData?.recommendedSentences.map((sentence, idx) => (
              <li key={sentence}>
                <p
                  className="
                  px-3 py-1 
                  border
                  hover:border-gray-500
                  rounded-md 
                  shadow-xs
                  bg-white
                  transition-colors duration-150
                  cursor-pointer
                "
                  onClick={handleClick(sentence)}
                >
                  {`${idx + 1}. ${sentence}`}
                </p>
                <div className="flex justify-end gap-6 mt-2 px-6">
                  <PiSpeakerHigh
                    className="text-gray-500 hover:text-gray-900 cursor-pointer transition-colors duration-150"
                    onClick={speakWithVoice(sentence)}
                    size={20}
                  />
                  <PiCopy
                    className="text-gray-500 hover:text-gray-900 cursor-pointer transition-colors duration-150"
                    onClick={copyToClipboard(sentence)}
                    size={20}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ReviewFeedback;
