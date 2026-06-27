import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Shuffle, Info } from "lucide-react";

interface GridNode {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited: boolean;
  isPath: boolean;
}

export function PathVisualizer() {
  const ROWS = 12;
  const COLS = 18;
  const START_ROW = 2;
  const START_COL = 2;
  const END_ROW = 9;
  const END_COL = 15;

  const [grid, setGrid] = useState<GridNode[][]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSolving, setIsSolving] = useState(false);
  const [pathFound, setPathFound] = useState<boolean | null>(null);
  const [nodesVisitedCount, setNodesVisitedCount] = useState(0);
  const [pathLength, setPathLength] = useState(0);

  // Initialize/reset grid
  const initializeGrid = (clearWalls = true) => {
    const newGrid: GridNode[][] = [];
    for (let r = 0; r < ROWS; r++) {
      const currentRow: GridNode[] = [];
      for (let c = 0; c < COLS; c++) {
        const isStart = r === START_ROW && c === START_COL;
        const isEnd = r === END_ROW && c === END_COL;
        
        // Keep existing walls if clearWalls is false
        let isWall = false;
        if (!clearWalls && grid[r] && grid[r][c]) {
          isWall = grid[r][c].isWall;
        }

        currentRow.push({
          row: r,
          col: c,
          isStart,
          isEnd,
          isWall,
          isVisited: false,
          isPath: false,
        });
      }
      newGrid.push(currentRow);
    }
    setGrid(newGrid);
    setPathFound(null);
    setNodesVisitedCount(0);
    setPathLength(0);
  };

  useEffect(() => {
    initializeGrid(true);
  }, []);

  // Handle cell clicks/drags to toggle walls
  const handleMouseDown = (row: number, col: number) => {
    if (isSolving) return;
    if ((row === START_ROW && col === START_COL) || (row === END_ROW && col === END_COL)) return;
    
    setIsDrawing(true);
    toggleWall(row, col);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isDrawing || isSolving) return;
    if ((row === START_ROW && col === START_COL) || (row === END_ROW && col === END_COL)) return;

    toggleWall(row, col);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const toggleWall = (row: number, col: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r) => r.map((node) => ({ ...node })));
      newGrid[row][col].isWall = !newGrid[row][col].isWall;
      return newGrid;
    });
  };

  // Generate a random layout of obstacles
  const generateRandomMaze = () => {
    if (isSolving) return;
    const newGrid: GridNode[][] = [];
    for (let r = 0; r < ROWS; r++) {
      const currentRow: GridNode[] = [];
      for (let c = 0; c < COLS; c++) {
        const isStart = r === START_ROW && c === START_COL;
        const isEnd = r === END_ROW && c === END_COL;
        const isWall = !isStart && !isEnd && Math.random() < 0.28; // ~28% obstacle density

        currentRow.push({
          row: r,
          col: c,
          isStart,
          isEnd,
          isWall,
          isVisited: false,
          isPath: false,
        });
      }
      newGrid.push(currentRow);
    }
    setGrid(newGrid);
    setPathFound(null);
    setNodesVisitedCount(0);
    setPathLength(0);
  };

  // Visual A* Solver Loop
  const runAStar = async () => {
    if (isSolving) return;
    setIsSolving(true);
    setPathFound(null);

    // Reset previous search markings first
    initializeGrid(false);

    // Re-fetch current grid state
    const currentGrid = grid.map((r) => r.map((node) => ({ ...node, isVisited: false, isPath: false })));

    const startNode = currentGrid[START_ROW][START_COL];
    const endNode = currentGrid[END_ROW][END_COL];

    // Priority lists
    const openSet: GridNode[] = [startNode];
    
    // Track parenting for path reconstruction
    const cameFrom = new Map<string, string>(); // 'row,col' -> 'parentRow,parentCol'
    
    // G values (real distance from start)
    const gScore = new Map<string, number>();
    gScore.set(`${START_ROW},${START_COL}`, 0);

    // F values (real distance + heuristic estimate)
    const fScore = new Map<string, number>();
    const h = (n: GridNode) => Math.abs(n.row - END_ROW) + Math.abs(n.col - END_COL); // Manhattan distance
    fScore.set(`${START_ROW},${START_COL}`, h(startNode));

    // Array to record animation sequence
    const visitedInOrder: GridNode[] = [];
    let pathNodes: GridNode[] = [];
    let success = false;

    while (openSet.length > 0) {
      // Find node with lowest F score in openSet
      openSet.sort((a, b) => {
        const fa = fScore.get(`${a.row},${a.col}`) ?? Infinity;
        const fb = fScore.get(`${b.row},${b.col}`) ?? Infinity;
        return fa - fb;
      });

      const current = openSet.shift()!;
      
      // If we reached the target, reconstruct path
      if (current.row === END_ROW && current.col === END_COL) {
        success = true;
        let currKey = `${END_ROW},${END_COL}`;
        while (cameFrom.has(currKey)) {
          const [pr, pc] = cameFrom.get(currKey)!.split(",").map(Number);
          if (!(pr === START_ROW && pc === START_COL)) {
            pathNodes.push(currentGrid[pr][pc]);
          }
          currKey = `${pr},${pc}`;
        }
        pathNodes.reverse();
        break;
      }

      // Skip start node in viscosity animations
      if (!(current.row === START_ROW && current.col === START_COL)) {
        visitedInOrder.push(current);
      }

      // Check all 4 orthogonal directions
      const directions = [
        [-1, 0], // North
        [1, 0],  // South
        [0, -1], // West
        [0, 1],  // East
      ];

      for (const [dr, dc] of directions) {
        const nr = current.row + dr;
        const nc = current.col + dc;

        // Verify boundaries
        if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) continue;
        
        const neighbor = currentGrid[nr][nc];
        if (neighbor.isWall) continue; // obstacle bypass

        const tentativeG = (gScore.get(`${current.row},${current.col}`) ?? Infinity) + 1;
        const neighborG = gScore.get(`${nr},${nc}`) ?? Infinity;

        if (tentativeG < neighborG) {
          cameFrom.set(`${nr},${nc}`, `${current.row},${current.col}`);
          gScore.set(`${nr},${nc}`, tentativeG);
          fScore.set(`${nr},${nc}`, tentativeG + h(neighbor));

          if (!openSet.some((node) => node.row === nr && node.col === nc)) {
            openSet.push(neighbor);
          }
        }
      }
    }

    // Trigger frame animations
    animateSearch(visitedInOrder, pathNodes, success);
  };

  const animateSearch = (visited: GridNode[], path: GridNode[], success: boolean) => {
    let visitedIdx = 0;
    
    const animateVisitedStep = () => {
      if (visitedIdx < visited.length) {
        const node = visited[visitedIdx];
        setGrid((prevGrid) => {
          const newGrid = prevGrid.map((r) => r.map((n) => ({ ...n })));
          newGrid[node.row][node.col].isVisited = true;
          return newGrid;
        });
        setNodesVisitedCount(visitedIdx + 1);
        visitedIdx++;
        setTimeout(animateVisitedStep, 25);
      } else {
        // visited animations complete, draw final path
        if (success) {
          setPathFound(true);
          animatePath(path);
        } else {
          setPathFound(false);
          setIsSolving(false);
        }
      }
    };

    animateVisitedStep();
  };

  const animatePath = (path: GridNode[]) => {
    let pathIdx = 0;

    const animatePathStep = () => {
      if (pathIdx < path.length) {
        const node = path[pathIdx];
        setGrid((prevGrid) => {
          const newGrid = prevGrid.map((r) => r.map((n) => ({ ...n })));
          newGrid[node.row][node.col].isPath = true;
          return newGrid;
        });
        setPathLength(pathIdx + 1);
        pathIdx++;
        setTimeout(animatePathStep, 45);
      } else {
        setIsSolving(false);
      }
    };

    animatePathStep();
  };

  return (
    <div className="glass border border-white/[0.05] w-full max-w-4xl mx-auto rounded-lg overflow-hidden flex flex-col md:flex-row font-mono text-xs select-none shadow-2xl">
      {/* Path Finding Grid */}
      <div className="flex-grow p-5 bg-black/40 flex flex-col justify-between gap-4">
        <span className="text-[9px] font-bold text-primary uppercase tracking-widest">// Local Costmap Grid (Start: green, Target: red)</span>
        
        {/* Draw Area */}
        <div 
          className="grid gap-[1px] bg-white/[0.02] p-[1px] rounded border border-white/[0.05] overflow-hidden select-none w-full"
          style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
          onMouseLeave={handleMouseUp}
        >
          {grid.map((row, rIdx) =>
            row.map((node, cIdx) => {
              let bgClass = "bg-[#060606]";
              let animateClass = "";

              if (node.isStart) bgClass = "bg-green-500";
              else if (node.isEnd) bgClass = "bg-red-500 animate-pulse";
              else if (node.isWall) bgClass = "bg-white/10";
              else if (node.isPath) {
                bgClass = "bg-primary";
              } else if (node.isVisited) {
                bgClass = "bg-primary/20";
              }

              return (
                <div
                  key={`${rIdx}-${cIdx}`}
                  className={`aspect-square w-full border-[0.5px] border-white/[0.02] transition-all duration-300 cursor-pointer ${bgClass} ${animateClass}`}
                  onMouseDown={() => handleMouseDown(rIdx, cIdx)}
                  onMouseEnter={() => handleMouseEnter(rIdx, cIdx)}
                  onMouseUp={handleMouseUp}
                />
              );
            })
          )}
        </div>

        {/* Telemetry info */}
        <div className="flex justify-between text-[9px] text-muted-foreground pt-3 px-1 border-t border-white/[0.05]">
          <span>VISITED_NODES: <span className="text-white font-bold">{nodesVisitedCount}</span></span>
          <span>PATH_LENGTH: <span className="text-white font-bold">{pathLength} units</span></span>
          <span>
            STATUS:{" "}
            {pathFound === true ? (
              <span className="text-green-400 font-bold">SOLVED</span>
            ) : pathFound === false ? (
              <span className="text-red-400 font-bold">NO PATH FOUND</span>
            ) : isSolving ? (
              <span className="text-primary font-bold animate-pulse">PLANNING...</span>
            ) : (
              <span className="text-muted-foreground font-bold">STANDBY</span>
            )}
          </span>
        </div>
      </div>

      {/* Control Panel (Right) */}
      <div className="w-full md:w-80 p-6 border-t md:border-t-0 md:border-l border-white/[0.05] bg-black/20 flex flex-col justify-between gap-6">
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-white mb-1 uppercase tracking-wider">// Nav2 Costmap Visualizer</h4>
            <p className="text-[9px] text-muted-foreground leading-relaxed">
              Click and drag on the grid to construct obstacles. Watch the A* global path planner calculate the path dynamically.
            </p>
          </div>

          <div className="p-4 bg-white/[0.01] border border-white/[0.05] rounded flex items-start gap-3">
            <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <p className="text-[9px] text-muted-foreground leading-relaxed">
              This node solves $f(n) = g(n) + h(n)$ calculations, mirroring pathfinders used in warehouse robots to avoid dynamic barriers.
            </p>
          </div>
        </div>

        {/* Solver controls */}
        <div className="flex flex-col gap-2 pt-4 border-t border-white/[0.05]">
          <Button
            variant="outline"
            className="w-full border-white/[0.05] bg-white/[0.02] text-white hover:bg-white/5 font-mono text-[10px] tracking-wider uppercase h-10 rounded shadow-none"
            onClick={runAStar}
            disabled={isSolving}
          >
            <Play className="w-4 h-4 mr-2" /> Start A* Solver
          </Button>
          <div className="grid grid-cols-2 gap-1.5 select-none">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-white font-mono text-[9px] tracking-wider uppercase h-9 rounded shadow-none px-1"
              onClick={generateRandomMaze}
              disabled={isSolving}
            >
              Random Maze
            </Button>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-white font-mono text-[9px] tracking-wider uppercase h-9 rounded shadow-none px-1"
              onClick={() => initializeGrid(true)}
              disabled={isSolving}
            >
              Clear Grid
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
