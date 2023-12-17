import { createSlice, createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cartTotal: 0,
  orderby: "",
};

export const cartSlide = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const cartItem = action.payload.products;
      const alreadyExists = state?.products?.find(
        (item) => item?.id === cartItem.product
      );
      if (alreadyExists) {
        alreadyExists.amount += cartItem?.amount;
      } else {
        state.products.push(cartItem);
        state.orderby = action.payload.user.user;
      }
    },
    increaseAmount: (state, action) => {
      const idProduct = action.payload;
      const itemCart = state?.products?.find((item) => item?.id === idProduct);
      itemCart.amount++;
    },
    decreaseAmount: (state, action) => {
      const idProduct = action.payload;
      const itemCart = state?.products?.find((item) => item?.id === idProduct);
      itemCart.amount--;
    },
    removeCartProduct: (state, action) => {
      const { idProduct } = action.payload;
      const removedProduct = state?.products?.filter(
        (item) => item?.id !== idProduct
      );

      if (removedProduct) {
        state.products = state.products.filter(
          (item) => item?.id !== idProduct
        );
      }
    },
    setCartProduct: (state, action) => {
      console.log("action.payload: ", action.payload);
      state.products = action.payload.products;
      state.cartTotal = action.payload.cartTotal;
    },
    resetState: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  addtoCart,
  increaseAmount,
  decreaseAmount,
  removeCartProduct,
  setCartProduct,
  resetState,
} = cartSlide.actions;

export default cartSlide.reducer;
