import { AppStore, InitialAppStore } from "./app";
import { Store, applyMiddleware, compose, createStore } from "redux";

import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./RootReducer";
import { rootSaga } from "./RootSagas";
// import { logger } from "redux-logger";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
// add redux store devtools chrome extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

function configureStore(initialStoreState: AppStore): Store<AppStore> {
    const middlewares = [sagaMiddleware];

    if (process.env.NODE_ENV === `development`) {
        console.log(" logger");
        // middlewares.push(logger);
    }
    // Initialize redux store. This store uses two middlewares: logger and SAGA.
    // Redux-logger tool to inspect in console panel triggered actions and state of Redux store.
    const store = createStore(
        rootReducer,
        initialStoreState,
        composeEnhancers(applyMiddleware(...middlewares))
    );
    return store;
}

export const store = configureStore(InitialAppStore);

sagaMiddleware.run(rootSaga);
