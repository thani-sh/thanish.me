import * as assert from "node:assert";
import { describe, it } from "node:test";
import { ShapeActionName, SHAPE_ACTIONS } from "../shape_action";
import { createTestShape } from "./_test_utils";

describe("Shape Actions", () => {
  const type = [
    [0, 1, 0],
    [1, 1, 1],
  ];

  describe("MOVE_LEFT", () => {
    it("MOVE_LEFT should subtract 1 from the x position", () => {
      const shape = createTestShape({ posX: 2, posY: 3, type });
      SHAPE_ACTIONS[ShapeActionName.MOVE_LEFT](shape);
      assert.equal(shape.posX, 1);
    });
  });

  describe("MOVE_RIGHT", () => {
    it("MOVE_RIGHT should add 1 to the x position", () => {
      const shape = createTestShape({ posX: 2, posY: 3, type });
      SHAPE_ACTIONS[ShapeActionName.MOVE_RIGHT](shape);
      assert.equal(shape.posX, 3);
    });
  });

  describe("MOVE_DOWN", () => {
    it("MOVE_DOWN should add 1 to the y position", () => {
      const shape = createTestShape({ posX: 2, posY: 3, type });
      SHAPE_ACTIONS[ShapeActionName.MOVE_DOWN](shape);
      assert.equal(shape.posY, 4);
    });
  });

  describe("ROTATE", () => {
    it("ROTATE should rotate the shape clockwise", () => {
      const shape = createTestShape({ posX: 2, posY: 3, type });
      SHAPE_ACTIONS[ShapeActionName.ROTATE](shape);
      assert.equal(shape.posX, 2);
      assert.equal(shape.posY, 3);
      assert.deepEqual(shape.type, [
        [1, 0],
        [1, 1],
        [1, 0],
      ]);
    });
  });
});
