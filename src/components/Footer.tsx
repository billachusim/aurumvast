import { motion } from "framer-motion";
import { Twitter, Linkedin, Youtube, Send, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import aurumvestLogo from "@/assets/aurumvest-logo.png";

const footerLinks = {
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Team", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press Kit", href: "#" },
  ],
  investments: [
    { name: "Sovereign Fund", href: "#investments" },
    { name: "Quantum Yield", href: "#investments" },
    { name: "Titan Miner", href: "#investments" },
    { name: "Ascend Starter", href: "#investments" },
  ],
  resources: [
    { name: "Documentation", href: "#" },
    { name: "API Access", href: "#" },
    { name: "Market Analysis", href: "#" },
    { name: "Educational Hub", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Risk Disclosure", href: "#" },
    { name: "Compliance", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Send, href: "#", label: "Telegram" },
];

export const Footer = () => {
  return (
    <footer className="relative pt-24 pb-8 border-t border-border/50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card/50" />

      <div className="container mx-auto px-4 relative">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center mb-20"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
            Join Our Exclusive Circle
          </h3>
          <p className="text-muted-foreground mb-6">
            Subscribe for premium market insights and exclusive investment opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground"
            />
            <Button variant="premium" size="lg">
              Subscribe
            </Button>
          </div>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={aurumvestLogo} 
                alt="AurumVest Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="font-serif text-xl font-semibold text-foreground tracking-wide">
                Aurum<span className="text-primary">Vest</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              The private gateway to generational digital wealth. 
              Trusted by high-net-worth individuals and institutions worldwide.
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Geneva, Switzerland</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>contact@aurumvest.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span>+41 22 000 0000</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Investments</h4>
            <ul className="space-y-3">
              {footerLinks.investments.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 AurumVest. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-secondary/30 border border-border/50">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            <strong className="text-foreground">Risk Disclaimer:</strong> Cryptocurrency investments 
            carry significant risk. Past performance does not guarantee future results. 
            Please invest responsibly and only with funds you can afford to lose. 
            AurumVest is not a registered investment advisor. All returns are historical 
            and subject to market conditions.
          </p>
        </div>
      </div>
    </footer>
  );
};
