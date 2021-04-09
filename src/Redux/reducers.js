import {LOGS,DELETELOGS} from "./types";

const defaultStore = [];

const AddDeleteLogsReducer = (store = defaultStore, action) => {
  switch (action.type) {
    case LOGS:
      return [...store, action.equation];
    case DELETELOGS:
      return [];
    default:
      return store;
  }
};

export default AddDeleteLogsReducer;
