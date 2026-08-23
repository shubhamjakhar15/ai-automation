import { SignIn } from '@clerk/clerk-react';
import PageTransition from '../components/layout/PageTransition';

export default function Login() {
  return (
    <PageTransition>
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,122,0,0.06)_0%,transparent_70%)] blur-[40px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,167,51,0.04)_0%,transparent_70%)] blur-[40px]" />
          {/* Animated grid */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'linear-gradient(rgba(12,74,110,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(12,74,110,0.06) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="relative z-10 w-full flex justify-center">
          <SignIn signUpUrl="/signup" />
        </div>
      </section>
    </PageTransition>
  );
}
