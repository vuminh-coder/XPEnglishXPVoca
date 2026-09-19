import { randomBytes, timingSafeEqual } from "crypto";
import type { NextRequest, NextResponse } from "next/server";

export type OAuthProvider = "google" | "facebook";

const STATE_TTL_SECONDS = 10 * 60;

function cookieName(provider: OAuthProvider) {
  return `xp_voca_oauth_state_${provider}`;
}

export function createOAuthState(): string {
  return randomBytes(32).toString("base64url");
}

export function setOAuthStateCookie(
  response: NextResponse,
  provider: OAuthProvider,
  state: string
) {
  response.cookies.set(cookieName(provider), state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: STATE_TTL_SECONDS,
    path: `/api/auth/${provider}`,
  });
}

export function clearOAuthStateCookie(response: NextResponse, provider: OAuthProvider) {
  response.cookies.set(cookieName(provider), "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: `/api/auth/${provider}`,
  });
}

export function hasValidOAuthState(
  request: NextRequest,
  provider: OAuthProvider,
  receivedState: string | null
): boolean {
  const expectedState = request.cookies.get(cookieName(provider))?.value;
  if (!expectedState || !receivedState) return false;

  const expected = Buffer.from(expectedState);
  const received = Buffer.from(receivedState);
  return expected.length === received.length && timingSafeEqual(expected, received);
}
