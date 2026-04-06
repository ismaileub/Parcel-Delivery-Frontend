import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Small Business Owner",
    feedback:
      "TrustTrack has completely simplified our daily deliveries. I can track every parcel in real time and my customers love the transparency.",
  },
  {
    name: "Rahim Uddin",
    role: "Regular Sender",
    feedback:
      "Pickup is always on time and I never have to worry about where my parcel is. The tracking updates are super accurate.",
  },
  {
    name: "Anika Chowdhury",
    role: "Online Seller",
    feedback:
      "Fast delivery and great support. My return rate has dropped because parcels now reach customers safely and on schedule.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            What Our <span className="text-blue-600">Customers Say</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Real experiences from people and businesses who trust TrustTrack
            with their parcels every day.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-700 mb-4">“{item.feedback}”</p>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {item.name}
                </p>
                <p className="text-xs text-slate-500">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
