export type TreeNode =
  | { kind: "list"; children: TreeNode[] }
  | { kind: "parallel"; children: TreeNode[]; align?: "end" }
  | { kind: "node"; id: string };

export type FlowAlign = "start" | "center";
export type FlowOrientation = "horizontal" | "vertical";

export type FlowState = {
  nodes: {
    [id: string]: {
      width: number;
      height: number;
      disabled?: boolean;
      startAnchorOffset?: number;
      endAnchorOffset?: number;
    };
  };
  tree: TreeNode;
  align: FlowAlign;
  orientation: FlowOrientation;
};

export type Edges = [string, string][];
export type NodePositions = Record<string, { x: number; y: number }>;
export type DiagramRect = { width: number; height: number };

export function computeEdges(flowState: FlowState): Edges {
  const edges: Edges = [];
  collectEdges(flowState.tree, edges);
  return edges;
}

function entryIds(node: TreeNode): string[] {
  if (node.kind === "node") return [node.id];
  if (node.kind === "parallel")
    return node.children.flatMap((child) => entryIds(child));
  if (node.children.length === 0) return [];
  return entryIds(node.children[0]);
}

function exitIds(node: TreeNode): string[] {
  if (node.kind === "node") return [node.id];
  if (node.kind === "parallel")
    return node.children.flatMap((child) => exitIds(child));
  if (node.children.length === 0) return [];
  return exitIds(node.children[node.children.length - 1]);
}

function collectEdges(node: TreeNode, edges: Edges) {
  if (node.kind === "node") return;

  if (node.kind === "parallel") {
    for (const child of node.children) collectEdges(child, edges);
    return;
  }

  for (const child of node.children) collectEdges(child, edges);

  for (let i = 0; i < node.children.length - 1; i++) {
    const current = node.children[i];
    const next = node.children[i + 1];
    if (current.kind === "parallel" && next.kind === "parallel") continue;

    for (const from of exitIds(current)) {
      for (const to of entryIds(next)) {
        edges.push([from, to]);
      }
    }
  }
}

export function computePositions(
  flowState: FlowState,
  { columnGap = 64, rowGap = 16 } = {},
): NodePositions {
  const positions: NodePositions = {};
  const { align, orientation } = flowState;

  function layout(
    node: TreeNode,
    originX: number,
    originY: number,
    out: NodePositions,
  ): { width: number; height: number } {
    if (node.kind === "node") {
      const measured = flowState.nodes[node.id];
      const width = measured?.width ?? 0;
      const height = measured?.height ?? 0;
      out[node.id] = { x: originX, y: originY };
      return { width, height };
    }

    if (node.kind === "list") {
      if (orientation === "vertical") {
        if (align === "center") {
          const sizes = node.children.map((child) => layout(child, 0, 0, {}));
          const columnWidth = sizes.reduce(
            (max, size) => Math.max(max, size.width),
            0,
          );
          let cursorY = originY;

          for (let i = 0; i < node.children.length; i++) {
            const childX = originX + (columnWidth - sizes[i].width) / 2;
            layout(node.children[i], childX, cursorY, out);
            cursorY += sizes[i].height;
            if (i < node.children.length - 1) cursorY += columnGap;
          }

          return { width: columnWidth, height: cursorY - originY };
        }

        let cursorY = originY;
        let totalWidth = 0;
        for (let i = 0; i < node.children.length; i++) {
          const { width, height } = layout(
            node.children[i],
            originX,
            cursorY,
            out,
          );
          cursorY += height;
          if (i < node.children.length - 1) cursorY += columnGap;
          totalWidth = Math.max(totalWidth, width);
        }
        return { width: totalWidth, height: cursorY - originY };
      }

      if (align === "center") {
        const sizes = node.children.map((child) => layout(child, 0, 0, {}));
        const rowHeight = sizes.reduce(
          (max, size) => Math.max(max, size.height),
          0,
        );
        let cursorX = originX;

        for (let i = 0; i < node.children.length; i++) {
          const childY = originY + (rowHeight - sizes[i].height) / 2;
          layout(node.children[i], cursorX, childY, out);
          cursorX += sizes[i].width;
          if (i < node.children.length - 1) cursorX += columnGap;
        }

        return { width: cursorX - originX, height: rowHeight };
      }

      let cursorX = originX;
      let totalHeight = 0;
      for (let i = 0; i < node.children.length; i++) {
        const { width, height } = layout(
          node.children[i],
          cursorX,
          originY,
          out,
        );
        cursorX += width;
        if (i < node.children.length - 1) cursorX += columnGap;
        totalHeight = Math.max(totalHeight, height);
      }
      return { width: cursorX - originX, height: totalHeight };
    }

    if (orientation === "vertical") {
      if (node.align === "end") {
        const sizes = node.children.map((child) => layout(child, 0, 0, {}));
        const maxHeight = sizes.reduce(
          (max, size) => Math.max(max, size.height),
          0,
        );
        let cursorX = originX;

        for (let i = 0; i < node.children.length; i++) {
          const childY = originY + maxHeight - sizes[i].height;
          layout(node.children[i], cursorX, childY, out);
          cursorX += sizes[i].width;
          if (i < node.children.length - 1) cursorX += rowGap;
        }

        return { width: cursorX - originX, height: maxHeight };
      }

      let cursorX = originX;
      let maxHeight = 0;
      for (let i = 0; i < node.children.length; i++) {
        const { width, height } = layout(
          node.children[i],
          cursorX,
          originY,
          out,
        );
        maxHeight = Math.max(maxHeight, height);
        cursorX += width;
        if (i < node.children.length - 1) cursorX += rowGap;
      }
      return { width: cursorX - originX, height: maxHeight };
    }

    if (node.align === "end") {
      const sizes = node.children.map((child) => layout(child, 0, 0, {}));
      const maxWidth = sizes.reduce(
        (max, size) => Math.max(max, size.width),
        0,
      );
      let cursorY = originY;

      for (let i = 0; i < node.children.length; i++) {
        const childX = originX + maxWidth - sizes[i].width;
        layout(node.children[i], childX, cursorY, out);
        cursorY += sizes[i].height;
        if (i < node.children.length - 1) cursorY += rowGap;
      }

      return { width: maxWidth, height: cursorY - originY };
    }

    let cursorY = originY;
    let maxWidth = 0;
    for (let i = 0; i < node.children.length; i++) {
      const { width, height } = layout(node.children[i], originX, cursorY, out);
      maxWidth = Math.max(maxWidth, width);
      cursorY += height;
      if (i < node.children.length - 1) cursorY += rowGap;
    }
    return { width: maxWidth, height: cursorY - originY };
  }

  layout(flowState.tree, 0, 0, positions);

  return positions;
}

export function computeDiagramRect(
  positions: NodePositions,
  flowState: FlowState,
): DiagramRect {
  let width = 0;
  let height = 0;

  for (const [id, pos] of Object.entries(positions)) {
    const node = flowState.nodes[id];
    if (!node) continue;
    width = Math.max(width, pos.x + node.width);
    height = Math.max(height, pos.y + node.height);
  }

  return { width, height };
}
