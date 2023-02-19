import React from 'react';
import { Routes, Route } from 'react-router';
import ROUTES from '@src/constants/routes.json';
// @ts-ignore
import loadable from '@loadable/component';

// Load bundles asynchronously so that the initial render happens faster
const Welcome = loadable(
  () =>
    import(/* webpackChunkName: "WelcomeChunk" */ '@src/pages/welcome/welcome'),
);
const About = loadable(
  () => import(/* webpackChunkName: "AboutChunk" */ '@src/pages/about/about'),
);
const Motd = loadable(
  () => import(/* webpackChunkName: "MotdChunk" */ '@src/pages/motd/motd'),
);
const Localization = loadable(
  () =>
    import(
      /* webpackChunkName: "LocalizationChunk" */ '@src/pages/localization/localization'
    ),
);
const UndoRedo = loadable(
  () =>
    import(
      /* webpackChunkName: "UndoRedoChunk" */ '@src/pages/undoredo/undoredo'
    ),
);
const ContextMenu = loadable(
  () =>
    import(
      /* webpackChunkName: "ContextMenuChunk" */ '@src/pages/contextmenu/contextmenu'
    ),
);
const Image = loadable(
  () =>
    import(/* webpackChunkName: "ContextMenuChunk" */ '@src/pages/image/image'),
);

function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.WELCOME} element={<Welcome />}></Route>
      <Route path={ROUTES.ABOUT} element={<About />}></Route>
      <Route path={ROUTES.MOTD} element={<Motd />}></Route>
      <Route path={ROUTES.LOCALIZATION} element={<Localization />}></Route>
      <Route path={ROUTES.UNDOREDO} element={<UndoRedo />}></Route>
      <Route path={ROUTES.CONTEXTMENU} element={<ContextMenu />}></Route>
      <Route path={ROUTES.IMAGE} element={<Image />}></Route>
    </Routes>
  );
}

export default AppRoutes;
