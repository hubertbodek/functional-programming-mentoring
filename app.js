const vehicles = [
    { make: 'Honda', model: 'CR-V', type: 'suv', price: 24045 },
    { make: 'Honda', model: 'Accord', type: 'sedan', price: 22455 },
    { make: 'Mazda', model: 'Mazda 6', type: 'sedan', price: 24195 },
    { make: 'Mazda', model: 'CX-9', type: 'suv', price: 31520 },
    { make: 'Toyota', model: '4Runner', type: 'suv', price: 34210 },
    { make: 'Toyota', model: 'Sequoia', type: 'suv', price: 45560 },
    { make: 'Ford', model: 'F-150', type: 'truck', price: 27110 },
    { make: 'Toyota', model: 'Tacoma', type: 'truck', price: 24320 },
    { make: 'Ford', model: 'Fusion', type: 'sedan', price: 22120 },
    { make: 'Ford', model: 'Explorer', type: 'suv', price: 31660 }
  ]


/** 
Run with NodeJS
Don't use classes.
Create and echo the console table with average price for each makers suv models with models names.
Create and echo the console table with average price for each type of Mazda models with models names.
Imagine there would be more tasks like that to do with your code in the future.
*/

const cars = [...vehicles]

const print = (obj) => console.table(obj);

const getValuesByKey = (list, key) => ([... new Set(list.map(item => item[key]))]);

const groupBy = (list, key, value) => list.filter(item => item[key].toLowerCase() === value.toLowerCase())

const consolidateBy = (list, key, toAccumulate = []) => {

  const listCopy = [...list];

  const values = getValuesByKey(listCopy, key);

  const consolidated = values.map(value => {
    const accumulated = listCopy.filter(item => item[key] === value);

    return accumulated.reduce((prev, next, index) => {

        const getAccumulatedValues = (key) => (typeof prev[key]) === 'string' ? [prev[key], next[key]] : [...prev[key], next[key]]

        if(!toAccumulate) {
          return {
            [key]: value,
            count: index + 1,
            price: prev.price + next.price
          }
        } else {
          const accumulatedValues = toAccumulate.map(key => ({[key]: getAccumulatedValues(key)}))
          const objectWithAccumulatedValues = accumulatedValues.reduce((prev, next) => {
            return Object.assign(prev, next)
          }, accumulatedValues[0])

          return {
            [key]: value,
            ...objectWithAccumulatedValues,
            count: index + 1,
            price: prev.price + next.price
          }
        }        
    })

  })
  
  return consolidated;
}

const listWithAverage = list => list.map(item => ({...item, average: (item.price / item.count || item.price)}))

const suvs = groupBy(cars, 'type', 'suv');
const suvsByMakeWithModels = consolidateBy(suvs, 'make', ['model'])

// Create and echo the console table with average price for each makers suv models with models names.
print(listWithAverage(suvsByMakeWithModels));

const mazdas = groupBy(cars, 'make', 'mazda');
const mazdasWithModels = consolidateBy(mazdas, 'make', ['model'])

// Create and echo the console table with average price for each type of Mazda models with models names.
print(listWithAverage(mazdasWithModels));
