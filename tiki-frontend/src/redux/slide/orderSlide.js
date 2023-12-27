import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  shippingAddress: {},
  paymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  user: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
  isSucessOrder: false,
};

export const orderSlide = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      console.log("action.payload set order", action.payload);
      state.orderItems = action.payload.orderItems;
      state.shippingAddress = action.payload.shippingAddress;
      state.paymentMethod = action.payload.paymentMethod;
      state.itemsPrice = action.payload.itemsPrice;
      state.shippingPrice = action.payload.shippingPrice;
      state.totalPrice = action.payload.totalPrice;
      state.user = action.payload.user;
      state.isPaid = action.payload.isPaid;
      state.isDelivered = action.payload.isDelivered;
    },

    resetOrder: (state) => {
      state.isSucessOrder = false;
    },
    resetState: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  setOrder,
  removeOrderProduct,
  removeAllOrderProduct,
  resetOrder,
  resetState,
} = orderSlide.actions;

export default orderSlide.reducer;
