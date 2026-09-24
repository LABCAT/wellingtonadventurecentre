'use client'

import React, { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  faq: FAQItem
  isFirst?: boolean
  isLast?: boolean
}

const FAQ = ({ faq, isFirst, isLast }: FAQProps) => {
  const { question, answer } = faq
  const [active, setActive] = useState(false)

  return (
    <div
      className={`faqs__item${active ? ' faqs__item--active' : ''}${isFirst ? ' faqs__item--first' : ''}${isLast ? ' faqs__item--last' : ''}`}
      onClick={() => setActive(!active)}
    >
      <div className="faqs__item-header">
        <h3 className="faqs__question">{question}</h3>
        <div className="faqs__icon">{active ? '-' : '+'}</div>
      </div>
      <div
        className={`faqs__item-answer${active ? ' faqs__item-answer--shown' : ''}`}
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    </div>
  )
}

export default FAQ
