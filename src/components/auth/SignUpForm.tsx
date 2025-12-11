import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Germany', 'France', 'Switzerland',
  'Singapore', 'Hong Kong', 'Japan', 'Australia', 'United Arab Emirates', 'Saudi Arabia',
  'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Belgium', 'Austria', 'Ireland', 'Luxembourg',
  'New Zealand', 'South Korea', 'Taiwan', 'Israel', 'Qatar', 'Kuwait', 'Bahrain', 'Other'
];

const steps = [
  { title: 'Account', description: 'Create your account' },
  { title: 'Personal', description: 'Your information' },
  { title: 'Location', description: 'Where you\'re based' },
  { title: 'Investment', description: 'Your profile' },
  { title: 'Agreements', description: 'Terms & conditions' },
];

const step1Schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const step2Schema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number').max(20),
  dateOfBirth: z.string().refine((date) => {
    const dob = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      return age - 1 >= 18;
    }
    return age >= 18;
  }, 'You must be at least 18 years old'),
});

const step3Schema = z.object({
  country: z.string().min(1, 'Please select your country'),
});

const step4Schema = z.object({
  investmentExperience: z.enum(['beginner', 'intermediate', 'experienced', 'expert']),
  riskTolerance: z.enum(['conservative', 'moderate', 'aggressive']),
});

const step5Schema = z.object({
  agreedToTerms: z.boolean().refine((val) => val === true, 'You must agree to the terms'),
  agreedToPrivacy: z.boolean().refine((val) => val === true, 'You must agree to the privacy policy'),
});

