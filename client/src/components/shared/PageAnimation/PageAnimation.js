export const pageVariants = {
  initial: {
    opacity: 0,
    x: '-100vw',
    scale: 0.8
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    x: '100vw',
    scale: 1.2
  }
} 

export const pageTransition = {
  type: 'spring',
  mass: .6,
  stiffness: 50,
  duration: 1
}