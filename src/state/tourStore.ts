import { create } from "zustand";
import { getAreaById, type Area, type Coordinates, type Waypoint } from "../content";

export type TourStatus =
  | "idle"
  | "navigating-to-start"
  | "touring"
  | "paused"
  | "complete";

interface TourState {
  status: TourStatus;
  area: Area | null;
  currentWaypointIndex: number;
  visitedWaypointIds: string[];
  isOffRoute: boolean;
  lastKnownLocation: Coordinates | null;

  selectArea: (areaId: string) => void;
  beginNavigationToStart: () => void;
  arrivedAtStart: () => void;
  enterWaypoint: (waypointId: string) => void;
  pause: () => void;
  resume: () => void;
  skipToNext: () => void;
  skipToPrevious: () => void;
  setOffRoute: (offRoute: boolean) => void;
  setLastKnownLocation: (coords: Coordinates) => void;
  completeTour: () => void;
  reset: () => void;
}

const initialState = {
  status: "idle" as TourStatus,
  area: null as Area | null,
  currentWaypointIndex: -1,
  visitedWaypointIds: [] as string[],
  isOffRoute: false,
  lastKnownLocation: null as Coordinates | null,
};

export const useTourStore = create<TourState>((set, get) => ({
  ...initialState,

  selectArea: (areaId) => {
    const area = getAreaById(areaId) ?? null;
    set({ ...initialState, area });
  },

  beginNavigationToStart: () => {
    if (!get().area) return;
    set({ status: "navigating-to-start" });
  },

  arrivedAtStart: () => {
    if (!get().area) return;
    set({ status: "touring", currentWaypointIndex: 0 });
  },

  enterWaypoint: (waypointId) => {
    const { area, visitedWaypointIds } = get();
    if (!area) return;
    const index = area.route.findIndex((w) => w.id === waypointId);
    if (index === -1) return;

    const alreadyVisited = visitedWaypointIds.includes(waypointId);
    const nextVisited = alreadyVisited
      ? visitedWaypointIds
      : [...visitedWaypointIds, waypointId];

    set({
      currentWaypointIndex: index,
      visitedWaypointIds: nextVisited,
      isOffRoute: false,
      status: "touring",
    });
  },

  pause: () => {
    if (get().status !== "touring") return;
    set({ status: "paused" });
  },

  resume: () => {
    if (get().status !== "paused") return;
    set({ status: "touring" });
  },

  skipToNext: () => {
    const { area, currentWaypointIndex } = get();
    if (!area) return;
    const nextIndex = Math.min(currentWaypointIndex + 1, area.route.length - 1);
    const isComplete = currentWaypointIndex >= area.route.length - 1;
    set({
      currentWaypointIndex: nextIndex,
      status: isComplete ? "complete" : get().status,
    });
  },

  skipToPrevious: () => {
    const { currentWaypointIndex } = get();
    set({ currentWaypointIndex: Math.max(currentWaypointIndex - 1, 0) });
  },

  setOffRoute: (offRoute) => set({ isOffRoute: offRoute }),

  setLastKnownLocation: (coords) => set({ lastKnownLocation: coords }),

  completeTour: () => set({ status: "complete" }),

  reset: () => set({ ...initialState }),
}));

export function selectCurrentWaypoint(state: TourState): Waypoint | null {
  if (!state.area || state.currentWaypointIndex < 0) return null;
  return state.area.route[state.currentWaypointIndex] ?? null;
}

export function selectNextWaypoint(state: TourState): Waypoint | null {
  if (!state.area) return null;
  return state.area.route[state.currentWaypointIndex + 1] ?? null;
}

export function selectProgress(state: TourState): number {
  if (!state.area || state.area.route.length === 0) return 0;
  return (state.currentWaypointIndex + 1) / state.area.route.length;
}
