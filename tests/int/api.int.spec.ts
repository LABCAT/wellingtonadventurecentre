// @vitest-environment node
import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('fetches users', async () => {
    const users = await payload.find({
      collection: 'users',
    })
    expect(users).toBeDefined()
  })
})

describe('Home Page global', () => {
  const lexicalParagraph = (text: string) =>
    ({
      root: {
        type: 'root' as const,
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text, version: 1 }],
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      },
    }) as any

  beforeAll(async () => {
    if (!payload) {
      const payloadConfig = await config
      payload = await getPayload({ config: payloadConfig })
    }
    // A fresh database has no home_page row, and findGlobal then returns
    // only default-valued fields (nullable keys are omitted). Materialize
    // the row so every field comes back as a key regardless of prior state.
    await payload.updateGlobal({ slug: 'home-page', data: {} })
  })

  it('exposes the one-page homepage fields and no legacy ones', async () => {
    const page = await payload.findGlobal({ slug: 'home-page' })
    expect(page).toBeDefined()
    expect(page).toHaveProperty('title')
    expect(page).toHaveProperty('tagline')
    expect(page).toHaveProperty('metaDescription')
    expect(page).toHaveProperty('introTitle')
    expect(page).toHaveProperty('intro')
    expect(page).toHaveProperty('blocks')
    expect(page).not.toHaveProperty('show_adventure_promos')
    expect(page).not.toHaveProperty('promos')
    expect(page.title).toBe('Wellington Adventure Centre')
  })

  it('updates title and metaDescription and persists them', async () => {
    const updated = await payload.updateGlobal({
      slug: 'home-page',
      data: {
        title: 'Wellington Adventure Centre Test',
        metaDescription: 'Test description for homepage metadata',
      },
    })
    expect(updated.title).toBe('Wellington Adventure Centre Test')
    expect(updated.metaDescription).toBe('Test description for homepage metadata')

    const reread = await payload.findGlobal({ slug: 'home-page' })
    expect(reread.title).toBe('Wellington Adventure Centre Test')
    expect(reread.metaDescription).toBe('Test description for homepage metadata')

    // Restore the template default for subsequent tests
    await payload.updateGlobal({
      slug: 'home-page',
      data: { title: 'Wellington Adventure Centre', metaDescription: null },
    })
  })

  it('updates tagline (multiline) and persists it, then clears it', async () => {
    const updated = await payload.updateGlobal({
      slug: 'home-page',
      data: { tagline: 'Custom line one\nCustom line two' },
    })
    expect(updated.tagline).toBe('Custom line one\nCustom line two')

    const reread = await payload.findGlobal({ slug: 'home-page' })
    expect(reread.tagline).toBe('Custom line one\nCustom line two')

    // Explicit clear persists as empty string (distinct from never-set null)
    const cleared = await payload.updateGlobal({
      slug: 'home-page',
      data: { tagline: '' },
    })
    expect(cleared.tagline).toBe('')

    // Restore the template default for subsequent runs
    await payload.updateGlobal({
      slug: 'home-page',
      data: { tagline: 'Wellington Adventure Centre\n[tagline copy placeholder]' },
    })
    const restored = await payload.findGlobal({ slug: 'home-page' })
    expect(restored.tagline).toBe('Wellington Adventure Centre\n[tagline copy placeholder]')
  })

  it('updates introTitle and intro richtext and persists them, then clears them', async () => {
    const content = lexicalParagraph('Test intro body copy')
    const updated = await payload.updateGlobal({
      slug: 'home-page',
      data: {
        introTitle: 'Test Intro Heading',
        intro: content,
      },
    })
    expect(updated.introTitle).toBe('Test Intro Heading')
    expect(updated.intro).toBeDefined()

    const reread = await payload.findGlobal({ slug: 'home-page' })
    expect(reread.introTitle).toBe('Test Intro Heading')
    const paragraph = reread.intro?.root?.children?.[0] as any
    const textNode = paragraph?.children?.[0] as any
    expect(textNode?.text).toBe('Test intro body copy')

    // Clearing both persists: empty-string title, null richtext
    const cleared = await payload.updateGlobal({
      slug: 'home-page',
      data: { introTitle: '', intro: null },
    })
    expect(cleared.introTitle).toBe('')
    expect(cleared.intro === null || cleared.intro === undefined).toBe(true)

    const rereadCleared = await payload.findGlobal({ slug: 'home-page' })
    expect(rereadCleared.introTitle).toBe('')
    expect(rereadCleared.intro === null || rereadCleared.intro === undefined).toBe(true)
  })

  it('handles a never-set intro shape safely (null title + null content)', async () => {
    const updated = await payload.updateGlobal({
      slug: 'home-page',
      data: { introTitle: null, intro: null },
    })
    expect(updated.introTitle === null || updated.introTitle === undefined).toBe(true)
    expect(updated.intro === null || updated.intro === undefined).toBe(true)
  })
})
