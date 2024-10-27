import React from 'react';
import { TemplateFormat } from '../types';

interface MinutesTemplateProps {
  templates: TemplateFormat[];
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

export default function MinutesTemplate({ 
  templates, 
  selectedTemplate, 
  onTemplateSelect 
}: MinutesTemplateProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Meeting Minutes Template</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all
              ${selectedTemplate === template.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'}`}
            onClick={() => onTemplateSelect(template.id)}
          >
            <h4 className="font-medium text-gray-800">{template.name}</h4>
            <ul className="mt-2 text-sm text-gray-600">
              {template.structure.sections.map((section) => (
                <li key={section} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                  {section}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}