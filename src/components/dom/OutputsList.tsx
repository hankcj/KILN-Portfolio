/**
 * Outputs List Component
 * 
 * Grid/list of work outputs with hover interactions.
 * Dark mode styled.
 */

'use client';

import { useAppStore } from '@/lib/store';
import { SystemText, Label } from './Typography';
import { cn } from '@/lib/utils';

interface Output {
  id: string;
  title: string;
  type: 'Essay' | 'System' | 'Tool' | 'Visual' | 'Experiment';
  status: 'Published' | 'Ongoing' | 'Archived';
  date: string;
  description?: string;
}

interface OutputsListProps {
  outputs: Output[];
}

export function OutputsList({ outputs }: OutputsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-custom">
      {outputs.map((output) => (
        <OutputCard key={output.id} output={output} />
      ))}
    </div>
  );
}

function OutputCard({ output }: { output: Output }) {
  const { setHoveredItem } = useAppStore();

  return (
    <a
      href={`/work/${output.id}`}
      className={cn(
        'group block bg-bg-primary p-8 transition-all duration-300',
        'hover:bg-bg-secondary border border-transparent hover:border-border-custom'
      )}
      onMouseEnter={() => setHoveredItem(output.id)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <div className="flex justify-between items-start mb-6">
        <Label>{output.type}</Label>
        <Label>{output.status}</Label>
      </div>

      <h3 className="font-heading text-h3 mb-3 text-on-bg-primary group-hover:text-accent transition-colors duration-200">
        {output.title}
      </h3>

      {output.description && (
        <p className="text-small text-on-bg-tertiary mb-6 line-clamp-2">
          {output.description}
        </p>
      )}

      <SystemText variant="fortran">{output.date}</SystemText>
    </a>
  );
}
