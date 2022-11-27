import * as assert from "node:assert";
import { describe, it } from "node:test";
import { ShapeActionName } from "../shape_action";
import { WORLD_ACTION } from "../world_action";
import { createWorldRules } from "../world_rule";
import { createTestShape } from "./_test_utils";

describe("World Rules", () => {
  const [isBlockedFromLeft, isBlockedFromRight, isBlockedFromDown] =
    createWorldRules();

  describe("isBlockedFromLeft", () => {
    /**
     * | A
     * |AAA
     * |
     */
    it("should block movements beyond the left edge of the game world", () => {
      const shapeA = createTestShape({ posX: 0 });
      const action = isBlockedFromLeft({
        shape: shapeA,
        sim: { ...shapeA, posX: shapeA.posX - 1 },
        shapes: [[shapeA]],
        action: ShapeActionName.MOVE_LEFT,
      });
      assert.equal(action, WORLD_ACTION.BLOCK_SHAPE_ACTION);
    });

    /**
     * |   BB
     * |   BB A
     * |   BBAAA
     * |
     */
    it("should block movements if there are other blocking shapes", () => {
      const shapeA = createTestShape({ posX: 5, poxY: 5 });
      const shapeB = createTestShape({
        posX: 3,
        posY: 4,
        type: [
          [1, 1],
          [1, 1],
          [1, 1],
        ],
      });
      const action = isBlockedFromLeft({
        shape: shapeA,
        sim: { ...shapeA, posX: shapeA.posX - 1 },
        shapes: [[shapeA, shapeB]],
        action: ShapeActionName.MOVE_LEFT,
      });
      assert.equal(action, WORLD_ACTION.BLOCK_SHAPE_ACTION);
    });

    /**
     * |   B
     * |   BB A
     * |   B AAA
     * |
     */
    it("should block movements only if the filled blocks overlap", () => {
      const shapeA = createTestShape({ posX: 5, poxY: 5 });
      const shapeB = createTestShape({
        posX: 3,
        posY: 4,
        type: [
          [1, 0],
          [1, 1],
          [1, 0],
        ],
      });
      const action = isBlockedFromLeft({
        shape: shapeA,
        sim: { ...shapeA, posX: shapeA.posX - 1 },
        shapes: [[shapeA, shapeB]],
        action: ShapeActionName.MOVE_LEFT,
      });
      assert.equal(action, null);
    });
  });

  describe("isBlockedFromRight", () => {
    it("should block movements beyond the right edge of the game world");
    it("should block movements if there are other blocking shapes");
    it("should block movements only if the filled blocks overlap");
  });

  describe("isBlockedFromDown", () => {
    it("should block movements beyond the bottom edge of the game world");
    it("should block movements if there are other blocking shapes");
    it("should block movements only if the filled blocks overlap");
  });
});
