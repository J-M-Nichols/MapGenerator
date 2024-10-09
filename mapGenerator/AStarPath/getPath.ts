import compareIndexes from "../helpers/compareIndexes"
import getConnectedIndexes from "../helpers/getConnectedIndexes"
import mapGenerator, { index } from "../mapGenerator"

/**
 * {
 *  index: index
 *  costFromStart: number
 *  costToGoal: number
 *  totalCost: number
 *  parent?: Node
 * }
 */
interface Node {
  index: index,
  costFromStart: number,
  costToGoal: number,
  totalCost: number,
  parent?: Node
}

/**
 * Gets the distance from the index to the goal
 * @param currentIndex The index that we are looking at
 * @param endingIndex The index that we are moving towards
 * @returns The distance to the goal
 */
const getCostToGoal = (currentIndex: index, endingIndex: index) => {
  return Math.abs(currentIndex[0] - endingIndex[0]) + Math.abs(currentIndex[1] - endingIndex[1])
}

/**
 * Attempts to find a path between 2 indexes 
 * @param map The current game map element
 * @param startingIndex The index that the search begins at
 * @param endingIndex The index that the search ends at
 * @returns The path between 2 indexes or null if the path is unreachable
 */
const getPath = <T>(map: mapGenerator<T>, startingIndex: index, endingIndex: index): index[] | null => {
  //get the cost to the goal for the startingIndex
  const startingCostToGoal:number = getCostToGoal(startingIndex, endingIndex)
  
  //create the staringNode 
  const startingNode : Node = {
    index: startingIndex,
    costFromStart: 0,
    costToGoal: startingCostToGoal,
    totalCost: startingCostToGoal
  }

  //create an array to store nodes that haven't been travelled to
  const openNodes: Node[] = [startingNode]
  const closedIndexes: index[] = []

  //generate the path while we have more openNodes
  while(openNodes.length > 0){
    //sort the open nodes to find the shortest path
    openNodes.sort((firstNode, secondNode) => firstNode.totalCost - secondNode.totalCost)

    //take the first node
    const currentNode: Node = openNodes.shift()!

    //if the goal is reached, reconstruct the path
    if(compareIndexes(currentNode.index, endingIndex)){
      const path: index[] = []
      let current: Node | undefined = currentNode

      while(current){
        //add the index of the current node to the front of the path
        path.unshift(current.index)

        //get the next node from the previous parent
        current = current.parent
      }

      //return the path
      return path
    }

    //the index isn't the end of the path, add it to the closed array
    closedIndexes.push(currentNode.index)

    // explore neighbors
    getConnectedIndexes(map, currentNode.index).forEach(el=>{
      //don't continue if we are already tracking this index or if it isn't a valid value
      if(closedIndexes.includes(el) || map.isIndexUnwalkable(el)) return

      //get the new values for this connected node
      const costFromStart: number = currentNode.costFromStart + 1
      const costToGoal: number = getCostToGoal(el, endingIndex)
      const totalCost: number = costFromStart + costToGoal

      //see if we have an openNode at this index
      const existingNode = openNodes.find(openEL => {
        return compareIndexes(openEL.index, el)
      })

      //we either don't have have an existing node or the existing node now has a lesser value
      if(!existingNode || costFromStart < existingNode.costFromStart) {
        if(!existingNode){
          //we don't have a node yet at this index
          const neighborNode: Node = {
            index: el,
            costFromStart: costFromStart,
            costToGoal: costToGoal,
            totalCost: totalCost,
            parent: currentNode
          }

          openNodes.push(neighborNode)
        } else {
          //update the existing node
          existingNode.costFromStart = costFromStart
          existingNode.totalCost = totalCost
          existingNode.parent = currentNode
        }
      }
    })
  }

  //the goal was not reached
  return null
}

export default getPath