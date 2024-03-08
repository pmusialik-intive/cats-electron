import { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

const fallback = <div className="w-4 h-4 bg-slate-200" />;

interface Props extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
}

export const Icon = ({ name, ...props }: Props) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={fallback}>
      <LucideIcon strokeWidth={1.5} size={16} {...props} />
    </Suspense>
  );
};