export function SignUpForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: '',
    country: '',
    address: '',
    city: '',
    postalCode: '',
    investmentExperience: 'beginner' as const,
    riskTolerance: 'moderate' as const,
    agreedToTerms: false,
    agreedToPrivacy: false,
    referralCode: '',
  });

  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateStep = () => {
    setErrors({});
    let result;

    switch (currentStep) {
      case 0:
        result = step1Schema.safeParse({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
        break;
      case 1:
        result = step2Schema.safeParse({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          dateOfBirth: formData.dateOfBirth,
        });
        break;
      case 2:
        result = step3Schema.safeParse({
          country: formData.country,
        });
        break;
      case 3:
        result = step4Schema.safeParse({
          investmentExperience: formData.investmentExperience,
          riskTolerance: formData.riskTolerance,
        });
        break;
      case 4:
        result = step5Schema.safeParse({
          agreedToTerms: formData.agreedToTerms,
          agreedToPrivacy: formData.agreedToPrivacy,
        });
        break;
      default:
        return true;
    }

    if (result && !result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    const { error } = await signUp(formData.email, formData.password, {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone_number: formData.phoneNumber,
      date_of_birth: formData.dateOfBirth,
      country: formData.country,
      address: formData.address || undefined,
      city: formData.city || undefined,
      postal_code: formData.postalCode || undefined,
      investment_experience: formData.investmentExperience,
      risk_tolerance: formData.riskTolerance,
      agreed_to_terms: formData.agreedToTerms,
      agreed_to_privacy_policy: formData.agreedToPrivacy,
      referred_by: formData.referralCode || undefined,
    });
    setLoading(false);

    if (error) {
      if (error.message.includes('already registered')) {
        toast({
          variant: 'destructive',
          title: 'Account exists',
          description: 'An account with this email already exists. Please sign in.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Sign up failed',
          description: error.message,
        });
      }
      return;
    }

    toast({
      title: 'Welcome to AurumVest!',
      description: 'Your account has been created successfully.',
    });
    navigate('/dashboard', { replace: true });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="bg-background/50"
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  className="bg-background/50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              <p className="text-xs text-muted-foreground">
                Minimum 8 characters with uppercase, lowercase, and number
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                className="bg-background/50"
              />
              {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  className="bg-background/50"
                />
                {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  className="bg-background/50"
                />
                {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phoneNumber}
                onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                className="bg-background/50"
              />
              {errors.phoneNumber && <p className="text-sm text-destructive">{errors.phoneNumber}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                className="bg-background/50"
              />
              {errors.dateOfBirth && <p className="text-sm text-destructive">{errors.dateOfBirth}</p>}
              <p className="text-xs text-muted-foreground">You must be at least 18 years old</p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country of Residence</Label>
              <Select value={formData.country} onValueChange={(value) => updateFormData('country', value)}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && <p className="text-sm text-destructive">{errors.country}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Street Address (Optional)</Label>
              <Input
                id="address"
                placeholder="123 Main Street"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                className="bg-background/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City (Optional)</Label>
                <Input
                  id="city"
                  placeholder="New York"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code (Optional)</Label>
                <Input
                  id="postalCode"
                  placeholder="10001"
                  value={formData.postalCode}
                  onChange={(e) => updateFormData('postalCode', e.target.value)}
                  className="bg-background/50"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Investment Experience</Label>
              <Select
                value={formData.investmentExperience}
                onValueChange={(value) => updateFormData('investmentExperience', value)}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner - New to investing</SelectItem>
                  <SelectItem value="intermediate">Intermediate - Some experience</SelectItem>
                  <SelectItem value="experienced">Experienced - Years of investing</SelectItem>
                  <SelectItem value="expert">Expert - Professional trader</SelectItem>
                </SelectContent>
              </Select>
              {errors.investmentExperience && <p className="text-sm text-destructive">{errors.investmentExperience}</p>}
            </div>

            <div className="space-y-3">
              <Label>Risk Tolerance</Label>
              <RadioGroup
                value={formData.riskTolerance}
                onValueChange={(value) => updateFormData('riskTolerance', value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 bg-background/30 hover:bg-background/50 transition-colors">
                  <RadioGroupItem value="conservative" id="conservative" />
                  <Label htmlFor="conservative" className="flex-1 cursor-pointer">
                    <div className="font-medium">Conservative</div>
                    <div className="text-sm text-muted-foreground">Prefer stability over higher returns</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 bg-background/30 hover:bg-background/50 transition-colors">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate" className="flex-1 cursor-pointer">
                    <div className="font-medium">Moderate</div>
                    <div className="text-sm text-muted-foreground">Balance between risk and reward</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 bg-background/30 hover:bg-background/50 transition-colors">
                  <RadioGroupItem value="aggressive" id="aggressive" />
                  <Label htmlFor="aggressive" className="flex-1 cursor-pointer">
                    <div className="font-medium">Aggressive</div>
                    <div className="text-sm text-muted-foreground">Willing to take risks for higher returns</div>
                  </Label>
                </div>
              </RadioGroup>
              {errors.riskTolerance && <p className="text-sm text-destructive">{errors.riskTolerance}</p>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.agreedToTerms}
                  onCheckedChange={(checked) => updateFormData('agreedToTerms', checked as boolean)}
                />
                <div className="space-y-1">
                  <Label htmlFor="terms" className="cursor-pointer">
                    I agree to the Terms of Service
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    By checking this box, you agree to our terms and conditions for using AurumVest services.
                  </p>
                </div>
              </div>
              {errors.agreedToTerms && <p className="text-sm text-destructive">{errors.agreedToTerms}</p>}

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="privacy"
                  checked={formData.agreedToPrivacy}
                  onCheckedChange={(checked) => updateFormData('agreedToPrivacy', checked as boolean)}
                />
                <div className="space-y-1">
                  <Label htmlFor="privacy" className="cursor-pointer">
                    I agree to the Privacy Policy
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    By checking this box, you consent to our data collection and privacy practices.
                  </p>
                </div>
              </div>
              {errors.agreedToPrivacy && <p className="text-sm text-destructive">{errors.agreedToPrivacy}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="referralCode">Referral Code (Optional)</Label>
              <Input
                id="referralCode"
                placeholder="AV-XXXXXXXX"
                value={formData.referralCode}
                onChange={(e) => updateFormData('referralCode', e.target.value)}
                className="bg-background/50"
              />
              <p className="text-xs text-muted-foreground">
                Enter a referral code if you were invited by an existing member
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  index < currentStep
                    ? 'bg-primary text-primary-foreground'
                    : index === currentStep
                    ? 'bg-primary/20 text-primary border-2 border-primary'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <span className="text-xs mt-1 hidden sm:block text-muted-foreground">{step.title}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-8 sm:w-12 h-0.5 mx-1 ${
                  index < currentStep ? 'bg-primary' : 'bg-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Title */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">{steps[currentStep].title}</h3>
        <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex gap-3 pt-4">
        {currentStep > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="flex-1"
            disabled={loading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        
        {currentStep < steps.length - 1 ? (
          <Button
            type="button"
            onClick={handleNext}
            className="flex-1"
            variant="premium"
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            className="flex-1"
            variant="premium"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
