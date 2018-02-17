var Velocity = require('velocity-animate');

var svgScrollArrow = document.getElementsByClassName('scroll-arrow');

var velocityTimeline = [
  {
    animation: arrowJumpOne,
    startAt: 1000,
    endAt: 1500
  },
  {
    animation: arrowJumpTwo,
    startAt: 0,
    endAt: 0
  },
  {
    animation: arrowJumpThree,
    startAt: 0,
    endAt: 300
  }
];

function arrowJumpOne(startAt, endAt) {
  Velocity(svgScrollArrow, { translateY: '50' }, { duration: endAt - startAt, delay: startAt });
}

function arrowJumpTwo(startAt, endAt) {
  Velocity(svgScrollArrow, { translateY: '-500' }, { duration: endAt - startAt, delay: startAt });
}

function arrowJumpThree(startAt, endAt) {
  Velocity(svgScrollArrow, { translateY: '10' }, { duration: endAt - startAt, delay: startAt });
}

module.exports = {
  velocityTimeline: velocityTimeline
};
