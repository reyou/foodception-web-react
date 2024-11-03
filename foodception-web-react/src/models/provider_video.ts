// Represents the `youtubeChannel` object
export interface YoutubeChannel {
  id: string;
  channelId: string;
  channelTitle: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Represents each item in `youtubeChannelVideoImages` array
export interface YoutubeChannelVideoImage {
  id: string;
  url: string;
  width: number;
  height: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Main interface for `ProviderVideo`
export interface ProviderVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string; // ISO date string
  videoId: string;
  youtubeChannel: YoutubeChannel;
  youtubeChannelVideoImages: YoutubeChannelVideoImage[];
}
