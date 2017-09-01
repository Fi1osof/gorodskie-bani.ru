
import React, {Component} from 'react';

import PropTypes from 'prop-types';

import SimpleMarker from 'google-map-react/develop/markers/SimpleMarker';
import ClusterMarker from 'google-map-react/develop/markers/ClusterMarker';

import IconButton from 'material-ui/IconButton';
import Business from 'material-ui-icons/Business';
import Texture from 'material-ui-icons/Texture';
import EditIcon from 'material-ui-icons/ModeEdit';

export default class Marker extends Component{

	static proTypes = {
		cluster: PropTypes.object.isRequired,
	};

	render(){

		// console.log('AnyReactComponent props', this.props);

		let {
			// item,
			// geometry: {
			// 	coordinates: {
			// 		0: lat,
			// 		1: lng,
			// 	},
			// }
			cluster,
		} = this.props;

		let {
			properties: {
				point_count,
				point_count_abbreviated,
				item,
				type,
				hovered,
				openEditor,
			}
		} = cluster || {}

		let marker = null;

		if(item){

			let {
				_isDirty,
			} = item;

			if(_isDirty){
				console.log('_isDirty', item, _isDirty);
			}

			let Icon;

			if(type == "Contact"){
				Icon = Texture;
			}
			else{
				Icon = Business;
			}

			marker = <div
				style={{
					display: 'inline-block',
					// border: '1px solid red',
					// marginLeft: hovered && openEditor ? -20 : 0,
					// paddingRight: hovered ? 40 : 0,
					position: 'absolute',
					// height: 20,
					// width: 20,
					top: -12,
					left: hovered ? -24 : -12,
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'row',
						// minHeight: 45,
					}}
				>
					{hovered && openEditor
						?
							<IconButton
								onClick={openEditor}
								style={{
									height: 24,
									width: 24,
									padding: 0,
									margin: 0,
								}}
							>
								<EditIcon />
							</IconButton>
						:
						null
					}
					<Icon 
						color={_isDirty ? 'red' : undefined}
					/>
				</div>
			</div>

		}
		else{

			marker = <ClusterMarker
				text={point_count_abbreviated}
				hovered={hovered ? true : false}
			></ClusterMarker>

			// marker = <SimpleMarker
			//   // style={{
			//   // 	background: '#fff',
			//   // 	display: 'inline-block',
			//   // }}
			//  ></SimpleMarker>
		}

		return marker;
	}
}