import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calculator, TrendingUp, Clock, DollarSign, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ROICalculator = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [investment, setInvestment] = useState(10000);
  const [plan, setPlan] = useState("quantum");
  const [compounding, setCompounding] = useState(false);

  const plans = {
    sovereign: { name: "Sovereign Fund", roi: 6, weeks: 12, period: "weekly" },
    quantum: { name: "Quantum Yield", roi: 4.2, weeks: 10, period: "weekly" },
    titan: { name: "Titan Miner", roi: 15, weeks: 12, period: "monthly" },
    ascend: { name: "Ascend Starter", roi: 2.5, weeks: 8, period: "weekly" },
  };

  const selectedPlan = plans[plan as keyof typeof plans];

  const calculateReturns = () => {
    const roiPercent = selectedPlan.roi / 100;
    const periods = selectedPlan.period === "monthly" ? Math.ceil(selectedPlan.weeks / 4) : selectedPlan.weeks;

    if (compounding) {
      const finalValue = investment * Math.pow(1 + roiPercent, periods);
      return {
        profit: finalValue - investment,
        total: finalValue,
        weeklyAvg: (finalValue - investment) / selectedPlan.weeks,
      };
    } else {
      const totalProfit = investment * roiPercent * periods;
      return {
        profit: totalProfit,
        total: investment + totalProfit,
        weeklyAvg: totalProfit / selectedPlan.weeks,
      };
    }
  };

  const returns = calculateReturns();

  const chartData = Array.from({ length: selectedPlan.weeks + 1 }, (_, i) => {
    const roiPercent = selectedPlan.roi / 100;
    const periodsPerWeek = selectedPlan.period === "monthly" ? 0.25 : 1;

    if (compounding) {
      return investment * Math.pow(1 + roiPercent, i * periodsPerWeek);
    }
    return investment + investment * roiPercent * i * periodsPerWeek;
  });

  const maxValue = Math.max(...chartData);

  return (
    <section id="calculator" className="relative py-24 md:py-32 overflow-hidden bg-secondary/20">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            ROI Calculator
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
            See Your Wealth{" "}
            <span className="bg-gradient-to-r from-primary to-gold-light bg-clip-text text-transparent">
              Multiply
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Use our interactive calculator to visualize your potential returns 
            across different investment strategies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass rounded-2xl border-primary/20 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Controls */}
              <div className="p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-border/50">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    Calculate Your Returns
                  </h3>
                </div>

                {/* Investment Amount */}
                <div className="mb-8">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <DollarSign className="w-4 h-4" />
                    Investment Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-primary font-semibold">
                      $
                    </span>
                    <input
                      type="number"
                      value={investment}
                      onChange={(e) => setInvestment(Math.max(1000, Number(e.target.value)))}
                      className="w-full h-14 pl-10 pr-4 text-2xl font-bold bg-secondary/50 border border-border rounded-xl focus:border-primary focus:outline-none text-foreground"
                    />
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={100000}
                    step={1000}
                    value={investment}
                    onChange={(e) => setInvestment(Number(e.target.value))}
                    className="w-full mt-4 h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>$1,000</span>
                    <span>$100,000</span>
                  </div>
                </div>

                {/* Plan Selection */}
                <div className="mb-8">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Percent className="w-4 h-4" />
                    Investment Plan
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(plans).map(([key, p]) => (
                      <button
                        key={key}
                        onClick={() => setPlan(key)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          plan === key
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <p className="font-semibold text-foreground text-sm">{p.name}</p>
                        <p className="text-xs text-primary">{p.roi}% {p.period}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Compounding Toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                  <div>
                    <p className="font-medium text-foreground">Enable Compounding</p>
                    <p className="text-xs text-muted-foreground">Reinvest returns automatically</p>
                  </div>
                  <button
                    onClick={() => setCompounding(!compounding)}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      compounding ? "bg-primary" : "bg-border"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-5 h-5 rounded-full bg-foreground transition-transform ${
                        compounding ? "left-8" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="p-6 md:p-10 bg-card/30">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    Projected Returns
                  </h3>
                </div>

                {/* Chart */}
                <div className="relative h-48 mb-8 bg-secondary/30 rounded-xl p-4">
                  <div className="absolute inset-4 flex items-end gap-1">
                    {chartData.map((value, index) => (
                      <div
                        key={index}
                        className="flex-1 bg-gradient-to-t from-primary to-gold-light rounded-t opacity-80"
                        style={{
                          height: `${(value / maxValue) * 100}%`,
                          transition: "height 0.3s ease",
                        }}
                      />
                    ))}
                  </div>
                  <div className="absolute bottom-2 left-4 right-4 flex justify-between text-xs text-muted-foreground">
                    <span>Week 0</span>
                    <span>Week {selectedPlan.weeks}</span>
                  </div>
                </div>

                {/* Return Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">Total Profit</p>
                    <p className="text-2xl font-serif font-bold text-emerald-400">
                      +${returns.profit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">Final Value</p>
                    <p className="text-2xl font-serif font-bold text-foreground">
                      ${returns.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Average Weekly Earnings</span>
                  </div>
                  <p className="text-3xl font-serif font-bold text-primary">
                    ${returns.weeklyAvg.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>

                <Button variant="premium" className="w-full" size="lg">
                  Start This Investment
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
