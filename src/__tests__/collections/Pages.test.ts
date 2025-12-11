import { describe, it, expect } from 'vitest'
import { Pages } from '../../collections/Pages'

describe('Pages Collection', () => {
  describe('Configuration', () => {
    it('should have correct slug', () => {
      expect(Pages.slug).toBe('pages')
    })

    it('should have timestamps enabled', () => {
      expect(Pages.timestamps).toBe(true)
    })

    it('should use title as admin title', () => {
      expect(Pages.admin?.useAsTitle).toBe('title')
    })

    it('should be in Content group', () => {
      expect(Pages.admin?.group).toBe('Content')
    })

    it('should have default columns configured', () => {
      expect(Pages.admin?.defaultColumns).toEqual(['title', 'slug', 'status', 'updatedAt'])
    })
  })

  describe('Versioning', () => {
    it('should have versioning enabled', () => {
      expect(Pages.versions).toBeDefined()
    })

    it('should have drafts enabled', () => {
      expect((Pages.versions as any)?.drafts).toBe(true)
    })

    it('should keep max 5 versions per document', () => {
      expect((Pages.versions as any)?.maxPerDoc).toBe(5)
    })
  })

  describe('Fields', () => {
    const fields = Pages.fields as any[]

    it('should have title field as required', () => {
      const titleField = fields.find((f) => f.name === 'title')
      expect(titleField).toBeDefined()
      expect(titleField?.type).toBe('text')
      expect(titleField?.required).toBe(true)
    })

    it('should have slug field with unique constraint', () => {
      const slugField = fields.find((f) => f.name === 'slug')
      expect(slugField).toBeDefined()
      expect(slugField?.type).toBe('text')
      expect(slugField?.required).toBe(true)
      expect(slugField?.unique).toBe(true)
    })

    it('should have status select field', () => {
      const statusField = fields.find((f) => f.name === 'status')
      expect(statusField).toBeDefined()
      expect(statusField?.type).toBe('select')
      expect(statusField?.defaultValue).toBe('draft')
    })

    it('should have SEO group', () => {
      const seoField = fields.find((f) => f.name === 'seo')
      expect(seoField).toBeDefined()
      expect(seoField?.type).toBe('group')
    })
  })

  describe('Layout Builder (Blocks)', () => {
    const fields = Pages.fields as any[]
    const layoutField = fields.find((f) => f.name === 'layout')

    it('should have layout blocks field', () => {
      expect(layoutField).toBeDefined()
      expect(layoutField?.type).toBe('blocks')
    })

    it('should have 5 block types available', () => {
      expect(layoutField?.blocks).toHaveLength(5)
    })

    it('should have hero block', () => {
      const heroBlock = layoutField?.blocks.find((b: any) => b.slug === 'hero')
      expect(heroBlock).toBeDefined()
      expect(heroBlock?.fields.map((f: any) => f.name)).toContain('heading')
      expect(heroBlock?.fields.map((f: any) => f.name)).toContain('subheading')
      expect(heroBlock?.fields.map((f: any) => f.name)).toContain('backgroundImage')
      expect(heroBlock?.fields.map((f: any) => f.name)).toContain('cta')
    })

    it('should have content block', () => {
      const contentBlock = layoutField?.blocks.find((b: any) => b.slug === 'content')
      expect(contentBlock).toBeDefined()
      expect(contentBlock?.fields.find((f: any) => f.name === 'content')?.type).toBe('richText')
    })

    it('should have features block', () => {
      const featuresBlock = layoutField?.blocks.find((b: any) => b.slug === 'features')
      expect(featuresBlock).toBeDefined()
      expect(featuresBlock?.fields.map((f: any) => f.name)).toContain('heading')
      expect(featuresBlock?.fields.map((f: any) => f.name)).toContain('features')
    })

    it('should have gallery block', () => {
      const galleryBlock = layoutField?.blocks.find((b: any) => b.slug === 'gallery')
      expect(galleryBlock).toBeDefined()
      expect(galleryBlock?.fields.map((f: any) => f.name)).toContain('images')
    })

    it('should have cta block', () => {
      const ctaBlock = layoutField?.blocks.find((b: any) => b.slug === 'cta')
      expect(ctaBlock).toBeDefined()
      expect(ctaBlock?.fields.map((f: any) => f.name)).toContain('heading')
      expect(ctaBlock?.fields.map((f: any) => f.name)).toContain('buttons')
    })
  })

  describe('Access Control', () => {
    it('should have all access functions defined', () => {
      expect(Pages.access?.read).toBeDefined()
      expect(Pages.access?.create).toBeDefined()
      expect(Pages.access?.update).toBeDefined()
      expect(Pages.access?.delete).toBeDefined()
    })
  })
})
