var nums;
var score;
var isBlocked;

nums = new Array();
score = 0;
isBlocked = new Array();

$(document).ready(() => {
  setupNewGame();
});

const refreshScore = (score) => {
  $("#score1").text(score);
};

const noMove = (nums) => {
  if (
    checkMoveLeft(nums) ||
    checkMoveRight(nums) ||
    checkMoveUp(nums) ||
    checkMoveDown(nums)
  ) {
    return false;
  }
  return true;
};

const checkGameOver = () => {
  if (noSpace(nums) && noMove(nums)) {
    alert("Game Over!");
  }
};

const setupNewGame = () => {
  initializeGrid();
};

const initializeGrid = () => {
  for (var i = 0; i < 4; i++) {
    nums[i] = new Array();
    isBlocked[i] = new Array();
    for (var j = 0; j < 4; j++) {
      nums[i][j] = 0;
      isBlocked[i][j] = false;
    }
  }

  refreshView();
  score = 0;
  refreshScore(score);
  initializeTiles();
};

const initializeTiles = () => {
  genTileNum();
  genTileNum();
};

const refreshView = () => {
  $(".number-cell").remove();
  //
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      $("#col-" + i + "-" + j).append(
        '<div class="number-cell" id="number-cell-' + i + "-" + j + '"></div>'
      );

      var numCell = $("#number-cell-" + i + "-" + j);

      if (nums[i][j] == 0) {
        numCell.css({
          width: "0px",
          top: 50,
          left: 50,
          height: "0px",
        });
      } else {
        numCell
          .css({
            width: "100px",
            height: "100px",
            top: 0,
            left: 0,
            "background-color": getBackgroundNumCol(nums[i][j]),
            color: getNumCol(nums[i][j]),
          })
          .text(nums[i][j]);
      }
      isBlocked[i][j] = false;
    }
  }
};

const genTileNum = () => {
  if (noSpace(nums)) {
    return;
  }

  var count = 0;
  var temp = new Array();
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (nums[i][j] == 0) {
        temp[count] = i * 4 + j;
        count++;
      }
    }
  }
  var pos = Math.floor(Math.random() * count);
  var randx = Math.floor(temp[pos] / 4);
  var randy = Math.floor(temp[pos] % 4);

  var randNum = Math.random() < 0.5 ? 2 : 4;
  nums[randx][randy] = randNum;
  numAnimation(randx, randy, randNum);
};

$(document).keydown(function (event) {
  event.preventDefault();

  switch (event.keyCode) {
    case 37: // left
      if (checkMoveLeft(nums)) {
        moveLeft();
        setTimeout(genTileNum, 200);
        setTimeout(checkGameOver, 200);
      }
      break;
    case 38: // up
      if (checkMoveUp(nums)) {
        moveUp();
        setTimeout(genTileNum, 200);
        setTimeout(checkGameOver, 200);
      }
      break;
    case 39: // right
      if (checkMoveRight(nums)) {
        moveRight();
        setTimeout(genTileNum, 200);
        setTimeout(checkGameOver, 200);
      }
      break;
    case 40: // down
      if (checkMoveDown(nums)) {
        moveDown();
        setTimeout(genTileNum, 200);
        setTimeout(checkGameOver, 200);
      }
      break;
    default:
      break;
  }
});

const moveLeft = () => {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (nums[i][j] != 0) {
        for (var k = 0; k < j; k++) {
          if (nums[i][k] == 0 && checkBlockHorizontalIsNull(i, k, j, nums)) {
            moveAnimate(i, j, i, k);
            nums[i][k] = nums[i][j];
            nums[i][j] = 0;
            break;
          } else if (
            nums[i][k] == nums[i][j] &&
            checkBlockHorizontalIsNull(i, k, j, nums) &&
            !isBlocked[i][k]
          ) {
            moveAnimate(i, j, i, k);
            nums[i][k] += nums[i][j];
            nums[i][j] = 0;
            score += nums[i][k];
            refreshScore(score);

            isBlocked[i][k] = true;
            break;
          }
        }
      }
    }
  }
  setTimeout(refreshView, 200);
};

