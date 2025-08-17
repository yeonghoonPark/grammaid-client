import { useFormContext } from "react-hook-form";
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
   * Returns a callback that handles the keydown event on the list item.
   *
   * @param sentence - The sentence string to set as the input value
   * @param event - The keyboard event triggered on keydown
   */
  const handleKeyDown = (sentence: string) => (event: React.KeyboardEvent) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    handleClick(sentence)();
  };

  if (isReviewPending) {
    return <BeatLoader className="py-6" size={12} />;
  }

  return (
    <>
      <div>{reviewData?.feedback}</div>
      <ul>
        {reviewData?.recommendedSentences.map((sentence, idx) => (
          <li
            className="
              w-fit my-6 px-3
              rounded-md 
              border-[3px] border-transparent 
              hover:border-ring/50
              focus:border-ring/50
              cursor-pointer 
            "
            key={`${sentence}${idx}`}
            onClick={handleClick(sentence)}
            onKeyDown={handleKeyDown(sentence)}
            role="button"
            tabIndex={0}
          >
            {`${idx + 1}. ${sentence}`}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ReviewFeedback;
