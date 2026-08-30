export type ActivityType =
  | "earning"
  | "download"
  | "success"
  | "wallet";

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  time: string;
}

export const activitiesData: Activity[] = [
  {
    id: "activity-1",
    type: "earning",
    title: "You earned ₦150",
    description: "ECO 304 - Exam Prep Notes",
    time: "2m ago",
  },
  {
    id: "activity-2",
    type: "download",
    title: "New Download",
    description: "A student downloaded your document",
    time: "2h ago",
  },
  {
    id: "activity-3",
    type: "success",
    title: "Document minted successfully",
    description: "Your document is now available",
    time: "Yesterday",
  },
  {
    id: "activity-4",
    type: "wallet",
    title: "Earnings received",
    description: "Payment added to your wallet",
    time: "Yesterday",
  },
];