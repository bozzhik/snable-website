import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cleanUrl = (url: string) => {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

export function formatTime(date: string): string {
  const dateObj = new Date(date)
  const pad = (n: number) => n.toString().padStart(2, '0')

  const day = pad(dateObj.getDate())
  const month = pad(dateObj.getMonth() + 1)
  const year = dateObj.getFullYear().toString().slice(-2)
  const hours = pad(dateObj.getHours())
  const minutes = pad(dateObj.getMinutes())

  return `${hours}:${minutes}  ${day}.${month}.${year}`
}
