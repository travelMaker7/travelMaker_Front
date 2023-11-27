export interface TripDetail {
  tripPlanId: number;
  destinationName: string;
  wishCnt: number;
  wishJoin: boolean;
  address: string;
  arriveTime: string;
  leaveTime: string;
  overWish: boolean;
  joinCnt: number;
}

export interface TripPlan {
  scheduledDate: string;
  tripPlanDetails: TripDetail[];
}

export interface ScheduleDetail {
  scheduleId: number;
  markers: { destinationY: string; destinationX: string }[];
  scheduleName: string;
  tripPlans: TripPlan[];
  chatUrl: string;
  scheduleDescription?: string;
  hostId: number;
}

export interface Notifications {
  joinId: number;
  joinStatus: string;
  scheduleName: string;
  destinationName: string;
  nickname: string;
}

export interface MarkerData {
  destinationY: string;
  destinationX: string;
}

export interface BaseSchedule {
  scheduleId: string;
  scheduleName: string;
}

export interface RegisteredSchedule extends BaseSchedule {
  scheduleDescription: string;
  markers: MarkerData[];
}

export interface ParticipatingSchedule extends BaseSchedule {
  tripPlanId: string;
  scheduleDate: string;
  arriveTime: string;
  leaveTime: string;
  region: string;
  destinationName: string;
  status: string;
  destinationY: string;
  destinationX: string;
}

export interface ButtonProps {
  isActive: boolean;
}
