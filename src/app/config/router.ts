import CreateCollectionPage from "@pages/CreateCollectionPage";
import CreateMiniaturePage from "@pages/CreateMiniaturePage";
import IndexPage from "@pages/index";
import ListMiniaturesByCollectionIdPage from "@pages/ListMiniaturesByCollectionIdPage";
import MiniatureDetailsPage from "@pages/MiniatureDetailsPage";
import NotFoundPage from "@pages/NotFound";
import { ComponentType } from "react";
import CollectionDetailsPage from "@pages/CollectionDetailsPage";
import CollectionEditPage from "@pages/CollectionEditPage";
import MiniatureEditPage from "@pages/MiniatureEditPage";

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
    "/collections/:collectionId/miniatures/:miniatureId/edit":
      MiniatureEditPage,
  },

  internal: {},

  public: {
    "*": NotFoundPage,
  },
} satisfies RouterConfig;
