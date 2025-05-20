import {NextRequest, NextResponse} from 'next/server'
import {supabase} from '@/lib/supabase'

export type UserData = {
  token: string
  snabled: string[]
  favorites: string[]
}

export async function POST(request: NextRequest) {
  try {
    const data: UserData = await request.json()
    const userToken = request.headers.get('X-User-Token')

    if (!userToken) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'User token is required',
        },
        {status: 401},
      )
    }

    // Check if user exists
    const {data: existingUser} = await supabase.from('users').select().eq('token', userToken).limit(1)

    if (existingUser && existingUser.length > 0) {
      // Update existing user
      const {data: updatedUser, error: updateError} = await supabase
        .from('users')
        .update({
          snabled: data.snabled,
          favorites: data.favorites,
          updated_at: new Date().toISOString(),
        })
        .eq('token', userToken)
        .select()

      if (updateError) {
        throw updateError
      }

      console.log('User data updated in Supabase:', updatedUser)
      return NextResponse.json(
        {
          message: 'User data updated successfully',
          data: updatedUser,
        },
        {status: 200},
      )
    }

    // Create new user
    const {data: newUser, error: insertError} = await supabase
      .from('users')
      .insert([
        {
          token: userToken,
          snabled: data.snabled,
          favorites: data.favorites,
        },
      ])
      .select()

    if (insertError) {
      throw insertError
    }

    console.log('New user stored in Supabase:', newUser)
    return NextResponse.json(
      {
        message: 'User stored successfully',
        data: newUser,
      },
      {status: 200},
    )
  } catch (error) {
    console.error('Internal Server Error:', error)
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: `${error}`,
      },
      {status: 500},
    )
  }
}
