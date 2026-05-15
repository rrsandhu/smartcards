/**
 * Canonical rewards program names — keyed by any known alias the scraper or
 * seed data may write, mapped to the exact string in points_valuations.program.
 * Apply this before any lookup against points_valuations.
 */
export const PROGRAM_ALIASES: Record<string, string> = {
  'Avion':                       'RBC Avion',
  'American Express Rewards':    'Amex MR',
  'Aventura':                    'CIBC Aventura',
  'Canadian Tire Triangle Rewards': 'Canadian Tire Triangle',
}

/** Normalise a raw rewards_program string to its canonical points_valuations name. */
export function canonicalProgram(program: string | null | undefined): string | undefined {
  if (!program) return undefined
  return PROGRAM_ALIASES[program] ?? program
}

/** Short badge labels shown in admin UI tables */
export const SOURCE_LABELS: Record<number, string> = {
  1: 'PoT',
  2: 'MF',
  3: 'CC',
  4: 'RH',
}

/** Full source names used in tooltips / titles */
export const SOURCE_NAMES: Record<number, string> = {
  1: 'PrinceOfTravel',
  2: 'MintFlying',
  3: 'ChurningCanada',
  4: 'Ratehub',
}
