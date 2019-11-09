/**
 * GRAPH FUNCTIONS.
 */

/**
 * getNodeInputConnections: Get a node input connections.
 * 
 * The input connections of a node are all those connections
 * in `graph` with a `targetPath` pointing to the node `id`. 
 *
 * @param {Object} node Node model object.
 * @param {Object} graph Bot model object.
 * @returns {Array} Array of Connection models.
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
 * The output connections of a node are all those connections
 * in `graph` with a `sourcePath` pointing to the node `id`.
 *
 * @param {Object} node Node model object.
 * @param {Object} graph Bot model object.
 * @returns {Array} Array of Connection models.
 */
export function getNodeOutputConnections(node, graph) {
    let connections = Object.values(graph.connections);
    return connections.filter(x => x.sourcePath === node.id);
}

/**
 * getNodeConnections: Get a node connections.
 * 
 * The connections of a node are all those connections in
 * `graph` with `sourcePath` or `targetPath` pointing to 
 * the node `id`. 
 *
 * @param {Object} node Node model object.
 * @param {Object} graph Bot model object.
 * @returns {Array} Array of Connection models.
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
 * Those are estimated as the nodes that doesn't have any connection
 * in `graph` with `sourcePath` pointing to them.
 *
 * @param {Object} graph Bot model object.
 * @returns {Array} Array of Node models.
 */
export function getLeafNodes(graph) {
  let nodesIds = Object.keys(graph.nodes);
  let outputConnectionsIds = new Set(
    Object.values(graph.connections).map(x => x.sourcePath)
  );
  let leafNodesIds = nodesIds.filter(x => !outputConnectionsIds.has(x));
  
  return leafNodesIds.map(x => graph.nodes[x]);
}

/**
 * getRootNodes: Get all root nodes (no input connections).
 * 
 * The root nodes are those that doesn't have any connection
 * in `graph` with `targetPath` pointing to them.
 *
 * @param {Object} graph Bot model object.
 * @returns {Array} Array of Node models.
 */
export function getRootNodes(graph) {
  let nodesIds = Object.keys(graph.nodes);
  let inputConnectionsIds = new Set(
    Object.values(graph.connections).map(x => x.targetPath)
  );
  let rootNodesIds = nodesIds.filter(x => !inputConnectionsIds.has(x));
  
  return rootNodesIds.map(x => graph.nodes[x]);
}

/**
 * hasMultipleSources: Determines if a node is reachable from different sources.
 * 
 * A.K.A: Nodes with more than one input connection.
 *
 * @param {Object} node Node model object.
 * @param {Object} graph Bot model object.
 * @returns {Boolean} True if a node has different source paths.
 */
export function hasMultipleSources(node, graph) {
    let inputConnections = getNodeInputConnections(node, graph);
    return inputConnections.length > 1;
}
