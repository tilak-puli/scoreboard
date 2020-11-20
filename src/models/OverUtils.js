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

  concat: (over1 = {}, over2 = {}) => ({
    over: over1.over + over1.over,
    balls: over1.balls + over1.balls,
  }),
};
