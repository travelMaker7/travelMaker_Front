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
  makers: { destinationY: string; destinationX: string }[];
  scheduleName: string;
  startDate: string;
  finishDate: string;
  tripPlans: TripPlan[];
  chatUrl: string;
}