import { createKeyboardPlayer } from "./game/player";
import { createCanvasRenderer } from "./game/renderer";
import { ShapeActionName } from "./game/shape_action";
import { createBasicTicker } from "./game/ticker";
import { createGameWorld } from "./game/world";
import { createWorldRules } from "./game/world_rule";

document.body.style.margin = "0";
document.body.innerHTML = `
  <a href="/" style="display: inline-block; text-align: center; background: #eee; padding: 5px 10px; border-radius: 10px; text-decoration: none; position: fixed; top: 10px; left: 10px;">
    <img src="/icons/googlehome.svg" width="16px" />
  </a>
  <a href="https://github.com/thani-sh/thanish.me/tree/master/src/pages/apps/bygg" style="display: inline-block; text-align: center; background: #eee; padding: 5px 10px; border-radius: 10px; text-decoration: none; position: fixed; top: 10px; right: 10px;">
    <img src="/icons/github.svg" width="16px" />
  </a>
  <div id="wrapper" style="width: 450px; margin: 0 auto">
    <header style="padding: 64px 0;">
      <h1 style="color: #24292e; font-size: 64px; line-height: 1; text-align: center; font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;">Bygg</h1>
      <p style="color: #24292e; font-size: 16px; line-height: 1; text-align: center; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;">Use ↑←↓→ keys and/or WASD keys</p>
    </header>
    <div id="container"></div>
  </div>
`;

const KEYMAP_WASD = {
  KeyW: ShapeActionName.ROTATE,
  KeyA: ShapeActionName.MOVE_LEFT,
  KeyS: ShapeActionName.MOVE_DOWN,
  KeyD: ShapeActionName.MOVE_RIGHT,
};

const KEYMAP_ULDR = {
  ArrowUp: ShapeActionName.ROTATE,
  ArrowLeft: ShapeActionName.MOVE_LEFT,
  ArrowDown: ShapeActionName.MOVE_DOWN,
  ArrowRight: ShapeActionName.MOVE_RIGHT,
};

const container = document.getElementById("container");
const player1 = createKeyboardPlayer(0x6fa8dc, KEYMAP_WASD);
const player2 = createKeyboardPlayer(0xf6b26b, KEYMAP_ULDR);
const players = [player1, player2];
const renderer = createCanvasRenderer(container);
const ticker = createBasicTicker(500);
const ruleset = createWorldRules();
createGameWorld({ players, renderer, ticker, ruleset });
