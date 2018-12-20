import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { mount } from 'enzyme'

import DrawboardEditor, { DrawboardEditorContainer } from '../DrawboardEditor'
import { getDrawboardBasicSample } from '../../graphql/drawboards/__mocks__/getDrawboard/basicSample'
import { updateDrawboardBasicSample } from '../../graphql/drawboards/__mocks__/updateDrawboard/basicSample'

describe(DrawboardEditor, () => {
  it('various states', async () => { // need to be in different tests
    const wrapper = mount(
      <MockedProvider addTypename={false} cache={false} mocks={[getDrawboardBasicSample, getDrawboardBasicSample, getDrawboardBasicSample, updateDrawboardBasicSample, updateDrawboardBasicSample, updateDrawboardBasicSample]}>
        <DrawboardEditor id='1' />
      </MockedProvider>
    )

    expect(wrapper.find(DrawboardEditorContainer).props()).toMatchSnapshot('before get')

    await new Promise(resolve => setTimeout(resolve, 0))

    wrapper.update()

    expect(wrapper.find(DrawboardEditorContainer).props()).toMatchSnapshot('after get')

    wrapper.find(DrawboardEditorContainer).instance().handleChange([
      {
        type: 'square',
        points: [
          { x: 1, y: 0.1 },
          { x: 1, y: 0.2 },
        ],
        stroke: 'black',
        fill: 'green',
      },
    ])

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(wrapper.find(DrawboardEditorContainer).props()).toMatchSnapshot('after update')
  })
})
