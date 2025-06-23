export type FollowUp = {
  id: number;
  follow_up_type: { id: number };
  comment: string | null;
  action_date: string;
};
