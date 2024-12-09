import { FC, Fragment } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { HeaderContext } from '@tanstack/react-table';
import classNames from 'classnames';
import {Icon} from './../../Icon.tsx'
import { Row } from '../types.ts';
import { useColumnActions } from '../features/useColumnActions.tsx';

export type Props = {
  /**
   * Provide the title for the column
   */
  title: string;
  /**
   * Set the width of a column in pixels
   * @example
   * { header: props => <Cell columnWidth={props.column.getSize()} /> }
   */
  columnWidth: number;
  /**
   * Provide a header context to be used in column actions
   * @see https://tanstack.com/table/latest/docs/guide/headers
   */
  context: HeaderContext<Row, unknown>;
};

const ANCHOR_PROP = { to: 'bottom' as const, gap: '12px' };

export const HeaderCell: FC<Props> = ({ title, columnWidth, context }) => {
  const items = useColumnActions(context);

  return (
    <div className="flex p-1.5" style={{ width: columnWidth }}>
      <div className="mr-1.5 font-semibold">{title}</div>
      <Menu>
        <MenuButton as={Fragment}>
          {({ hover, open }) => (
            <button
              className={classNames('ml-auto cursor-pointer', {
                'text-gray-100': hover || open,
                'text-gray-400': !hover && !open,
              })}
            >
              <Icon name="list" className="text-lg" />
            </button>
          )}
        </MenuButton>
        <MenuItems
          anchor={ANCHOR_PROP}
          transition
          className={classNames(
            // general styles
            'overflow-hidden rounded text-xs text-slate-100 z-30',
            // shadow styles
            'shadow-lg shadow-stone-600/50',
            // transition styles
            'origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0',
          )}
        >
          {items.map(({ label, icon: Icon, onClick }) => (
            <MenuItem key={label} as={Fragment}>
              {() => (
                <button
                  onClick={onClick}
                  className={classNames(
                    // general styles
                    'flex w-full items-center gap-1.5 whitespace-nowrap',
                    // background styles
                    'bg-stone-600 p-2 hover:bg-stone-500',
                    // add border between items
                    'border-stone-500 [&:not(:last-child)]:border-b',
                  )}
                >
                  {Icon}
                  <div>{label}</div>
                </button>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
};
