import React from 'react'
import { mount } from 'enzyme'

import Canvas from '../Canvas'

describe(Canvas, () => {
  it('should mount without any problems', () => {
    const wrapper = mount(<Canvas background='hello.png' />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should show canvas after the image loads', () => {
    const wrapper = mount(<Canvas background='hello.png' />)

    wrapper.find('img').simulate('load')

    expect(wrapper).toMatchSnapshot()
  })

  it('should set height and width of canvas based on the current state', () => {
    const wrapper = mount(<Canvas background='hello.png' />)

    wrapper.find('img').simulate('load')
    wrapper.setState({
      height: 400,
      width: 300,
    })

    expect(wrapper).toMatchSnapshot()
  })

  describe('draw', () => {
    it('should draw the required shapes on the canvas without creashing', () => {
      expect(() => {
        const wrapper = mount(<Canvas background='hello.png' />)

        wrapper.find('img').simulate('load')
        wrapper.setState({
          height: 400,
          width: 300,
        })
        wrapper.setProps({
          shapes: require('./__mocks__/canvasShapes/sample-1.json').shapes,
        })
      }).not.toThrowError()
    })
  })
})
