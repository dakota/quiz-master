import React, {Component} from 'react';

class Media extends Component {
  render()
  {
    if (!this.props.media) {
      return (<span></span>);
    }

    switch (this.props.media.type) {
      case 'audio':
        return (
          <audio autoPlay>
            <source src={'./media/' + this.props.media.file} />
          </audio>
        );
      case 'video':
        return (
          <video
            autoPlay
            style={{maxWidth: '100%', height: '350px'}}
          >
            <source src={'./media/' + this.props.media.file} />
          </video>
        );
      case 'image':
        return (<img alt="presentation" src={'./media/' + this.props.media.file} style={{maxWidth: '100%', height: '350px'}}/>);
      default:
        return (
          <span></span>
        )
    }
  }
}

export default Media;
