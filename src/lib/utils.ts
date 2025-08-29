import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cleanUrl = (url: string) => {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

export function formatTime(date: string, format: 'full' | 'date' = 'full'): string {
  const dateObj = new Date(date)
  const pad = (n: number) => n.toString().padStart(2, '0')

  const day = pad(dateObj.getDate())
  const month = pad(dateObj.getMonth() + 1)
  const year = dateObj.getFullYear().toString().slice(-2)
  const hours = pad(dateObj.getHours())
  const minutes = pad(dateObj.getMinutes())

  if (format === 'date') {
    return `${day}.${month}.${year}`
  }

  return `${hours}:${minutes}  ${day}.${month}.${year}`
}

export function getTimeAgo(dateString: string): string {
  const now = new Date()
  const past = new Date(dateString)
  const diffMs = now.getTime() - past.getTime()

  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`
  } else if (diffHours < 24) {
    return `${diffHours}h ago`
  } else {
    return `${diffDays}d ago`
  }
}
