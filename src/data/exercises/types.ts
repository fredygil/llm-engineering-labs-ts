export interface Exercise {
  title: string;
  description: string;
  initialCode: string;
  category: string;
}

export interface WeekData {
  title: string;
  exercises: Exercise[];
}
