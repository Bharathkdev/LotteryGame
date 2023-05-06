import {
  ADD_SELECTED_PICK,
  DELETE_SELECTED_PICK,
} from '../Actions/numbersActions';

const initialState = {
  selectedNumbers: [],
};

export default numbersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SELECTED_PICK:
      return {
        ...state,
        selectedNumbers: [...state.selectedNumbers, action.payload],
      };
    case DELETE_SELECTED_PICK:
      return {
        ...state,
        selectedNumbers: state.selectedNumbers.filter(
          (_, index) => index !== action.payload,
        ),
      };
    default:
      return state;
  }
};
