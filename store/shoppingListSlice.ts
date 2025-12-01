import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  category?: string;
  purchased: boolean;
}

interface ShoppingListState {
  items: ShoppingItem[];
}

const initialState: ShoppingListState = {
  items: [],
};

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<ShoppingItem, 'id' | 'purchased'>>) => {
      const newItem: ShoppingItem = {
        ...action.payload,
        id: Date.now().toString(),
        purchased: false,
      };
      state.items.push(newItem);
    },
    editItem: (state, action: PayloadAction<ShoppingItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    togglePurchased: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.purchased = !item.purchased;
      }
    },
    clearList: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, editItem, deleteItem, togglePurchased, clearList } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
