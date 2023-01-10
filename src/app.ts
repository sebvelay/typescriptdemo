import { Country, Animal, People } from './Country'
import data = require('../data')

console.log(JSON.stringify(run(process.argv)))

function addCountInformation (resultatToDisplay: Country[]): void {
  resultatToDisplay.forEach(c => {
    c.name = c.name.concat(' [', c.people.length.toString(), ']')
    c.people.forEach(p => {
      p.name = p.name.concat(' [', p.animals.length.toString(), ']')
    })
  })
}

function getData (): Country[] {
  return data.data
}

export function run (args: String[]): Country[] {
  let resultatToDisplay = JSON.parse(JSON.stringify(getData()))
  for (const arg of args) {
    const [isFilter, filter] = getFilters(arg)
    if (isFilter) {
      resultatToDisplay = filterCountryWithAnimals(resultatToDisplay, filter)
    }

    if (isCountMode(arg)) {
      addCountInformation(resultatToDisplay)
    }
  }
  return resultatToDisplay
}

function filterCountryWithAnimals (resultatToDisplay: Country[], filter: string | null): Country[] {
  resultatToDisplay.forEach(c => {
    c.people.forEach(
      p => {
        p.animals = filterAnimal(p.animals, filter)
      }
    )
    c.people = filterPeopleWithAnimals(c.people)
  })
  return filterCountryWithPeople(resultatToDisplay)
}

function filterAnimal (animals: Animal[], filter): Animal[] {
  return animals.filter(a => a.name.includes(filter))
}

function filterPeopleWithAnimals (people: People[]): People[] {
  return people.filter(p => p.animals.length > 0)
}

function filterCountryWithPeople (countries: Country[]): Country[] {
  return countries.filter(c => c.people.length > 0)
}

export function getFilters (arg: String): [boolean, string | null] {
  // process.argv
  const FILTER = '--filter='
  if (arg.includes(FILTER)) {
    const start = arg.indexOf(FILTER) + FILTER.length
    let end = arg.indexOf(' ', start)
    if (end < start) {
      end = arg.length
    }
    return [true, arg.slice(start, end)]
  }
  return [false, null]
}

export function isCountMode (arg: String): boolean {
  return arg.includes('--count')
}
