export const DEFAULT_COLORS = [
  {
    isBrightColor: false,
    name: "black",
    value: "#000000",
  },
  {
    isBrightColor: true,
    name: "grey",
    value: "#808080",
  },
  {
    isBrightColor: true,
    name: "white",
    value: "#FFFFFF",
  },
  {
    isBrightColor: false,
    name: "red",
    value: "#FF0000",
  },
  {
    isBrightColor: false,
    name: "orange",
    value: "#FF9900",
  },
  //   {
  //     isBrightColor: true,
  //     name: "yellow",
  //     value: "#FEFF00",
  //   },
  {
    isBrightColor: false,
    name: "green",
    value: "#00FF00",
  },
  {
    isBrightColor: false,
    name: "blue",
    value: "#0000ff",
  },
  //   {
  //     isBrightColor: false,
  //     name: "purple",
  //     value: "#9900FF",
  //   },
  {
    isBrightColor: false,
    name: "magenta",
    value: "#FF00FF",
  },
];

export type TColor = {
  isBrightColor: boolean;
  name: string;
  value: string;
};
