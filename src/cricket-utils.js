export const getOverVal = (balls) => parseInt(balls / 6) + (balls % 6) / 6;
export const getOver = (balls) =>
  (parseInt(balls / 6) + (balls % 6) / 10).toFixed(1);
