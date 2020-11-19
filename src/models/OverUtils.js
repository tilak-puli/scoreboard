export const OverUtils = {
  toString: (over = {}) => over.over + '.' + over.balls,

  addBall: (over = {}) => ({
    over: over.over,
    balls: over.balls + 1,
  }),

  nextOver: (over = {}) => ({
    over: over.over + 1,
    balls: 0,
  }),
};
