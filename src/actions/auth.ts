'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function getUserSession() {
  const supabase = await createClient();
  if (!supabase) {
    return { user: null, role: 'public' as const };
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, role: 'public' as const };
  }

  // Admin emails list configured in env or default
  const adminEmails = (process.env.ADMIN_EMAILS || 'androidtoyar@gmail.com').split(',').map(e => e.trim().toLowerCase());
  const allowedCompanyDomains = (process.env.ALLOWED_DOMAINS || '').split(',').map(d => d.trim().toLowerCase()).filter(Boolean);

  const userEmail = user.email?.toLowerCase() || '';
  const userDomain = userEmail.split('@')[1] || '';

  let role: 'admin' | 'tester' | 'public' = 'public';

  if (adminEmails.includes(userEmail)) {
    role = 'admin';
  } else if (allowedCompanyDomains.includes(userDomain) || user.app_metadata?.role === 'tester') {
    role = 'tester';
  } else {
    // Authenticated Google user but standard access
    role = 'tester';
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0],
      avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture,
    },
    role,
  };
}

export async function signOutAction() {
  const supabase = await createClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  redirect('/');
}
