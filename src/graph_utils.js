/**
 * GRAPH FUNCTIONS.
 */

/**
 * getNodeInputConnections: Get a node input connections.
 * 
 * <p>
 * The input connections of a node are all those connections 
 * with a targetPath pointing to the node Id.
 * </p> 
 *
 * @param {Object} node [Node model object]{@link https://github.com/Bgeninatti/frontend-challenge-3/blob/master/DOCS.md#node-model}.
 * @param {Object} graph [Bot model object]{@link https://github.com/Bgeninatti/frontend-challenge-3/blob/master/DOCS.md#bot-model}.
 * @returns {Array} Array of [Connection models]{@link https://github.com/Bgeninatti/frontend-challenge-3/blob/master/DOCS.md#connection-model}.
 */
export function getNodeInputConnections(node, graph) {

    // If the node is the bot's started we know that have
    // no input connections.
    if (node.id === 'bot_start') {
      return [];
    }

    let connections = Object.values(graph.connections);
    return connections.filter(x => x.targetPath === node.id);
}

/**
 * getNodeOutputConnections: Get a node output connections.
 * 
 * <p>
 * The output connections of a node are all those connections
 * with a sourcePath pointing to the node Id.
 * </p>
 *
 * @param {Object} node [Node model object]{@link https://github.com/Bgeninatti/frontend-challenge-3/blob/master/DOCS.md#node-model}.
 * @param {Object} graph [Bot model object]{@link https://github.com/Bgeninatti/frontend-challenge-3/blob/master/DOCS.md#bot-model}.
 * @returns {Array} Array of [Connection models]{@link https://github.com/Bgeninatti/frontend-challenge-3/blob/master/DOCS.md#connection-model}.
 */
export function getNodeOutputConnections(node, graph) {
    let connections = Object.values(graph.connections);
    return connections.filter(x => x.sourcePath === node.id);
}

/**
 * getNodeConnections: Get a node connections.
 * 
 * <p>
 * The connections of a node are all those connections 
 * with sourcePath or targetPath pointing to the node Id. 
 * </p>
 *
 * @param {Object} node [Node model object]{@link https://github.com/Bgeninatti/frontend-challenge-3/blob/master/DOCS.md#node-model}.
 * @param {Object} graph [Bot model object]{@link https://github.com/Bgeninatti/frontend-challenge-3/blob/master/DOCS.md#bot-model}.
 * @returns {Array} Array of [Connection models]{@link https://github.com/Bgeninatti/frontend-challenge-3/blob/master/DOCS.md#connection-model}.
 */
export function getNodeConnections(node, graph) {
    let connections = Object.values(graph.connections);
    return connections.filter(
      x => x.sourcePath === node.id || x.targetPath === node.id
    );
}

/**
 * getLeafNodes: Get all leaf nodes (no output connections).
 * 
 * <p>
 * Those are estimated as the nodes that don't have any connection
 * with sourcePath pointing to them.
 * </p>
 *
 * @param {Object} graph [Bot model object]{@link https://github.com/Bgeninatti/frontend-challenge-3/blob/master/DOCS.md#bot-model}.
 * @returns {Array} Array of [Node model object]{@link https://github.com/Bgeninatti/frontend-challenge-3/blob/master/DOCS.md#node-model}.
 */
export function getLeafNodes(graph) {
  let nodesIds = Object.keys(graph.nodes);
  // Compute all unique node Ids present in connections as sourcePath
  let outputConnectionsIds = new Set(
    Object.values(graph.connections).map(x => x.sourcePath)
  );
  let leafNodesIds = nodesIds.filter(x => !outputConnectionsIds.has(x));
  
  return leafNodesIds.map(x => graph.nodes[x]);
}

/**
 * getRootNodes: Get all root nodes (no input connections).
 * 
 * <p>
 * The root nodes are those that don't have any connection
 * with targetPath pointing to them.
 * </p>
 *
 * @param {Object} graph [Bot model object]{@link https://github.com/Bgeninatti/frontend-challenge-3/blob/master/DOCS.md#bot-model}.
 * @returns {Array} Array of [Node model object]{@link https://github.com/Bgeninatti/frontend-challenge-3/blob/master/DOCS.md#node-model}.
 */
export function getRootNodes(graph) {
  let nodesIds = Object.keys(graph.nodes);
  // Compute all unique node Ids present in connections as targetPath
  let inputConnectionsIds = new Set(
    Object.values(graph.connections).map(x => x.targetPath)
  );
  let rootNodesIds = nodesIds.filter(x => !inputConnectionsIds.has(x));
  
  return rootNodesIds.map(x => graph.nodes[x]);
}

/**
 * hasMultipleSources: Determines if a node is reachable from different sources.
 * 
 * <p>
 * AKA: Nodes with more than one input connection.
 * </p>
 *
 * @param {Object} node [Node model object]{@link https://github.com/Bgeninatti/frontend-challenge-3/blob/master/DOCS.md#node-model}.
 * @param {Object} graph [Bot model object]{@link https://github.com/Bgeninatti/frontend-challenge-3/blob/master/DOCS.md#bot-model}.
 * @returns {Boolean} True if a node has different source paths (more than one input connection).
 */
export function hasMultipleSources(node, graph) {
    let inputConnections = getNodeInputConnections(node, graph);
    return inputConnections.length > 1;
}
