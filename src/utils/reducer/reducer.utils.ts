import { UnknownAction } from "redux";

//Action type Guards
type Matchable<AC extends () => UnknownAction> = AC & {
  type: ReturnType<AC>["type"];
  //type predicate
  match(action: UnknownAction): action is ReturnType<AC>;
};

//The Matchable type takes action creators and actions with unknown or any type. It extracts the action creator's return type and attaches it to a match method. This method is used to narrow down the action type in reducers. Essentially, Matchable allows reducers to handle only specific actions by matching them with the correct action creator.

//Function Overloads
export function withMatcher<AC extends () => UnknownAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

export function withMatcher<
  AC extends (...args: any[]) => UnknownAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

//Function Implementation
export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: UnknownAction) {
      return action.type === type;
    },
  });
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};
export type Action<T> = {
  type: T;
};

//Function Overloads
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

//Function Implementation
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
