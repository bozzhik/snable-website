'use client'

import type {FormFields} from '@/app/api/email/TeaserEmail'
import {BUTTON_VARIANTS} from '~/UI/Button'
import {ArrowUpRight} from 'lucide-react'

import {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'

import {cn, m} from '@/lib/utils'
import {toast} from 'sonner'

export default function TeaserForm() {
  const {register, handleSubmit, reset} = useForm<FormFields>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitForm = async (data: FormFields) => {
    setIsSubmitting(true)

    const submitPromise = axios.post('/api/email', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    toast.promise(submitPromise, {
      loading: 'Sending your email..',
      success: () => {
        reset()
        return "We've got your email! Stay with us for updates."
      },
      error: 'Oops! Something went wrong.',
    })

    try {
      const response = await submitPromise

      if (response.status !== 200) {
        throw new Error('Failed to send data')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section data-section="teaser-form" className={m('w-full gap-2 p-[5px]', 'bg-black border border-gray-light/15 rounded-xl', 'group hover:border-gray-light/30 focus-within:border-gray-light/30 duration-300')}>
      <form onSubmit={handleSubmit(submitForm)} className={m('flex gap-2 justify-between p-[5px] pl-3.5 bg-black-light border border-gray-medium rounded-lg', 'group-hover:border-white/60 hover:border-white/60 focus-within:border-white/60 duration-300')}>
        <input type="email" placeholder="E-mail" {...register('email', {required: true})} className={m('w-full bg-transparent text-white placeholder:text-white font-mono uppercase', '!outline-none')} />

        <button type="submit" disabled={isSubmitting} className={cn(BUTTON_VARIANTS.solid, 'p-0.5 rounded-md group/button duration-300', isSubmitting && 'bg-gray')}>
          <ArrowUpRight className="duration-500 size-10 group-hover/button:rotate-45" strokeWidth={1.25} />
        </button>
      </form>
    </section>
  )
}
