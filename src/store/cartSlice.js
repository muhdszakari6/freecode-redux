import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    showCart: false,
    changed: false,
  },
  reducers: {
    replaceData(state, action) {
      state.changed = false;

      state.totalQuantity = action.payload?.totalQuantity || 0;
      state.itemsList = action.payload?.itemsList || [];
    },
    addToCart(state, action) {
      state.changed = true;
      const newItem = action.payload;
      const existingItem = state.itemsList.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
        return;
      }
      state.itemsList.push({
        id: newItem.id,
        price: newItem.price,
        quantity: 1,
        totalPrice: newItem.price,
        name: newItem.name,
      });
      state.totalQuantity = state.itemsList.length;
    },
    removeFromCart(state, action) {
      state.changed = true;
      const id = action.payload;
      const item = state.itemsList.find((item) => item.id === id);
      if (item.quantity === 1) {
        const index = state.itemsList.findIndex((item) => item.id === id);
        state.itemsList.splice(index, 1);
        state.totalQuantity = state.itemsList.length;
        return;
      }
      item.quantity--;
      item.totalPrice -= item.price;
    },
    setShowCart(state, _) {
      state.changed = false;

      state.showCart = !state.showCart;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
