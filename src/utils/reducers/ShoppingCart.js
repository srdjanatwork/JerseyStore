import { ADD_JERSEY, REMOVE_JERSEY, UPDATE_JERSEY } from 'utils/actions/ShoppingCart';

export const initialState = {
  jerseys: [],
  total: 0
};

export const shoppingCartReducer = (state, action) => {
  switch (action.type) {
    case ADD_JERSEY:
      let formattedJerseyObj = {
        ...action.payload.jersey,
        jerseyCount: action.payload.jerseyCount
      }

      let allJerseyArr = [...state.jerseys, formattedJerseyObj];

      const filteredArr = allJerseyArr.reduce((acc, current) => {
        const x = acc.find(item => {
          if(item.id === current.id) {
            item.jerseyCount = item.jerseyCount + current.jerseyCount
            return item;
          } else return null;
        });
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      return {
        ...initialState,
        jerseys: filteredArr,
        total: countTotal(filteredArr)
      };
    case REMOVE_JERSEY:
      const updateArr = state.jerseys.filter((_jerey, i) => action.payload.jerseyId !== i);

      return {
        ...initialState,
        jerseys: updateArr,
        total: countTotal(updateArr)
      }
    case UPDATE_JERSEY:
      const arr = [...state.jerseys];
      arr[action.payload.itemIndex].jerseyCount = action.payload.updateCount;

      return {
        ...initialState,
        jerseys: arr,
        total: countTotal(arr)
      }
    default:
      return state;
  }
}

const countTotal = (jerseys) => {
  const priceArr = [];
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  jerseys.map(jersey => {
    return (
      priceArr.push(jersey.discount ? (jersey.jerseyCount * jersey.discount) : (jersey.jerseyCount * jersey.price))
    );
  })
  const totalPrice = priceArr.length > 0 && priceArr.reduce(reducer)
  return totalPrice;
}
