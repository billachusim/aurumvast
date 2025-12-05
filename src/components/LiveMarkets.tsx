import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Activity, BarChart3 } from "lucide-react";

const cryptoData = [
  { symbol: "BTC", name: "Bitcoin", price: 67234.56, change: 2.34, volume: "28.4B" },
  { symbol: "ETH", name: "Ethereum", price: 3456.78, change: -0.89, volume: "12.1B" },
  { symbol: "SOL", name: "Solana", price: 178.45, change: 5.67, volume: "3.2B" },
  { symbol: "XRP", name: "Ripple", price: 0.5234, change: 1.23, volume: "1.8B" },
  { symbol: "ADA", name: "Cardano", price: 0.4567, change: -2.11, volume: "890M" },
  { symbol: "AVAX", name: "Avalanche", price: 38.92, change: 3.45, volume: "654M" },
];

const generateChartData = () => {
  return Array.from({ length: 24 }, () => 50 + Math.random() * 50);
};

const MiniChart = ({ data, positive }: { data: number[]; positive: boolean }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  return (
    <div className="h-12 w-24 flex items-end gap-0.5">
      {data.map((value, index) => (
        <div
          key={index}
          className={`flex-1 rounded-t transition-all ${
            positive ? "bg-emerald-500/60" : "bg-red-500/60"
          }`}
          style={{
            height: `${((value - min) / range) * 100}%`,
            minHeight: "4px",
          }}
        />
      ))}
    </div>
  );
};

const CryptoTicker = () => {
  const [data, setData] = useState(cryptoData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev =>
        prev.map(coin => ({
          ...coin,
          price: coin.price * (1 + (Math.random() - 0.5) * 0.002),
          change: coin.change + (Math.random() - 0.5) * 0.1,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-8 animate-[scroll_30s_linear_infinite]">
      {[...data, ...data].map((coin, index) => (
        <div
          key={`${coin.symbol}-${index}`}
          className="flex items-center gap-4 px-6 py-3 glass rounded-xl min-w-fit"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="font-bold text-primary text-sm">{coin.symbol.slice(0, 2)}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{coin.symbol}</span>
              <span className="text-xs text-muted-foreground">{coin.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-medium text-foreground">
                ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span
                className={`flex items-center gap-1 text-xs font-medium ${
                  coin.change >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {coin.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(coin.change).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const LiveMarkets = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [charts] = useState(() =>
    cryptoData.map(coin => ({
      ...coin,
      chartData: generateChartData(),
    }))
  );

  return (
    <section id="markets" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            Live Market Data
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Real-Time{" "}
            <span className="bg-gradient-to-r from-primary to-gold-light bg-clip-text text-transparent">
              Market Intelligence
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Stay ahead of the markets with live data feeds directly from major exchanges.
          </p>
        </motion.div>

        {/* Live Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="overflow-hidden mb-16 -mx-4 px-4"
        >
          <CryptoTicker />
        </motion.div>

        {/* Market Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {charts.map((coin, index) => (
            <motion.div
              key={coin.symbol}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="glass rounded-xl p-6 hover:border-primary/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-gold-light/20 flex items-center justify-center">
                    <span className="font-bold text-primary">{coin.symbol}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{coin.name}</h4>
                    <p className="text-xs text-muted-foreground">Vol: {coin.volume}</p>
                  </div>
                </div>
                <MiniChart data={coin.chartData} positive={coin.change >= 0} />
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-mono font-bold text-foreground">
                    ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p
                    className={`flex items-center gap-1 text-sm font-medium ${
                      coin.change >= 0 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {coin.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {coin.change >= 0 ? "+" : ""}
                    {coin.change.toFixed(2)}% (24h)
                  </p>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Activity className="w-4 h-4" />
                  <span className="text-xs">Live</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Market Sentiment */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 glass rounded-2xl p-8 border-primary/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-primary" />
            <h3 className="font-serif text-xl font-bold text-foreground">Market Sentiment</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-xl bg-secondary/50">
              <p className="text-sm text-muted-foreground mb-2">Fear & Greed Index</p>
              <p className="text-4xl font-serif font-bold text-emerald-400">72</p>
              <p className="text-xs text-emerald-400 mt-1">Greed</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-secondary/50">
              <p className="text-sm text-muted-foreground mb-2">BTC Dominance</p>
              <p className="text-4xl font-serif font-bold text-primary">54.2%</p>
              <p className="text-xs text-muted-foreground mt-1">+0.8% this week</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-secondary/50">
              <p className="text-sm text-muted-foreground mb-2">Total Market Cap</p>
              <p className="text-4xl font-serif font-bold text-foreground">$2.34T</p>
              <p className="text-xs text-emerald-400 mt-1">+2.1% (24h)</p>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};
