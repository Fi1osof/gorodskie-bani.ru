
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


			let width = hovered ? 30 : 20;

			let icon = <img 
				src={`data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjQ0cHgiIGhlaWdodD0iNjJweCIgdmlld0JveD0iMCAwIDQ0IDYyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4wLjQgKDgwNTQpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPm1hcF9pY29uIDI8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4KICAgICAgICA8ZyBpZD0iaWNvbl9wbGFjZW1hcmstYXV0by1wYXJ0LW1hcmtlci10eXBlIiBza2V0Y2g6dHlwZT0iTVNMYXllckdyb3VwIj4KICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMS45OTg5MTY5LDAgQzkuODQ5MjU5MSwwIDAsOS4zNzA1NDA2MSAwLDIwLjkyOTcwOTggQzAsMzIuNDg4ODc5IDkuODQ5MjU5MSw0MS44NTk0MTk2IDIxLjk5ODkxNjksNDEuODU5NDE5NiBDMjIuMjI0MTkxNCw0MS44NTk0MTk2IDIyLjQ0NzI5OTgsNDEuODUwNzQzMiAyMi42NzI1NzQyLDQxLjg0NDIzNTkgTDE0LjkwNTA0MjksNjIgTDE2LjU5NTczNDMsNjIgQzE2LjU5NTczNDMsNjIgMzcuNTE5MDI3Miw0MC4zNDUzODMyIDQyLjA3ODY2ODgsMjkuNDk1NTExOSBDNDMuMzA2ODQ3OCwyNi44ODE3Mzg0IDQ0LDIzLjk4MzgxMTkgNDQsMjAuOTI5NzA5OCBDNDQsOS4zNzA1NDA2MSAzNC4xNTA3NDA5LDAgMjEuOTk4OTE2OSwwIFoiIGlkPSJQYXRoIiBvcGFjaXR5PSIwLjY2MDAwNDY2NCIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTQyLjAyNjkwNTgsMjAuOTI5OTM2MyBDNDIuMDI2OTA1OCwxMC41MDIyMTQ1IDMzLjA2MDk4ODQsMS45NzQ1MjIyOSAyMS45MDEzNDUzLDEuOTc0NTIyMjkgQzEwLjkzOTAxMTYsMS45NzQ1MjIyOSAxLjk3MzA5NDE3LDEwLjUwMjIxNDUgMS45NzMwOTQxNywyMC45Mjk5MzYzIEMxLjk3MzA5NDE3LDMxLjU0MTEzNjUgMTAuOTM5MDExNiw0MC4wNjg4Mjg3IDIxLjkwMTM0NTMsNDAuMDgyODAyNSBDMjIuMjA0MDg0Niw0MC4wNjg4Mjg3IDIyLjQwNzE4MzIsNDAuMDYwOTMyNyAyMi42OTA1ODMsNDAuMDgyODAyNSBMMjIuNjkwNTgzLDQwLjA4MjgwMjUgTDE0Ljc5ODIwNjMsNjIgTDE2Ljc3MTMwMDQsNjIgQzE2Ljg0NDY0NjcsNjIgMzYuMTI3MTg2MiwzOC42OTA5NzQ3IDQwLjI1MTEyMTEsMjguODI4MDI1NSBMNDAuMjUxMTIxMSwyOC44MjgwMjU1IEM0MS4zOTU5MTk4LDI2LjQzODMzOTIgNDIuMDI2OTA1OCwyMy44MDEwNzE1IDQyLjAyNjkwNTgsMjAuOTI5OTM2MyBMNDIuMDI2OTA1OCwyMC45Mjk5MzYzIFoiIGlkPSJQYXRoLTIiIGZpbGw9IiM3ODVDQjkiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMiwzNS45MzYzMDU3IEMxMy42NjI4NTA5LDM1LjkzNjMwNTcgNi45MDU4Mjk2LDI5LjUyODgzIDYuOTA1ODI5NiwyMS42MjEwMTkxIEM2LjkwNTgyOTYsMTMuNzEzMjA4MiAxMy42NjI4NTA5LDcuMzA1NzMyNDggMjIsNy4zMDU3MzI0OCBDMzAuMzM3MTQ5MSw3LjMwNTczMjQ4IDM3LjA5NDE3MDQsMTMuNzEzMjA4MiAzNy4wOTQxNzA0LDIxLjYyMTAxOTEgQzM3LjA5NDE3MDQsMjkuNTI4ODMgMzAuMzM3MTQ5MSwzNS45MzYzMDU3IDIyLDM1LjkzNjMwNTcgTDIyLDM1LjkzNjMwNTcgWiIgaWQ9IlNoYXBlIiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8ZWxsaXBzZSBpZD0iT3ZhbCIgZmlsbD0iIzc4NUNCOSIgY3g9IjIyIiBjeT0iMjEuNjIxMDE5MSIgcng9IjguMTg4MzQwODEiIHJ5PSI3Ljc5OTM2MzA2Ij48L2VsbGlwc2U+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==`} 
				style={{
					width: '100%',
				}}
			/>

			// if(type == "Contact"){
			// 	Icon = Texture;
			// }
			// else{
			// 	Icon = Business;
			// }

			marker = <div
				style={{
					width,
					// border: '1px solid blue',
					position: 'absolute',
					left: -(width / 2),
					bottom: 0,
					cursor: 'pointer',
				}}
			>
				{icon}
			</div>;

			// marker = <div
			// 	style={{
			// 		display: 'inline-block',
			// 		border: '1px solid red',
			// 		// marginLeft: hovered && openEditor ? -20 : 0,
			// 		// paddingRight: hovered ? 40 : 0,
			// 		position: 'absolute',
			// 		// height: 20,
			// 		// width: 20,
			// 		// top: -32,
			// 		// left: -20,
			// 		// left: hovered ? -24 : -12,
			// 	}}
			// >
			// 	{icon}
			// </div>

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