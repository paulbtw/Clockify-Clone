import React, { useState } from "react";
import LensIcon from "@material-ui/icons/Lens";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import { IconButton } from "@material-ui/core";

interface ColorPickerItemProps {
  iconComponent: JSX.Element;
  selectedIconComponent: JSX.Element;
  selected: boolean;
  color: string;
  onClick: (color: string) => void;
}

export const ColorPickerItem: React.FC<ColorPickerItemProps> = ({
  iconComponent = <LensIcon />,
  selectedIconComponent = <RadioButtonCheckedIcon />,
  selected = false,
  color,
  onClick,
}) => {
  const handleClick = () => {
    onClick(color);
  };
  return (
    <IconButton onClick={handleClick}>
      {selected ? selectedIconComponent : iconComponent}
    </IconButton>
  );
};

interface ColorPickerProps {
  availableColors: string[];
  itemPerRow: number;
  iconComponent: JSX.Element;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  availableColors = [
    "#ac725e",
    "#d06b64",
    "#f83a22",
    "#fa573c",
    "#ff7537",
    "#ffad46",
    "#42d692",
    "#16a765",
    "#7bd148",
    "#b3dc6c",
    "#fbe983",
    "#fad165",
    "#92e1c0",
    "#9fe1e7",
    "#9fc6e7",
    "#4986e7",
    "#9a9cff",
    "#b99aff",
    "#8f8f8f",
    "#cabdbf",
    "#cca6ac",
    "#f691b2",
    "#cd74e6",
    "#a47ae2",
    "black",
  ],
  itemPerRow = 5,
  iconComponent,
}) => {
  const [value, setValue] = useState("#ac725e");
  const handleClick = (event: React.MouseEvent) => {};
  return <div>Test</div>;
};

export default ColorPicker;
