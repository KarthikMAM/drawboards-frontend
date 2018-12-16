import React from 'react'
import { mount } from 'enzyme'
import Canvas from '../Canvas'

describe('<Canvas />', () => {
  it('should render without crashing', () => {
    const component = mount(<Canvas />)

    expect(component).toMatchSnapshot()
  })
})
