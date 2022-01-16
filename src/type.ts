export interface IAnime {
  mal_id: number;
  rank: number;
  title: string;
  url: string;
  image_url: string;
  type: string;
  episodes: number;
  start_date?: string;
  end_date?: string;
  members: number;
  score: number;
}

export interface ISearchDetails {
  mal_id: number;
  url: string;
  image_url: string;
  title: string;
  airing: boolean;
  synopsis: string;
  type: string;
  episodes: number;
  score: number;
  start_date: string;
  end_date: string;
  members: number;
  rated: string;
}

export interface IAnimeDetails {
  aired: any;
  airing: boolean;
  background?: string;
  broadcast: string;
  demographics: Array<any>;
  duration: string;
  ending_themes: Array<any>;
  episodes?: Array<any>;
  explicit_genres: Array<any>;
  favorites: number;
  image_url: string;
  licensors: Array<any>;
  mal_id: number;
  members: number;
  opening_themes: Array<any>;
  popularity: number;
  premiered?: string;
  producers: Array<any>;
  rank: string;
  rating: string;
  score?: number;
  scored_by?: string;
  source: string;
  status: string;
  external_links: Array<{ name: string; url: string }>;
  themes: Array<{ mal_id: number; type: string; name: string; url: string }>;
  genres: Array<{ mal_id: number; type: string; name: string; url: string }>;
  studios: Array<{ mal_id: number; type: string; name: string; url: string }>;
  synopsis: string;
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: Array<string>;
  trailer_url: string;
  type: string;
  url: string;
  related: {
    Adaptation: Array<{
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }>;
  };
}
