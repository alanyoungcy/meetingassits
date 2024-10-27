import React from 'react';
import { MeetingMinutes } from '../types';
import { Clock, Users, ListTodo, MessageSquare } from 'lucide-react';

interface TranscriptionResultProps {
  minutes: MeetingMinutes;
}

export default function TranscriptionResult({ minutes }: TranscriptionResultProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">{minutes.title}</h2>
        <div className="flex items-center gap-4 mt-2 text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{minutes.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{minutes.participants.length} Participants</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Agenda</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {minutes.agenda.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Discussion</h3>
          <div className="space-y-4">
            {minutes.discussion.map((item, index) => (
              <div key={index} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                <MessageSquare className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-800">{item.text}</p>
                  <div className="flex gap-4 mt-1 text-sm text-gray-500">
                    <span>{item.timestamp}</span>
                    {item.speaker && <span>Speaker: {item.speaker}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Action Items</h3>
          <div className="space-y-2">
            {minutes.actionItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <ListTodo className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}