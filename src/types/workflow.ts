export type WorkflowStep = 
  | 'basic-info'
  | 'genre'
  | 'world-settings'
  | 'plot-structure'
  | 'characters'
  | 'relationships'
  | 'timeline'
  | 'parameters'
  | 'review';

export type NovelWorkflowStep = 'start' | WorkflowStep; 