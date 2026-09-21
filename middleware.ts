import { NextRequest } from "next/server";
import proxy, { config as proxyConfig } from "./proxy";

/**
 * Next.js 16 Edge Security & Route Protection Middleware
 * Forwards requests to proxy() engine for rate limiting, security headers, and route guarding.
 */
export function middleware(request: NextRequest) {
  return proxy(request);
}

export const config = proxyConfig;
