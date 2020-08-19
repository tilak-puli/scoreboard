export const updateRunsInputDialogVisible = (state, {payload}) => {
  state.runsInputDialogVisible = payload.visible;
};
export const updateNextBatsmanDialogVisible = (state, {payload}) => {
  state.nextBatsmanDialogVisible = payload.visible;
};
export const updateNextBowlerDialogVisible = (state, {payload}) => {
  state.nextBowlerDialogVisible = payload.visible;
};
export const updateInningsOverDialogVisible = (state, {payload}) => {
  state.inningsOverDialogVisible = payload.visible;
};
export const updateInitPlayersDialogVisible = (state, {payload}) => {
  state.initPlayersDialogVisible = payload.visible;
};
export const updateWicketDialogVisible = (state, {payload}) => {
  state.wicketDialogVisible = payload.visible;
};
