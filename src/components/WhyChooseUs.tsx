import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { History, Cpu, Users, LineChart, Globe, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const reasons = [
  {
    icon: History,
    title: "7+ Years of Historical Returns",
    description: "Consistent profitability through every market cycle—proven track record since 2017.",
    stat: "340%",
    statLabel: "Avg. Annual ROI",
  },
  {
    icon: Cpu,
    title: "AI-Driven Trading Systems",
    description: "Our proprietary algorithms analyze millions of data points to execute optimal trades.",
    stat: "50K+",
    statLabel: "Daily Trades",
  },
  {
    icon: LineChart,
    title: "Proven BTC Mining Performance",
    description: "State-of-the-art mining operations across 3 continents with renewable energy.",
    stat: "12 EH/s",
    statLabel: "Hash Rate",
  },
  {
    icon: Users,
    title: "Global Team of Analysts",
    description: "Former Wall Street quants, blockchain pioneers, and risk management experts.",
    stat: "150+",
    statLabel: "Team Members",
  },
  {
    icon: Globe,
    title: "Worldwide Operations",
    description: "Infrastructure spanning North America, Europe, and Asia for optimal performance.",
    stat: "50+",
    statLabel: "Countries Served",
  },
  {
    icon: Award,
    title: "Elite Wealth Strategies",
    description: "Exclusive investment approaches previously reserved for institutional investors.",
    stat: "$2.4B",
    statLabel: "Assets Managed",
  },
];

export const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute inset-0 bg-radial-gold opacity-10" />
      </div>

      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
              Why AurumVest
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
              The Gold Standard in{" "}
              <span className="bg-gradient-to-r from-primary to-gold-light bg-clip-text text-transparent">
                Digital Wealth
              </span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              In a market flooded with promises, AurumVest delivers results. Our unique 
              combination of institutional-grade trading, cutting-edge mining operations, 
              and AI-powered strategies creates unparalleled value for our investors.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <span className="text-emerald-400 text-xl">✓</span>
                </div>
                <p className="text-foreground">Zero security breaches in 7+ years of operation</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <span className="text-emerald-400 text-xl">✓</span>
                </div>
                <p className="text-foreground">98.7% client satisfaction rate</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <span className="text-emerald-400 text-xl">✓</span>
                </div>
                <p className="text-foreground">$100M insurance coverage on all assets</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="premium" size="xl" className="group">
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="glass" size="xl">
                Schedule Consultation
              </Button>
            </div>
          </motion.div>

          {/* Right: Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group glass rounded-xl p-6 hover:border-primary/30 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <reason.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-serif font-bold text-primary mb-1">
                  {reason.stat}
                </p>
                <p className="text-xs text-muted-foreground mb-3">{reason.statLabel}</p>
                <h4 className="font-semibold text-foreground text-sm mb-2">{reason.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
