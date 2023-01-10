import { it, expect, describe } from '@jest/globals'
import { getFilters, run, isCountMode } from '../src/app'
import { Country } from '../src/Country'

describe('test filter use case', () => {
  it('should return true with filter', () => {
    const [active, value] = getFilters('** --filter=ru **')

    expect(active).toBeTruthy()
    expect(value).toBe('ru')
  })

  it('should return true with filter without space at end', () => {
    const [active, value] = getFilters('** --filter=ru')

    expect(active).toBeTruthy()
    expect(value).toBe('ru')
  })

  it('should return filtered list', () => {
    const countries: Country[] = run(['--filter=ry'])
    const expected = [
      {
        name: 'Uzuzozne',
        people: [
          {
            name: 'Lillie Abbott',
            animals: [
              {
                name: 'John Dory'
              }
            ]
          }
        ]
      },
      {
        name: 'Satanwi',
        people: [
          {
            name: 'Anthony Bruno',
            animals: [
              {
                name: 'Oryx'
              }
            ]
          }
        ]
      }
    ]
    expect(countries).toStrictEqual(expected)
  })
})

describe('test count use case', () => {
  it('should return true if --count argument', () => {
    const active = isCountMode('** --count **')

    expect(active).toBeTruthy()
  })

  it('should return false if no --count argument', () => {
    const active = isCountMode('** count **')

    expect(active).toBeFalsy()
  })

  it('should return list country with count people', () => {
    const countries: Country[] = run(['--count'])
    expect(countries.map(c => c.name)).toContain('Dillauti [5]')
  })

  it('should return list of people with count animal', () => {
    const countries: Country[] = run(['--count'])
    expect(countries.flatMap(c => c.people).map(c => c.name)).toContain('Winifred Graham [6]')
  })
})
