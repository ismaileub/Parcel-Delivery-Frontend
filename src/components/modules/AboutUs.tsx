import { motion } from "framer-motion";
import { Truck, Users, ShieldCheck, Clock } from "lucide-react";

export default function AboutUs() {
  return (
    <section className="min-h-screen bg-linear-to-b from-blue-50 to-white py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Heading Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            About <span className="text-blue-600">TrustTrack</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At TrustTrack, we’re redefining the way parcels move. Our mission is
            simple — make delivery faster, smarter, and more transparent for
            everyone.
          </p>
        </motion.div>

        {/* Image + Text Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
          <motion.img
            src="/deliveryPic.png"
            alt="Delivery service"
            className="w-full md:w-1/2 rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          />

          <motion.div
            className="flex-1 text-gray-700"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold mb-4">
              Reliable, Fast, and Transparent Deliveries 🚚
            </h2>
            <p className="mb-4 leading-relaxed">
              Founded with a passion for connecting people and businesses,
              TrustTrack offers a seamless way to send and receive parcels with
              full tracking, affordable pricing, and trusted support.
            </p>
            <p className="leading-relaxed">
              Whether it’s a small document or a large shipment, our technology
              ensures your delivery is handled with care, monitored in
              real-time, and completed on schedule — every single time.
            </p>
          </motion.div>
        </div>

        {/* Core Values Section */}
        <motion.h2
          className="text-center text-3xl font-bold text-gray-800 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Core Values
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Truck,
              title: "Speed",
              text: "Delivering parcels with lightning-fast efficiency without compromising safety.",
            },
            {
              icon: ShieldCheck,
              title: "Trust",
              text: "Building long-term relationships through reliability and transparency.",
            },
            {
              icon: Users,
              title: "Community",
              text: "Empowering senders, receivers, and couriers through a connected network.",
            },
            {
              icon: Clock,
              title: "Commitment",
              text: "We deliver on time — every time — because your time matters most.",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-all border hover:-translate-y-1"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="bg-blue-100 w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-5">
                  <Icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
