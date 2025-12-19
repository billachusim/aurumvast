import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LayoutDashboard, LogOut, Settings, Wallet } from 'lucide-react';
import { DepositModal } from '@/components/DepositModal';

const depositPlans = [
  { id: "ascend", name: "Ascend Starter Plan", minDeposit: 50, roi: "5%", color: "from-violet-400 via-purple-500 to-indigo-600" },
  { id: "titan", name: "Titan Miner Vault", minDeposit: 2000, roi: "7%", color: "from-emerald-400 via-green-500 to-teal-600" },
  { id: "quantum", name: "Quantum Yield Portfolio", minDeposit: 5000, roi: "10%", color: "from-cyan-400 via-blue-500 to-purple-600" },
  { id: "sovereign", name: "The Sovereign Fund", minDeposit: 10000, roi: "13%", color: "from-amber-400 via-yellow-500 to-amber-600" },
  { id: "royal", name: "Royal Elite Fund", minDeposit: 20000, roi: "15%", color: "from-rose-400 via-pink-500 to-purple-600" },
];

export function UserMenu() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  const initials = profile
    ? `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`
    : 'U';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-full bg-background/50 border border-border/50 hover:bg-background/80 transition-colors">
        <Avatar className="h-8 w-8">
          <AvatarImage src={profile?.avatar_url} />
          <AvatarFallback className="bg-primary/20 text-primary text-sm font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium hidden sm:block">
          {profile?.first_name}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">
              {profile?.first_name} {profile?.last_name}
            </p>
            <p className="text-xs text-muted-foreground">{profile?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/dashboard')}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/dashboard')}>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setIsDepositModalOpen(true)}>
          <Wallet className="mr-2 h-4 w-4" />
          Deposit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/dashboard')}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>

      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        plans={depositPlans}
      />
    </DropdownMenu>
  );
}
