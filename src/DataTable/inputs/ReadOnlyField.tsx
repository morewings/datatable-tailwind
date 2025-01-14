import { FC } from 'react';
import { Field, Input, Label } from '@headlessui/react';
import classNames from 'classnames';
import { Icon } from '../../Icon.tsx';


type Value = string;

export type Props = {
  /** Text to render above input field */
  label: string;
  className?: string;
  /** Basic hint for a user */
  placeholder?: string;
  value?: Value;
  /** Icon name to show on the left side of the input */
  icon?: string;
};

export const ReadOnlyField: FC<Props> = ({
  label,
  className,
  value,
  icon = 'pencil-slash',
}) => {
  return (
    <Field className="flex flex-col gap-1.5">
      <Label
        className={classNames(
          'text-white/70 cursor-pointer text-sm font-semibold ',
        )}
      >
        {label}
      </Label>
      <div className="flex flex-row items-center gap-2">
        <Icon
          name={icon}
          className="shrink-0 text-2xl text-white/80"
          variant="fill"
        />
        <Input
          readOnly
          value={value}
          type="text"
          className={classNames(
            'block flex-shrink w-full rounded-md border-none bg-white/10 py-2 px-3 text-sm text-white/80 cursor-default outline-none',
            // focus styles light
            'focus:bg-backgroundLight/75 focus:text-stone-950',
            // focus styles dark
            'dark:focus:bg-backgroundDark/10 dark:focus:text-textDark',
            'transition-all duration-200',
            className,
          )}
        />
      </div>
    </Field>
  );
};
