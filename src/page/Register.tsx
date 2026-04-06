import { Link } from "react-router";
import { RegisterForm } from "@/components/modules/RegisterForm";
import { Package, CheckCircle2, Users, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Register() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-slate-50/30 overflow-hidden">
      {/* Hero Sidebar */}
      <div className="relative hidden lg:flex lg:flex-1 items-center justify-center bg-slate-900 overflow-hidden">
        {/* Abstract Background Design */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

        {/* Animated Glows */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-20 -left-20 w-[500px] max-h-[500px] bg-indigo-500/20 rounded-full blur-[120px]"
        />

        <div className="relative z-10 w-full max-w-xl px-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            <div className="space-y-4 text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                Start your journey
              </span>
              <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight">
                Grow your business with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                  TrustTrack
                </span>
              </h2>
              <p className="text-slate-400 text-xl leading-relaxed">
                Join thousands of senders and receivers who trust us for their
                daily deliveries.
              </p>
            </div>

            {/* Benefit List */}
            <div className="space-y-6">
              {[
                {
                  icon: CheckCircle2,
                  text: "Seamless onboarding in less than 2 minutes",
                },
                {
                  icon: Users,
                  text: "Dedicated support for all your shipment needs",
                },
                {
                  icon: Star,
                  text: "Access to premium features and discounts",
                },
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                    <benefit.icon className="size-5" />
                  </div>
                  <span className="text-slate-300 font-medium">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="pt-8 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">4.9/5</div>
                <div className="text-slate-400 text-sm">Average Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">2M+</div>
                <div className="text-slate-400 text-sm">Parcels Delivered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-slate-400 text-sm">Customer Care</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex flex-col flex-1  ">
        <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-8 lg:p-10">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-8"
            >
              <div className="flex justify-center lg:justify-end">
                <Link to="/" className="flex items-center gap-2 group">
                  <span className="text-2xl font-bold tracking-tight">
                    Trust<span className="text-blue-600">Track</span>
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                    <Package className="size-6 text-white" />
                  </div>
                </Link>
              </div>
              <RegisterForm />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
