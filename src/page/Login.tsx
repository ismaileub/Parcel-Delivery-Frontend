import { LoginForm } from "@/components/modules/LoginForm";
import { Link } from "react-router";
import { Truck, ShieldCheck, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-slate-50/30 overflow-hidden">
      {/* Form Side */}
      <div className="flex flex-col flex-1 bg-white lg:bg-transparent">
        <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-10 lg:p-16">
          <div className="w-full max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-8"
            >
              <div className="flex justify-center lg:justify-start">
                <Link to="/" className="flex items-center gap-2 group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                    <Truck className="size-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold tracking-tight">
                    Trust<span className="text-blue-600">Track</span>
                  </span>
                </Link>
              </div>
              <LoginForm />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hero Sidebar */}
      <div className="relative hidden lg:flex lg:flex-1 items-center justify-center bg-slate-900 overflow-hidden shadow-2xl shadow-blue-900/20">
        {/* Abstract Background Design */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

        {/* Animated Glows */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-amber-400/20 rounded-full blur-[120px]"
        />

        <div className="relative z-10 w-full max-w-xl px-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                Logistics Redefined
              </span>
              <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight">
                Empowering your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                  global logistics
                </span>{" "}
                journey.
              </h2>
              <p className="text-slate-400 text-xl leading-relaxed">
                Connect with the world's most reliable parcel network. Simple,
                fast, and transparent.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: "Secure",
                  desc: "Enterprise-grade safety",
                },
                { icon: Zap, title: "Fast", desc: "Next-day delivery" },
                { icon: Globe, title: "Global", desc: "190+ countries" },
                { icon: Truck, title: "Tracked", desc: "Real-time updates" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-blue-400">
                    <feature.icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Micro Testimonial */}
            <div className="pt-8 border-t border-white/10">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-slate-900 bg-slate-800"
                    />
                  ))}
                </div>
                <p className="text-slate-300 text-sm italic">
                  "Joined by 10,000+ businesses worldwide"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
