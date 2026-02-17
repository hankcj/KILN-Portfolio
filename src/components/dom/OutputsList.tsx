/**
 * Outputs List Component
 * 
 * Grid/list of work outputs with hover interactions.
 */

'use client';

import { useAppStore } from '@/lib/store';
import { SystemText } from './Typography';
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
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
        'group block bg-bg-primary p-8 transition-colors duration-200',
        'hover:bg-bg-secondary'
      )}
      onMouseEnter={() => setHoveredItem(output.id)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <div className="flex justify-between items-start mb-4">
        <SystemText variant="fortran">{output.type.toUpperCase()}</SystemText>
        <SystemText variant="fortran">{output.status.toUpperCase()}</SystemText>
      </div>

      <h3 className="font-heading text-h3 mb-2 text-on-bg-primary group-hover:text-accent transition-colors">
        {output.title}
      </h3>

      {output.description && (
        <p className="text-small text-on-surface-muted mb-4 line-clamp-2">
          {output.description}
        </p>
      )}

      <SystemText variant="fortran">{output.date}</SystemText>
    </a>
  );
}
