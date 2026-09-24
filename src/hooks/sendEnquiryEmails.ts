import type { CollectionAfterOperationHook } from 'payload'
import { buildEnquirySubmissionEmail } from '../email/enquirySubmissionEmail'

export const sendEnquiryEmails: CollectionAfterOperationHook<'booking-enquiry'> = async ({
  operation,
  result,
  req,
}) => {
  if (operation !== 'create') return result

  const { payload } = req

  const contactPage = await payload.findGlobal({
    slug: 'contact-page',
    overrideAccess: true,
  })

  const adminEmail = contactPage?.email_address

  const emailData = {
    name: result.name || '-',
    email: result.email || '-',
    phoneNumber: result.phone_number || '-',
    tourType: result.tour_type || '-',
    date: result.date || '-',
    numberOfPeople: result.number_of_people != null ? String(result.number_of_people) : '-',
    additionalInfo: result.additional_info || '-',
  }

  if (adminEmail) {
    try {
      await payload.sendEmail({
        to: adminEmail,
        subject: `Website Enquiry Submission [${result.id}]`,
        html: buildEnquirySubmissionEmail({
          ...emailData,
          message: "You've received a booking enquiry from your website.",
        }),
      })
    } catch (error) {
      payload.logger.error({
        err: error,
        msg: `Failed to send admin enquiry notification email for enquiry [${result.id}]`,
      })
    }
  }

  if (result.email) {
    try {
      await payload.sendEmail({
        to: result.email,
        subject: 'Wellington Rafting Enquiry Received',
        html: buildEnquirySubmissionEmail({
          ...emailData,
          message: 'Thank you for your enquiry, we will respond to you soon.',
        }),
      })
    } catch (error) {
      payload.logger.error({
        err: error,
        msg: `Failed to send customer enquiry confirmation email for enquiry [${result.id}] to ${result.email}`,
      })
    }
  }

  return result
}
