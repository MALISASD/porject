import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const apexDomain = "fdaicar.top";
const primaryDomain = "www.fdaicar.top";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host");

  if (!host || host !== apexDomain) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.host = primaryDomain;
  redirectUrl.protocol = "https";

  return NextResponse.redirect(redirectUrl, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
