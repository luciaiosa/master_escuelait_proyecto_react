import "./index.scss";

import App from '@/modules/app';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { store } from "./stores/Store";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </StrictMode>
);
