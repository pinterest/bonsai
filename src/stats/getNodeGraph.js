/*
 * @flow
 */

import type {ExtendedModule} from '../types/Stats';

export type ExtendedModules = Array<ExtendedModule>;

type Node = {
  id: string,
  label: string,
  cumulativeSize: number,
  requiredByCount: number,
  requirementsCount: number,
};
type Edge = {
  id: string,
  source: string,
  target: string,
  label: string,
};
type Graph = {
  nodes: Array<Node>,
  edges: Array<Edge>,
};

export default function getNodeGraph(extendedModules: Array<ExtendedModule>): Graph {
  const graph = {
    nodes: extendedModules.map((eModule: ExtendedModule) => {
      return {
        id: 'n' + eModule.id,
        label: eModule.identifier,
        cumulativeSize: eModule.cumulativeSize,
        requiredByCount: eModule.requiredByCount,
        requirementsCount: eModule.requirements.length,
      };
    }),
    edges: [],
  };

  let eCount = 0;
  extendedModules.forEach((eModule: ExtendedModule) => {
    eModule.requirements.forEach((req) => {
      eCount += 1;
      graph.edges.push({
        id: 'e' + eCount,
        source: 'n' + eModule.id,
        target: 'n' + req.id,
        label: 'requires',
      });
    });
  });

  return graph;
}

/*
 * const g = getNodeGraph(...);
 * console.log(
 *   g.nodes.map(function (node) { return [node.id, node.label, node.cumulativeSize].join(', '); }).join("\n"),
 *   g.edges.map(function (edge) { return [edge.source, edge.target].join(', '); }).join("\n")
 * );
 */
