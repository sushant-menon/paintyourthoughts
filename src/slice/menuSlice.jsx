import { MENU_ITEMS } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeMenuItems: MENU_ITEMS.PENCIL,
  actionMenuItems: null,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    menuItemClicked: (state, action) => {
      state.activeMenuItems = action.payload;
    },
    actionItemClicked: (state, action) => {
      state.actionMenuItems = action.payload;
    },
  },
});

export const { menuItemClicked, actionItemClicked } = menuSlice.actions;
export default menuSlice.reducer;
