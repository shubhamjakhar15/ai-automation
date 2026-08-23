import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTwitter, FiLinkedin, FiGithub, FiYoutube, FiArrowRight } from 'react-icons/fi';
import SectionReveal from '../ui/SectionReveal';

const footerLinks = {
  Product: [
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Industries', href: '/#industries' },
    { name: 'Integrations', href: '/services' },
    { name: 'API', href: '#' },
  ],
  Company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Contact', href: '/contact' },
  ],
  Resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Help Center', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'Status', href: '#' },
    { name: 'Changelog', href: '#' },
  ],
  Legal: [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Security', href: '#' },
    { name: 'Cookies', href: '#' },
  ],
};

const socials = [
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FiGithub, href: '#', label: 'GitHub' },
  { icon: FiYoutube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-bg-secondary">
      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Newsletter Section */}
        <SectionReveal>
          <div className="py-16 border-b border-border flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-text-primary mb-2">
                Stay in the loop
              </h3>
              <p className="text-text-muted text-[15px]">
                Get the latest updates on AI receptionist technology.
              </p>
            </div>
            <div className="flex w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-[300px] px-5 py-3 bg-[rgba(12,74,110,0.05)] border border-border rounded-l-xl text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/40 transition-colors"
              />
              <button className="px-6 py-3 bg-accent text-bg-primary font-semibold rounded-r-xl hover:bg-accent-secondary transition-colors flex items-center gap-2 text-sm cursor-pointer">
                Subscribe
                <FiArrowRight size={14} />
              </button>
            </div>
          </div>
        </SectionReveal>

        {/* Links Grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <SectionReveal className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-bg-primary">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" opacity="0.8" />
                  <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-lg font-bold font-[family-name:var(--font-heading)] text-text-primary tracking-tight">
                Recept<span className="text-accent">AI</span>
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-[280px]">
              Your 24/7 AI employee that never misses a customer. Powered by advanced voice AI technology.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-[rgba(12,74,110,0.05)] border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-colors"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </SectionReveal>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links], i) => (
            <SectionReveal key={category} delay={i * 0.1}>
              <h4 className="text-sm font-semibold text-text-primary mb-5 font-[family-name:var(--font-heading)]">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </SectionReveal>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted/60">
            © {new Date().getFullYear()} ReceptAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-xs text-text-muted/60 hover:text-text-muted transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-xs text-text-muted/60 hover:text-text-muted transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="text-xs text-text-muted/60 hover:text-text-muted transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
