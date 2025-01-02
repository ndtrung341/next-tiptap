import React from "react";
import clsx from "clsx";
import { icons, type IconBaseProps } from "../icons/icons";

export type IconProps = IconBaseProps & {
  name: keyof typeof icons;
};

export const Icon = ({ name, className, size = 20, ...props }: IconProps) => {
  const Comp = icons[name];

  return <Comp size={size} className={clsx("rte-icon", className)} {...props} />;
};

export default Icon;
