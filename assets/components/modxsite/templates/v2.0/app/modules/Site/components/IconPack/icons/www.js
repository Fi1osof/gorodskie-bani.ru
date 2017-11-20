
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import SvgIcon from 'material-ui/SvgIcon';

// import * as Technology from './icons/005-technology.svg';

// const Technology = require('./icons/005-technology.svg');

// console.log("SvgLoader", Technology);

export default class WwwIcon extends Component{

	static propTypes = {

	};

	static defaultProps = {
		fill: "#010002",
	};

	static contextTypes = {

	};

	constructor(props){

		super(props);

		this.state = {

		};
	}

	render(){

		const {
			viewBox,
			fill,
			...other
		} = this.props;

		return <SvgIcon
			viewBox="0 0 512.864 512.864"
			{...other}
		>
<g>
	<g>
		<g>
			<g>
				<path style={{fill,}} d="M448.136,346.826c-4.268,9.112-6.641,13.168-10.778,20.208
					c-17.728-4.877-50.836-11.665-74.385-14.851c1.463-8.129,1.699-8.486,3.666-20.785l0.106-0.772l-11.632-38.619l-2.008,16.452
					c-1.683,13.916-3.934,28.068-6.609,41.48c-30.311-3.861-57.745-4.804-81.96-5.893v-20.663l-9.071-28.987
					c-9.023,34.457-7.308,22.971-7.535,49.536l-31.953,0.91c-19.704,0.951-37.912,2.593-51.625,4.341l-0.244-1.26
					c-2.544-13.079-4.666-26.589-6.292-40.139l-1.878-15.737l-11.941,37.001l0.122,0.829c1.471,9.405,2.26,13.502,3.755,21.573
					c-24.483,3.894-47.195,8.307-72.743,15.582c-3.699-6.178-6.714-11.616-10.787-20.208l-0.943-1.991H45.13l2.178,4.91
					c80.928,180.666,337.141,180.292,417.874-0.016l2.17-4.91h-18.265L448.136,346.826z M264.536,468.608V361.027
					c22.524,0.39,49.974,2.195,78.359,5.592c-7.657,31.856-19.907,65.76-31.897,94.909
					C294.254,466.007,279.834,467.852,264.536,468.608z M332.881,454.416c2.585-8.129,17.631-44.057,26.548-85.643
					c20.769,2.861,42.951,7.007,68.101,12.949C402.56,415.61,371.11,439.004,332.881,454.416z M178.097,453.863
					c-36.912-15.176-67.947-38.107-93.235-72.328c18.655-5.121,43.659-10.413,66.484-13.68
					C157.906,397.581,167.042,425.763,178.097,453.863z M247.93,360.88V468.6c-15.908-0.813-31.076-2.707-49.219-7.828
					c-11.502-28.206-23.508-63.785-30.848-95.153C192.379,362.506,223.422,360.88,247.93,360.88z"/>
			</g>
			<g>
				<path style={{fill,}} d="M478.871,203.974c-24.5-103.737-116.052-176.211-222.625-176.211
					c-105.737,0-197.118,71.767-222.243,174.512l-0.195,0.862l10.169,39.147l2.52-16.859c4.585-30.677,15.144-58.095,31.279-83.383
					c18.419,4.78,43.098,9.819,65.386,13.185c-2.243,15.534-3.536,30.287-4.585,45.057h16.582
					c0.959-13.656,2.414-29.45,4.373-42.724c29.369,4.024,59.265,6.048,88.39,6.657v36.075h16.623v-35.945
					c28.905-0.171,58.753-1.878,87.073-5.69c1.829,12.876,3.048,25.532,3.991,38.399l0.211,3.227h16.59l-0.26-3.723
					c-1.203-16.989-2.951-32.197-4.178-40.326c19.915-3.04,47.438-8.868,66.606-14.379c16.127,25.735,26.954,52.876,31.531,84.383
					l2.333,16.119l10.648-37.473L478.871,203.974z M424.474,127.484c-19.948,5.259-41.643,9.624-59.046,12.225
					c-5.17-28.45-8.803-45.398-17.802-74.596C377.158,79.802,401.178,98.035,424.474,127.484z M349.025,142.026
					c-27.881,3.601-57.884,5.357-84.488,5.357V44.573c21.451,0.894,41.935,4.755,62.037,11.86l0.602,0.203l0.203,0.593
					C336.596,82.355,344.985,116.755,349.025,142.026z M163.1,66c-6.6,21.321-11.843,41.553-17.322,72.491
					c-19.809-3.056-38.253-6.478-57.705-11.079C110.215,99.067,134.308,80.713,163.1,66z M183.616,57.213
					c18.696-6.982,40.724-11.648,64.313-12.632v102.672c-32.474-0.829-57.306-2.78-85.756-6.438
					C167.14,112.56,173.976,83.85,183.616,57.213z"/>
			</g>
		</g>
		<g>
			<path style={{fill,}} d="M70.881,273.579c3.942-12.112,7.454-23.768,10.242-37.302h0.488
				c2.78,13.282,6.04,24.491,10.006,37.083l17.249,53.844h18.647l36.375-112.825h-20.281l-16.086,56.632
				c-3.739,13.306-6.755,25.199-8.641,36.619h-0.683c-2.552-11.421-5.828-23.313-10.006-36.814l-17.517-56.429H73.442
				l-18.444,57.575c-3.715,12.128-7.454,24.239-10.006,35.668h-0.723c-2.073-11.665-5.121-23.313-8.381-35.896l-14.916-57.355H0
				l34.026,112.825h18.655L70.881,273.579z"/>
		</g>
		<g>
			<path style={{fill,}} d="M293.368,307.614h-0.699c-2.552-11.413-5.828-23.313-10.023-36.814l-17.501-56.429h-17.208
				l-18.436,57.575c-3.723,12.128-7.478,24.248-10.031,35.668h-0.691c-2.089-11.665-5.129-23.313-8.397-35.904l-14.94-57.339h-20.98
				l34.042,112.825h18.647l18.184-53.624c3.967-12.112,7.478-23.768,10.275-37.302h0.447c2.812,13.282,6.08,24.491,10.031,37.083
				l17.216,53.844h18.679l36.384-112.825h-20.297l-16.086,56.632C298.262,284.301,295.238,296.201,293.368,307.614z"/>
		</g>
		<g>
			<path style={{fill,}} d="M492.543,214.371l-16.086,56.632c-3.747,13.306-6.763,25.199-8.616,36.619h-0.699
				c-2.552-11.421-5.82-23.313-10.031-36.814l-17.485-56.429h-17.224l-18.427,57.575c-3.723,12.128-7.47,24.239-10.023,35.668
				h-0.715c-2.081-11.664-5.129-23.313-8.389-35.896l-14.916-57.347h-20.964l34.01,112.825h18.663l18.184-53.624
				c3.951-12.112,7.462-23.768,10.275-37.302h0.471c2.796,13.282,6.056,24.491,10.014,37.091l17.224,53.836h18.655l36.4-112.825
				L492.543,214.371L492.543,214.371z"/>
		</g>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
			</SvgIcon>
	}
}
