export interface TranscriptionResult {
    text: string;
    timestamp: string;
    speaker?: string;
  }
  
  export interface MeetingMinutes {
    title: string;
    date: string;
    participants: string[];
    agenda: string[];
    discussion: TranscriptionResult[];
    actionItems: string[];
  }
  
  export interface TemplateFormat {
    id: string;
    name: string;
    structure: {
      sections: string[];
      required: string[];
    };
  }