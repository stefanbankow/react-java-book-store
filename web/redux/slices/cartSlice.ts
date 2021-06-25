import { BookProps } from "./../../types/BookTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  items: Array<BookProps>;
  quantityById: {
    [index: number]: number;
  };
  totalPrice: number;
}

let initialState: CartState = {
  items: [],
  quantityById: {},
  totalPrice: 0,
};

if (typeof window !== "undefined") {
  const cartState = localStorage.getItem("book-store-cart");
  if (cartState) initialState = JSON.parse(cartState);
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<BookProps>) => {
      if (
        state.items.findIndex((book) => book.id === action.payload.id) === -1
      ) {
        state.items.push(action.payload);
        state.quantityById[action.payload.id] = 1;
      } else state.quantityById[action.payload.id] += 1;
      state.totalPrice += action.payload.price;
      if (typeof window !== "undefined") {
        localStorage.setItem("book-store-cart", JSON.stringify(state));
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const book = state.items.find((item) => item.id === action.payload);
      if (book) {
        const bookQuantity = state.quantityById[book.id];
        delete state.quantityById[action.payload];
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.totalPrice -= (book?.price || 0) * bookQuantity;
        if (typeof window !== "undefined") {
          localStorage.setItem("book-store-cart", JSON.stringify(state));
        }
      }
    },
    changeQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number; price: number }>
    ) => {
      const difference =
        action.payload.quantity - state.quantityById[action.payload.id];
      state.quantityById[action.payload.id] = action.payload.quantity;
      state.totalPrice += difference * action.payload.price;
      if (typeof window !== "undefined") {
        localStorage.setItem("book-store-cart", JSON.stringify(state));
      }
    },
  },
});

export const { addItem, removeItem, changeQuantity } = cartSlice.actions;

export default cartSlice.reducer;
