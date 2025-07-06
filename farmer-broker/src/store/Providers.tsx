// provider.tsx
"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

// "use client";

// import { ReactNode } from "react";
// import { Provider } from "react-redux";
// import { store } from "./store";

// export default function Providers({ children }: { children: ReactNode }) {
//   return <Provider store={store}>{children}</Provider>;
// }
