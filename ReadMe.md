# MapGenerator

[![npm version](https://badge.fury.io/js/typescript-map-generator.svg)](https://badge.fury.io/js/typescript-map-generator)

`MapGenerator` is a TypeScript class designed for generating and managing game maps using various pathfinding and maze generation algorithms. It provides a flexible and efficient way to create and manipulate multidimensional arrays for game development and other applications.

## Features

- **Map Generation**: Create and manage 2D maps with customizable dimensions and base values.
- **Pathfinding Algorithms**: Generate paths using algorithms like Prim's, Wilson's, Recursive, and Crawling.
- **Randomization**: Randomly place values on the map with specified probabilities.
- **Index Management**: Set and get values at specific indexes with ease.
- **Procedural Generation**: Supports procedural content generation for dynamic map creation.
- **TypeScript**: Strongly typed language that compiles to JavaScript, providing static type checking and modern JavaScript features.
- **Map Generation**: Create and manage 2D maps with customizable dimensions and base values.
- **Pathfinding**: Implement algorithms to find paths through a grid, useful for navigation and route optimization.
- **Maze Generation**: Generate mazes using different algorithms, providing structured paths and challenges.
- **Algorithmic Generation**: Use algorithms to procedurally generate content, ensuring efficient and scalable creation.
- **Grid Management**: Manage a grid or multidimensional array structure, providing methods to access and modify elements.
- **Procedural Generation**: Dynamically generate content based on algorithms, allowing for unique map layouts.
- **Recursive**: Utilize recursive algorithms for path and maze generation, efficiently exploring paths.
- **Randomization**: Introduce randomness in map and path generation, creating varied layouts for replayability.
- **Crawling**: Implement crawling algorithms to explore and generate paths, simulating natural exploration.
- **Index Management**: Handle operations based on grid indexes, ensuring efficient access and modification of elements.
- **Value Assignment**: Allow setting and updating values at specific grid locations, supporting batch operations.
- **Game Development**: Provide tools and methods for creating game maps and levels, supporting common development needs.
- **Multidimensional Array**: Operate on 2D arrays to represent maps and grids, supporting complex data structures.
- **Path Algorithms**: Implement various algorithms for path creation and optimization, including well-known methods.
- **Grid Navigation**: Facilitate movement and exploration within a grid, providing methods to traverse elements.

## Instalation

To use `mapGenerator` in your project, install it via npm:

```bash
npm install typescript-map-generator
```

## Usage
Here’s a basic example of how to use the MapGenerator class:

```typescript
//define base values
const equalityFunction: equalityFunctionType<number> = (a:number, b:number):boolean=>a===b
const startingIndex: index = [0, 0]

//randomly places unwalkable paths around the map
new mapGenerator<number>(10, 10, 0, 1, equalityFunction).generateRandomly(0.75).logMap()
new mapGenerator<number>(10, 10, 0, 1, equalityFunction).generateRandomly(0.5).logMap()
new mapGenerator<number>(10, 10, 0, 1, equalityFunction).generateRandomly(0.25).logMap()

//randomly crawls across the map horizontally and vertically
new mapGenerator<number>(10, 10, 0, 1, equalityFunction).generateCrawler(5, 3).logMap()

//recursively traverses the map creating a path
new mapGenerator<number>(10, 10, 0, 1, equalityFunction).generateRecursively(startingIndex, 1, true).logMap()

//traverses the map by creating new paths until they connect to the main path or are impossible to connect following Wilson's algorithm
new mapGenerator<number>(10, 10, 0, 1, equalityFunction).generateWilsons(startingIndex, 1, 2, true).logMap()

//traverses the map by creating a minimum spanning tree following Prim's algorithm
const map = new mapGenerator<number>(10, 10, 0, 1, equalityFunction).generatePrims(startingIndex, 1, true).logMap()

//get and shuffle the walkable indexes
const walkablePath = mapGenerator.shuffleArray(map.getWalkableIndexes())

//test the pathfinding
console.log(`starting index for path: [${walkablePath[0]}], ending index for path: [${walkablePath[1]}]`)
const foundPath = map.getPath(walkablePath[0], walkablePath[1])
console.log(foundPath)

```

## API
### Constructor
- `MapGenerator(width: number, height: number, baseElement: T)`: Initializes a new map with the given dimensions and base value.

### Methods

#### Getters

- `areValuesAtIndexesEqual(indexA: index, indexB: index): boolean`: Determines if the values at two given indexes are equal using the provided equality function.
- `isValueAtIndexEqualToValue(index: index, value: T): boolean`: Checks if the value at a given index is equal to a specified value.
- `areValuesEqual(valueA: T, valueB: T): boolean`: Determines if two values are equal using the provided equality function.
- `isIndexUnwalkable(index: index): boolean`: Checks if the value at a given index is equal to the unwalkable value.
- `isValueUnwalkable(value: T): boolean`: Determines if a given value is equal to the unwalkable value.
- `isIndexWalkable(index: index): boolean`: Checks if the value at a given index is equal to the walkable value.
- `isValueWalkable(value: T): boolean`: Determines if a given value is equal to the walkable value.
- `getMultArray(): T[][]`: Returns the current multidimensional array.
- `getWidth(): number`: Returns the width of the map.
- `getHeight(): number`: Returns the height of the map.
- `getWalkableValue(): T`: Returns the walkable value used in the map.
- `getUnwalkableValue(): T`: Returns the unwalkable value used in the map.
- `isValidIndex(index: index): boolean`: Checks if a given index is within the bounds of the map.
- `getValueAtIndex(index: index): T`: Retrieves the value at a specified index.
- `getAllIndexesForValue(value: T): index[]`: Returns an array of indexes where the specified value is found.
- `getWalkableIndexes(): index[]`: Returns an array of indexes with the walkable value.
- `getUnwalkableIndexes(): index[]`: Returns an array of indexes with the unwalkable value.
- `getPath(startingIndex: index, endingIndex: index): index[] | null`: Finds a path between two indexes or returns null if no path is available.

#### Setters

- `changeGeneratedType(generatedType: generatedType): mapGenerator<T>`: Changes the current generated type.
- `changeEqualityFunction(equalityFunction: equalityFunctionType<T>): mapGenerator<T>`: Changes the current equality function.
- `setWalkableValue(newWalkableValue: T): mapGenerator<T>`: Sets a new walkable value for the map.
- `setUnwalkableValue(newUnwalkableValue: T): mapGenerator<T>`: Sets a new unwalkable value for the map.
- `setValueAtIndex(index: index, value: T): mapGenerator<T>`: Sets a value at a specified index. Throws an error if the index is not valid.
- `setValueAtIndexes(value: T, ...indexes: index[]): mapGenerator<T>`: Sets a value at multiple specified indexes.
- `setValuesAtIndexes(...indexValues: indexValue<T>[]): mapGenerator<T>`: Sets values at specified indexes using an array of index-value pairs.
- `setWalkableValueAtIndex(index: index): mapGenerator<T>`: Sets the walkable value at a specified index if it is valid.
- `setWalkableValueAtIndexes(...indexes: index[]): mapGenerator<T>`: Sets the walkable value at multiple specified indexes.
- `setUnwalkableValueAtIndex(index: index): mapGenerator<T>`: Sets the unwalkable value at a specified index if it is valid.
- `setUnwalkableValueAtIndexes(...indexes: index[]): mapGenerator<T>`: Sets the unwalkable value at multiple specified indexes.
- `fillWithValue(value: T): mapGenerator<T>`: Fills the entire multidimensional array with a specified value.

#### Helpers

- `logMap(): mapGenerator<T>`: Logs the current state of the multidimensional array to the console.
- `static shuffleArray<U>(array: U[]): U[]`: Shuffles the elements of an array and returns the shuffled array.

#### Generators

- `generateRandomly(randomChance: number): mapGenerator<T>`: Randomly places the unwalkable value across the map with a specified probability.
- `generateCrawler(verticalCrawlCount: number, horizontalCrawlCount: number): mapGenerator<T>`: Generates a path using a crawling algorithm.
- `generateRecursively(startIndex: index, maxPathSize: number, shouldFillHoles: boolean): mapGenerator<T>`: Recursively generates a path starting from a specified index.
- `generateWilsons(startIndex: index, maxPathSize: number, possiblePathValue: T, shouldFillHoles: boolean): mapGenerator<T>`: Generates a path using Wilson's algorithm.
- `generatePrims(startIndex: index, maxPathSize: number, shouldFillHoles: boolean): mapGenerator<T>`: Generates a path using Prim's algorithm.

## Contributing

Contributions are welcome! If you have ideas for improvements or new features, feel free to open an issue or submit a pull request. Please ensure that your contributions align with the project's goals and coding standards.

### Steps to Contribute

1. **Fork the Repository:**

   - Click the "Fork" button at the top right of the repository page to create a copy of the repository under your GitHub account.

2. **Clone Your Fork:**

   - Clone your forked repository to your local machine using the following command:

     ```bash
     git clone https://github.com/J-M-Nichols/MapGeneratorTS.git
     ```

3. **Create a Branch:**

   - Create a new branch for your feature or bug fix:

     ```bash
     git checkout -b feature-or-bugfix-name
     ```

4. **Make Your Changes:**

   - Implement your changes or new features in your local repository.

5. **Test Your Changes:**

   - Ensure that your changes are thoroughly tested and do not break existing functionality.

6. **Commit Your Changes:**

   - Commit your changes with a descriptive commit message:

     ```bash
     git commit -m "Description of changes"
     ```

7. **Push to Your Fork:**

   - Push your changes to your forked repository:

     ```bash
     git push origin feature-or-bugfix-name
     ```

8. **Open a Pull Request:**

   - Navigate to the original repository and click the "New Pull Request" button.
   - Select your branch and submit the pull request for review.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.txt) file for more details.

## Acknowledgments

- Thanks to all contributors and users who have helped improve this project.
- Special thanks to the developers of the algorithms and techniques used in this project.
