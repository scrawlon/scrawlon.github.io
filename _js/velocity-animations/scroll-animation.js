

var velocityTimeline = [
  {
    animation: arrowJump,
    startAt: 1000,
    endAt: 1500
  }
];

function arrowJump(startAt, endAt) {
  Velocity(swiperColorFrame, { opacity: .25 }, { duration: endAt - startAt, delay: startAt });
  Velocity(sliderBackgroundCaption, { opacity: 1 }, { duration: endAt - startAt, delay: startAt });
}

module.exports = {
  velocityTimeline: velocityTimeline
};
