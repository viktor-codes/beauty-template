const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** Human-readable voucher code without ambiguous characters (0/O, 1/I). */
export function generateVoucherCode(): string {
  let suffix = "";
  for (let i = 0; i < 6; i += 1) {
    suffix += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)]!;
  }
  return `SKIN-${suffix}`;
}
