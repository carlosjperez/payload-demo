import { describe, it, expect } from 'vitest'
import { Categories } from '../../collections/Categories'

describe('Categories Collection', () => {
  describe('Configuration', () => {
    it('should have correct slug', () => {
      expect(Categories.slug).toBe('categories')
    })

    it('should have timestamps enabled', () => {
      expect(Categories.timestamps).toBe(true)
    })

    it('should use name as admin title', () => {
      expect(Categories.admin?.useAsTitle).toBe('name')
    })

    it('should be in Content group', () => {
      expect(Categories.admin?.group).toBe('Content')
    })
  })

  describe('Fields', () => {
    const fields = Categories.fields as any[]

    it('should have name field as required', () => {
      const nameField = fields.find((f) => f.name === 'name')
      expect(nameField).toBeDefined()
      expect(nameField?.type).toBe('text')
      expect(nameField?.required).toBe(true)
    })

    it('should have slug field with unique constraint', () => {
      const slugField = fields.find((f) => f.name === 'slug')
      expect(slugField).toBeDefined()
      expect(slugField?.type).toBe('text')
      expect(slugField?.required).toBe(true)
      expect(slugField?.unique).toBe(true)
    })

    it('should have slug auto-generation hook', () => {
      const slugField = fields.find((f) => f.name === 'slug')
      expect(slugField?.hooks?.beforeValidate).toBeDefined()
    })

    it('should have description textarea field', () => {
      const descriptionField = fields.find((f) => f.name === 'description')
      expect(descriptionField).toBeDefined()
      expect(descriptionField?.type).toBe('textarea')
    })

    it('should have color text field', () => {
      const colorField = fields.find((f) => f.name === 'color')
      expect(colorField).toBeDefined()
      expect(colorField?.type).toBe('text')
    })

    it('should have parent self-referencing relationship', () => {
      const parentField = fields.find((f) => f.name === 'parent')
      expect(parentField).toBeDefined()
      expect(parentField?.type).toBe('relationship')
      expect(parentField?.relationTo).toBe('categories')
    })
  })

  describe('Access Control', () => {
    it('should allow public read access', () => {
      expect(Categories.access?.read).toBeDefined()
      // Public read returns true
      const readAccess = Categories.access?.read as Function
      expect(readAccess({})).toBe(true)
    })

    it('should have create, update, delete access functions', () => {
      expect(Categories.access?.create).toBeDefined()
      expect(Categories.access?.update).toBeDefined()
      expect(Categories.access?.delete).toBeDefined()
    })
  })
})
