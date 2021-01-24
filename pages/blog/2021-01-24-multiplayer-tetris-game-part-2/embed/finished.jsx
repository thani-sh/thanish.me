import { useRef, useState, useEffect } from 'react';

const SHAPE_TYPES = [
  [
    [1, 1],
    [1, 1],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
  ],
];

const ACTION_TYPES = {
  moveLeft: (shape) => {
    shape.x--;
  },

  moveRight: (shape) => {
    shape.x++;
  },

  moveDown: (shape) => {
    shape.y++;
  },

  rotateShape: (shape) => {
    const type = [];
    for (let i = 0; i < shape.type[0].length; ++i) {
      type[i] = [];
      for (let j = 0; j < shape.type.length; ++j) {
        type[i][j] = shape.type[shape.type.length - 1 - j][i];
      }
    }
    shape.type = type;
  },
};

const RULE_ACTIONS = {
  BLOCK_ACTION: 1,
  CREATE_SHAPE: 2,
  END_THE_GAME: 3,
};

const startPlayer = (keymap, listener) => {
  const keyDownListener = (e) => {
    for (const key of Object.keys(keymap)) {
      if (e.code === key) {
        listener(keymap[key]);
        break;
      }
    }
  };
  document.addEventListener('keydown', keyDownListener);

  return () => {
    document.removeEventListener('keydown', keyDownListener);
  };
};

const startWorld = (keymaps, renderer, ticker, ruleset, options) => {
  const PLAYER_COLORS = ['#6fa8dc', '#f6b26b'];
  const playersCount = keymaps.length;
  const playerShapes = [];
  const stopPlayerFns = [];
  const requestReRender = () => {
    renderer(playerShapes);
  };
  const createNewShape = (i) => {
    const index = Math.floor(Math.random() * SHAPE_TYPES.length);
    const shape = { x: 0, y: 0, type: SHAPE_TYPES[index], color: '#111' };
    shape.x = Math.floor((options.worldWidth / playersCount / 2) * (i * 2 + 1));
    shape.y = -shape.type.length;
    shape.color = PLAYER_COLORS[i % PLAYER_COLORS.length];
    playerShapes[i].unshift(shape);
    requestReRender();
  };
  const playerActionListener = (i, action) => {
    const activeShape = playerShapes[i][0];
    const simulated = Object.create(activeShape);
    action(simulated);
    for (let j = 0; j < ruleset.length; ++j) {
      const ruleFn = ruleset[j];
      const result = ruleFn(simulated, activeShape, playerShapes);
      if (result === RULE_ACTIONS.BLOCK_ACTION) {
        return;
      } else if (result === RULE_ACTIONS.CREATE_SHAPE) {
        createNewShape(i);
        return;
      } else if (result === RULE_ACTIONS.END_THE_GAME) {
        alert('GAME OVER!');
        stopWorld();
      }
    }
    action(activeShape);
    requestReRender();
  };
  const stopGameClock = ticker(() => {
    for (let i = 0; i < playerShapes.length; ++i) {
      playerActionListener(i, ACTION_TYPES.moveDown);
    }
  });
  const stopWorld = () => {
    stopGameClock();
    stopPlayerFns.forEach((fn) => fn());
  };
  for (let i = 0; i < playersCount; ++i) {
    playerShapes[i] = [];
    createNewShape(i);
  }
  for (let i = 0; i < playersCount; ++i) {
    const keymap = keymaps[i];
    const listener = (action) => playerActionListener(i, action);
    stopPlayerFns[i] = startPlayer(keymap, listener);
  }

  return stopWorld;
};

const createRenderer = (canvas, options) => {
  const canvasWidth = options.worldWidth * options.worldScale;
  const canvasHeight = options.worldHeight * options.worldScale;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');

  const renderBlock = (x, y, color) => {
    ctx.fillStyle = color;
    ctx.strokeStyle = '#000';
    ctx.fillRect(
      x * options.worldScale,
      y * options.worldScale,
      options.worldScale,
      options.worldScale
    );
    ctx.strokeRect(
      x * options.worldScale,
      y * options.worldScale,
      options.worldScale,
      options.worldScale
    );
  };

  const renderShape = (shape) => {
    ctx.save();
    ctx.translate(shape.x * options.worldScale, shape.y * options.worldScale);
    for (let i = 0; i < shape.type.length; ++i) {
      const row = shape.type[i];
      for (let j = 0; j < row.length; ++j) {
        if (row[j]) {
          renderBlock(j, i, shape.color);
        }
      }
    }
    ctx.restore();
  };

  return (playerShapes) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let i = 0; i < playerShapes.length; ++i) {
      const shapes = playerShapes[i];
      for (let j = 0; j < shapes.length; ++j) {
        renderShape(shapes[j]);
      }
    }
  };
};

const createTicker = (t) => {
  return (fn) => {
    let enabled = true;
    const handler = () => {
      if (!enabled) {
        return;
      }
      fn();
      setTimeout(handler, t);
    };
    setTimeout(handler, t);
    return () => {
      enabled = false;
    };
  };
};

