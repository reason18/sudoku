export const defaultBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const BOARD_SIZE = 81;
const ROW_SIZE = 9;
const MAX_ROW_INDEX = 8;

export const navKeyCodes = {
  goLeft: 37,
  goUp: 38,
  goRight: 39,
  goDown: 40,
};

export const createBoardData = (board) => {
  return board.reduce((result, row, rowIndex) => {
    return [
      ...result,
      ...row.map((value, columnIndex) => {
        const row = 1 + rowIndex;
        const column = 1 + columnIndex;
        const classNames = [];
        if (row % 3 === 0 && row !== ROW_SIZE) {
          classNames.push("bottom-line");
        }

        if (column % 3 === 0 && column !== ROW_SIZE) {
          classNames.push("right-line");
        }
        return {
          id: rowIndex ? rowIndex * ROW_SIZE + columnIndex : columnIndex,
          value: value || "",
          row,
          column,
          className: classNames.join(" "),
        };
      }),
    ];
  }, []);
};

export const getNavigationIndex = (activeIndex, keyCode) => {
  switch (keyCode) {
    case navKeyCodes.goLeft: {
      return activeIndex % ROW_SIZE === 0 ? activeIndex + MAX_ROW_INDEX : activeIndex - 1;
    }

    case navKeyCodes.goUp: {
      return activeIndex - ROW_SIZE >= 0 ? activeIndex - ROW_SIZE : activeIndex - ROW_SIZE + BOARD_SIZE;
    }

    case navKeyCodes.goRight: {
      return activeIndex % ROW_SIZE === MAX_ROW_INDEX ? activeIndex - MAX_ROW_INDEX : activeIndex + 1;
    }

    case navKeyCodes.goDown: {
      return activeIndex + ROW_SIZE < BOARD_SIZE ? +activeIndex + ROW_SIZE : +activeIndex + ROW_SIZE - BOARD_SIZE;
    }

    default:
      return activeIndex;
  }
};
