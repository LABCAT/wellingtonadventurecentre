import type { CollectionConfig } from 'payload'
import { sendEnquiryEmails } from '../hooks/sendEnquiryEmails'

export const BookingEnquiry: CollectionConfig = {
  slug: 'booking-enquiry',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'date', 'tour_type', 'createdAt'],
  },
  access: {
    create: () => true, // Allow public submissions
    read: ({ req: { user } }) => Boolean(user), // Only authenticated users can read
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterOperation: [sendEnquiryEmails],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone_number', type: 'text', required: true },
    {
      name: 'tour_type',
      type: 'select',
      options: [
        { label: 'Grade 3 Wilderness Rafting Tour', value: 'Grade 3 Wilderness Rafting Tour' },
        {
          label: 'Grade 2 Scenic Rafting - Wellington',
          value: 'Grade 2 Scenic Rafting - Wellington',
        },
        {
          label: 'Grade 2 Scenic Rafting - Wairarapa',
          value: 'Grade 2 Scenic Rafting - Wairarapa',
        },
        {
          label: 'Grade 3 Wilderness Inflatable 2 Person Kayak/Duckie Tours',
          value: 'Grade 3 Wilderness Inflatable 2 Person Kayak/Duckie Tours',
        },
        {
          label: 'Grade 2 Scenic Inflatable 2 Person Kayak Tours',
          value: 'Grade 2 Scenic Inflatable 2 Person Kayak Tours',
        },
        { label: 'Akatarawa Canyoning', value: 'Akatarawa Canyoning' },
        {
          label: 'Premium Helicopter Access Whitewater Rafting',
          value: 'Premium Helicopter Access Whitewater Rafting',
        },
        {
          label: 'Raft & Abseil Combo - Wairarapa',
          value: 'Raft & Abseil Combo - Wairarapa',
        },
        {
          label: 'Bikes and Boats Tour - Wairarapa',
          value: 'Bikes and Boats Tour - Wairarapa',
        },
        {
          label: 'Hike In Raft Out Overnight Tour - Wairarapa',
          value: 'Hike In Raft Out Overnight Tour - Wairarapa',
        },
        {
          label: 'Ropes and Rivers Tour - Wellington',
          value: 'Ropes and Rivers Tour - Wellington',
        },
      ],
    },
    { name: 'date', type: 'date' },
    { name: 'number_of_people', type: 'number' },
    { name: 'additional_info', type: 'textarea' },
  ],
  timestamps: true,
}