const createGameRules = (options) => {
  const doesBBoxOverlap = (s1, s2) => {
    if (
      s1.x > s2.x + s2.type[0].length ||
      s1.x + s1.type[0].length < s2.x ||
      s1.y > s2.y + s2.type.length ||
      s1.y + s1.type.length < s2.y
    ) {
      return false;
    }
    return true;
  };
  const doesBlockOverlap = (s1, row, col, s2) => {
    if (!s1.type[row][col]) {
      return false;
    }
    const s2row = row + s1.y - s2.y;
    const s2col = col + s1.x - s2.x;
    if (s2.type[s2row] && s2.type[s2row][s2col]) {
      return true;
    }
    return false;
  };
  const getOtherShapes = function* (activeShape, playerShapes) {
    for (let i = 0; i < playerShapes.length; ++i) {
      const shapes = playerShapes[i];
      for (let j = 0; j < shapes.length; ++j) {
        const shape = shapes[j];
        if (shape === activeShape) {
          continue;
        }
        yield [shape, j === 0];
      }
    }
  };
  const isBlockedFromLeft = (simulated, activeShape, playerShapes) => {
    if (simulated.type === activeShape.type && simulated.x >= activeShape.x) {
      return null;
    }
    if (simulated.x < 0) {
      return RULE_ACTIONS.BLOCK_ACTION;
    }
    for (let [shape] of getOtherShapes(activeShape, playerShapes)) {
      if (!doesBBoxOverlap(simulated, shape)) {
        continue;
      }
      const col = 0;
      for (let row = 0; row < simulated.type.length; ++row) {
        if (doesBlockOverlap(simulated, row, col, shape)) {
          return RULE_ACTIONS.BLOCK_ACTION;
        }
      }
    }
    return null;
  };
  const isBlockedFromRight = (simulated, activeShape, playerShapes) => {
    if (simulated.type === activeShape.type && simulated.x <= activeShape.x) {
      return null;
    }
    if (simulated.x + simulated.type[0].length > options.worldWidth) {
      return RULE_ACTIONS.BLOCK_ACTION;
    }
    for (let [shape] of getOtherShapes(activeShape, playerShapes)) {
      if (!doesBBoxOverlap(simulated, shape)) {
        continue;
      }
      const col = simulated.type[0].length - 1;
      for (let row = 0; row < simulated.type.length; ++row) {
        if (doesBlockOverlap(simulated, row, col, shape)) {
          return RULE_ACTIONS.BLOCK_ACTION;
        }
      }
    }
    return null;
  };
  const isBlockedFromBottom = (simulated, activeShape, playerShapes) => {
    if (simulated.type === activeShape.type && simulated.y <= activeShape.y) {
      return null;
    }
    if (simulated.y + simulated.type.length > options.worldHeight) {
      return RULE_ACTIONS.CREATE_SHAPE;
    }
    for (let [shape, isActive] of getOtherShapes(activeShape, playerShapes)) {
      if (!doesBBoxOverlap(simulated, shape)) {
        continue;
      }
      for (let col = 0; col < simulated.type[0].length; ++col) {
        let prevVal = 0;
        for (let row = simulated.type.length - 1; row >= 0; --row) {
          const val = simulated.type[row][col];
          if (val && !prevVal) {
            if (doesBlockOverlap(simulated, row, col, shape)) {
              if (simulated.y <= 0) {
                return RULE_ACTIONS.END_THE_GAME;
              }
              if (isActive) {
                return RULE_ACTIONS.BLOCK_ACTION;
              }
              return RULE_ACTIONS.CREATE_SHAPE;
            }
          }
          prevVal = val
        }
      }
    }
    return null;
  };
  return [isBlockedFromLeft, isBlockedFromRight, isBlockedFromBottom];
};

const keymaps = [
  {
    KeyW: ACTION_TYPES.rotateShape,
    KeyA: ACTION_TYPES.moveLeft,
    KeyS: ACTION_TYPES.moveDown,
    KeyD: ACTION_TYPES.moveRight,
  },
  {
    ArrowUp: ACTION_TYPES.rotateShape,
    ArrowLeft: ACTION_TYPES.moveLeft,
    ArrowDown: ACTION_TYPES.moveDown,
    ArrowRight: ACTION_TYPES.moveRight,
  },
];

const options = {
  worldWidth: 32,
  worldHeight: 16,
  worldScale: 25,
};

export default function GameDemo() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (process.browser && canvasRef) {
      const renderer = createRenderer(canvasRef.current, options);
      const ticker = createTicker(500);
      const ruleset = createGameRules(options);
      startWorld(keymaps, renderer, ticker, ruleset, options);
    }
  }, [canvasRef]);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
      <canvas ref={canvasRef} style={{ display: 'block', margin: '0 auto'}} />
    </div>
  );
}
