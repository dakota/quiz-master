import React, {Component} from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import {withStyles} from '@material-ui/core/styles';

const styles = {
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

class Media extends Component {
  render()
  {
    if (!this.props.media) {
      return null
    }

    switch (this.props.media.type) {
      case 'image':
        return <CardMedia image={'./media/' + this.props.media.file} className={this.props.classes.media} />;
      default:
        return null;
    }
  }
}

export default withStyles(styles)(Media);
