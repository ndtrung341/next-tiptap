import clsx from "clsx";
import React, { ReactNode } from "react";

interface LabelProps {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  children: ReactNode;
  className?: string;
}

const Label = ({ as: Comp = "label", children, className = "" }: LabelProps) => {
  return <Comp className={clsx("rte-label", className)}>{children}</Comp>;
};

export default Label;
