// ============================================================>>
// =====  [POST] /api/1.0/grammar/review  ======================>>
// ============================================================>>
export type GrammarReviewRequest = {
  text: string;
};

export type GrammarReviewResponse = {
  isGrammaticallyCorrect: boolean;
  feedback: string;
  recommendedSentences: string[];
};
