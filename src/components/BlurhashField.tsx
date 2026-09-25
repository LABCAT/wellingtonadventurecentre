'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { encode } from 'blurhash'
import { BlurhashCanvas } from 'react-blurhash'
import { useField, useFormFields } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

const FALLBACK_HASH = 'LLG[J]?wlBNN00R4Mws*%c9cr]n~'

async function fetchMediaUrl(id: number | string): Promise<string | null> {
  const res = await fetch(`/api/media/${id}?depth=0`)
  if (!res.ok) {
    throw new Error(`Media lookup failed (${res.status})`)
  }
  const doc = (await res.json()) as { url?: unknown }
  return typeof doc?.url === 'string' ? doc.url : null
}

async function resolveImageUrl(value: unknown): Promise<string | null> {
  if (!value) {
    return null
  }
  if (typeof value === 'string') {
    return value
  }
  if (typeof value === 'number') {
    return fetchMediaUrl(value)
  }
  if (typeof value === 'object') {
    const record = value as { url?: unknown; id?: unknown }
    if (typeof record.url === 'string' && record.url) {
      return record.url
    }
    if (typeof record.id === 'number' || typeof record.id === 'string') {
      return fetchMediaUrl(record.id)
    }
  }
  return null
}

async function encodeImageUrl(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Image fetch failed (${res.status})`)
  }
  const objectUrl = URL.createObjectURL(await res.blob())
  try {
    const img = new Image()
    img.decoding = 'async'
    img.src = objectUrl
    await img.decode()

    const width = 32
    const height = 32
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Canvas 2D not supported')
    }
    ctx.drawImage(img, 0, 0, width, height)
    const pixels = ctx.getImageData(0, 0, width, height)
    return encode(pixels.data, width, height, 4, 3)
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}

const BlurhashField: TextFieldClientComponent = ({ path }) => {
  const { value, setValue } = useField<string>({ path })
  const [status, setStatus] = useState<'idle' | 'working' | 'done' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const lastEncodedUrl = useRef<string | null>(null)

  const isBlockField = path !== 'blurhash' && path.endsWith('.blurhash')
  const siblingImagePath = isBlockField ? `${path.slice(0, -'.blurhash'.length)}.image` : null

  const siblingImageValue = useFormFields(
    ([fields]) =>
      (siblingImagePath ? (fields as any)?.[siblingImagePath]?.value : undefined) as unknown,
  )
  const mediaUrlValue = useFormFields(([fields]) =>
    !isBlockField ? ((fields as any)?.['url']?.value as string | undefined) : undefined,
  )

  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    if (isBlockField) {
      resolveImageUrl(siblingImageValue)
        .then((url) => {
          if (!cancelled) {
            setImageUrl(url)
          }
        })
        .catch(() => {
          if (!cancelled) {
            setImageUrl(null)
          }
        })
    } else {
      setImageUrl(mediaUrlValue ?? null)
    }
    return () => {
      cancelled = true
    }
  }, [isBlockField, siblingImageValue, mediaUrlValue])

  const generate = useCallback(
    async (url: string) => {
      setStatus('working')
      setError(null)
      try {
        const hash = await encodeImageUrl(url)
        setValue(hash)
        lastEncodedUrl.current = url
        setStatus('done')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Generation failed')
        setStatus('error')
      }
    },
    [setValue],
  )

  useEffect(() => {
    if (imageUrl && imageUrl !== lastEncodedUrl.current) {
      void generate(imageUrl)
    }
  }, [imageUrl, generate])

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
        <BlurhashCanvas hash={value || FALLBACK_HASH} width={64} height={64} />
        <input type="text" value={value ?? ''} readOnly style={{ flex: 1 }} />
        <button
          type="button"
          className="btn btn--style-secondary btn--size-small"
          disabled={!imageUrl || status === 'working'}
          onClick={() => imageUrl && void generate(imageUrl)}
        >
          {status === 'working' ? 'Generating…' : 'Regenerate'}
        </button>
      </div>
      {status === 'done' && <p>Generated from the current image.</p>}
      {status === 'error' && error && <p>Could not generate: {error}</p>}
      {!imageUrl && <p>Select an image first, then the hash generates automatically.</p>}
    </div>
  )
}

export default BlurhashField
