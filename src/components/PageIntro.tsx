import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'
import type { PageIntro as PageIntroType } from '@/payload-types'

interface PageIntroProps {
  intro?: PageIntroType | number | null
  children?: React.ReactNode
}

const PageIntro = ({ intro, children }: PageIntroProps) => {
  const introData = typeof intro === 'object' && intro !== null ? intro : null
  const title = introData?.title
  const content = introData?.content

  if (!content && !children && !title) {
    return <></>
  }

  return (
    <section className="page-intro">
      <div className="mask-pattern mask-pattern--top"></div>
      <div className="container container--narrow">
        {title && <h2 className="page-intro__heading">{title}</h2>}
        {content && (
          <div className="page-intro__content">
            <RichText data={content} />
          </div>
        )}
        {children}
      </div>
      <div className="mask-pattern mask-pattern--bottom"></div>
    </section>
  )
}

export default PageIntro
