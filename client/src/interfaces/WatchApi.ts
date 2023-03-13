export interface Collection {
  id: string;
  brand: string;
  model: string;
  name: string;
  description: string;
  image: string;
  sub_images?: string[];
  sub_descriptions?: string[];
  favorite: string[];
}

export interface WatchAPIInterface {
  brand: string;
  models: Collection[];
}
