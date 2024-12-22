import { FC } from 'react';
import classNames from 'classnames';

enum Variants {
  bold = 'bold',
  fill = 'fill',
}

export type Props = {
  /** Provide an icon name from a Phosphor library */
  name: string;
  className?: string;
  variant?: keyof typeof Variants;
};

export const Icon: FC<Props> = ({
  name,
  className,
  variant = Variants.bold,
}) => {
  return (
    <i
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={classNames(`ph-${variant} ph-${name} leading-none`, className)}
    />
  );
};
