import { Route, Routes } from "react-router-dom";

import { routes } from "@/app/config/router";

function App() {
  const publicRouterList = Object.entries(routes.public);
  // const internalRouterList = Object.entries(routes.internal);
  const externalRouterList = Object.entries(routes.external);

  return (
    <Routes>
      <Route>
        {externalRouterList.map(([path, PageComponent]) => (
          <Route key={path} element={<PageComponent />} path={path} />
        ))}
      </Route>

      {/* <Route element={<ProtectedRouteGuard />}>
        {internalRouterList.map(([path, PageComponent]) => (
          <Route key={path} element={<PageComponent />} path={path} />
        ))}
      </Route> */}

      {publicRouterList.map(([path, PageComponent]) => (
        <Route key={path} element={<PageComponent />} path={path} />
      ))}
    </Routes>
  );
}

export default App;
