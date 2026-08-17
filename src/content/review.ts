/**
 * Client review gate for Adolfo (and Kyle).
 *
 * Soft password only — enough to keep random visitors out of the markup tools.
 * Password is never stored in plain text; the page checks SHA-256(password).
 *
 * Share with Adolfo: https://agapenursery.com/review
 * Password: AgapeReview26
 */
export const reviewConfig = {
  /** SHA-256 hex of "AgapeReview26" */
  passwordHash:
    '1b827cd339a1cb42f2c55fcd36aa3c74bdd44528db78d0ed6fc474ffcc5616dd',
  sessionKey: 'agape-review-auth-v1',
  storageKey: 'agape-review-annotations-v1',
  authorKey: 'agape-review-author-v1',
  /**
   * Review notes go to Kyle, not the nursery lead inbox.
   * FormSubmit: first send triggers an activation email to this address — click it once.
   */
  notifyEmail: 'kylekumar408@gmail.com',
  defaultAuthor: 'Adolfo',
  sessionTtlMs: 1000 * 60 * 60 * 24 * 14, // 14 days
} as const;
