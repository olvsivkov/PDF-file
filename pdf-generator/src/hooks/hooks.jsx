const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_INPUT':
        return {
          ...state,
          [action.name]: action.value
        };
        case 'TOGGLE_CHECKBOX':
        return {
          ...state,
          [action.name]: !state[action.name], // Переключаем состояние чекбокса
        };
      default:
        return state;
    }
  };

export default reducer