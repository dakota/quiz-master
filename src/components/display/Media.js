import React, {Component} from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import {withStyles} from '@material-ui/core/styles';

const styles = {
  videoMedia: {
    maxWidth: '100%', height: '400px'
  },
  imageMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

class Media extends Component {
  render()
  {
    const {media, classes} = this.props;

    if (!media) {
      return null;
    }

    switch (media.type) {
      case 'audio':
        return <CardMedia
          autoPlay
          loop
          component="audio"
          src={'./media/' + media.file}
        />;
      case 'video':
        return <CardMedia
          autoPlay
          loop
          component="video"
          src={'./media/' + media.file}
          className={classes.videoMedia}
          style={{}}
        />;
      case 'image':
        return <CardMedia
          image={'./media/' + media.file}
          className={classes.imageMedia}
        />;
      // case 'audio':
      //   return (
      //     <audio autoPlay>
      //       <source src={'./media/' + this.props.media.file} />
      //     </audio>
      //   );
      // case 'video':
      //   return (
      //     <video
      //       autoPlay
      //       style={{maxWidth: '100%', height: '350px'}}
      //     >
      //       <source src={'./media/' + this.props.media.file} />
      //     </video>
      //   );
      // case 'image':
      //   return (<img alt="presentation" src={'./media/' + this.props.media.file} style={{maxWidth: '100%', height: '350px'}}/>);
      default:
        return null;
    }
  }
}

export default withStyles(styles)(Media);
