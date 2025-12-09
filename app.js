
// bigboxes[0].innerText="X";
// bigboxes[0].classList.add("X-style");

const classToIndex = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("reset-btn").addEventListener("click", resetGame);
  checkhighlightclass();
  clickOK();
  attachSmallBoxListeners();
});