export const ADD_JERSEY = "ADD_JERSEY";
export const REMOVE_JERSEY = "REMOVE_JERSEY";
export const UPDATE_JERSEY = "UPDATE_JERSEY";

export const addAction = (jersey, jerseyCount) => {
  return {
    type: ADD_JERSEY,
    payload: {
      jersey,
      jerseyCount
    }
  };
}

export const removeAction = (jerseyId, count) => {
  return {
    type: REMOVE_JERSEY,
    payload: {
      jerseyId,
      count
    }
  };
}

export const updateCountAction = (itemIndex, updateCount) => {
  return {
    type: UPDATE_JERSEY,
    payload: {
      itemIndex,
      updateCount
    }
  };
}
