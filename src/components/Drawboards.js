import React, { PureComponent } from 'react'

import Canvas from './Canvas'
import Styles from './styles/Drawboards.module.scss'

export default class Drawboards extends PureComponent {
  render () {
    return (
      <div className={Styles.Container}>
        {this.props.drawboards.map((drawboard) => (
          <div key={drawboard.id} className={Styles.Drawboard} onClick={() => this.props.onSelectionChanged(drawboard)}>
            <Canvas
              background={drawboard.image.key}
              shapes={drawboard.overlays || []} />
            {this.props.title && <p>{this.props.title}</p>}
          </div>
        ))}
        {this.props.fetchMore && (
          <button className={Styles.FetchMore} onClick={this.props.fetchMore}>Fetch More</button>
        )}
      </div>
    )
  }
}
