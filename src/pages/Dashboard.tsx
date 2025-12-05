import { motion } from "framer-motion";
import { useState } from "react";
import {
  Wallet,
  TrendingUp,
  Clock,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Send,
  Copy,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronDown,
  BarChart3,
  PieChart,
  Activity,
  MessageCircle,
  HelpCircle,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import aurumvestLogo from "@/assets/aurumvest-logo.png";

const portfolioData = [
  { name: "Sovereign Fund", invested: 50000, current: 68500, roi: 37, color: "from-amber-400 to-yellow-500" },
  { name: "Quantum Yield", invested: 25000, current: 31250, roi: 25, color: "from-cyan-400 to-blue-500" },
  { name: "Titan Miner", invested: 15000, current: 17850, roi: 19, color: "from-emerald-400 to-green-500" },
];

const recentTransactions = [
  { type: "deposit", amount: 10000, date: "2024-01-15", status: "completed" },
  { type: "earning", amount: 850, date: "2024-01-14", status: "completed" },
  { type: "earning", amount: 720, date: "2024-01-13", status: "completed" },
  { type: "withdrawal", amount: 5000, date: "2024-01-12", status: "completed" },
  { type: "earning", amount: 680, date: "2024-01-11", status: "completed" },
];

const chartData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  value: 75000 + Math.random() * 20000 + i * 500,
}));

export const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const totalInvested = portfolioData.reduce((acc, p) => acc + p.invested, 0);
  const totalCurrent = portfolioData.reduce((acc, p) => acc + p.current, 0);
  const totalProfit = totalCurrent - totalInvested;
  const overallROI = ((totalProfit / totalInvested) * 100).toFixed(1);

  const maxChartValue = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={aurumvestLogo} 
                alt="AurumVest Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="font-serif text-xl font-semibold text-foreground tracking-wide">
                Aurum<span className="text-primary">Vest</span>
              </span>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-4 space-y-2">
            {[
              { icon: BarChart3, label: "Dashboard", active: true },
              { icon: Wallet, label: "Portfolio" },
              { icon: TrendingUp, label: "Investments" },
              { icon: Activity, label: "Transactions" },
              { icon: Gift, label: "Referrals" },
              { icon: MessageCircle, label: "Support" },
              { icon: Settings, label: "Settings" },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  item.active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gold-light flex items-center justify-center">
                <span className="text-primary-foreground font-bold">JD</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">John Doe</p>
                <p className="text-xs text-muted-foreground">Sovereign Tier</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden text-foreground"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="font-serif text-xl font-bold text-foreground">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </button>
              <Button variant="premium" size="sm" className="hidden sm:flex">
                <Download className="w-4 h-4" />
                Deposit
              </Button>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Total Balance</span>
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <p className="text-3xl font-serif font-bold text-foreground">
                ${totalCurrent.toLocaleString()}
              </p>
              <p className="flex items-center gap-1 text-sm text-emerald-400 mt-2">
                <ArrowUpRight className="w-4 h-4" />
                +{overallROI}% all time
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Total Invested</span>
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <p className="text-3xl font-serif font-bold text-foreground">
                ${totalInvested.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Across {portfolioData.length} plans
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Total Profit</span>
                <PieChart className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-3xl font-serif font-bold text-emerald-400">
                +${totalProfit.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-2">This month: +$8,420</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Referral Earnings</span>
                <Users className="w-5 h-5 text-primary" />
              </div>
              <p className="text-3xl font-serif font-bold text-foreground">$2,450</p>
              <p className="text-sm text-muted-foreground mt-2">12 active referrals</p>
            </motion.div>
          </div>

          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground">Portfolio Growth</h3>
                <p className="text-sm text-muted-foreground">Last 30 days performance</p>
              </div>
              <div className="flex gap-2">
                {["1W", "1M", "3M", "1Y", "All"].map((period, i) => (
                  <button
                    key={period}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      i === 1
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64 flex items-end gap-1">
              {chartData.map((d, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-primary to-gold-light rounded-t opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                  style={{ height: `${(d.value / maxChartValue) * 100}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Dec 15</span>
              <span>Dec 22</span>
              <span>Dec 29</span>
              <span>Jan 5</span>
              <span>Jan 12</span>
            </div>
          </motion.div>

          {/* Portfolio & Transactions */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Active Investments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="font-serif text-lg font-bold text-foreground mb-6">
                Active Investments
              </h3>
              <div className="space-y-4">
                {portfolioData.map((plan) => (
                  <div
                    key={plan.name}
                    className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center`}
                        >
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{plan.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Invested: ${plan.invested.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">
                          ${plan.current.toLocaleString()}
                        </p>
                        <p className="text-xs text-emerald-400">+{plan.roi}%</p>
                      </div>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${plan.color}`}
                        style={{ width: `${Math.min(plan.roi * 2, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="glass" className="w-full mt-6">
                View All Investments
              </Button>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="font-serif text-lg font-bold text-foreground mb-6">
                Recent Transactions
              </h3>
              <div className="space-y-4">
                {recentTransactions.map((tx, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-secondary/30"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === "earning"
                            ? "bg-emerald-500/10"
                            : tx.type === "deposit"
                            ? "bg-primary/10"
                            : "bg-red-500/10"
                        }`}
                      >
                        {tx.type === "earning" ? (
                          <TrendingUp className="w-5 h-5 text-emerald-400" />
                        ) : tx.type === "deposit" ? (
                          <Download className="w-5 h-5 text-primary" />
                        ) : (
                          <Send className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground capitalize">{tx.type}</p>
                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                      </div>
                    </div>
                    <p
                      className={`font-bold ${
                        tx.type === "withdrawal" ? "text-red-400" : "text-emerald-400"
                      }`}
                    >
                      {tx.type === "withdrawal" ? "-" : "+"}${tx.amount.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <Button variant="glass" className="w-full mt-6">
                View All Transactions
              </Button>
            </motion.div>
          </div>

          {/* Referral Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass rounded-xl p-6 border-primary/20"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                  Invite Friends & Earn
                </h3>
                <p className="text-sm text-muted-foreground">
                  Earn 5% commission on every investment your referrals make
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 md:w-64 h-10 px-4 flex items-center rounded-lg bg-secondary/50 border border-border text-sm text-muted-foreground font-mono">
                  aurumvest.com/ref/JD7892
                </div>
                <Button variant="premium" size="default">
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Need Assistance?</h3>
                  <p className="text-sm text-muted-foreground">
                    Our wealth managers are available 24/7
                  </p>
                </div>
              </div>
              <Button variant="glass">
                <MessageCircle className="w-4 h-4" />
                Start Chat
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
