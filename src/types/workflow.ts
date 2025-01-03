export type WorkflowStep = 
  | 'start'
  | 'basic-info'
  | 'genre'
  | 'world-settings'
  | 'plot-structure'
  | 'characters'
  | 'relationships'
  | 'timeline'
  | 'parameters'
  | 'review';

export type NovelWorkflowStep = WorkflowStep; 