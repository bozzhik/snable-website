export const BLOCKED_DOMAINS = {
  adult: ['pornhub.com', 'onlyfans.com', 'xvideos.com', 'xhamster.com', 'chaturbate.com', 'redtube.com', 'youporn.com', 'brazzers.com', 'fapello.com', 'rule34.xxx', 'hentaihaven.com', 'nhentai.net', 'erome.com', 'hqporner.com', 'tnaflix.com', 'spankbang.com'],
  banking: ['paypal.com', 'chase.com', 'sberbank.ru', 'alipay.com', 'qiwi.com', 'binance.com', 'blockchain.com', 'kraken.com', 'coinbase.com', 'revolut.com', 'wise.com', 'tinkoff.ru', 'bankofamerica.com'],
  social: ['facebook.com', 'twitter.com', 'instagram.com', 'tiktok.com', 'linkedin.com', 'vk.com', 'ok.ru', 'snapchat.com', 'pinterest.com', 'reddit.com', 'discord.com', 'telegram.org', 't.me'],
  email: ['gmail.com', 'outlook.com', 'yahoo.com', 'mail.ru', 'protonmail.com', 'zoho.com', 'icloud.com', 'yandex.ru', 'gmx.com', 'aol.com'],
  government: ['gosuslugi.ru', 'irs.gov', 'gov.uk', 'canada.ca', 'europa.eu', 'service-public.fr', 'revenue.ie', 'australia.gov.au', 'gov.br'],
  search: ['google.com/search', 'bing.com/search', 'duckduckgo.com', 'yandex.ru/search', 'baidu.com/s', 'yahoo.com/search'],
  corporate: ['admin.google.com', 'console.cloud.google.com', 'aws.amazon.com/console', 'portal.azure.com', 'developer.apple.com/account', 'cloud.ibm.com', 'gitlab.com', 'bitbucket.org', 'jira.com', 'confluence.com'],
  internal: ['localhost', '127.0.0.1', '192.168.', '10.', '172.16.', 'intranet.', 'dev.', 'staging.', 'test.', 'private.', 'admin.', 'cpanel.'],
  forums: ['4chan.org', '8kun.top', 'leakforums.net', 'kiwifarms.net', 'raidforums.com', 'hackforums.net', 'blackhatworld.com'],
}

export const BLOCKED_KEYWORDS = {
  adult: ['porn', 'sex', 'xxx', 'adult', 'nsfw', 'hentai', 'camgirl', 'webcam', 'livecam', 'dating', 'escort'],
  financial: ['crypto', 'bank', 'wallet', 'forex', 'trading', 'investment', 'paypal', 'binance', 'bitcoin', 'ethereum'],
  security: ['login', 'account', 'admin', 'dashboard', 'cpanel', 'panel', 'secure', 'privacy', 'authentication'],
  government: ['gov', 'irs', 'tax', 'passport', 'citizenship', 'immigration', 'welfare', 'publicservice', 'voting'],
  internal: ['localhost', 'dev', 'staging', 'private', 'intranet', 'secure'],
}

export function isBlockedDomain(url: string): boolean {
  try {
    const domain = new URL(url).hostname.toLowerCase()

    for (const category in BLOCKED_DOMAINS) {
      if (BLOCKED_DOMAINS[category as keyof typeof BLOCKED_DOMAINS].some((blockedDomain) => domain.includes(blockedDomain))) {
        return true
      }
    }

    for (const category in BLOCKED_KEYWORDS) {
      if (BLOCKED_KEYWORDS[category as keyof typeof BLOCKED_KEYWORDS].some((keyword) => domain.includes(keyword))) {
        return true
      }
    }

    return false
  } catch {
    console.error('Invalid URL:', url)
    return true
  }
}
