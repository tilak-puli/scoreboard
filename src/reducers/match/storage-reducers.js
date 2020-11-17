import {
  allMatches,
  allMatchesCount,
  mergeMatch,
  storeMatch,
} from '../../storage/store';

export const st_createMatch = async (state) => {
  const {prevStates, ...rest} = state;
  const id = await allMatchesCount();
  storeMatch('match_' + id, rest);
  state.id = id;
};

export const st_mergeMatch = (state) => {
  const {prevStates, ...rest} = state;
  mergeMatch('match_' + rest.id, rest);
};

export const st_all_matches = async () => await allMatches();