const moveRight = () => {
  for (var i = 0; i < 4; i++) {
    for (var j = 2; j >= 0; j--) {
      if (nums[i][j] != 0) {
        for (var k = 3; k > j; k--) {
          if (nums[i][k] == 0 && checkBlockHorizontalIsNull(i, j, k, nums)) {
            moveAnimate(i, j, i, k);
            nums[i][k] = nums[i][j];
            nums[i][j] = 0;
            break;
          } else if (
            nums[i][k] == nums[i][j] &&
            checkBlockHorizontalIsNull(i, j, k, nums) &&
            !isBlocked[i][k]
          ) {
            moveAnimate(i, j, i, k);
            nums[i][k] += nums[i][j];
            nums[i][j] = 0;
            score += nums[i][k];
            refreshScore(score);

            isBlocked[i][k] = true;
            break;
          }
        }
      }
    }
  }
  setTimeout(refreshView, 200);
};

const moveUp = () => {
  for (var j = 0; j < 4; j++) {
    for (var i = 1; i < 4; i++) {
      if (nums[i][j] != 0) {
        for (var k = 0; k < i; k++) {
          if (nums[k][j] == 0 && checkBlockVerticalIsNull(j, k, i, nums)) {
            moveAnimate(i, j, k, j);
            nums[k][j] = nums[i][j];
            nums[i][j] = 0;
            break;
          } else if (
            nums[k][j] == nums[i][j] &&
            checkBlockVerticalIsNull(j, k, i, nums) &&
            !isBlocked[k][j]
          ) {
            moveAnimate(i, j, k, j);
            nums[k][j] += nums[i][j];
            nums[i][j] = 0;
            score += nums[k][j];
            refreshScore(score);

            isBlocked[k][j] = true;
            break;
          }
        }
      }
    }
  }
  setTimeout(refreshView, 200);
};

const moveDown = () => {
  for (var j = 0; j < 4; j++) {
    for (var i = 2; i >= 0; i--) {
      if (nums[i][j] != 0) {
        for (var k = 3; k > i; k--) {
          if (nums[k][j] == 0 && checkBlockVerticalIsNull(j, i, k, nums)) {
            moveAnimate(i, j, k, j);
            nums[k][j] = nums[i][j];
            nums[i][j] = 0;
            break;
          } else if (
            nums[k][j] == nums[i][j] &&
            checkBlockVerticalIsNull(j, i, k, nums) &&
            !isBlocked[k][j]
          ) {
            moveAnimate(i, j, k, j);
            nums[k][j] += nums[i][j];
            nums[i][j] = 0;
            score += nums[k][j];
            refreshScore(score);

            isBlocked[k][j] = true;
            break;
          }
        }
      }
    }
  }
  setTimeout(refreshView, 200);
};

const noSpace = (nums) => {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (nums[i][j] == 0) {
        return false;
      }
    }
  }
  return true;
};

const checkMoveLeft = (nums) => {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (nums[i][j] != 0) {
        if (nums[i][j - 1] == 0 || nums[i][j - 1] == nums[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
};

const checkMoveRight = (nums) => {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 3; j++) {
      if (nums[i][j] != 0) {
        if (nums[i][j + 1] == 0 || nums[i][j + 1] == nums[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
};

const checkMoveUp = (nums) => {
  for (var i = 1; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (nums[i][j] != 0) {
        if (nums[i - 1][j] == 0 || nums[i - 1][j] == nums[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
};

const checkMoveDown = (nums) => {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 4; j++) {
      if (nums[i][j] != 0) {
        if (nums[i + 1][j] == 0 || nums[i + 1][j] == nums[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
};

const checkBlockHorizontalIsNull = (row, col1, col2, nums) => {
  for (var i = col1 + 1; i < col2; i++) {
    if (nums[row][i] != 0) {
      return false;
    }
  }
  return true;
};

const checkBlockVerticalIsNull = (col, row1, row2, nums) => {
  for (var i = row1 + 1; i < row2; i++) {
    if (nums[i][col] != 0) {
      return false;
    }
  }
  return true;
};
