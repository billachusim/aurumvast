import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface Withdrawal {
  id: string;
  amount: number;
  wallet_address: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  created_at: string;
}

const statusConfig = {
  pending: {
    label: 'Pending',
    variant: 'secondary' as const,
    icon: Clock,
  },
  processing: {
    label: 'Processing',
    variant: 'default' as const,
    icon: Loader2,
  },
  completed: {
    label: 'Completed',
    variant: 'default' as const,
    icon: CheckCircle,
  },
  rejected: {
    label: 'Rejected',
    variant: 'destructive' as const,
    icon: XCircle,
  },
};

export function WithdrawalHistory() {
  const { user } = useAuth();
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchWithdrawals = async () => {
      const { data, error } = await supabase
        .from('withdrawals')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setWithdrawals(data as Withdrawal[]);
      }
      setLoading(false);
    };

    fetchWithdrawals();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('withdrawals-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'withdrawals',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setWithdrawals((prev) => [payload.new as Withdrawal, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setWithdrawals((prev) =>
              prev.map((w) => (w.id === payload.new.id ? (payload.new as Withdrawal) : w))
            );
          } else if (payload.eventType === 'DELETE') {
            setWithdrawals((prev) => prev.filter((w) => w.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  if (loading) {
    return (
      <Card className="bg-card/50 border-border/50">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (withdrawals.length === 0) {
    return (
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ArrowUpRight className="h-5 w-5 text-primary" />
            Withdrawal History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm text-center py-4">
            No withdrawal requests yet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ArrowUpRight className="h-5 w-5 text-primary" />
          Withdrawal History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {withdrawals.map((withdrawal) => {
          const config = statusConfig[withdrawal.status];
          const StatusIcon = config.icon;
          
          return (
            <div
              key={withdrawal.id}
              className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    ${withdrawal.amount.toLocaleString()}
                  </span>
                  <Badge variant={config.variant} className="text-xs">
                    <StatusIcon className={`h-3 w-3 mr-1 ${withdrawal.status === 'processing' ? 'animate-spin' : ''}`} />
                    {config.label}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground font-mono truncate max-w-[200px]">
                  {withdrawal.wallet_address}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">
                  {format(new Date(withdrawal.created_at), 'MMM d, yyyy')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(withdrawal.created_at), 'h:mm a')}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
