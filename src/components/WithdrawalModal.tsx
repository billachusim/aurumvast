import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowUpRight, Copy, Check, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WithdrawalModal({ isOpen, onClose }: WithdrawalModalProps) {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const numAmount = parseFloat(amount);
    
    if (!walletAddress.trim()) {
      toast({
        title: "Wallet Address Required",
        description: "Please enter your USDT TRC20 wallet address.",
        variant: "destructive",
      });
      return;
    }

    if (isNaN(numAmount) || numAmount < 50) {
      toast({
        title: "Invalid Amount",
        description: "Minimum withdrawal amount is $50.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save withdrawal to database
      const { error } = await supabase.from('withdrawals').insert({
        user_id: profile?.id,
        amount: numAmount,
        wallet_address: walletAddress.trim(),
        status: 'pending',
      });

      if (error) throw error;

      // Generate mailto link
      const subject = encodeURIComponent(`Withdrawal Request - ${profile?.first_name} ${profile?.last_name}`);
      const body = encodeURIComponent(`WITHDRAWAL REQUEST
==================

User Details:
• Name: ${profile?.first_name} ${profile?.last_name}
• Email: ${profile?.email}
• User ID: ${profile?.id}

Withdrawal Details:
• Amount: $${numAmount.toLocaleString()} USDT
• Wallet Address: ${walletAddress.trim()}
• Request Date: ${new Date().toLocaleString()}

Please process this withdrawal request.

Best regards,
${profile?.first_name} ${profile?.last_name}`);

      const mailtoLink = `mailto:theaurumvest@gmail.com?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;

      toast({
        title: "Withdrawal Request Submitted",
        description: "Your email client will open with the request details. Please send the email to complete your request.",
      });

      // Reset form and close
      setWalletAddress('');
      setAmount('');
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit withdrawal request.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <ArrowUpRight className="h-5 w-5 text-primary" />
            Request Withdrawal
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Wallet Address Input */}
          <div className="space-y-2">
            <Label htmlFor="wallet-address" className="text-sm font-medium">
              Your Wallet Address (USDT TRC20)
            </Label>
            <Input
              id="wallet-address"
              placeholder="Enter your TRC20 wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Enter the wallet address where you want to receive your USDT
            </p>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium">
              Withdrawal Amount (USD)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7"
                min={50}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Minimum withdrawal: $50
            </p>
          </div>

          {/* Info Box */}
          <div className="rounded-lg bg-primary/10 border border-primary/20 p-4 space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Mail className="h-4 w-4" />
              <span className="font-medium text-sm">How it works</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>Click "Confirm Withdrawal" below</li>
              <li>Your email client will open with pre-filled details</li>
              <li>Send the email to complete your request</li>
              <li>We'll process your withdrawal within 24-48 hours</li>
            </ul>
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit} 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Confirm Withdrawal'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
