import { StrictMode } from 'react';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client';

import App from '@containers/app/App';
import { store } from "./store/Store";
import "./index.scss";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </StrictMode>
);
