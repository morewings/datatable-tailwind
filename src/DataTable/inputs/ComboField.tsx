import {
  ChangeEvent,
  FC,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
  Field,
  Label,
} from '@headlessui/react';
import classNames from 'classnames';
import { Icon } from '../../Icon.tsx';

type Value = string;

type Option = {
  value: Value;
  label: string;
};

const ANCHOR_PROP = { to: 'bottom' as const, gap: '12px' };

export type Props = {
  label: string;
  placeholder?: string;
  options: Option[];
  value?: Value;
  onChange: (value: Value) => void;
  icon?: string;
};

export const ComboField: FC<Props> = ({
  label,
  placeholder,
  value,
  options,
  onChange,
  icon,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  useEffect(() => {
    const nextSelection = options.find(
      ({ value: optionValue }) =>
        optionValue.toLowerCase() === value?.toLowerCase(),
    );
    setSelectedOption(nextSelection || null);
  }, [options, value]);

  const [query, setQuery] = useState('');

  const filteredOptions = useMemo(
    () =>
      query === ''
        ? options
        : options.filter((option) => {
            return option.label.toLowerCase().includes(query.toLowerCase());
          }),
    [options, query],
  );

  const handleOptionSelect = useCallback(
    (option: Option) => {
      onChange(option?.value || '');
      setSelectedOption(option);
    },
    [onChange],
  );

  const handleClose = useCallback(() => {
    setQuery('');
  }, []);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    [],
  );

  const getDisplayValue = useCallback((option: Option) => option?.label, []);

  return (
    <Field className="flex flex-col gap-1.5">
      <Label
        className={classNames(
          'text-white/70 cursor-pointer text-sm font-medium ',
        )}
      >
        {label}
      </Label>
      <Combobox
        immediate={false}
        value={selectedOption}
        onChange={handleOptionSelect}
        onClose={handleClose}
      >
        <div className="relative flex flex-row items-center gap-2">
          {icon && (
            <Icon
              name={icon}
              className="shrink-0 text-2xl text-white/80"
              variant="fill"
            />
          )}
          <ComboboxInput
            className={classNames(
              'w-full outline-none rounded-md border-none bg-white/10 py-2 px-3 text-sm text-white/80 placeholder-white/70 peer',
              'focus:bg-backgroundLight/85 focus:text-stone-950 focus:placeholder-transparent',
              // focus styles dark
              'dark:focus:bg-backgroundDark/85 dark:focus:text-textDark',
            )}
            placeholder={placeholder}
            displayValue={getDisplayValue}
            onChange={handleInputChange}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 px-2.5 text-stone-800 peer-focus:text-borderColor">
            <Icon
              name="caret-up-down"
              className="size-4"
            />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor={ANCHOR_PROP}
          transition
          className={classNames(
            'z-50 w-[var(--input-width)] rounded-md empty:invisible overscroll-none',
            'origin-top transition duration-200 ease-in data-[closed]:scale-95 data-[closed]:opacity-0',
            'shadow-md shadow-stone-800',
          )}
        >
          <div className="max-h-52">
            {filteredOptions.map((option) => (
              <ComboboxOption as={Fragment} key={option.value} value={option}>
                {({ focus, selected }) => (
                  <div
                    className={classNames(
                      'group flex items-center gap-2 py-3 px-3 select-none cursor-pointer',
                      'border-stone-500 [&:not(:last-child)]:border-b',
                      { 'bg-stone-500': focus, 'bg-stone-800': !focus },
                    )}
                  >
                    <Icon
                      name="check"
                      className={classNames('size-4 text-white', {
                        invisible: !selected,
                        visible: selected,
                      })}
                    />
                    <div className="text-sm text-white">{option.label}</div>
                  </div>
                )}
              </ComboboxOption>
            ))}
          </div>
        </ComboboxOptions>
      </Combobox>
    </Field>
  );
};
