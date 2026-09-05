import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Page() {
  return (
    <section className="min-h-screen bg-[#06070a] text-neutral-100 selection:bg-indigo-500 selection:text-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-48 items-end bg-neutral-900 lg:col-span-5 lg:h-full xl:col-span-6 overflow-hidden">
          <img
            alt="AI Interview Simulation"
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-30 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-[#06070a]/60 to-transparent" />

          <div className="relative p-6 sm:p-12 z-10">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="size-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Image
                  src="/logo.svg"
                  width={24}
                  height={24}
                  alt="Logo"
                  className="brightness-0 invert"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                AI Interview Mocker
              </span>
            </Link>

            <div className="hidden lg:block space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/50 text-[11px] font-mono text-indigo-300">
                <Sparkles className="size-3" />
                <span>START PREPARING TODAY</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                Create Your Account. <br />
                <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                  Level Up Your Career.
                </span>
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-md">
                Join thousands of candidates who transformed their interview performance with AI Interview Mocker.
              </p>
            </div>
          </div>
        </section>

        <main className="flex items-center justify-center p-6 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-full max-w-md flex flex-col items-center">
            <SignUp fallbackRedirectUrl="/dashboard" />
          </div>
        </main>
      </div>
    </section>
  );
}
