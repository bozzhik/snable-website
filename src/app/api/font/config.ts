export const FONT_NAME = 'SF Pro Display'
export const FONT_DIR = 'https://snable.website/font' // http://localhost:3000/api/font?weights=400

export type FontWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'

export const weightMap: Record<FontWeight, string> = {
  '100': 'Thin',
  '200': 'Ultralight',
  '300': 'Light',
  '400': 'Regular',
  '500': 'Medium',
  '600': 'SemiBold',
  '700': 'Bold',
  '800': 'Heavy',
  '900': 'Black',
}
