import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Link, browserHistory} from 'react-router';

import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import SaveIcon from 'material-ui-icons/Save';

import ItemMap from 'modules/Site/components/fields/Map';
import Comments from 'modules/Site/components/Comments';

import CompanyTopics from './Topics';

// import GoogleMapReact from 'google-map-react';

import RatingField from './fields/Rating';

export default class CompanyPage extends Component{

	static propTypes = {
		item: PropTypes.object.isRequired,
	};

	static contextTypes = {
		// loadCompanyFullData: PropTypes.func.isRequired,
		setPageTitle: PropTypes.func.isRequired,
		updateContactItem: PropTypes.func.isRequired,
		saveContactItem: PropTypes.func.isRequired,
		localQuery: PropTypes.func.isRequired,
		CompaniesStore: PropTypes.object.isRequired,
		RatingsStore: PropTypes.object.isRequired,
		TopicsStore: PropTypes.object.isRequired,
		CommentsStore: PropTypes.object.isRequired,
		ResourcesStore: PropTypes.object.isRequired,
	};

	constructor(props){

		super(props);

		this.state = {};
	}

	componentDidMount(){

		const {
			item,
		} = this.props;

		const {
			name,
		} = item || {};

		const {
			setPageTitle,
		} = this.context;

		setPageTitle(name);


		let {
			CompaniesStore,
			RatingsStore,
			TopicsStore,
			CommentsStore,
			ResourcesStore,
		} = this.context;

 		this.CompaniesStoreListener = CompaniesStore.getDispatcher().register(payload => {

 			this.loadCompanyFullData();
 		});

 		this.RatingsStoreListener = RatingsStore.getDispatcher().register(payload => {

 			this.loadCompanyFullData();
 		});

 		this.TopicsStoreListener = TopicsStore.getDispatcher().register(payload => {

 			this.loadCompanyFullData();
 		});

 		this.CommentsStoreListener = CommentsStore.getDispatcher().register(payload => {

 			this.loadCompanyFullData();
 		});

 		this.ResourcesStoreListener = ResourcesStore.getDispatcher().register(payload => {

 			this.loadCompanyFullData();
 		});



		this.loadCompanyFullData();
	}

	componentWillUnmount(){

 		let {
			CompaniesStore,
			RatingsStore,
			TopicsStore,
			CommentsStore,
			ResourcesStore,
 		} = this.context;


    if(this.CompaniesStoreListener){

      let dispatch = CompaniesStore.getDispatcher();

      dispatch._callbacks[this.CompaniesStoreListener] && dispatch.unregister(this.CompaniesStoreListener);

      this.CompaniesStoreListener = undefined;
    }


    if(this.RatingsStoreListener){

      let dispatch = RatingsStore.getDispatcher();

      dispatch._callbacks[this.RatingsStoreListener] && dispatch.unregister(this.RatingsStoreListener);

      this.RatingsStoreListener = undefined;
    }


    if(this.TopicsStoreListener){

      let dispatch = TopicsStore.getDispatcher();

      dispatch._callbacks[this.TopicsStoreListener] && dispatch.unregister(this.TopicsStoreListener);

      this.TopicsStoreListener = undefined;
    }

    if(this.CommentsStoreListener){

      let dispatch = CommentsStore.getDispatcher();

      dispatch._callbacks[this.CommentsStoreListener] && dispatch.unregister(this.CommentsStoreListener);

      this.CommentsStoreListener = undefined;
    }


    if(this.ResourcesStoreListener){

      let dispatch = ResourcesStore.getDispatcher();

      dispatch._callbacks[this.ResourcesStoreListener] && dispatch.unregister(this.ResourcesStoreListener);

      this.ResourcesStoreListener = undefined;
    }


 		return super.componentWillUnmount && super.componentWillUnmount();
	}


	async loadCompanyFullData(){

		const {
			item,
		} = this.props;

		const {
			id,
		} = item;

		if(!id){
			return;
		}

		// const {
		// 	loadCompanyFullData,
		// } = this.context;

		// // 

		// loadCompanyFullData(item);

		const {
			localQuery,
		} = this.context;

		await localQuery({
			operationName: "Company",
			variables: {
				id,
			},
		})
			.then(result => {

				const {
					company,
				} = result.data;

				company && Object.assign(item, company);

				console.log('Company loadCompanyFullData result', result);

				this.forceUpdate();

			});

		return;
	}

	updateItem = (item, data) => {

		const {
			updateContactItem,
		} = this.context;

		return updateContactItem(item, data);
	}

	saveItem = () => {

		const {
			item,
		} = this.props;

		const {
			saveContactItem,
		} = this.context;

		return saveContactItem(item);
	}
	
