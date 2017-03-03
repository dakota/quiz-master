import React, {Component} from 'react';

class Media extends Component {
  render()
  {
    if (!this.props.media) {
      return (<span></span>);
    }

    switch (this.props.media.type) {
      case 'image':
        return (<img role="presentation" src={'./media/' + this.props.media.file} style={{maxWidth: '100%', height: '100px'}}/>);
      default:
        return (
          <span></span>
        )
    }
  }
}

export default Media;