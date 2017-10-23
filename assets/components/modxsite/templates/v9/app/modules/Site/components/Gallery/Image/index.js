import React, {Component} from 'react';

import PropTypes from 'prop-types';

import { DragSource } from 'react-dnd';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Checkbox from 'material-ui/Checkbox';

const defaultProps = {}


const knightSource = {
  beginDrag(props) {

		// console.log('GalleryImage beginDrag', props, this);

		let {onStartDrag, image} = props;

		onStartDrag(image);

		// this.setState({
		// 	dragging: true,
		// });
    return {};
  },

  endDrag(props) {

		// console.log('GalleryImage endDrag', props, this);

		let {onEndDrag, image} = props;

		onEndDrag(image);

		// this.setState({
		// 	dragging: true,
		// });
    return {};
  },
};

function collect(connect, monitor) {

	// console.log('GalleryImage collect', connect, monitor);

  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class GalleryImage extends Component{

	constructor(props){

		super(props);

		this.state = {}
	}

	componentWillMount(){

	}

	componentDidMount(){

	}

  componentDidUpdate(){

    if(this.props.debug){
      console.log("GalleryImage componentDidUpdate", this);
    }
  }

	render(){

		let {
			image,
			checked,
			onSelectImage,
		} = this.props;

		let {dragging} = this.state;

		
    const { connectDragSource, isDragging, isDragging2 } = this.props;

    let style = {};

    // if(isDragging){
    if(isDragging2){
    	Object.assign(style, {
    		// display: 'none',
    		border: '2px dashed #ddd',
    	});
    }

    return ( <div
    	style={style}
		>
			<div>
				<Checkbox 
					checked={checked}
					onChange={(event, checked) => {
						onSelectImage(event, checked, image);
					}}
				/>
			</div>

			{connectDragSource(<img 
				style={{
		      // opacity: isDragging ? 0.5 : 1,
		      opacity: isDragging2 ? 0.5 : 1,
		    	// cursor: dragging ? 'move' : 'default',
		    	cursor: 'move',
		    }}
				src={image.src}
			/>)}
			
		</div>);
	}
}

GalleryImage.defaultProps = defaultProps;

GalleryImage.propTypes = {
	image: PropTypes.object.isRequired,
	onSelectImage: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  onStartDrag: PropTypes.func.isRequired,
  onEndDrag: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
}

export default DragSource('GalleryImage', knightSource, collect)(GalleryImage);