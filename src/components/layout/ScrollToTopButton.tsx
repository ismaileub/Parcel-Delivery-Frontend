import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";

type ScrollToTopButtonProps = {
  showAfterPx?: number;
};

export default function ScrollToTopButton({
  showAfterPx = 300,
}: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > showAfterPx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfterPx]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        type="button"
        size="icon"
        className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
}
