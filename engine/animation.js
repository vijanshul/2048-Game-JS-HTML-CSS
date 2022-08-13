const moveAnimate = (fromX, fromY, toXPosition, toYPosition) => {
  var numCell = $("#number-cell-" + fromX + "-" + fromY);
  var numCellUpdated = $("#number-cell-" + toXPosition + "-" + toYPosition);
  numCellUpdated
    .text(numCell.text())
    .css({
      "background-color": "#fff",
      color: getNumCol(numCell.text()),
    })
    .animate(
      {
        top: "0px",
        left: "0px",
        width: "100px",
        height: "100px",
      },
      200
    );
  numCell.animate(
    {
      top: "50px",
      left: "50px",
      width: "0px",
      height: "0px",
    },
    200
  );
};

const numAnimation = (i, j, randomNum) => {
  var numCell = $("#number-cell-" + i + "-" + j);
  numCell
    .css({
      "background-color": getBackgroundNumCol(randomNum),
      color: getNumCol(randomNum),
    })
    .text(randomNum)
    .animate(
      {
        top: 0,
        left: 0,
        width: "100px",
        height: "100px",
      },
      500
    );
};
