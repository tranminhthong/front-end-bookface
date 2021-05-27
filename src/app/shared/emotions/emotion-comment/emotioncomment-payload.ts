import {EmotionType} from "../emotion/emotion-type";

export interface EmotionCommentPayload {
  emotionType?: EmotionType;
  commentId?: number;
}
