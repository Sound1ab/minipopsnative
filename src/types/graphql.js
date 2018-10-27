// @flow

export interface Query {
  readEBayByKeywords?: Array<Ebay | null>;
  readEBayByFavourites?: Array<Ebay | null>;
  readFavourites?: Favourites;
  readNotifications?: Notifications;
  readAllNotifications?: Array<Notifications | null>;
  readMarketPlace?: Array<Listing | null>;
  readRelatedArtists?: Array<Artist | null>;
  readArtistReleases?: ReadArtistReleases;
  readArtistAlbum?: ArtistAlbum;
  readUser?: User;
  readWatching?: Watching;
}

export interface Ebay {
  title?: string;
  imageUrl?: Array<string | null>;
  itemUrl?: string;
  itemId?: string;
  price?: string;
  endTime?: string;
  startTimeUnmodified?: string;
  endTimeUnmodified?: string;
  bids?: string;
  postage?: string;
  searchResults?: number;
  priority?: number;
}

export interface Favourites extends Entity {
  id: string;
  favourites: Array<Favourite | null>;
  createdAt?: string;
  updatedAt?: string;
}

export interface Entity {
  id: string;
}

/** Use this to resolve interface type Entity */
export type PossibleEntityTypeNames =
  | 'Favourites'
  | 'Notifications'
  | 'User'
  | 'Watching'

export interface EntityNameMap {
  Entity: Entity;
  Favourites: Favourites;
  Notifications: Notifications;
  User: User;
  Watching: Watching;
}

export interface Favourite {
  artist: string;
  album: string;
  imageBigUrl: string;
  imageMediumUrl: string;
  imageSmallUrl: string;
  spotifyId: string;
  popularity: number;
  tracks?: Array<string>;
}

export interface Notifications extends Entity {
  id: string;
  userId: string;
  itemId: string;
  notifications: Array<Notification | null>;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  expiration: number;
  url: string;
  title: string;
}

export interface Listing {
  title: string;
  price: string;
  image: string;
  link: string;
}

export interface Artist {
  title: string;
  imageUrl: string;
  genres: Array<string | null>;
  itemUrl: string;
  spotifyId: string;
  primary: boolean;
}

export interface ReadArtistReleases {
  nextOffset: number;
  limit: number;
  total: number;
  done: boolean;
  items?: Array<ArtistReleases | null>;
}

export interface ArtistReleases {
  title: string;
  secondaryTitle: string;
  imageBigUrl: string;
  imageMediumUrl: string;
  imageSmallUrl: string;
  releaseDate: string;
  spotifyId: string;
  itemUrl: string;
}

export interface ArtistAlbum {
  artist: string;
  album: string;
  tracks: Array<string | null>;
  imageBigUrl: string;
  imageMediumUrl: string;
  imageSmallUrl: string;
  spotifyId: string;
  popularity: number;
}

export interface User extends Entity {
  id: string;
  deviceToken?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Watching extends Entity {
  id: string;
  watching?: Array<WatchingItem | null>;
  createdAt: string;
  updatedAt: string;
}

export interface WatchingItem {
  artist: string;
  album: string;
  spotifyId: string;
}

export interface Mutation {
  createFavourites?: Favourites;
  updateFavourites?: Favourites;
  deleteFavourites?: Favourites;
  createNotifications?: Notifications;
  updateNotifications?: Notifications;
  deleteNotifications?: Notifications;
  deleteExpiredNotification?: Notifications;
  createUser?: User;
  updateUser?: User;
  deleteUser?: string;
  createWatching?: Watching;
  updateWatching?: Watching;
  deleteWatching?: Watching;
}

export interface InputFavourite {
  artist: string;
  album: string;
  imageBigUrl: string;
  imageMediumUrl: string;
  imageSmallUrl: string;
  spotifyId: string;
  popularity: number;
  tracks?: Array<string>;
}

export interface InputNotification {
  id: string;
  expiration: number;
  url: string;
  title: string;
}

export interface InputWatching {
  artist: string;
  album: string;
  spotifyId: string;
}
