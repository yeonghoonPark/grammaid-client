import { useFormContext } from "react-hook-form";

import { Button, Input } from "@/components/ui";
import { REVIEW_FORM_VALIDATOR, REVIEW_FORM_VALUES } from "@/constants";
import useGrammarApi from "@/hooks/useGrammarApi";
import { ReviewFormValues } from "@/types";

type Props = {
  grammarApi: ReturnType<typeof useGrammarApi>;
};

const ReviewForm = ({ grammarApi }: Props) => {
  // React Hook Form
  const methods = useFormContext<ReviewFormValues>();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = methods;

  // React Query
  const { isReviewPending, mutateReview } = grammarApi;

  /**
   * Function called on form submission that receives input text and triggers the grammar check API.
   *
   * @param data - The form data object of type CheckFormValues
   *
   * This function passes the input text to the `mutateCheck` function,
   * which sends the grammar check request and handles the result asynchronously via React Query.
   */
  const onSubmit = (data: ReviewFormValues) => {
    const { text } = data;

    mutateReview({ text });
  };

  return (
    <>
      <form
        className="flex items-center gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          {...register(REVIEW_FORM_VALUES.TEXT, REVIEW_FORM_VALIDATOR)}
          className="shadow"
          disabled={isReviewPending}
          name={REVIEW_FORM_VALUES.TEXT}
          placeholder="Enter an English sentence to check its grammar."
        />
        <Button className="px-6" disabled={isReviewPending} type="submit">
          Submit
        </Button>
      </form>
      {errors[REVIEW_FORM_VALUES.TEXT]?.type === "pattern" && (
        <p className="mt-1 text-red-500" role="alert">
          {errors[REVIEW_FORM_VALUES.TEXT]?.message}
        </p>
      )}
    </>
  );
};

export default ReviewForm;
