export type Entry = {
  type: number;
  channel_id: string;
  content: string;
  attachments: Attachment[];
  embeds: Embed[];
  timestamp: Date;
  edited_timestamp: Date | null;
  flags: number;
  components: any[];
  id: string;
  author: Author;
  mentions: any[];
  mention_roles: any[];
  pinned: boolean;
  mention_everyone: boolean;
  tts: boolean;
  thread?: Thread;
  reactions: Reaction[];
  message_reference?: MessageReference;
  position?: number;
  referenced_message?: ReferencedMessage;
};

export type Attachment = {
  id: string;
  filename: string;
  size: number;
  url: string;
  proxy_url: string;
  width: number;
  height: number;
  content_type: ContentType;
  content_scan_version: number;
  placeholder: string;
  placeholder_version: number;
};

export enum ContentType {
  IMAGE_PNG = 'image/png',
  IMAGE_JPEG = 'image/jpeg',
  IMAGE_WEBP = 'image/webp',
  IMAGE_GIF = 'image/gif',
  VIDEO_MP4 = 'video/mp4',
  VIDEO_WEBM = 'video/webm',
  VIDOE_MATROSKA = 'video/x-matroska',
  VIDEO_QUICKTIME = 'video/quicktime',
  UNKNOWN = 'unknown',
}

export type Author = {
  id: string;
  username: string;
  avatar: null | string;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: null;
  accent_color: null;
  global_name: null | string;
  avatar_decoration_data: AvatarDecorationData | null;
  banner_color: null;
  clan: null;
};

export type AvatarDecorationData = {
  asset: string;
  sku_id: string;
};

export type Embed = {
  type: string;
  url: string;
  title: string;
  reference_id: string;
  provider: Provider;
  thumbnail: Thumbnail;
  content_scan_version: number;
};

export type Provider = {
  name: string;
};

export type Thumbnail = {
  url: string;
  proxy_url: string;
  width: number;
  height: number;
  placeholder: string;
  placeholder_version: number;
};

export type MessageReference = {
  type: number;
  channel_id: string;
  message_id: string;
  guild_id: string;
};

export type Reaction = {
  emoji: Emoji;
  count: number;
  count_details: CountDetails;
  burst_colors: any[];
  me_burst: boolean;
  burst_me: boolean;
  me: boolean;
  burst_count: number;
};

export type CountDetails = {
  burst: number;
  normal: number;
};

export type Emoji = {
  id: null | string;
  name: string;
};

export type ReferencedMessage = {
  type: number;
  channel_id: string;
  content: string;
  attachments: Attachment[];
  embeds: any[];
  timestamp: Date;
  edited_timestamp: Date | null;
  flags: number;
  components: any[];
  id: string;
  author: Author;
  mentions: any[];
  mention_roles: any[];
  pinned: boolean;
  mention_everyone: boolean;
  tts: boolean;
  thread?: Thread;
};

export type Thread = {
  id: string;
  type: number;
  last_message_id: string;
  flags: number;
  guild_id: string;
  name: string;
  parent_id: string;
  rate_limit_per_user: number;
  bitrate: number;
  user_limit: number;
  rtc_region: null;
  owner_id: string;
  thread_metadata: ThreadMetadata;
  message_count: number;
  member_count: number;
  total_message_sent: number;
  member_ids_preview: string[];
};

export type ThreadMetadata = {
  archived: boolean;
  archive_timestamp: Date;
  auto_archive_duration: number;
  locked: boolean;
  create_timestamp: Date;
};
