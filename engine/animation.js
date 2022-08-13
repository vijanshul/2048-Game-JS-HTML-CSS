const numAnimation = (i, j, randNumber) => {
  var numberCell = $("#number-cell-" + i + "-" + j);
  numberCell
    .css({
      "background-color": getBackgroundNumCol(randNumber),
      color: getNumCol(randNumber),
    })
    .text(randNumber)
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

const moveAnimate = (fromx, fromy, tox, toy) => {
  var numberCell = $("#number-cell-" + fromx + "-" + fromy);
  var numberCell1 = $("#number-cell-" + tox + "-" + toy);
  numberCell1
    .text(numberCell.text())
    .css({
      "background-color": "#fff",
      color: getNumCol(numberCell.text()),
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
  numberCell.animate(
    {
      top: "50px",
      left: "50px",
      width: "0px",
      height: "0px",
    },
    200
  );
};
