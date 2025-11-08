export const BLOCKED_KEYWORDS = {
  adult: ['porn', 'xxx', 'adult', 'nsfw', 'hentai', 'camgirl', 'webcam', 'livecam', 'escort', 'nude', 'naked', 'fetish', 'bdsm', 'milf', 'teen', 'anal'],
  financial: ['crypto', 'wallet', 'forex', 'trading', 'investment', 'bitcoin', 'ethereum', 'loan', 'credit', 'mortgage', 'insurance', 'refund'],
  security: ['cpanel', 'panel', 'privacy', 'authentication', 'password', 'signin', 'signup', 'register', 'verify', 'otp', '2fa'],
  government: ['irs', 'passport', 'citizenship', 'immigration', 'welfare', 'publicservice', 'voting', 'socialsecurity', 'medicare', 'unemployment'],
  internal: ['localhost', 'staging', 'private', 'intranet', 'secure', 'internal', 'test', 'debug', 'local', '127.0.0.1', '192.168.', '10.', '172.16.'],
}

export function isSuspiciousDomain(url: string): boolean {
  try {
    const urlObj = new URL(url)
    const domain = urlObj.hostname.toLowerCase()

    // Check keywords in domain and URL
    for (const category in BLOCKED_KEYWORDS) {
      if (category === 'internal') {
        // For internal keywords, check if they're in the domain
        if (
          BLOCKED_KEYWORDS[category as keyof typeof BLOCKED_KEYWORDS].some((keyword) => {
            // Only block if it's clearly internal (localhost, dev, staging, etc.)
            return (
              (keyword === 'localhost' && domain.includes('localhost')) || // patterns match
              (keyword === 'test' && (domain.includes('.test') || domain.includes('test.'))) ||
              (keyword === 'local' && domain.includes('.local'))
            )
          })
        ) {
          return true
        }
      } else {
        // For other categories, check if keyword appears in domain
        if (BLOCKED_KEYWORDS[category as keyof typeof BLOCKED_KEYWORDS].some((keyword) => domain.includes(keyword))) {
          return true
        }
      }
    }

    return false
  } catch {
    console.error('Invalid URL:', url)
    return true
  }
}
