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
          <audio autoPlay onEnded={this.props.onFinish}>
            <source src={'./media/' + this.props.media.file} />
          </audio>
        );
      case 'video':
        return (
          <video autoPlay onEnded={this.props.onFinish} src={'./media/' + this.props.media.file} type="video/mp4" style={{maxHeight: '250px'}}>
          </video>
        );
      case 'image':
        this.props.onFinish();
        return (<img role="presentation" src={'./media/' + this.props.media.file} style={{maxWidth: '100%', height: '300px'}}/>);
      default:
        return (
          <span></span>
        )
    }
  }
}

export default Media;
