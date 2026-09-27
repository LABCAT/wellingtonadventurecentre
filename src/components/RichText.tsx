import type { ComponentProps, ReactNode } from 'react'
import Link from 'next/link'
import {
  RichText as PayloadRichText,
  type JSXConverters,
} from '@payloadcms/richtext-lexical/react'

type PayloadRichTextData = ComponentProps<typeof PayloadRichText>['data']

const isInternalHref = (href: string): boolean =>
  href.startsWith('/') && !href.startsWith('//')

const renderLink = (
  fields: { url?: string; newTab?: boolean; linkType?: string } | undefined,
  children: ReactNode,
) => {
  let href = fields?.url ?? ''
  if (fields?.linkType === 'internal') {
    // Relationship-based links need internalDocToHref, same fallback as default
    console.error(
      'Lexical => JSX converter: Link converter: found internal link, but internalDocToHref is not provided',
    )
    href = '#'
  }
  const rel = fields?.newTab ? 'noopener noreferrer' : undefined
  const target = fields?.newTab ? '_blank' : undefined
  if (isInternalHref(href)) {
    return (
      <Link href={href} rel={rel} target={target}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} rel={rel} target={target}>
      {children}
    </a>
  )
}

const linkConverters: JSXConverters = {
  link: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    return renderLink(node.fields, children)
  },
  autolink: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    return renderLink(node.fields, children)
  },
}

interface RichTextProps {
  data: PayloadRichTextData
}

const RichText = ({ data }: RichTextProps) => {
  return (
    <PayloadRichText
      data={data}
      converters={({ defaultConverters }) => ({
        ...defaultConverters,
        ...linkConverters,
      })}
    />
  )
}

export default RichText
