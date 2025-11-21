import type {Session, User} from '@/utils/getDashboard'

type SessionColumn = keyof Session
type UserColumn = keyof User

export const SESSION_COLUMNS: readonly SessionColumn[] = ['id', 'url', 'title', 'favicon', 'note', 'created_at'] as const

export const USER_COLUMNS: readonly UserColumn[] = ['token', 'snabled', 'favorites', 'figma_bridge', 'figma_bridge_count', 'figma_plugin', 'figma_plugin_count', 'mark', 'created_at', 'updated_at'] as const

// Type-safe helper function to reorder object properties based on column order
function reorderObject<T extends Record<string, unknown>, K extends keyof T>(obj: T, columnOrder: readonly K[]): Record<string, unknown> {
  const reordered: Record<string, unknown> = {}

  // Add properties in the specified order
  for (const column of columnOrder) {
    if (column in obj) {
      reordered[column as string] = obj[column]
    }
  }

  // Add any remaining properties that weren't in the column order
  for (const [key, value] of Object.entries(obj)) {
    if (!(key in reordered)) {
      reordered[key] = value
    }
  }

  return reordered
}

// Type-safe helper function to reorder array of objects
function reorderData<T extends Record<string, unknown>, K extends keyof T>(data: T[], columnOrder: readonly K[]): Record<string, unknown>[] {
  return data.map((item) => reorderObject(item, columnOrder))
}

// Type-safe helper functions for specific entity types
export function reorderSessionData(data: Session[]): Record<string, unknown>[] {
  return reorderData(data, SESSION_COLUMNS)
}
export function reorderUserData(data: User[]): Record<string, unknown>[] {
  return reorderData(data, USER_COLUMNS)
}

// Helper function to convert array/object to string for CSV
export function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'object') {
    return `"${JSON.stringify(value).replace(/"/g, '""')}"`
  }
  if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return String(value)
}

// Helper function to convert data to CSV
export function toCSV(data: Record<string, unknown>[], headers: string[]): string {
  const csvRows = [headers.join(',')]

  for (const row of data) {
    const values = headers.map((header) => csvEscape(row[header]))
    csvRows.push(values.join(','))
  }

  return csvRows.join('\n')
}

// Helper function to flatten nested objects for CSV
export function flattenForCSV(data: Record<string, unknown>[]): Record<string, unknown>[] {
  return data.map((item) => {
    const flattened: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(item)) {
      if (typeof value === 'object' && value !== null) {
        // Flatten arrays and objects
        if (Array.isArray(value)) {
          flattened[key] = value.join(';')
        } else {
          flattened[key] = JSON.stringify(value)
        }
      } else {
        flattened[key] = value
      }
    }

    return flattened
  })
}
