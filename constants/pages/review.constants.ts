export const REVIEW_FORM_VALUES = {
  TEXT: "text",
} as const;

export const REVIEW_FORM_VALIDATOR = {
  pattern: {
    message:
      "Korean characters are not permitted. Please only type in English.",
    value: /^[^\u3131-\uD79D]+$/, // Korean exclusion regex
  },
  required: "Please enter text.",
} as const;
