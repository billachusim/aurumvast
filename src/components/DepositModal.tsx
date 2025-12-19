import { useState } from "react";
import { Copy, Check, Wallet, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const WALLET_ADDRESS = "TTAauNSMsvpMXGY2qRNHZPtkmwQD5xzxVL";

interface Plan {
  id: string;
  name: string;
  minDeposit: number;
  roi: string;
  color: string;
}

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: Plan | null;
  plans?: Plan[];
}

export function DepositModal({ isOpen, onClose, selectedPlan, plans = [] }: DepositModalProps) {
  const [copied, setCopied] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(selectedPlan || null);
  const [depositAmount, setDepositAmount] = useState(selectedPlan?.minDeposit || 50);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(WALLET_ADDRESS);
      setCopied(true);
      toast.success("Wallet address copied to clipboard!");
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      toast.error("Failed to copy address");
    }
  };

  const handlePlanSelect = (plan: Plan) => {
    setCurrentPlan(plan);
    setDepositAmount(plan.minDeposit);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg glass border-primary/20">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-gold-light p-0.5">
              <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div>
              <DialogTitle className="font-serif text-xl">Make a Deposit</DialogTitle>
              <DialogDescription>Send funds to start earning</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Plan Selection */}
          {plans.length > 0 && !selectedPlan && (
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Select Investment Plan
              </label>
              <div className="grid grid-cols-2 gap-2">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => handlePlanSelect(plan)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      currentPlan?.id === plan.id
                        ? "border-primary bg-primary/10"
                        : "border-border/50 hover:border-primary/50 bg-secondary/30"
                    }`}
                  >
                    <p className="font-medium text-foreground text-sm">{plan.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Min: ${plan.minDeposit.toLocaleString()} • {plan.roi} daily
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Plan Display */}
          {(currentPlan || selectedPlan) && (
            <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">
                    {currentPlan?.name || selectedPlan?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentPlan?.roi || selectedPlan?.roi} daily ROI
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Minimum</p>
                  <p className="font-bold text-primary">
                    ${(currentPlan?.minDeposit || selectedPlan?.minDeposit || 50).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Deposit Amount */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Deposit Amount (USDT TRC20)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                min={currentPlan?.minDeposit || selectedPlan?.minDeposit || 50}
                className="w-full h-12 pl-8 pr-4 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-lg font-medium focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            {(currentPlan || selectedPlan) && depositAmount < (currentPlan?.minDeposit || selectedPlan?.minDeposit || 50) && (
              <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Minimum deposit is ${(currentPlan?.minDeposit || selectedPlan?.minDeposit || 50).toLocaleString()}
              </p>
            )}
          </div>

          {/* Wallet Address */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Send USDT (TRC20) to this address
            </label>
            <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-sm text-foreground break-all select-all">
                  {WALLET_ADDRESS}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyAddress}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <h4 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-primary" />
              Important Instructions
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Only send USDT on the TRC20 network</li>
              <li>• Deposits are processed within 10-30 minutes</li>
              <li>• Minimum deposit: ${(currentPlan?.minDeposit || selectedPlan?.minDeposit || 50).toLocaleString()}</li>
              <li>• Contact support after sending for faster processing</li>
            </ul>
          </div>

          {/* CTA Button */}
          <Button
            variant="premium"
            className="w-full"
            size="lg"
            onClick={handleCopyAddress}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Address Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Wallet Address
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
