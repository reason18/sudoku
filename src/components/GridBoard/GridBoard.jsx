import React, { useRef, useState, useEffect } from "react";
import { fetchBoard, difficulty, solveBoard } from "../../api/api";
import { createBoardData, defaultBoard, getNavigationIndex, navKeyCodes } from "../../utils";
import { GridItem } from "../GridItem/GridItem";

const NUMBER_FROM_KEYCODE = 49;
const NUMBER_TO_KEYCODE = 57;

const fetchInitialData = async () => {
  const boardResponse = await fetchBoard(difficulty.hard);
  const solutionResponse = await solveBoard(boardResponse);
  return Promise.resolve({
    board: boardResponse.board,
    solution: solutionResponse.solution,
  });
};

export const GridBoard = (props) => {
  const container = useRef(null);
  const [boardData, setBoardData] = useState(createBoardData(defaultBoard));
  const [activeElIndex, setActiveElIndex] = useState(null);
  const processUserInteraction = (e) => {
    const keyCode = e.keyCode;
    const activeElement = e.target;
    if (!activeElement) {
      return;
    }
    if (keyCode >= NUMBER_FROM_KEYCODE && keyCode <= NUMBER_TO_KEYCODE) {
      const value = +String.fromCharCode(keyCode);
      const index = activeElement.name;
      const updBoardData = [...boardData];
      updBoardData[index].value = value;
      setBoardData(updBoardData);
    }
    debugger
    if (keyCode >= navKeyCodes.goLeft && keyCode <= navKeyCodes.goDown) {
      const activeIndex = +activeElement.name;
      let nextActiveElIndex = getNavigationIndex(activeIndex, keyCode);
      setActiveElIndex(nextActiveElIndex);
    }
  };

  useEffect(() => {
    fetchInitialData(difficulty.easy).then((data) =>
      setBoardData(createBoardData(data.board))
    );
  }, []);

  return (
    <div className="sudoku-app">
      <h1>SUDOKU</h1>
      <div className="wrap">
        <div
          className="sudoku-grid"
          ref={container}
          onKeyDown={processUserInteraction}
        >
          {boardData.map((el, i) => {
            return (
              <GridItem
                isActive={el.id === activeElIndex}
                data={el}
                key={el.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
