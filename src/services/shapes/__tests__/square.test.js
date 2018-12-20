import { draw, transitions } from '../freehand'

describe('freehand', () => {
  describe('draw', () => {
    it('should draw all points properly with scaling', () => {
      const contextMock = {
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        stroke: jest.fn(),
      }

      draw({
        stroke: 'green',
        points: [
          { x: 0.2, y: 0.3 },
          { x: 0.32, y: 0.43 },
          { x: 0.34, y: 0.44 },
        ],
      }, contextMock, 100, 200)

      expect(contextMock.strokeStyle).toBe('green')
      expect(contextMock.moveTo).toBeCalledTimes(1)
      expect(contextMock.lineTo).toBeCalledTimes(3)
      expect(contextMock.stroke).toBeCalledTimes(1)
      expect(contextMock).toMatchSnapshot()
    })
  })

  describe('transitions', () => {
    describe('reduce', () => {
      it('should return data as it is during the init phase', () => {
        const data = { hello: 'world' }

        expect(transitions['init'].reduce(data, { action: { type: 'init' } })).toBe(data)
      })

      it('should append the payload to the end during mousemove, mouseup and mouseleave events', () => {
        const data = { points: [{ x: 0.5, y: 0.6 }] }

        expect(transitions['mousemove'].reduce(data, { action: { type: 'init', payload: { x: 1, y: 0.4 } } })).toMatchSnapshot()
        expect(transitions['mousedown'].reduce(data, { action: { type: 'init', payload: { x: 1, y: 0.4 } } })).toMatchSnapshot()
        expect(transitions['mouseup'].reduce(data, { action: { type: 'init', payload: { x: 1, y: 0.4 } } })).toMatchSnapshot()
        expect(transitions['mouseleave'].reduce(data, { action: { type: 'init', payload: { x: 1, y: 0.4 } } })).toMatchSnapshot()
      })
    })

    describe('lifecycle transitions', () => {
      expect(Object.keys(transitions).reduce((acc, value) => {
        acc[value] = transitions[value].transitions
        return acc
      }, {})).toMatchSnapshot()
    })
  })
})
