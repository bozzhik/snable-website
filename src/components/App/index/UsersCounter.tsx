'use client'

import {H4} from '~/UI/Typography'
import {useEffect, useState} from 'react'
import axios from 'axios'

export default function UsersCounter() {
  const [userCount, setUserCount] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const {data} = await axios.get('/api/users')
        setUserCount(data.count)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.error ?? 'Failed to fetch user count')
        } else {
          setError('Failed to fetch user count')
        }
        console.error('Error:', error)
      }
    }

    fetchUserCount()
  }, [])

  if (error) {
    return <H4>{error}</H4>
  }

  return (
    <section className="text-center">
      <H4>
        Users Count: <span className="text-gray">{userCount === null ? 'Loading...' : userCount}</span>
      </H4>
    </section>
  )
}
