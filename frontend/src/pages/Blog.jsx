import { motion } from 'framer-motion';
import { FiClock, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import SectionReveal from '../components/ui/SectionReveal';
import AnimatedText from '../components/ui/AnimatedText';

const categories = ['All', 'AI Technology', 'Product Updates', 'Industry Tips', 'Case Studies'];

const posts = [
  {
    title: 'How AI Voice Technology Is Transforming Small Business',
    excerpt: 'Discover how AI-powered voice assistants are revolutionizing customer service for small businesses across every industry.',
    category: 'AI Technology',
    date: 'Aug 5, 2026',
    readTime: '5 min read',
    featured: true,
  },
  {
    title: 'ReceptAI 2.0: Multi-Language Support & Custom Voices',
    excerpt: 'Announcing support for 12 languages and the ability to create fully custom AI voices that match your brand.',
    category: 'Product Updates',
    date: 'Jul 28, 2026',
    readTime: '3 min read',
    featured: false,
  },
  {
    title: '10 Ways Hair Salons Can Reduce No-Shows by 60%',
    excerpt: 'Learn proven strategies for reducing appointment no-shows using automated reminders and AI-powered follow-ups.',
    category: 'Industry Tips',
    date: 'Jul 20, 2026',
    readTime: '7 min read',
    featured: false,
  },
  {
    title: 'BrightSmile Dental: 40% More Bookings with AI',
    excerpt: 'How a dental clinic in Austin went from missing 30% of calls to booking every single patient automatically.',
    category: 'Case Studies',
    date: 'Jul 15, 2026',
    readTime: '6 min read',
    featured: false,
  },
  {
    title: 'The Future of Conversational AI in Hospitality',
    excerpt: 'Hotels are adopting AI receptionists for concierge services, room bookings, and guest experience management.',
    category: 'AI Technology',
    date: 'Jul 8, 2026',
    readTime: '8 min read',
    featured: false,
  },
  {
    title: 'Why Your Gym Needs an AI Receptionist',
    excerpt: 'Class bookings, membership inquiries, and trainer scheduling — all handled while your staff focuses on members.',
    category: 'Industry Tips',
    date: 'Jul 1, 2026',
    readTime: '4 min read',
    featured: false,
  },
];

export default function Blog() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-40 pb-16 px-6 lg:px-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,122,0,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-accent uppercase tracking-[0.2em] font-medium mb-6">Blog</motion.p>
          <AnimatedText text="Insights & Updates" tag="h1" animation="words" className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold font-[family-name:var(--font-heading)] text-text-primary mb-6 tracking-tight" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-lg text-text-muted">
            The latest on AI, product updates, and industry insights.
          </motion.p>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 lg:px-10 pb-10">
        <SectionReveal className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                i === 0 ? 'bg-accent text-bg-primary' : 'bg-[rgba(12,74,110,0.04)] text-text-muted border border-border hover:border-accent/20 hover:text-text-primary'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </SectionReveal>
      </section>

      {/* Blog Grid */}
      <section className="px-6 lg:px-10 pb-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <SectionReveal key={post.title} delay={index * 0.08} className={post.featured ? 'md:col-span-2 lg:col-span-2' : ''}>
              <motion.article
                className="h-full rounded-2xl bg-[rgba(12,74,110,0.03)] border border-border overflow-hidden group cursor-pointer"
                whileHover={{ borderColor: 'rgba(255,122,0,0.15)', y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Colored top bar */}
                <div className="h-[3px] bg-gradient-to-r from-accent via-accent-secondary to-highlight opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="p-6 md:p-8 flex flex-col h-full">
                  {/* Category + date */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-accent/10 text-accent">
                      {post.category}
                    </span>
                    <span className="text-xs text-text-muted/40">{post.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className={`font-bold text-text-primary font-[family-name:var(--font-heading)] mb-3 group-hover:text-accent transition-colors duration-300 ${post.featured ? 'text-xl md:text-2xl' : 'text-lg'}`}>
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-text-muted leading-relaxed flex-1 mb-5">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-text-muted/40">
                      <FiClock size={12} />
                      {post.readTime}
                    </div>
                    <span className="flex items-center gap-1 text-sm text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Read more <FiArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </motion.article>
            </SectionReveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
