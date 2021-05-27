import {EmotionType} from './emotion-type';

export interface EmotionPayload {
  emotionType?: EmotionType;
  postId?: number;
}
