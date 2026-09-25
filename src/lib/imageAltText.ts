export function getImageAltText(imageSrc: string): string {
  if (!imageSrc) return ''
  const lastIndex = imageSrc.lastIndexOf('/')
  let imageName = imageSrc.slice(lastIndex + 1)
  imageName = imageName.replace(/-/g, ' ')
  imageName = imageName.replace(/\.(webp|jpg|jpeg|png|gif|svg)$/gi, '')
  return imageName
}
