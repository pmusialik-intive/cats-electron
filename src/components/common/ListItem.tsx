import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  text: string;
}

export const ListItem = ({ children, text }: Props) => {
  return (
    <div
      className={`group flex items-center justify-between py-3 border-b last:pb-0 last:border-0`}
      tabIndex={0}
    >
      <p className="flex-1 line-clamp-5">{text}</p>
      <div className="invisible group-hover:visible group-focus-within:visible">{children}</div>
    </div>
  );
};
