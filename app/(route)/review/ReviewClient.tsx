"use client";

import { FormProvider, useForm } from "react-hook-form";

import ReviewFeedback from "@/app/(route)/review/ReviewFeedback";
import ReviewForm from "@/app/(route)/review/ReviewForm";
import useGrammarApi from "@/hooks/useGrammarApi";
import { ReviewFormValues } from "@/types";

const ReviewClient = () => {
  // React Hook Form
  const methods = useForm<ReviewFormValues>({ mode: "all" });

  // React Query
  const grammarApi = useGrammarApi();

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col min-h-full">
        <ReviewFeedback grammarApi={grammarApi} />

        <div className="absolute bottom-24 border-t pt-6 w-full">
          <ReviewForm grammarApi={grammarApi} />
        </div>
      </div>
    </FormProvider>
  );
};

export default ReviewClient;
