
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import PeopleIcon from 'material-ui-icons/People';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FaceIcon from 'material-ui-icons/Face';

import { Link, browserHistory } from 'react-router';

import Stars from './Stars';

export default class Rating extends Component{

	static propTypes = {
		item: PropTypes.object.isRequired,
	};

	static contextTypes = {

	};

	constructor(props){

		super(props);

		this.state = {
			votersOpen: false,
		};
	}

	toggleVoters(){

		const {
			votersOpen,
		} = this.state;

		this.setState({
			votersOpen: !votersOpen,
		});
	}

	// shouldComponentUpdate(nextProps, nextState){

	// 	// if(JSON.stringify(this.props || "") === JSON.stringify(nextProps || "")){
	// 	// 	return false;
	// 	// }

	// 	return false;
	// }

	render(){

		const {
			item,
		} = this.props;

		if(!item){
			return null;
		}



		const {
			votersOpen,
		} = this.state;

		const {
			ratingAvg,
		} = item;

		if(!ratingAvg){
			return null;
		}

		const {
      rating,
      max_vote,
      min_vote,
      quantity,
      quantity_voters,
      voters,
		} = ratingAvg || {};

		// const quantity_voters = voters && voters.length || 0;

		const iconStyle={
			height: 17,
		};

		let Voters = <span
			className="flex direction-row align-center"
		>
			<PeopleIcon 
				style={iconStyle}
			/> {quantity_voters || 0}
		</span>

		if(voters && voters.length){

			Voters = <a 
				href="javascript:;"
				className="no-underline"
				onClick={event => {
					event.stopPropagation();
					event.preventDefault();

					this.toggleVoters();
				}}
			>{Voters}</a>

		}

		return <div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<Stars 
					value={parseFloat(rating) || 0}
					allowEdit={true}
				/> <ThumbUpIcon 
					style={iconStyle}
				/> {quantity || 0} {Voters}
			</div>

			{votersOpen && voters && voters.length
				?
					<div
						className="flex direction-row align-center"
						style={{
							// border: '1px solid red',
							flexWrap: 'wrap',
							marginTop: 20,
						}}
					>
						{voters.map(voter => {

							const {
								id,
								username,
								fullname,
								imageFormats:image,
							} = voter;

							const {
								thumb,
							} = image || {};

							return <Link
								key={id}
								to={`/profile/${username}`}
								href={`/profile/${username}`}
								title={fullname || username}
								className="no-underline"
							>
								<Chip
									style={{
										margin: 5,
										backgroundColor: '#2fa4e7',
										color: '#fff',
									}}
					        avatar={
					          <Avatar
					          	src={thumb}
					          />
					        }
					        label={fullname || username || ""}
					      />
							</Link>
						})}
					</div>
				:
				null
			}


		</div>
	}
}
