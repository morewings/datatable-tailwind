import { FC, useCallback, ChangeEvent } from 'react';
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
  /** Input value as Date.toISOString() output */
  value?: Value;
  /** Capture value changes */
  onChange: (value: Value) => void;
  /** Icon name to show on the left side of the input */
  icon?: string;
};

export const DateField: FC<Props> = ({
  label,
  className,
  placeholder,
  value: valueProp,
  onChange,
  icon = 'calendar',
}) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const dateString = event.target.valueAsDate
        ? event.target.valueAsDate.toISOString()
        : '';
      onChange(dateString);
    },
    [onChange],
  );
  const value = valueProp
    ? new Date(valueProp)
        .toLocaleDateString('en-GB')
        .split('/')
        .reverse()
        .join('-')
    : '';
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
          onChange={handleChange}
          value={value}
          type="date"
          placeholder={placeholder}
          className={classNames(
            'block w-full rounded-md border-none bg-white/10 py-2 px-3 text-sm text-white/80 outline-none placeholder-white/70',
            'focus:bg-backgroundLight/85 focus:text-stone-950 focus:placeholder-transparent',
            // focus styles dark
            'dark:focus:bg-backgroundDark/85 dark:focus:text-textDark',
            'transition-all duration-200',
            className,
          )}
        />
      </div>
    </Field>
  );
};
