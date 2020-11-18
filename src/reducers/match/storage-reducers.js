import {allMatches, mergeMatch} from '../../storage/store';

// export const st_createMatch = async (state) => {
//   const {prevStates, ...rest} = state;
//   const id = (await allMatchesCount()) + 1;
//   return await storeMatch('match_' + id, rest);
// };

export const st_mergeMatch = (state) => {
  const {prevStates, ...rest} = state;
  mergeMatch('match_' + rest.createdTime, rest);
};

export const st_all_matches = async () => await allMatches();