	render(){

		const {
			item,
		} = this.props;

		const {
			galleryItem,
		} = this.state;

		const {
			id,
			name,
			uri,
			imageFormats: image,
			gallery,
			tvs,
			content,
			city,
			coords,
			comments,
			_isDirty,
		} = item;

		const {
			metro,
			address,
			phones,
			site,
			work_time,
			prices,
		} = tvs || {};

		// console.log("Company page item", item);

		let addresses = [];

		if(city){
			addresses.push(<span
				key="city"
			>{city}</span>);
		}

		if(address){
			addresses.push(<span
				key="address"
			>{address}</span>);
		}

		let galleryItems = [];


		if(galleryItem){
			galleryItems.push(<Grid
				item
				xs={12}
				key={`biag_image`}
			>
				<img 
					src={galleryItem}
					style={{
						cursor: 'pointer',
						maxWidth: '100%',
					}}
					onClick={event => {
						this.setState({
							galleryItem: undefined,
						});
					}}
				/>
			</Grid>);
		}


		if(gallery && gallery.length > 1){

			gallery.map((n, index) => {

				if(index === 0){
					return;
				}

				const {
					imageFormats: image,
				} = n;

				if(!image){
					return;
				}

				const {
					thumb,
					big,
				} = image;

				// if(galleryItem && galleryItem === n.image){

					

				// 	return;
				// }

				galleryItems.push(<Grid
					item
					key={index}
				>

					<img 
						src={thumb}
						style={{
							cursor: 'pointer',
						}}
						onClick={event => {
							this.setState({
								galleryItem: big,
							});
						}}
					/>
				</Grid>);
			});

		}


		return <Card
			style={{
				boxShadow: "none",
			}}
		>
			
			<CardHeader 
        title={<div
        	style={{
        		display: 'flex',
        		flexDirection: 'row',
        		alignItems: 'center',
        	}}
        >
        	{_isDirty
        		?
        			<IconButton
        				onClick={event => {
        					this.saveItem();
        				}}
        			>
        				<SaveIcon 
        					color="red"
        				/>
        			</IconButton>
        		:
        		null}
        	{name}
        </div>}
        subheader={<RatingField 
					item={item}
				/>}
			/>

				
			<CardContent>
				
				<Paper
					style={{
						padding: 15,
					}}
				>
					<Grid
						container
					>

						{image
							?
							<Grid
								item
							>
								<img 
									src={image.thumb}
									style={{
										cursor: 'pointer',
									}}
									onClick={event => {
										this.setState({
											galleryItem: image.big,
										});
									}}
								/>
							</Grid>
							:
							null
						}
							

						<Grid
							item
							xs
						>
							
							{addresses.length ? <p>
								<b>Адрес: </b> {addresses.reduce((prev, curr) => [prev, ', ', curr])}
							</p> : ''}
							
							{metro ? <p>
								<b>Метро: </b> {metro}
							</p> : ''}
							
							{phones ? <p>
								<b>Телефон: </b> {phones}
							</p> : ''}
							
							{site ? <p>
								<b>Сайт: </b> {site}
							</p> : ''}
							
							{work_time ? <div
								style={{
									overflow: 'hidden',
								}}
							>
								<b
									style={{
										float: 'left',
									}}
								>Время работы:&nbsp;</b> <div
									dangerouslySetInnerHTML={{ __html: work_time }}
								/>
							</div>

							 : ''}

							{prices
								?
									<div
										style={{
											overflow: 'hidden',
										}}
									>
										<b
											style={{
												float: 'left',
											}}
										>Цены:&nbsp;</b> <div
											dangerouslySetInnerHTML={{ __html: prices }}
										/>
									</div>
								:
								null
							}
						</Grid>

					</Grid>
				</Paper>

			</CardContent>


			{content
				?
				<CardContent>
					<Paper
						style={{
							padding: 15,
						}}
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				</CardContent>
				:
				null
			}

			<CardContent>
				<Paper
					style={{
						height: 400,
					}}
				>
					
					<ItemMap
	        	item={item}
	        	// connector_url={connector_url}
	        	// PlacesStore={PlacesStore}
	        	// ContactsStore={ContactsStore}
	        	// ServicesStore={ServicesStore}
	        	// savePlaceItem={savePlaceItem}
	        	updateItem={this.updateItem}
	        	// updateItem={updateItem}
	        	showSearchControl={true}
	        />

					{/*
						<GoogleMapReact
				      bootstrapURLKeys={{
				      	key: "AIzaSyBdNZDE_QadLccHx5yDc96VL0M19-ZPUvU",
				      }}
				      defaultCenter={coords}
				      defaultZoom={15}
		  				zoom={15} 
							draggable={true}
						  // onGoogleApiLoaded={::this.onGoogleApiLoaded}
						  // yesIWantToUseGoogleMapApiInternals={true}
						  options={{
							  scrollwheel: false,
							}}
				    >
					    <div
					    	{...coords}
								style={{
									width: 40,
									// border: '1px solid blue',
									position: 'absolute',
									left: -(40 / 2),
									top: 0,
									cursor: 'pointer',
								}}
							>
								<div
									style={{
										position: 'relative',
									}}
								>
									<img 
										src={`data:image/png;base64,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`}
										style={{
											width: '100%',
										}}
									/>
								</div>
							</div>
				    </GoogleMapReact>
				  */}

				</Paper>
			</CardContent>

			{galleryItems
				?
					
				<CardContent>
						
					<Paper
						style={{
							padding: 15,
						}}
					>

						<Grid
							container
						>

							{galleryItems}

						</Grid>
				
					</Paper>

				</CardContent>

				:
				null
			}


			<CompanyTopics 
				item={item}
			/>
			
				
			{comments && comments.length
				?
				<CardContent>
					
					<Paper
						style={{
							padding: 15,
						}}
					>

						<Typography
							type="title"
						>
							{comments.length} комментариев
						</Typography>

						<Comments 
							comments={comments}
						/>

					</Paper>

				</CardContent>
				:
				null
			}


		</Card>
	}
}

