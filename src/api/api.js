const baseUrl = "https://sugoku.herokuapp.com";

const paths = {
  board: "board",
  solve: "solve",
};

export const difficulty = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
};

const encodeBoard = (board) =>
  board.reduce(
    (result, row, i) =>
      result +
      `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? "" : "%2C"}`,
    ""
  );

const encodeParams = (params) =>
  Object.keys(params)
    .map((key) => `${key}=%5B${encodeBoard(params[key])}%5D`)
    .join("&");

const sendRequest = (path, method, data) => {
  const options = {
    method,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };
  if (data) {
    options.body = encodeParams(data);
  }
  return fetch(path, options)
    .then((response) => response.json())
    .catch(console.warn);
};

export const fetchBoard = (difficulty) => {
  const url =
    baseUrl + `/${paths.board}?` + new URLSearchParams({ difficulty });
  return sendRequest(url, "GET");
};

export const solveBoard = (board) => {
  const url = baseUrl + `/${paths.solve}`;
  return sendRequest(url, "POST", board);
};
