import { spring } from 'react-router-transition';

const transitionFunctions = {
  mapStyles: (styles) => ({
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  }),
  bounce: (val) => spring(val, {
    stiffness: 330,
    damping: 22,
  })
}

const bounceTransition = {
  atEnter: {
    opacity: 0,
    scale: 0.5,
  },
  atLeave: {
    opacity: 0,
    scale: transitionFunctions.bounce(0.8),
  },
  atActive: {
    opacity: 1,
    scale: transitionFunctions.bounce(1),
  },
};

const fadeTransition = {
  atEnter: {
    opacity: 0,
  },
  atLeave: {
    opacity: 0,
  },
  atActive: {
    opacity: 1,
  },
};

const animations = {
  transitionFunctions: transitionFunctions,
  bounceTransition: bounceTransition,
  fadeTransition: fadeTransition
}

export default animations;
