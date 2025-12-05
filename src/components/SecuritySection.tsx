import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Lock, Server, Eye, Globe, FileCheck, AlertTriangle, Fingerprint } from "lucide-react";

const securityFeatures = [
  {
    icon: Lock,
    title: "Multi-Signature Wallets",
    description: "All funds require multiple authorized signatures for any transaction, preventing unauthorized access.",
  },
  {
    icon: Server,
    title: "Cold Storage Security",
    description: "98% of assets are stored in air-gapped cold wallets, physically isolated from all networks.",
  },
  {
    icon: Eye,
    title: "24/7 AI Fraud Detection",
    description: "Our proprietary AI monitors all transactions in real-time, flagging suspicious activity instantly.",
  },
  {
    icon: Globe,
    title: "Global Compliance",
    description: "Fully compliant with international regulations including GDPR, SOC 2, and financial standards.",
  },
  {
    icon: Fingerprint,
    title: "Biometric Authentication",
    description: "Advanced biometric verification adds an extra layer of security to all account access.",
  },
  {
    icon: FileCheck,
    title: "Insurance Protection",
    description: "$100M insurance coverage through Lloyd's of London protects all digital assets.",
  },
];

const certifications = [
  { name: "SOC 2 Type II", icon: Shield },
  { name: "ISO 27001", icon: FileCheck },
  { name: "GDPR Compliant", icon: Globe },
  { name: "PCI DSS", icon: Lock },
];

export const SecuritySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="security" className="relative py-24 md:py-32 overflow-hidden bg-secondary/10">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            Security & Compliance
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Institutional-Grade{" "}
            <span className="bg-gradient-to-r from-primary to-gold-light bg-clip-text text-transparent">
              Protection
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Your assets are protected by the same security infrastructure trusted by 
            the world's leading financial institutions.
          </p>
        </motion.div>

        {/* Main Security Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="glass rounded-2xl border-primary/20 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left: Visual */}
              <div className="relative p-10 lg:p-16 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="relative">
                  {/* Animated Shield */}
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 40px hsla(43, 74%, 49%, 0.2)",
                        "0 0 80px hsla(43, 74%, 49%, 0.4)",
                        "0 0 40px hsla(43, 74%, 49%, 0.2)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-gold-light/10 flex items-center justify-center"
                  >
                    <div className="w-32 h-32 rounded-full bg-card/80 flex items-center justify-center">
                      <Shield className="w-16 h-16 text-primary" />
                    </div>
                  </motion.div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-0 right-10 glass rounded-lg p-3"
                  >
                    <Lock className="w-6 h-6 text-primary" />
                  </motion.div>
                  <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute bottom-0 left-10 glass rounded-lg p-3"
                  >
                    <Eye className="w-6 h-6 text-primary" />
                  </motion.div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-12">
                  <div className="text-center">
                    <p className="text-3xl font-serif font-bold text-primary">0</p>
                    <p className="text-xs text-muted-foreground">Security Breaches</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-serif font-bold text-primary">$100M</p>
                    <p className="text-xs text-muted-foreground">Insurance Coverage</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-serif font-bold text-primary">24/7</p>
                    <p className="text-xs text-muted-foreground">Monitoring</p>
                  </div>
                </div>
              </div>

              {/* Right: Features */}
              <div className="p-10 lg:p-16">
                <h3 className="font-serif text-2xl font-bold text-foreground mb-8">
                  Military-Grade Security Protocol
                </h3>
                <div className="space-y-6">
                  {securityFeatures.slice(0, 4).map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          {securityFeatures.slice(4).map((feature, index) => (
            <div
              key={feature.title}
              className="glass rounded-xl p-6 hover:border-primary/30 transition-all"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-6">Industry Certifications & Compliance</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex items-center gap-3 px-6 py-3 glass rounded-xl"
              >
                <cert.icon className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">{cert.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
