import { FC, ReactNode } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from '@headlessui/react';
import classNames from 'classnames';

export type Props = {
  /** Provide a title for Dialog header */
  title?: string;
  children: ReactNode;
  /** Control Dialog open/close state */
  open?: boolean;
  /** Function called when the user attempts to close Dialog */
  onClose?: () => void;
};

export const TableDialog: FC<Props> = ({
  title,
  children,
  open = false,
  onClose = () => {},
}) => {
  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={onClose}
    >
      {/* Create a backdrop */}
      <DialogBackdrop className="fixed inset-0 bg-primary/30 backdrop-blur-sm dark:bg-primaryDark/30" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            // required to enable transition
            transition
            className={classNames(
              // general styles
              'w-full max-w-xs rounded-md bg-primary dark:bg-primaryDark p-5',
              // shadow styles
              'shadow-lg shadow-primary dark:shadow-primaryDark',
              // transition styles
              'transition duration-300 ease-out data-[closed]:opacity-0',
            )}
          >
            {title && (
              <DialogTitle
                title={title}
                as="h3"
                className="mb-5 text-xl font-semibold tracking-wider text-white/80"
              >
                {title}
              </DialogTitle>
            )}
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
