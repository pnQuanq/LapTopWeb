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
        state.cartTotal += cartItem.price * cartItem.amount;
        state.orderby = action.payload.user.user;
      }
    },
    increaseAmount: (state, action) => {
      const idProduct = action.payload;
      const itemCart = state?.products?.find((item) => item?.id === idProduct);
      itemCart.amount++;
      state.cartTotal += itemCart.price;
    },
    decreaseAmount: (state, action) => {
      const idProduct = action.payload;
      const itemCart = state?.products?.find((item) => item?.id === idProduct);
      itemCart.amount--;
      state.cartTotal -= itemCart.price;
    },
    // removeCartProduct: (state, action) => {
    //   const { idProduct } = action.payload;

    //   const removedProduct = state?.products?.filter(
    //     (item) => item?.id !== idProduct
    //   );

    //   if (removedProduct && removedProduct.length > 0) {
    //     const productArray = removedProduct.map((proxy) => ({ ...proxy })); // Chuyển đổi Proxy thành object
    //     const removedProductId = removedProduct[0].id;
    //     console.log("Removed Product Id: ", removedProductId);
    //     console.log("Removed Product Info: ", productArray);

    //     state.products = state.products.filter(
    //       (item) => item?.id !== idProduct
    //     );

    //     // Thực hiện các hành động khác với productArray
    //     // Ví dụ: state.cartTotal -= productArray[0].price * productArray[0].amount;
    //   }
    // },

    removeCartProduct: (state, action) => {
      const { idProduct } = action.payload;
      const removedProduct = state?.products?.filter(
        (item) => item?.id === idProduct
      );

      const itemsCart = state?.products?.filter(
        (item) => item?.id !== idProduct
      );

      state.cartTotal -= removedProduct[0].price * removedProduct[0].amount;
      state.products = itemsCart;
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
