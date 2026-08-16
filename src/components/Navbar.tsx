import { getUserSession } from '@/actions/auth';
import { NavbarClient } from './NavbarClient';

export async function Navbar() {
  const session = await getUserSession();

  return (
    <NavbarClient
      user={session.user}
      role={session.role}
    />
  );
}
