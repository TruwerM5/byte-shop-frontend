'use server';

import { redirect } from 'next/navigation';

export default async function AdminRedirectPage() {
  const isAuthorizedAsAdmin = false;

  if (!isAuthorizedAsAdmin) {
    redirect('/admin/auth');
  }

  redirect('/admin/dashboard');
}
