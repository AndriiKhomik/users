import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuItem } from "../../types";

const LS_SETTINGS_KEY = "ls_settings";

const initialData = {
  page: 1,
  skip: 0,
  itemsPerPage: 10,
  search: "",
  filter: "",
  columns: [
    { key: "fullName", value: "Full name", isShow: true, isCanHide: false },
    { key: "birthDate", value: "Birthday", isShow: true, isCanHide: true },
    { key: "gender", value: "Gender", isShow: true, isCanHide: true },
    { key: "email", value: "Email", isShow: true, isCanHide: false },
    { key: "phone", value: "Phone", isShow: true, isCanHide: true },
    { key: "username", value: "Username", isShow: true, isCanHide: false },
    {
      key: "generalInfo",
      value: "General Info",
      isShow: true,
      isCanHide: true,
    },
    { key: "domain", value: "Domain", isShow: true, isCanHide: true },
    { key: "ip", value: "IP", isShow: true, isCanHide: true },
    { key: "macAddress", value: "Mac address", isShow: true, isCanHide: true },
  ],
};

const initialState = {
  settings: JSON.parse(
    localStorage.getItem(LS_SETTINGS_KEY) ?? JSON.stringify({ ...initialData })
  ),
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setItemsPerPage(state, action: PayloadAction<number | string>) {
      state.settings.itemsPerPage = +action.payload;
      state.settings.page = 1;
      state.settings.skip = 0;
      localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(state.settings));
    },
    setPage(state, action: PayloadAction<number | string>) {
      state.settings.page = action.payload;
      state.settings.skip = state.settings.skip + state.settings.itemsPerPage;
      localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(state.settings));
    },
    setLastPage(state, action: PayloadAction<number | string>) {
      state.settings.page = action.payload;
      state.settings.skip = state.settings.itemsPerPage * (+action.payload - 1);
      localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(state.settings));
    },
    setFirstPage(state, action: PayloadAction<number | string>) {
      state.settings.page = action.payload;
      state.settings.skip = 0;
      localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(state.settings));
    },
    increasePage(state, action: PayloadAction<number | string>) {
      state.settings.page = state.settings.page + action.payload;
      state.settings.skip = state.settings.skip + state.settings.itemsPerPage;
      localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(state.settings));
    },
    descreasePage(state, action: PayloadAction<number | string>) {
      state.settings.page = state.settings.page - +action.payload;
      state.settings.skip = state.settings.skip - state.settings.itemsPerPage;
      localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(state.settings));
    },
    toggleColumn(state, action: PayloadAction<MenuItem>) {
      if (action.payload.isCanHide) {
        const idx = state.settings.columns.findIndex(
          (column: MenuItem) => column.key === action.payload.key
        );
        state.settings.columns[idx] = {
          ...state.settings.columns[idx],
          isShow: !state.settings.columns[idx].isShow,
        };
        localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(state.settings));
      }
    },
    setSearch(state, action: PayloadAction<string>) {
      state.settings.search = action.payload;
      state.settings.page = 1;
      state.settings.itemsPerPage = 10;
      state.settings.skip = 0;
    },
    setFilter(state, action: PayloadAction<string>) {
      state.settings.filter = action.payload;
    },
  },
});

export const settingsActions = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
