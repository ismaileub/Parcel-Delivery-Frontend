import { motion } from "framer-motion";
import { Package, MapPin, Truck, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Package,
    title: "Create Parcel Request",
    description:
      "Fill in parcel details, pickup and delivery addresses, and preferred date in a few clicks.",
  },
  {
    icon: MapPin,
    title: "We Assign a Rider",
    description:
      "Our smart system assigns the nearest available rider and shares live pickup updates.",
  },
  {
    icon: Truck,
    title: "In Transit & Tracked",
    description:
      "Your parcel moves through our network with every status updated in real time.",
  },
  {
    icon: CheckCircle2,
    title: "Delivered with Proof",
    description:
      "Receiver confirms delivery, and you get instant confirmation inside your dashboard.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-slate-50 py-16" id="how-it-works">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
            How It Works
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
            From Request to Delivery in Four Simple Steps
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600">
            TrustTrack connects senders, riders, and receivers in a single,
            transparent workflow so every parcel is easy to create, track, and
            deliver.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                className="relative bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col gap-3"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">
                      {index + 1}
                    </span>
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <h3 className="mt-2 text-base font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
