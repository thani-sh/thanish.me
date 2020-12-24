import { useRef, useEffect } from 'react';

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
];

const ACTION_TYPES = {
  moveLeft: (shape) => {
    shape.x--;
  },

  moveRight: (shape) => {
    shape.x++;
  },
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

const startWorld = (keymaps, renderer, options) => {
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
    shape.color = PLAYER_COLORS[i % PLAYER_COLORS.length];
    playerShapes[i].unshift(shape);
    requestReRender();
  };
  const canPerformAction = (i, action) => {
    // TODO: implement checks
    return true;
  };
  const playerActionListener = (i, action) => {
    if (!canPerformAction(i, action)) {
      return;
    }
    const shape = playerShapes[i][0];
    action(shape);
    requestReRender();
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

  return () => {
    stopPlayerFns.forEach((fn) => fn());
  };
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

const keymaps = [
  {
    KeyA: ACTION_TYPES.moveLeft,
    KeyD: ACTION_TYPES.moveRight,
  },
  {
    ArrowLeft: ACTION_TYPES.moveLeft,
    ArrowRight: ACTION_TYPES.moveRight,
  },
];

const options = {
  worldWidth: 32,
  worldHeight: 24,
  worldScale: 25,
};

export default function GameDemo() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (process.browser && canvasRef) {
      const renderer = createRenderer(canvasRef.current, options);
      startWorld(keymaps, renderer, options);
    }
  }, [canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        background: '#eee',
      }}
    />
  );
}
