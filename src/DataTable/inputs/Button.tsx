import { FC } from 'react';
import { Button as ButtonHeadless } from '@headlessui/react';
import classNames from 'classnames';
import { Icon } from '../../Icon.tsx';

export type Props = {
  title: string;
  icon?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export const Button: FC<Props> = ({
  title,
  icon,
  onClick,
  className,
  disabled = false,
}) => {
  return (
    <ButtonHeadless
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        'truncate relative inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 py-2.5 px-3 text-sm text-white/80 font-semibold tracking-wide',
        'active:left-0.5 active:top-0.5',
        'hover:text-stone-900 hover:bg-stone-300',
        'disabled:bg-stone-500 disabled:cursor-not-allowed disabled:text-white/60 disabled:static',
        'focus:outline-none',
        'transition-all duration-200',
        className,
      )}
    >
      {icon && <Icon name={icon} className="text-lg" />}
      <div className="truncate">{title}</div>
    </ButtonHeadless>
  );
};
