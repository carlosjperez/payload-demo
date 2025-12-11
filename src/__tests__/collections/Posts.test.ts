import { describe, it, expect } from 'vitest'
import { Posts } from '../../collections/Posts'

describe('Posts Collection', () => {
  describe('Configuration', () => {
    it('should have correct slug', () => {
      expect(Posts.slug).toBe('posts')
    })

    it('should have timestamps enabled', () => {
      expect(Posts.timestamps).toBe(true)
    })

    it('should use title as admin title', () => {
      expect(Posts.admin?.useAsTitle).toBe('title')
    })

    it('should be in Content group', () => {
      expect(Posts.admin?.group).toBe('Content')
    })

    it('should have default columns configured', () => {
      expect(Posts.admin?.defaultColumns).toEqual(['title', 'status', 'author', 'publishedAt'])
    })
  })

  describe('Versioning', () => {
    it('should have versioning enabled', () => {
      expect(Posts.versions).toBeDefined()
    })

    it('should have drafts enabled', () => {
      expect((Posts.versions as any)?.drafts).toBeDefined()
    })

    it('should have autosave configured', () => {
      expect((Posts.versions as any)?.drafts?.autosave?.interval).toBe(375)
    })

    it('should keep max 10 versions per document', () => {
      expect((Posts.versions as any)?.maxPerDoc).toBe(10)
    })
  })

  describe('Fields', () => {
    const fields = Posts.fields as any[]

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

    it('should have slug field with beforeValidate hook', () => {
      const slugField = fields.find((f) => f.name === 'slug')
      expect(slugField?.hooks?.beforeValidate).toBeDefined()
      expect(slugField?.hooks?.beforeValidate).toHaveLength(1)
    })

    it('should have excerpt textarea field', () => {
      const excerptField = fields.find((f) => f.name === 'excerpt')
      expect(excerptField).toBeDefined()
      expect(excerptField?.type).toBe('textarea')
    })

    it('should have content richText field as required', () => {
      const contentField = fields.find((f) => f.name === 'content')
      expect(contentField).toBeDefined()
      expect(contentField?.type).toBe('richText')
      expect(contentField?.required).toBe(true)
    })

    it('should have featuredImage upload field', () => {
      const featuredImageField = fields.find((f) => f.name === 'featuredImage')
      expect(featuredImageField).toBeDefined()
      expect(featuredImageField?.type).toBe('upload')
      expect(featuredImageField?.relationTo).toBe('media')
    })

    it('should have author relationship field', () => {
      const authorField = fields.find((f) => f.name === 'author')
      expect(authorField).toBeDefined()
      expect(authorField?.type).toBe('relationship')
      expect(authorField?.relationTo).toBe('users')
      expect(authorField?.required).toBe(true)
    })

    it('should have categories relationship with hasMany', () => {
      const categoriesField = fields.find((f) => f.name === 'categories')
      expect(categoriesField).toBeDefined()
      expect(categoriesField?.type).toBe('relationship')
      expect(categoriesField?.relationTo).toBe('categories')
      expect(categoriesField?.hasMany).toBe(true)
    })

    it('should have status select field with correct options', () => {
      const statusField = fields.find((f) => f.name === 'status')
      expect(statusField).toBeDefined()
      expect(statusField?.type).toBe('select')
      expect(statusField?.defaultValue).toBe('draft')
      expect(statusField?.options.map((o: any) => o.value)).toEqual(['draft', 'published', 'archived'])
    })

    it('should have publishedAt date field', () => {
      const publishedAtField = fields.find((f) => f.name === 'publishedAt')
      expect(publishedAtField).toBeDefined()
      expect(publishedAtField?.type).toBe('date')
    })

    it('should have SEO group with meta fields', () => {
      const seoField = fields.find((f) => f.name === 'seo')
      expect(seoField).toBeDefined()
      expect(seoField?.type).toBe('group')
      expect(seoField?.fields).toHaveLength(3)

      const seoFieldNames = seoField?.fields.map((f: any) => f.name)
      expect(seoFieldNames).toEqual(['metaTitle', 'metaDescription', 'keywords'])
    })

    it('should have tags array field', () => {
      const tagsField = fields.find((f) => f.name === 'tags')
      expect(tagsField).toBeDefined()
      expect(tagsField?.type).toBe('array')
    })
  })

  describe('Hooks', () => {
    it('should have beforeChange hook', () => {
      expect(Posts.hooks?.beforeChange).toBeDefined()
      expect(Posts.hooks?.beforeChange).toHaveLength(1)
    })

    it('should have afterChange hook', () => {
      expect(Posts.hooks?.afterChange).toBeDefined()
      expect(Posts.hooks?.afterChange).toHaveLength(1)
    })
  })

  describe('Access Control', () => {
    it('should have all access functions defined', () => {
      expect(Posts.access?.read).toBeDefined()
      expect(Posts.access?.create).toBeDefined()
      expect(Posts.access?.update).toBeDefined()
      expect(Posts.access?.delete).toBeDefined()
    })
  })
})
