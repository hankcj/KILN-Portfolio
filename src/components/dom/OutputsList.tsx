'use client';

import { useAppStore } from '@/lib/store';
import { SystemText, Label } from './Typography';
import { cn } from '@/lib/utils';

export interface Output {
  slug: string;
  title: string;
  type: 'Essay' | 'System' | 'Tool' | 'Visual' | 'Experiment';
  status: 'Published' | 'Ongoing' | 'Archived';
  date: string;
  description?: string;
  coverImage?: string;
}

interface OutputsListProps {
  outputs: Output[];
}

export function OutputsList({ outputs }: OutputsListProps) {
  if (outputs.length === 0) {
    return (
      <div className="border border-border-muted p-16 text-center">
        <p className="font-mono text-system text-on-surface-muted tracking-widest">
          NO OUTPUTS INDEXED
        </p>
        <p className="text-small text-on-bg-tertiary mt-4">
          Work will appear here as it is published.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-custom">
      {outputs.map((output) => (
        <OutputCard key={output.slug} output={output} />
      ))}
    </div>
  );
}

function OutputCard({ output }: { output: Output }) {
  const { setHoveredItem } = useAppStore();

  return (
    <a
      href={`/work/${output.slug}`}
      className={cn(
        'group block bg-bg-primary p-8 min-h-[300px] flex flex-col justify-between transition-all duration-300',
        'hover:bg-bg-secondary border border-transparent hover:border-border-custom hover-lift focus-ring'
      )}
      onMouseEnter={() => setHoveredItem(output.slug)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <div className="flex justify-between items-start">
        <Label>{output.type}</Label>
        <Label>{output.status}</Label>
      </div>

      <div>
        <h3 className="font-heading text-h3 mb-3 text-on-bg-primary group-hover:text-accent transition-colors duration-200">
          {output.title}
        </h3>

        {output.description && (
          <p className="text-small text-on-bg-tertiary mb-6 line-clamp-2">
            {output.description}
          </p>
        )}

        <SystemText variant="fortran">{output.date}</SystemText>
      </div>
    </a>
  );
}
