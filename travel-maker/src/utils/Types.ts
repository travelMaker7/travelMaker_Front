export interface TripDetail {
  tripPlanId: number;
  destinationName: string;
  wishCnt: number;
  wishJoin: boolean;
  address: string;
  arriveTime: string;
  leaveTime: string;
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
  scheduleName: string;
  destinationName: string;
  userName: string;
}

export interface MarkerData {
  destinationY: string;
  destinationX: string;
}

export interface EnhancedMarkerData extends MarkerData {
  tripPlanId: number;
}
