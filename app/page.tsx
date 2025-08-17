import Link from "next/link";

import { Button } from "@/components/ui";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-24">
      <p className="text-lg text-gray-700 leading-relaxed">
        This application helps you improve your English skills with two main
        features. The Review page lets you input any English sentence, checks
        its grammar, and provides feedback for improvement. The Quiz page offers
        various grammar-related questions, including fill-in-the-blank exercises
        and multiple-choice tests on vocabulary, prepositions, and phrasal
        verbs.
      </p>
      <nav className="flex justify-center gap-4">
        <Button asChild className="px-6">
          <Link href="/quiz">Go to Quiz</Link>
        </Button>
        <Button asChild className="px-6">
          <Link href="/review">Go to Review</Link>
        </Button>
      </nav>
    </div>
  );
};

export default HomePage;
