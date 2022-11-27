import { Shape } from "../shape";

let nextShapeId: number = 1;

export const createTestShape = (data: Partial<Shape> = {}): Shape => ({
  id: ++nextShapeId,
  posX: 2,
  posY: 3,
  type: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  color: 0,
  ...data,
});
