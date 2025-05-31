import { WeekData } from "./exercises/types";
import { week1Data } from "./exercises/week1";
import { week2Data } from "./exercises/week2";
import { week3Data } from "./exercises/week3";
import { week4Data } from "./exercises/week4";
import { week5Data } from "./exercises/week5";
import { week6Data } from "./exercises/week6";
import { week7Data } from "./exercises/week7";
import { week8Data } from "./exercises/week8";

export type { WeekData };

export const exerciseData: Record<number, WeekData> = {
  1: week1Data,
  2: week2Data,
  3: week3Data,
  4: week4Data,
  5: week5Data,
  6: week6Data,
  7: week7Data,
  8: week8Data,
};
