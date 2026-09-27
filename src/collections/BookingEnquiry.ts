import type { CollectionConfig } from 'payload'

export const BookingEnquiry: CollectionConfig = {
  slug: 'booking-enquiry',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'date', 'tourType', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phoneNumber', type: 'text', required: true },
    {
      name: 'tourType',
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
    { name: 'numberOfPeople', type: 'number' },
    { name: 'additionalInfo', type: 'textarea' },
  ],
  timestamps: true,
}
