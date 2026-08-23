import { motion } from 'framer-motion';

export default function AnimatedText({
  text,
  className = '',
  tag = 'h2',
  delay = 0,
  stagger = 0.03,
  animation = 'words', // 'words' | 'chars' | 'lines'
}) {
  const Tag = tag;

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  if (animation === 'words') {
    const words = text.split(' ');
    return (
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className={className}
      >
        <Tag className="inline">
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariant}
              className="inline-block mr-[0.35em]"
            >
              {word}
            </motion.span>
          ))}
        </Tag>
      </motion.div>
    );
  }

  if (animation === 'chars') {
    const chars = text.split('');
    return (
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className={className}
      >
        <Tag className="inline">
          {chars.map((char, i) => (
            <motion.span
              key={i}
              variants={wordVariant}
              className="inline-block"
              style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </Tag>
      </motion.div>
    );
  }

  // lines animation
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      <Tag>{text}</Tag>
    </motion.div>
  );
}
