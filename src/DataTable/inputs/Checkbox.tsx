import { FC, useMemo } from 'react';
import { Checkbox as CheckboxHeadless } from '@headlessui/react';
import { Icon } from '../../Icon.tsx';
import classNames from 'classnames';

export type Props = {
  /**
   * Provide a checked state
   */
  checked: boolean;
  /**
   * Capture value changes
   */
  onChange: (value: boolean) => void;
  disabled: boolean;
  /**
   * Display the indeterminate state of a checkbox that is neither checked nor unchecked
   */
  indeterminate?: boolean;
  className?: string;
};

export const Checkbox: FC<Props> = ({
  checked,
  onChange,
  disabled,
  indeterminate = false,
  className,
}) => {

  const checkboxIcon = useMemo(() => {
    if (indeterminate) {
      return 'minus-square'
    } else if (checked) {
      return 'check-square'
    }
    return 'square'
  }, [checked, indeterminate])


  return (
    <CheckboxHeadless
      className={classNames(
        'flex items-center text-lg',
        {
          'cursor-not-allowed': disabled,
          'cursor-pointer': !disabled,
        },
        className,
      )}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      indeterminate={indeterminate}
    >
      <Icon
        name={checkboxIcon}
        variant="bold"
        className={classNames('shrink-0', {
          'text-disabledColor dark:text-primaryDark': disabled,
        })}
      />
    </CheckboxHeadless>
  );
};
