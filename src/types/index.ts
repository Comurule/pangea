export interface SubScriberParams {
  topic: string;
  url: string;
}

export interface PublisherParams {
  topic: string;
  message: {
    [key: string]: any;
  };
}
