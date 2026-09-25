import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'
import type { HomePage } from '@/payload-types'

interface PageIntroProps {
  title?: string | null
  content?: HomePage['intro']
  children?: React.ReactNode
}

const PageIntro = ({ title, content, children }: PageIntroProps) => {
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
