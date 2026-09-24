'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function submitBookingEnquiry(formData: {
  name: string
  email: string
  phone_number: string
  tour_type?: string
  date?: string
  number_of_people?: string
  additional_info?: string
}) {
  const payload = await getPayload({ config })

  await payload.create({
    collection: 'booking-enquiry',
    data: {
      name: formData.name,
      email: formData.email,
      phone_number: formData.phone_number,
      tour_type: (formData.tour_type || undefined) as any,
      date: formData.date || undefined,
      number_of_people: formData.number_of_people ? parseInt(formData.number_of_people) : undefined,
      additional_info: formData.additional_info || undefined,
    },
    overrideAccess: true,
  })
}
