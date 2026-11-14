import crypto from "crypto";

const ROOM_PASSCODE_PREFIX = "h1:";

/**
 * Hashes a study room passcode deterministically into <= 47 chars (fits @db.VarChar(50)).
 */
export function hashRoomPasscode(passcode: string): string {
  const normalized = String(passcode).trim();
  const digest = crypto
    .createHash("sha256")
    .update(`xp_voca_room_pass:${normalized}`)
    .digest("base64url")
    .slice(0, 44);
  return `${ROOM_PASSCODE_PREFIX}${digest}`;
}

/**
 * Constant-time verification supporting both hashed passcodes (`h1:...`) and legacy plain values.
 */
export function verifyRoomPasscode(inputPasscode: string, storedPasscode: string): boolean {
  if (!storedPasscode) return true;
  if (!inputPasscode) return false;

  const expected = storedPasscode.startsWith(ROOM_PASSCODE_PREFIX)
    ? storedPasscode
    : hashRoomPasscode(storedPasscode);
  const actual = hashRoomPasscode(inputPasscode);

  const bufA = Buffer.from(expected, "utf8");
  const bufB = Buffer.from(actual, "utf8");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}
