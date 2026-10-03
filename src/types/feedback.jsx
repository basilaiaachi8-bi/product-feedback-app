

export type Category = 'all' | 'ui' | 'ux' | 'enhancement' | 'bug' | 'feature';
export type RoadmapStatus = 'suggestion' | 'planned' | 'in-progress' | 'live';
export type SortOption = 'most-upvotes' | 'least-upvotes' | 'most-comments' | 'least-comments';

export interface Comment {
  id: number;
  content: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
  replies?: {
    content: string;
    replyingTo: string;
    user: {
      image: string;
      name: string;
      username: string;
    };
  }[];
}

export interface FeedbackItem {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: RoadmapStatus;
  description: string;
  comments?: Comment[];
}