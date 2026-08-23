import { SignUp } from '@clerk/clerk-react';
import PageTransition from '../components/layout/PageTransition';

export default function Signup() {
  return (
    <PageTransition>
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,122,0,0.05)_0%,transparent_70%)] blur-[40px]" />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'linear-gradient(rgba(12,74,110,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(12,74,110,0.06) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="relative z-10 w-full flex justify-center">
          <SignUp signInUrl="/login" />
        </div>
      </section>
    </PageTransition>
  );
}
