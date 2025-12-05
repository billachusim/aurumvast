import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Crown, Sparkles, Mountain, Rocket, Check, ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const plans = [
  {
    id: "sovereign",
    name: "The Sovereign Fund",
    subtitle: "For Royalty-Level Investors",
    icon: Crown,
    minDeposit: 50000,
    roi: "6%",
    roiPeriod: "weekly",
    duration: "12 weeks",
    totalReturn: "72%",
    color: "from-amber-400 via-yellow-500 to-amber-600",
    features: [
      "Dedicated Wealth Manager",
      "AI-Driven Trading Portfolio",
      "Priority Withdrawals (24hrs)",
      "Exclusive Market Insights",
      "Personal Investment Strategy",
      "24/7 Concierge Support",
    ],
    featured: true,
  },
  {
    id: "quantum",
    name: "Quantum Yield Portfolio",
    subtitle: "Hybrid Investment Strategy",
    icon: Sparkles,
    minDeposit: 10000,
    roi: "4.2%",
    roiPeriod: "weekly",
    duration: "10 weeks",
    totalReturn: "42%",
    color: "from-cyan-400 via-blue-500 to-purple-600",
    features: [
      "Hybrid Mining + Trading",
      "Advanced Analytics Dashboard",
      "Weekly Performance Reports",
      "Portfolio Rebalancing",
      "Risk Diversification",
    ],
    featured: false,
  },
  {
    id: "titan",
    name: "Titan Miner Vault",
    subtitle: "Pure Mining Returns",
    icon: Mountain,
    minDeposit: 5000,
    roi: "15%",
    roiPeriod: "monthly",
    duration: "3 months",
    totalReturn: "45%",
    color: "from-emerald-400 via-green-500 to-teal-600",
    features: [
      "Direct BTC Mining Allocation",
      "Real-time Hash Rate Stats",
      "Monthly Compounding Option",
      "Mining Pool Diversification",
      "Hardware Upgrade Benefits",
    ],
    featured: false,
  },
  {
    id: "ascend",
    name: "Ascend Starter Plan",
    subtitle: "Begin Your Journey",
    icon: Rocket,
    minDeposit: 1000,
    roi: "2.5%",
    roiPeriod: "weekly",
    duration: "8 weeks",
    totalReturn: "20%",
    color: "from-violet-400 via-purple-500 to-indigo-600",
    features: [
      "Beginner-Friendly Interface",
      "Educational Resources",
      "Weekly Portfolio Updates",
      "Community Access",
      "Upgrade Path Available",
    ],
    featured: false,
  },
];

const PlanCard = ({ plan, index, isInView }: { plan: typeof plans[0]; index: number; isInView: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(plan.minDeposit);

  const calculateReturns = () => {
    const roiPercent = parseFloat(plan.roi) / 100;
    const weeks = parseInt(plan.duration);
    const weeklyReturn = investmentAmount * roiPercent;
    const totalReturn = weeklyReturn * weeks;
    return {
      weekly: weeklyReturn,
      total: totalReturn,
      final: investmentAmount + totalReturn,
    };
  };

  const returns = calculateReturns();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className={`relative group ${plan.featured ? "lg:-mt-4 lg:mb-4" : ""}`}
      >
        {plan.featured && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
            <span className="px-4 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-primary-foreground text-xs font-bold rounded-full shadow-lg">
              MOST POPULAR
            </span>
          </div>
        )}

        <div
          className={`h-full glass rounded-2xl overflow-hidden transition-all duration-500 ${
            plan.featured
              ? "border-2 border-primary/50 shadow-[0_0_40px_hsla(43,74%,49%,0.2)]"
              : "border border-border/50 hover:border-primary/30"
          } hover:transform hover:scale-[1.02]`}
        >
          {/* Gradient Header */}
          <div className={`h-2 bg-gradient-to-r ${plan.color}`} />

          <div className="p-6 md:p-8">
            {/* Icon & Title */}
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.color} p-0.5`}>
                <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                  <plan.icon className="w-6 h-6 text-foreground" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
              </div>
            </div>

            {/* ROI Display */}
            <div className="mb-6 p-4 rounded-xl bg-secondary/50">
              <div className="flex items-baseline gap-1 mb-1">
                <span className={`text-4xl font-serif font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                  {plan.roi}
                </span>
                <span className="text-muted-foreground text-sm">/ {plan.roiPeriod}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {plan.totalReturn} total over {plan.duration}
              </p>
            </div>

            {/* Min Deposit */}
            <div className="mb-6">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Minimum Investment</span>
              <p className="text-2xl font-serif font-bold text-foreground">
                ${plan.minDeposit.toLocaleString()}
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0`}>
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button
                variant={plan.featured ? "premium" : "default"}
                className="w-full"
                size="lg"
              >
                Invest Now
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="glass"
                className="w-full"
                onClick={() => setIsModalOpen(true)}
              >
                <Calculator className="w-4 h-4" />
                View Full Plan
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Plan Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg glass border-primary/20">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${plan.color} p-0.5`}>
                <div className="w-full h-full rounded-lg bg-card flex items-center justify-center">
                  <plan.icon className="w-5 h-5 text-foreground" />
                </div>
              </div>
              <div>
                <DialogTitle className="font-serif text-xl">{plan.name}</DialogTitle>
                <DialogDescription>{plan.subtitle}</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            {/* Investment Calculator */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Investment Amount
              </label>
              <input
                type="range"
                min={plan.minDeposit}
                max={plan.minDeposit * 10}
                step={plan.minDeposit / 10}
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm text-muted-foreground">
                  ${plan.minDeposit.toLocaleString()}
                </span>
                <span className="text-lg font-bold text-primary">
                  ${investmentAmount.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">
                  ${(plan.minDeposit * 10).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Projected Returns */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-secondary/50 text-center">
                <p className="text-xs text-muted-foreground mb-1">
                  {plan.roiPeriod.charAt(0).toUpperCase() + plan.roiPeriod.slice(1)} Return
                </p>
                <p className="text-lg font-bold text-primary">
                  ${returns.weekly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 text-center">
                <p className="text-xs text-muted-foreground mb-1">Total Profit</p>
                <p className="text-lg font-bold text-emerald-400">
                  +${returns.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 text-center">
                <p className="text-xs text-muted-foreground mb-1">Final Value</p>
                <p className="text-lg font-bold text-foreground">
                  ${returns.final.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>

            {/* Features List */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-3">Included Benefits</p>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Button variant="premium" className="w-full" size="lg">
              Start Investing
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const InvestmentPlans = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="investments" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-radial-gold opacity-20" />
      </div>

      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            Investment Portfolios
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Elite Wealth{" "}
            <span className="bg-gradient-to-r from-primary to-gold-light bg-clip-text text-transparent">
              Building Strategies
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose from our curated selection of investment portfolios, each engineered 
            for maximum returns with institutional-grade risk management.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};
