import CreateCollectionPage from "@pages/CreateCollectionPage";
import CreateMiniaturePage from "@pages/CreateMiniaturePage";
import IndexPage from "@pages/index";
import ListMiniaturesByCollectionIdPage from "@pages/ListMiniaturesByCollectionIdPage";
import MiniatureDetailsPage from "@pages/MiniatureDetailsPage";
import NotFoundPage from "@pages/NotFound";
import { ComponentType } from "react";

import CollectionDetailsPage from "@/ui/pages/CollectionDetailsPage";
import CollectionEditPage from "@/ui/pages/CollectionEditPage";

export interface RouteConfig {
  [path: string]: ComponentType;
}

interface RouterConfig {
  external: RouteConfig;
  internal: RouteConfig;
  public: RouteConfig;
}

export const routes = {
  external: {
    "/": IndexPage,
    "/collections/new": CreateCollectionPage,
    "/collections/:collectionId": ListMiniaturesByCollectionIdPage,
    "/collections/:collectionId/edit": CollectionEditPage,
    "/collections/:collectionId/info": CollectionDetailsPage,
    "/collections/:collectionId/miniatures/new": CreateMiniaturePage,
    "/collections/:collectionId/miniatures/:miniatureId": MiniatureDetailsPage,
  },

  internal: {},

  public: {
    "*": NotFoundPage,
  },
} satisfies RouterConfig;
