import { describe, it, expect } from 'vitest'
import { Media } from '../../collections/Media'

describe('Media Collection', () => {
  describe('Configuration', () => {
    it('should have correct slug', () => {
      expect(Media.slug).toBe('media')
    })

    it('should have timestamps enabled', () => {
      expect(Media.timestamps).toBe(true)
    })

    it('should use alt as admin title', () => {
      expect(Media.admin?.useAsTitle).toBe('alt')
    })

    it('should be in Content group', () => {
      expect(Media.admin?.group).toBe('Content')
    })
  })

  describe('Upload Configuration', () => {
    const upload = Media.upload as any

    it('should have upload enabled', () => {
      expect(upload).toBeDefined()
    })

    it('should store files in media directory', () => {
      expect(upload.staticDir).toBe('media')
    })

    it('should allow images and PDFs', () => {
      expect(upload.mimeTypes).toContain('image/*')
      expect(upload.mimeTypes).toContain('application/pdf')
    })

    it('should have three image sizes configured', () => {
      expect(upload.imageSizes).toHaveLength(3)
    })

    it('should have thumbnail size (150x150)', () => {
      const thumbnail = upload.imageSizes.find((s: any) => s.name === 'thumbnail')
      expect(thumbnail).toBeDefined()
      expect(thumbnail.width).toBe(150)
      expect(thumbnail.height).toBe(150)
    })

    it('should have card size (400x300)', () => {
      const card = upload.imageSizes.find((s: any) => s.name === 'card')
      expect(card).toBeDefined()
      expect(card.width).toBe(400)
      expect(card.height).toBe(300)
    })

    it('should have hero size (1920x1080)', () => {
      const hero = upload.imageSizes.find((s: any) => s.name === 'hero')
      expect(hero).toBeDefined()
      expect(hero.width).toBe(1920)
      expect(hero.height).toBe(1080)
    })

    it('should use thumbnail as admin thumbnail', () => {
      expect(upload.adminThumbnail).toBe('thumbnail')
    })
  })

  describe('Fields', () => {
    const fields = Media.fields as any[]

    it('should have alt field as required', () => {
      const altField = fields.find((f) => f.name === 'alt')
      expect(altField).toBeDefined()
      expect(altField?.type).toBe('text')
      expect(altField?.required).toBe(true)
    })

    it('should have caption field', () => {
      const captionField = fields.find((f) => f.name === 'caption')
      expect(captionField).toBeDefined()
      expect(captionField?.type).toBe('text')
    })

    it('should have credits field', () => {
      const creditsField = fields.find((f) => f.name === 'credits')
      expect(creditsField).toBeDefined()
      expect(creditsField?.type).toBe('text')
    })
  })

  describe('Access Control', () => {
    it('should allow public read access', () => {
      const readAccess = Media.access?.read as Function
      expect(readAccess({})).toBe(true)
    })

    it('should have create, update, delete access functions', () => {
      expect(Media.access?.create).toBeDefined()
      expect(Media.access?.update).toBeDefined()
      expect(Media.access?.delete).toBeDefined()
    })
  })
})
