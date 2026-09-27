'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function submitBookingEnquiry(formData: {
  name: string
  email: string
  phoneNumber: string
  tourType?: string
  date?: string
  numberOfPeople?: string
  additionalInfo?: string
}) {
  const payload = await getPayload({ config })

  await payload.create({
    collection: 'booking-enquiry',
    data: {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      tourType: (formData.tourType || undefined) as any,
      date: formData.date || undefined,
      numberOfPeople: formData.numberOfPeople ? parseInt(formData.numberOfPeople) : undefined,
      additionalInfo: formData.additionalInfo || undefined,
    },
    overrideAccess: true,
  })
}
