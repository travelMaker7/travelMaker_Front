export interface TripDetail {
  tripPlanId: number;
  destinationName: string;
  wishCnt: number;
  wishJoin: boolean;
  address: string;
  arriveTime: string;
  leaveTime: string;
  overWish: boolean;
}

export interface TripPlan {
  dateNum: string;
  details: TripDetail[];
}

export interface ScheduleDetail {
  scheduleId: number;
  markers: { destinationY: string; destinationX: string }[];
  scheduleName: string;
  startDate: string;
  finishDate: string;
  tripPlans: TripPlan[];
  chatUrl: string;
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

export interface EnhancedMarkerData extends MarkerData {
  tripPlanId: number;
}

export interface BaseSchedule {
  scheduleId: string;
  scheduleName: string;
  nickname: string;
}

export interface RegisteredSchedule extends BaseSchedule {
  scheduleDescription: string;
}

export interface ParticipatingSchedule extends BaseSchedule {
  tripPlanId: string;
  scheduleDate: string;
  arriveTime: string;
  leaveTime: string;
  region: string;
  destinationName: string;
  status: string;
}

export interface ButtonProps {
  isActive: boolean;
}

export type Schedule = RegisteredSchedule | ParticipatingSchedule;
