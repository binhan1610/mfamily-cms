import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_PATH: any = {
  '/sign_in': true,
  '/sign_up': true,
};

const PATH: string[] = [
  'check_log',
  'create_campaign',
  'list_campaign',
  'list_device',
  'list_group',
  'list_member',
  'monitor_system',
  'report_user',
  'profile',
  'setting',
];

export async function middleware(request: NextRequest) {
  const { cookies } = request;
  const token = cookies.get('token');
  const url = request.nextUrl.clone();

  const res = NextResponse.next();
  res.headers.append('Access-Control-Allow-Origin', '*'); // allow all origin
  res.headers.append('Access-Control-Allow-Credentials', 'true');
  res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  res.headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  );

  const isMatchAuthPath = AUTH_PATH[request.nextUrl.pathname];
  const isMatchPath = PATH.find((path: string) => request.nextUrl.pathname.includes(path));

  if (token) {
    if (isMatchAuthPath) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    return res;
  }

  if (!token && isMatchPath) {
    url.pathname = '/sign_in';
    return NextResponse.redirect(url);
  }

  return res;
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/sign-in', '/sign-up', '/information', '/forgot-password'],
// };
