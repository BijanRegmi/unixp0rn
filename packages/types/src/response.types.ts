import { ContentType } from './raw.types';

export type AuthorResponse = {
  id: string;
  username: string;
};

export type AttachmentResponse = {
  id: string;
  filename: string;
  url: string;
  type: ContentType;
  entryId: string;
};

export type ReactionResponse = {
  id: string;
  name: string;
  count: string;
  entryId: string;
};

export type ListResponse = {
  id: string;
  timestamp: Date;
  content: string;
  reactionCount: number;
  author: AuthorResponse;
  authorId: string;
  attachments: AttachmentResponse;
  reactions: ReactionResponse;
};
