import { motion } from "framer-motion";
import { Truck, Package, MapPin, Clock } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Get your parcels delivered quickly and safely across the country with real-time tracking.",
  },
  {
    icon: Package,
    title: "Secure Packaging",
    description:
      "We handle every package with care and ensure your items arrive in perfect condition.",
  },
  {
    icon: MapPin,
    title: "Live Tracking",
    description:
      "Track your parcels in real-time and stay updated every step of the journey.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Our support team is available round the clock to assist you with any delivery concerns.",
  },
];

export default function OurServices() {
  return (
    <section
      id="services"
      className="py-20 bg-linear-to-b from-white to-blue-50"
    >
      <div className="container mx-auto px-4 text-center">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our <span className="text-blue-600">Services</span>
        </motion.h2>

        <motion.p
          className="text-gray-600 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          We deliver more than just parcels — we deliver trust, speed, and
          satisfaction.
        </motion.p>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl p-8 transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="bg-blue-100 w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-6">
                  <Icon className="text-blue-600 w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
