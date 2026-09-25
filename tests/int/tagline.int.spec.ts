// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { DEFAULT_TAGLINE, taglineLines } from '@/lib/tagline'

describe('taglineLines', () => {
  it('falls back to the default for null and undefined', () => {
    expect(taglineLines(null)).toEqual(['Wellington Adventure Centre', '[tagline copy placeholder]'])
    expect(taglineLines(undefined)).toEqual([
      'Wellington Adventure Centre',
      '[tagline copy placeholder]',
    ])
    expect(taglineLines(null).join('\n')).toBe(DEFAULT_TAGLINE)
  })

  it('splits a multiline tagline into one line per row', () => {
    expect(taglineLines('Line one\nLine two\nLine three')).toEqual([
      'Line one',
      'Line two',
      'Line three',
    ])
  })

  it('keeps a single-line tagline as one line (no breaks)', () => {
    expect(taglineLines('Just one line')).toEqual(['Just one line'])
  })

  it('renders an explicitly cleared tagline as a single empty line', () => {
    expect(taglineLines('')).toEqual([''])
  })

  it('preserves interior whitespace within lines', () => {
    expect(taglineLines('  padded  \n\tafter tab')).toEqual(['  padded  ', '\tafter tab'])
  })
})
