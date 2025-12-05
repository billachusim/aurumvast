import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, TrendingUp, Cpu, Globe, Award, Lock } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "7+ Years of Consistent Returns",
    description: "Profitable operations through every market cycle—bull, bear, and everything in between.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Trading Systems",
    description: "Our proprietary algorithms execute thousands of trades daily with institutional precision.",
  },
  {
    icon: Globe,
    title: "Global Mining Operations",
    description: "Bitcoin mining farms across 3 continents, powered by renewable energy sources.",
  },
  {
    icon: Shield,
    title: "Institutional Risk Management",
    description: "Multi-layered security protocols protecting over $2.4 billion in client assets.",
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            Our Legacy
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
            The Private Gateway to{" "}
            <span className="bg-gradient-to-r from-primary to-gold-light bg-clip-text text-transparent">
              Generational Wealth
            </span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Founded by former Wall Street quantitative analysts and blockchain pioneers, 
            AurumVest has become the trusted partner for discerning investors seeking 
            exceptional returns in the digital asset space.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Premium Card */}
              <div className="glass rounded-2xl p-8 md:p-10 border-primary/20">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Award className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      Excellence Since 2017
                    </h3>
                    <p className="text-muted-foreground text-sm">Proven Track Record</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    What began as a small algorithmic trading operation has evolved into 
                    a global digital wealth powerhouse. Our journey from a $10 million 
                    fund to managing over $2.4 billion is a testament to our unwavering 
                    commitment to excellence.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Today, we operate state-of-the-art Bitcoin mining facilities across 
                    North America, Europe, and Asia, while our trading systems execute 
                    with microsecond precision across every major exchange.
                  </p>
                </div>

                {/* Achievement Badges */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border/50">
                  <div className="text-center">
                    <div className="text-2xl font-serif font-bold text-primary">340%</div>
                    <div className="text-xs text-muted-foreground">Avg. Annual ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-serif font-bold text-primary">Zero</div>
                    <div className="text-xs text-muted-foreground">Security Breaches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-serif font-bold text-primary">50+</div>
                    <div className="text-xs text-muted-foreground">Countries Served</div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/5 rounded-full blur-xl" />
            </div>
          </motion.div>

          {/* Right: Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="group p-6 rounded-xl bg-card/30 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:bg-card/50"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
