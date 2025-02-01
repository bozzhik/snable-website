import {type NextRequest, NextResponse} from 'next/server'
import {FONT_NAME, FONT_DIR, type FontWeight, weightMap} from './config'

async function generateFontFace(weight: FontWeight): Promise<string> {
  const weightName = weightMap[weight]
  const fileName = `SFProDisplay-${weightName}`

  const woff2Path = `${FONT_DIR}/${fileName}.woff2`

  return `
    @font-face {
      font-family: '${FONT_NAME}';
      font-style: normal;
      font-weight: ${weight};
      font-display: swap;
      src: url('${woff2Path}') format('woff2');
    }
  `.trim()
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const weights = (searchParams.get('weights')?.split(',') as FontWeight[]) || []

  const validWeights = weights.filter((weight): weight is FontWeight => weight in weightMap)

  if (validWeights.length === 0) {
    return new NextResponse('Invalid or missing weight parameters', {status: 400})
  }

  const fontFaces = await Promise.all(weights.flatMap((weight) => generateFontFace(weight)))

  const css = fontFaces.filter(Boolean).join('\n\n')

  return new NextResponse(css, {
    headers: {
      'Content-Type': 'text/css',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
