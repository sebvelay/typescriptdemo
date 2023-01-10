import { it, expect, describe } from '@jest/globals'
import { Country } from '../src/Country'
import data = require('../data')

describe('test object structure', () => {
  it('should contains a list of country', () => {
    const countries: Country[] = data.data
    expect(countries.map(i => i.name)).toContain('Dillauti')
  })

  it('should contains people', () => {
    const countries: Country[] = data.data

    expect(countries.flatMap(i => i.people).map(i => i.name)).toContain('Blanche Viciani')
  })

  it('should contains animals', () => {
    const countries: Country[] = data.data

    expect(countries.flatMap(i => i.people).flatMap(i => i.animals).map(i => i.name)).toContain('Duck')
  })
})
