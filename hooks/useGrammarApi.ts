import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { API_GRAMMAR_REVIEW } from "@/constants";
import { GrammarReviewRequest, GrammarReviewResponse } from "@/types";

const useGrammarApi = () => {
  // ============================================================>>
  // =====  [POST] /api/1.0/grammar/review  ======================>>
  // ============================================================>>
  const {
    data: reviewData,
    isPending: isReviewPending,
    mutate: mutateReview,
  } = useMutation<GrammarReviewResponse, AxiosError, GrammarReviewRequest>({
    mutationFn: async (data) => {
      const response = await axios.post(API_GRAMMAR_REVIEW, data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(`[Grammar Review Success]`, data);
    },
    onError: (error) => {
      console.error(`[Grammar Review Error]: `, error);
    },
  });

  return {
    reviewData,
    isReviewPending,
    mutateReview,
  };
};

export default useGrammarApi;
