import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "In 18 months, my portfolio grew by 230%—with zero stress. This is institutional-grade investing at its finest.",
    author: "Alexander von Richter",
    title: "Private Equity Director",
    location: "Zurich, Switzerland",
    returns: "+230%",
    invested: "$500K",
  },
  {
    quote: "Finally, a crypto investment ecosystem that feels engineered for serious investors. The transparency and returns are unmatched.",
    author: "Victoria Chen",
    title: "Family Office Manager",
    location: "Singapore",
    returns: "+185%",
    invested: "$1.2M",
  },
  {
    quote: "Their mining yields alone outperform most hedge fund strategies I've analyzed. Exceptional risk-adjusted returns.",
    author: "James Morrison III",
    title: "Former Goldman Sachs MD",
    location: "New York, USA",
    returns: "+312%",
    invested: "$750K",
  },
  {
    quote: "The Sovereign Fund exceeded every expectation. My dedicated wealth manager has been instrumental in optimizing my portfolio.",
    author: "Sheikh Abdullah Al-Rashid",
    title: "Investment Consortium",
    location: "Dubai, UAE",
    returns: "+267%",
    invested: "$2M",
  },
  {
    quote: "As someone who managed billions in traditional finance, I can confidently say AurumVest's approach is revolutionary.",
    author: "Dr. Sarah Whitfield",
    title: "Hedge Fund Founder",
    location: "London, UK",
    returns: "+198%",
    invested: "$850K",
  },
  {
    quote: "The combination of AI trading and mining diversification creates a truly unique value proposition in the market.",
    author: "Marcus Lindberg",
    title: "Tech Entrepreneur",
    location: "Stockholm, Sweden",
    returns: "+245%",
    invested: "$400K",
  },
];

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute inset-0 bg-radial-gold opacity-10" />
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
            Client Success Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Trusted by the{" "}
            <span className="bg-gradient-to-r from-primary to-gold-light bg-clip-text text-transparent">
              World's Elite
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover why high-net-worth individuals and institutional investors 
            choose AurumVest for their digital wealth management.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full glass rounded-2xl p-8 hover:border-primary/30 transition-all duration-500 hover:transform hover:scale-[1.02]">
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-primary/30" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-foreground leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Returns Badge */}
                <div className="flex gap-3 mb-6">
                  <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-sm font-semibold text-emerald-400">
                      {testimonial.returns} ROI
                    </span>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                    <span className="text-sm text-primary">
                      {testimonial.invested} invested
                    </span>
                  </div>
                </div>

                {/* Author */}
                <div className="pt-6 border-t border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-gold-light flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      <p className="text-xs text-primary">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground mb-6">Verified by leading financial platforms</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
            {["Trustpilot", "Forbes", "Bloomberg", "CNBC", "WSJ"].map((brand) => (
              <span key={brand} className="text-xl font-serif font-bold text-muted-foreground">
                {brand}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
