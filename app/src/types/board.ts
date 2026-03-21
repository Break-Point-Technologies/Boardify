export type TaskLabel = {
  id: string;
  name: string;
  color: string;
};

export type TaskMember = {
  id: string;
  name: string;
  initials: string;
};

export type ChecklistItem = {
  id: string;
  text: string;
  done: boolean;
};

export type TaskChecklist = {
  id: string;
  title: string;
  items: ChecklistItem[];
};

export type TaskAttachment = {
  id: string;
  name: string;
  subtitle?: string;
};

export type TaskActivityEntry = {
  id: string;
  text: string;
  at: string;
};

export type TaskWorkLogEntry = {
  id: string;
  durationMs: number;
  source: 'stopwatch' | 'manual';
  startIso?: string;
  endIso?: string;
  createdAtIso: string;
};

export type BoardCardData = {
  id: string;
  title: string;
  subtitle?: string;
  labelColor?: string;
  description?: string;
  startDate?: string;
  dueDate?: string;
  labels?: TaskLabel[];
  assignees?: TaskMember[];
  checklists?: TaskChecklist[];
  attachments?: TaskAttachment[];
  activity?: TaskActivityEntry[];
  /** Saved work sessions */
  workLog?: TaskWorkLogEntry[];
  /** Stopwatch: accumulated ms while paused */
  workTimerAccumMs?: number;
  /** Stopwatch: Date.now() when current run started (if running) */
  workTimerRunStartedAtMs?: number;
};

export type BoardColumnData = {
  title: string;
  cards: BoardCardData[];
};
