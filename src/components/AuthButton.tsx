'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { signOutAction } from '@/actions/auth';
import { LogIn, LogOut, User, ShieldCheck, Loader2 } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

interface AuthButtonProps {
  initialUser?: {
    name?: string;
    email?: string;
    avatarUrl?: string;
  } | null;
  initialRole?: 'admin' | 'tester' | 'public';
}

export function AuthButton({ initialUser = null, initialRole = 'public' }: AuthButtonProps) {
  const { lang } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    const supabase = createClient();
    if (!supabase) {
      alert(
        lang === 'th'
          ? 'กรุณากำหนดค่า NEXT_PUBLIC_SUPABASE_URL และ NEXT_PUBLIC_SUPABASE_ANON_KEY ในไฟล์ .env.local ก่อนเปิดใช้งาน Google OAuth'
          : 'Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local before using Google OAuth'
      );
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Sign in error:', error);
      alert(error.message);
      setIsLoading(false);
    }
  };

  if (initialUser) {
    return (
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
          {initialUser.avatarUrl ? (
            <img
              src={initialUser.avatarUrl}
              alt={initialUser.name || 'User'}
              className="h-6 w-6 rounded-full border border-indigo-500/30 object-cover"
            />
          ) : (
            <div className="h-6 w-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              {initialUser.name?.[0] || 'U'}
            </div>
          )}
          <div className="flex flex-col text-left">
            <span className="font-semibold text-zinc-100 truncate max-w-[100px] leading-tight">
              {initialUser.name}
            </span>
            <span className="text-[10px] font-mono text-indigo-400 uppercase">
              {initialRole}
            </span>
          </div>
        </div>

        <form action={signOutAction}>
          <button
            type="submit"
            className="p-2 rounded-xl text-zinc-400 hover:text-rose-400 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors"
            title={lang === 'th' ? 'ออกจากระบบ' : 'Sign Out'}
          >
            <LogOut className="h-4 w-4" />
          </button>
        </form>
      </div>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-700 shadow-sm transition-all disabled:opacity-50"
    >
      {isLoading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-400" />
      ) : (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
      )}
      <span>{lang === 'th' ? 'เข้าสู่ระบบด้วย Google' : 'Sign In'}</span>
    </button>
  );
}
