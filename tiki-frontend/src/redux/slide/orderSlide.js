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
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === orderItem.product
      );
      if (itemOrder) {
        if (itemOrder.amount <= itemOrder.countInstock) {
          itemOrder.amount += orderItem?.amount;
          state.isSucessOrder = true;
          state.isErrorOrder = false;
        }
      } else {
        state.orderItems.push(orderItem);
      }
    },
    resetOrder: (state) => {
      state.isSucessOrder = false;
    },
    resetState: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  addOrderProduct,
  removeOrderProduct,
  removeAllOrderProduct,
  resetOrder,
  resetState,
} = orderSlide.actions;

export default orderSlide.reducer;
