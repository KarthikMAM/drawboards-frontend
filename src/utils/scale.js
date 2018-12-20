export const scaleUp = ({ x, y }, scaleX, scaleY) => ({
  x: x * scaleX,
  y: y * scaleY,
})

export const scaleDown = ({ x, y }, scaleX, scaleY) => ({
  x: x / scaleX,
  y: y / scaleY,
})
