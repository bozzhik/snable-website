import {NextResponse} from 'next/server'
import {PROJECT_LINKS} from '@/lib/constants'

export async function GET() {
  try {
    const response = await fetch(PROJECT_LINKS.store ?? 'https://chromewebstore.google.com/detail/snable-ui-inspector-css-s/gahcgpjomnmmmpimaodmdbaappflalkn', {
      next: {
        revalidate: 86400,
      },
    })

    const text = await response.text()

    const match = text.match(/(\d+)\s*users/)
    const userCount = match ? parseInt(match[1]) : 0

    return NextResponse.json({count: userCount}, {status: 200})
  } catch (error) {
    console.error('Error fetching user count:', error)
    return NextResponse.json({error: 'Failed to fetch user count'}, {status: 500})
  }
}
