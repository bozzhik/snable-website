import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

export function middleware(request: NextRequest) {
  // Проверяем доступ к /dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Проверяем URL параметр
    const secretParam = request.nextUrl.searchParams.get('secret')
    if (secretParam === process.env.DASHBOARD_SECRET) {
      const res = NextResponse.next()
      res.cookies.set('dashboard', process.env.DASHBOARD_SECRET!, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 дней
      })

      // Добавляем заголовки против индексации
      res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')
      res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')

      return res
    }

    // Проверяем куки
    const dashboardCookie = request.cookies.get('dashboard')
    if (dashboardCookie?.value !== process.env.DASHBOARD_SECRET) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Если куки валидны, все равно добавляем заголовки
    const res = NextResponse.next()
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
