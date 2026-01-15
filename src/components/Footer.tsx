import { Shield, Heart, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12 md:py-16">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Raksha AI</h3>
                <p className="text-sm text-muted-foreground">Your Protection Partner</p>
              </div>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              Protecting senior citizens from digital fraud with simple, easy-to-use tools.
            </p>
          </div>

          {/* Quick Help */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Need Help?
            </h4>
            <div className="space-y-3">
              <a
                href="tel:1930"
                className="flex items-center gap-3 text-base text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-5 w-5" />
                Cyber Crime Helpline: 1930
              </a>
              <a
                href="mailto:support@raksha.ai"
                className="flex items-center gap-3 text-base text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                support@raksha.ai
              </a>
            </div>
          </div>

          {/* Trust Badges */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Trust & Safety
            </h4>
            <div className="space-y-2 text-base text-muted-foreground">
              <p>✓ No data saved or stored</p>
              <p>✓ 100% private & secure</p>
              <p>✓ Made for senior citizens</p>
              <p>✓ Free to use always</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-base text-muted-foreground">
              © 2024 Raksha AI. All rights reserved.
            </p>
            <p className="flex items-center gap-2 text-base text-muted-foreground">
              Made with <Heart className="h-5 w-5 text-destructive fill-destructive" /> for our elders
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
