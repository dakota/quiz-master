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
      case 'image':
        this.props.onFinish();
        return (<img src={'./media/' + this.props.media.file} style={{maxWidth: '100%', height: '300px'}}/>)
    }
    return (
      <span></span>
    )
  }
}

export default Media;
