export type FollowUp = {
  id: number;
  follow_up_type: "reserve" | "cancel" | "comment" | "follow_up";
  comment: string | null;
  created_at: string;
};
