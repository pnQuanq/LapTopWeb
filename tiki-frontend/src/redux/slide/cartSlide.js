import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cartTotal: 0,
  itemsPrice: 0,
  orderby: "",
};

export const cartSlide = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const cartItem = action.payload.products;
      const itemCart = state?.products?.find(
        (item) => item?.product === cartItem.product
      );
      if (itemCart) {
        itemCart.amount += cartItem?.amount;
      } else {
        state.products.push(cartItem);
      }
    },
    increaseAmount: (state, action) => {
      const idProduct = action.payload;
      console.log("idProduct", idProduct);
      const itemCart = state?.products?.find(
        (item) => item?.product === idProduct
        //
      );
      console.log("itemCart", itemCart);
      itemCart.amount++;
    },
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemCart = state?.cartItems?.find(
        (item) => item?.product === idProduct
      );
      itemCart.amount--;
    },
    removeCartProduct: (state, action) => {
      const { idProduct } = action.payload;
      const itemCart = state?.products?.filter(
        (item) => item?.product !== idProduct
      );
      console.log("itemCart", itemCart);
      state.products = itemCart;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addtoCart, increaseAmount, decreaseAmount, removeCartProduct } =
  cartSlide.actions;

export default cartSlide.reducer;
