import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const apexDomain = "fdaicar.top";
const primaryDomain = "www.fdaicar.top";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host");
  const hostname = host?.split(":")[0];

  if (!hostname || hostname !== apexDomain) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.hostname = primaryDomain;
  redirectUrl.protocol = "https";
  redirectUrl.port = "";

  return NextResponse.redirect(redirectUrl, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
