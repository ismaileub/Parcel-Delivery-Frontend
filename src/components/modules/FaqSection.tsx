import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How can I track my parcel?",
    answer:
      "You can track your parcel using the tracking ID sent to your email or SMS. Simply go to the 'Track Parcel' page and enter the ID.",
  },
  {
    question: "How long does delivery usually take?",
    answer:
      "Delivery time depends on the route and service type, but most local deliveries are completed within 24-48 hours.",
  },
  {
    question: "What if my parcel gets delayed?",
    answer:
      "If your parcel is delayed, you can contact our support team with your tracking ID. We will investigate and keep you updated.",
  },
  {
    question: "Can I change the delivery address after booking?",
    answer:
      "Address changes are possible before the parcel is out for delivery. Please reach out to support as soon as possible to request a change.",
  },
];

const FaqSection = () => {
  const [openValue, setOpenValue] = useState<string>("0");

  return (
    <section id="faq" className="bg-blue-50 py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Find quick answers about tracking, delivery time, and how TrustTrack
            keeps your parcels safe.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((item, index) => {
            const value = String(index);
            const isOpen = openValue === value;

            return (
              <Collapsible
                key={value}
                open={isOpen}
                onOpenChange={(nextOpen) => setOpenValue(nextOpen ? value : "")}
              >
                <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-slate-200">
                  <CollapsibleTrigger asChild>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-sm md:text-base font-semibold text-slate-900">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 text-slate-600 transition-transform",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <Separator className="bg-slate-100" />
                    <div className="px-5 pb-4 pt-3 text-sm text-slate-600">
                      {item.answer}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
