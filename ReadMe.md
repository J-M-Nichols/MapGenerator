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
//randomly places unwalkable paths around the map
const randomMap = new mapGenerator(10, 10, 0).generateRandomly(1, 0.5).logMap()
//randomly crawls across the map horizontally and vertically
const crawlingMap = new mapGenerator(10, 10, 0).generateCrawler(5, 4, 1).logMap()
//recursively traverses the map creating a path
const recursiveMap = new mapGenerator(5, 10, 0).generateRecursively([0, 0], 1, 1, (a, b)=>a===b, true).logMap()
//traverses the map by creating new paths until they connect to the main path or are impossible to connect following Wilson's algorithm
const wilsonsMap = new mapGenerator(10, 15, 0).generateWilsons([0, 0], 1, 1, 2, (a, b)=>a===b, true).logMap()
//traverses the map by creating a minimum spanning tree following Prim's algorithm
const primsMap = new mapGenerator(20, 4, 0).generatePrims([0, 0], 1, 1, (a, b)=>a===b, true).logMap()
```

## API
### Constructor
- `MapGenerator(width: number, height: number, baseElement: T)`: Initializes a new map with the given dimensions and base value.

### Methods

- `getMultArray(): T[][]`: Returns the current map array.
- `getWidth(): number`: Returns the width of the map.
- `getHeight(): number`: Returns the height of the map.
- `getBaseValue(): T`: Returns the base value used in the map.
- `setBaseValue(newBaseValue: T): MapGenerator<T>`: Sets a new base value for the map.
- `logMap(): MapGenerator<T>`: Logs the map to the console.
- `isValidIndex(index: [number, number]): boolean`: Checks if an index is within map bounds.
- `getValueAtIndex(index: [number, number]): T`: Gets the value at a specific index.
- `setValueAtIndex(index: [number, number], value: T): MapGenerator<T>`: Sets a value at a specific index.
- `setValueAtIndexes(value: T, ...indexes: [number, number][]): MapGenerator<T>`: Sets a value at multiple specified indexes.
- `setValuesAtIndexes(...indexValues: { value: T, index: [number, number] }[]): MapGenerator<T>`: Sets values at specified indexes using an array of index-value pairs.
- `setBaseValueAtIndex(index: [number, number]): MapGenerator<T>`: Sets the base value at a specific index if it is valid.
- `fillWithValue(value: T): MapGenerator<T>`: Fills the entire map with a specified value.
- `generateRandomly(unwalkableValue: T, randomChance: number): MapGenerator<T>`: Randomly places a specified value on the map with a given probability.
- `generateCrawler(verticalCrawlCount: number, horizontalCrawlCount: number, unwalkableValue: T): MapGenerator<T>`: Generates a path using a crawling algorithm.
- `generateRecursively(startIndex: [number, number], maxPathSize: number, unwalkableValue: T, equalityFunction: EqualityFunctionType<T>, shouldFillHoles: boolean): MapGenerator<T>`: Recursively generates a path starting from a specified index.
- `generateWilsons(startIndex: [number, number], maxPathSize: number, unwalkableValue: T, possiblePathValue: T, equalityFunction: EqualityFunctionType<T>, shouldFillHoles: boolean): MapGenerator<T>`: Generates a path using Wilson's algorithm.
- `generatePrims(startIndex: [number, number], maxPathSize: number, unwalkableValue: T, equalityFunction: EqualityFunctionType<T>, shouldFillHoles: boolean): MapGenerator<T>`: Generates a path using Prim's algorithm.

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
