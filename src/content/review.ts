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
  photoLibraryUrl: '/photos/library.json',
} as const;

export const studioPhotoSlots = [
  { id: 'hero-main', label: 'Hero photo', current: '/photos/hero/hero-main.jpg' },
  { id: 'svc-landscape', label: 'Service: Landscape Design', current: '/photos/services/landscape.jpg' },
  { id: 'svc-plants', label: 'Service: Plants and Trees', current: '/photos/services/plants.jpg' },
  { id: 'svc-supplies', label: 'Service: Garden Supplies', current: '/photos/services/supplies.jpg' },
  { id: 'svc-irrigation', label: 'Service: Irrigation', current: '/photos/services/irrigation.jpg' },
  { id: 'bulk', label: 'Bulk materials photo', current: '/photos/services/bulk-materials.jpg' },
  { id: 'about', label: 'Family / about photo', current: '/photos/about/family-yard.jpg' },
] as const;

export const studioTextSlots = [
  { id: 'hero-h1', label: 'Top headline', current: 'Growing Delano’s gardens since 1982.' },
  { id: 'about-body', label: 'Family story paragraph', current: 'Agape started serving Delano and the surrounding communities in 1982.' },
  { id: 'svc-landscape-title', label: 'Landscape card title', current: 'Landscape Design and Install' },
  { id: 'svc-plants-title', label: 'Plants card title', current: 'Plants and Trees' },
  { id: 'svc-supplies-title', label: 'Supplies card title', current: 'Garden Supplies' },
  { id: 'svc-irrigation-title', label: 'Irrigation card title', current: 'Irrigation Install and Repair' },
] as const;
