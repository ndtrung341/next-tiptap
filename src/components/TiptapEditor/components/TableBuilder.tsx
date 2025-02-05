import React, {useState, useMemo} from 'react';
import {PopoverClose} from "@radix-ui/react-popover";
import clsx from "clsx";

const COLUMNS = 7;
const ROWS = 5;

type GridSize = { cols: number; rows: number };

interface TableBuilderProps {
  onCreate?: (value: GridSize) => void;
}

const TableBuilder = ({onCreate}: TableBuilderProps) => {
  const [gridSize, setGridSize] = useState<GridSize>({cols: 1, rows: 1});

  const isActiveCell = (rowIndex: number, colIndex: number) =>
    rowIndex < gridSize.rows && colIndex < gridSize.cols;

  const grid = useMemo(
    () =>
      Array.from({length: ROWS}, (_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="rte-tb__row">
          {Array.from({length: COLUMNS}, (_, colIndex) => (
            <div
              key={`col-${colIndex}`}
              className={clsx(
                "rte-tb__cell",
                isActiveCell(rowIndex, colIndex) && "rte-tb__cell--active"
              )}
              onMouseMove={() => setGridSize({cols: colIndex + 1, rows: rowIndex + 1})}
              onClick={() => onCreate?.(gridSize)}
            />
          ))}
        </div>
      )),
    [gridSize]
  );

  return (
    <div className="rte-tb__builder">
      <PopoverClose asChild>
        <div className="rte-tb__grid">{grid}</div>
      </PopoverClose>
      <div style={{textAlign: 'center', marginBlock: 3}}>{gridSize.rows} x {gridSize.cols}</div>
    </div>
  );
};

export default TableBuilder;
