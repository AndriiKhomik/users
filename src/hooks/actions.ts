import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { settingsActions } from "../store/settings/settingsSlice";

const actions = {
  ...settingsActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
