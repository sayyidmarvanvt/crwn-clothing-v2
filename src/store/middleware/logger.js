export const logger = (store) => (next) => (action) => {
    // Log the action type and payload
    console.log("Dispatching Action:", {
      type: action.type,
      payload: action.payload,
    });
  
    // Log the current state before the action is processed
    console.log("Current State:", store.getState());
  
    // Call the next middleware or reducer
    console.log("Before Action");
    next(action);
    console.log("After Action");
  
    // Log the updated state after the action has been processed
    console.log("Updated State:", store.getState());
  };
  