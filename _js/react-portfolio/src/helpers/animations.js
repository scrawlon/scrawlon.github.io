import { spring } from 'react-router-transition';

const transitionFunctions = {
  mapStyles: (styles) => {
    return {
      opacity: styles.opacity,
      transform: `scale(${styles.scale})`,
    };
  },
  bounce: (val) => {
    return spring(val, {
      stiffness: 330,
      damping: 22,
    });
  }
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

const animations = {
  transitionFunctions: transitionFunctions,
  bounceTransition: bounceTransition
}

export default animations;
