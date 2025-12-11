import { describe, it, expect } from 'vitest'
import { Users } from '../../collections/Users'

describe('Users Collection', () => {
  describe('Configuration', () => {
    it('should have correct slug', () => {
      expect(Users.slug).toBe('users')
    })

    it('should have authentication enabled', () => {
      expect(Users.auth).toBe(true)
    })

    it('should have timestamps enabled', () => {
      expect(Users.timestamps).toBe(true)
    })

    it('should use email as admin title', () => {
      expect(Users.admin?.useAsTitle).toBe('email')
    })

    it('should be in Admin group', () => {
      expect(Users.admin?.group).toBe('Admin')
    })
  })

  describe('Fields', () => {
    const fields = Users.fields

    it('should have name field', () => {
      const nameField = fields.find((f: any) => f.name === 'name')
      expect(nameField).toBeDefined()
      expect(nameField?.type).toBe('text')
    })

    it('should have role field with correct options', () => {
      const roleField = fields.find((f: any) => f.name === 'role') as any
      expect(roleField).toBeDefined()
      expect(roleField?.type).toBe('select')
      expect(roleField?.required).toBe(true)
      expect(roleField?.defaultValue).toBe('editor')
      expect(roleField?.options).toHaveLength(3)
      expect(roleField?.options.map((o: any) => o.value)).toEqual(['admin', 'editor', 'viewer'])
    })

    it('should have avatar upload field', () => {
      const avatarField = fields.find((f: any) => f.name === 'avatar')
      expect(avatarField).toBeDefined()
      expect(avatarField?.type).toBe('upload')
      expect(avatarField?.relationTo).toBe('media')
    })
  })

  describe('Access Control', () => {
    it('should have read access function', () => {
      expect(Users.access?.read).toBeDefined()
      expect(typeof Users.access?.read).toBe('function')
    })

    it('should have create access function', () => {
      expect(Users.access?.create).toBeDefined()
      expect(typeof Users.access?.create).toBe('function')
    })

    it('should have update access function', () => {
      expect(Users.access?.update).toBeDefined()
      expect(typeof Users.access?.update).toBe('function')
    })

    it('should have delete access function', () => {
      expect(Users.access?.delete).toBeDefined()
      expect(typeof Users.access?.delete).toBe('function')
    })
  })
})
