export const ADD_SELECTED_PICK = 'ADD_SELECTED_PICK';
export const DELETE_SELECTED_PICK = 'DELETE_SELECTED_PICK';

export const addSelectedPick = number => ({
  type: ADD_SELECTED_PICK,
  payload: number,
});

export const deleteSelectedPick = index => ({
  type: DELETE_SELECTED_PICK,
  payload: index,
});
