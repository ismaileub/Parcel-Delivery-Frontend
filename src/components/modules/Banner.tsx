import { Button } from "@/components/ui/button";
import { Truck, Package, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Background accents */}
      <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-24 text-center md:text-left flex flex-col md:flex-row items-center gap-10">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Fast & Reliable{" "}
            <span className="text-amber-400">Parcel Delivery</span>
          </h1>
          <p className="text-gray-300 max-w-lg text-lg">
            Delivering happiness to your doorstep — from local shipments to
            cross-city logistics. Safe, speedy, and stress-free delivery
            services tailored for you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md"
            >
              <Link to="/sender/created-parcels">Create Parcel Request</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-blue-400 bg-white  text-blue-950 hover:bg-blue-500/10 hover:text-white"
            >
              <Link to="/track-parcel">Track Parcel</Link>
            </Button>
          </div>
        </motion.div>

        {/* Right graphic */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative flex justify-center"
        >
          <div className="relative bg-slate-800/60 backdrop-blur-lg p-8 rounded-3xl border border-slate-700 shadow-xl">
            <div className="absolute -top-6 -left-6 bg-amber-400/20 p-4 rounded-2xl">
              <Truck className="text-amber-400 w-8 h-8" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-blue-500/20 p-4 rounded-2xl">
              <Package className="text-blue-400 w-8 h-8" />
            </div>

            <img
              src="/deliveryPic.png"
              alt="Delivery illustration"
              className="w-72 md:w-96 rounded-2xl"
            />
          </div>

          {/* Floating icons */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-5 right-16 bg-slate-700/60 p-3 rounded-full border border-slate-600"
          >
            <MapPin className="text-amber-400 w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
