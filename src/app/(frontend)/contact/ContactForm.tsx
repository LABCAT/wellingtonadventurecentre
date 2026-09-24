'use client'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { submitBookingEnquiry } from '../actions/submitBookingEnquiry'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [tourType, setTourType] = useState('')
  const [date, setDate] = useState('')
  const [numberOfPeople, setNumberOfPeople] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !phoneNumber || !date) {
      return toast.error('Please enter your name, email, phone number and date.')
    }

    setLoading(true)
    try {
      await submitBookingEnquiry({
        name,
        email,
        phone_number: phoneNumber,
        tour_type: tourType,
        date,
        number_of_people: numberOfPeople,
        additional_info: additionalInfo,
      })
      toast.success('Your message has been sent successfully')
    } catch (error) {
      console.error(error)
      toast.error('Sorry there was an error sending your message, please contact us via email or phone.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-intro">
      <ToastContainer position="bottom-center" limit={1} />
      <div className="mask-pattern mask-pattern--top"></div>
      <div className="container container--narrow">
        <h2 className="page-intro__heading">NEED HELP MAKING A BOOKING?</h2>
        <div className="page-intro__content">
          <p>
            You can call us on <a href="tel:+64204723848">0204 RAFT IT (723 848)</a>,<br />
            email us at <a href="mailto:info@wellingtonrafting.nz">info@wellingtonrafting.nz</a><br />
            or fill in the form below.
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <label htmlFor="name">Name *</label>
          <input name="name" type="text" required onChange={(e) => setName(e.target.value)} />
          <label htmlFor="email">Email *</label>
          <input name="email" type="email" required onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="phone">Phone *</label>
          <input name="phone" type="tel" required onChange={(e) => setPhoneNumber(e.target.value)} />
          <label htmlFor="tour">What are you interested in?</label>
          <select name="tour" onChange={(e) => setTourType(e.target.value)}>
            <option value="">Please select...</option>
            <option value="Grade 3 Wilderness Rafting Tour">Grade 3 Wilderness Rafting Tour</option>
            <option value="Grade 2 Scenic Rafting - Wellington">Grade 2 Scenic Rafting - Wellington</option>
            <option value="Grade 2 Scenic Rafting - Wairarapa">Grade 2 Scenic Rafting - Wairarapa</option>
            <option value="Grade 3 Wilderness Inflatable 2 Person Kayak/Duckie Tours">Grade 3 Wilderness Inflatable 2 Person Kayak/Duckie Tours</option>
            <option value="Grade 2 Scenic Inflatable 2 Person Kayak Tours">Grade 2 Scenic Inflatable 2 Person Kayak Tours</option>
            <option value="Akatarawa Canyoning">Akatarawa Canyoning</option>
            <option value="Premium Helicopter Access Whitewater Rafting">Premium Helicopter Access Whitewater Rafting</option>
            <option value="Raft & Abseil Combo - Wairarapa">Raft &amp; Abseil Combo - Wairarapa</option>
            <option value="Bikes and Boats Tour - Wairarapa">Bikes and Boats Tour - Wairarapa</option>
            <option value="Hike In Raft Out Overnight Tour - Wairarapa">Hike In Raft Out Overnight Tour - Wairarapa</option>
            <option value="Ropes and Rivers Tour - Wellington">Ropes and Rivers Tour - Wellington</option>
          </select>
          <div className="form-row">
            <div className="form-row__field">
              <label htmlFor="date">Date *</label>
              <input name="date" type="date" required onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="form-row__field">
              <label htmlFor="people">Number of people</label>
              <input name="people" type="number" onChange={(e) => setNumberOfPeople(e.target.value)} />
            </div>
          </div>
          <label htmlFor="additional_info">Additional Info</label>
          <textarea name="additional_info" onChange={(e) => setAdditionalInfo(e.target.value)} />
          <button className="button" disabled={loading} type="submit">
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
      <div className="mask-pattern mask-pattern--bottom"></div>
    </section>
  )
}
