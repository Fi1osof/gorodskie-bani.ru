import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Link, browserHistory} from 'react-router';

import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Tabs, { Tab } from 'material-ui/Tabs';

import SaveIcon from 'material-ui-icons/Save';
import EditIcon from 'material-ui-icons/Edit';
import AddIcon from 'material-ui-icons/AddCircle';
import WarningIcon from 'material-ui-icons/Warning';
// import ListIcon from 'material-ui-icons/List';
import ListIcon from 'material-ui-icons/ErrorOutline';

import Helper from 'modules/Site/components/Helper';

import ItemMap from 'modules/Site/components/fields/Map';
import Comments from 'modules/Site/components/Comments';

import ImagesUploader from 'modules/Site/components/fields/ImageUploader';

import GalleryEditor from 'modules/Site/components/Gallery';

import CompanyTopics from './Topics';

import Slider from 'react-slick';

import Editor from 'modules/Site/components/fields/Editor';

import ScheduleEditor from 'modules/Site/components/fields/Schedule/Editor';

// import GoogleMapReact from 'google-map-react';

import RatingField from './fields/Rating';

// import locale from 'moment/src/locale/ru';
import moment from 'moment';

if(typeof window !== "undefined"){
	window.moment = moment;
}


import EditVersions from 'modules/Site/components/Pages/EditVersions';

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
		documentActions: PropTypes.object.isRequired,
		user: PropTypes.object.isRequired,
	};

	constructor(props){

		super(props);

		const {
			item,
		} = props;

		this.state = {
			item,
			sending: false,
			galleryExpanded: false,
			diffs: null,
			tabIndex: 2,
		};
	}

	componentWillMount(){

		const {
			item,
		} = this.state;

		const {
			name,
		} = item || {};


		let {
			CompaniesStore,
			RatingsStore,
			TopicsStore,
			CommentsStore,
			ResourcesStore,
		} = this.context;

 		this.CompaniesStoreListener = CompaniesStore.getDispatcher().register(payload => {

 			// console.log("CompaniesStoreListener payload", payload);

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

		super.componentWillMount && super.componentWillMount();
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


	componentDidUpdate(prevProps, prevState, prevContext){


		// console.log('componentDidUpdate', this.props.item.id, prevProps.item.id);
		
		// console.log('Company componentDidUpdate', this.props.item === prevProps.item);


		// if(this.props.item.id !== prevProps.item.id){
		// 	this.loadCompanyFullData();
		// }

		if(this.state.item !== prevState.item){
			this.loadCompanyFullData();
		}

		super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState, prevContext);
	}


	setPageTitle(title){

		// console.log("setPageTitle 2", title);

		const {
			setPageTitle,
		} = this.context;

		setPageTitle(title);
	}


	loadCompanyFullData(){

		const {
			item,
		} = this.state;

		const {
			id,
			name,
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
			CompaniesStore,
		} = this.context;

		localQuery({
			operationName: "Company",
			variables: {
				id,
				companyGetEditVersions: true,
				editVersionGetCreator: true,
				editVersionGetEditor: true,
			},
		})
			.then(result => {

				const StoreItem = CompaniesStore.getState().find(n => n.id === id);

				const {
					company,
				} = result.data;

				company && Object.assign(item, company);

				// console.log('Company loadCompanyFullData item isEqual', StoreItem === item, StoreItem, item);

				// console.log('Company loadCompanyFullData result', result);

				this.setPageTitle(company && company.name || name);

				this.forceUpdate();

			});

		return;
	}

	updateItem = (item, data) => {

		const {
			updateContactItem,
		} = this.context;

		updateContactItem(item, data);

		// console.log("updateItem", result);
	}

	saveItem = async () => {

		const {
			item,
		} = this.state;

		const {
			saveContactItem,
			documentActions,
		} = this.context;

		this.setState({
			sending: true,
		});

		await saveContactItem(item)
			.then(r => {
				// console.log("Save Company item result", r);
			})
			.catch(e => {

				const {
					message,
					data,
					errors,
				} = e;

				// console.log("Save Company item error", errors);

				if(errors){

					for(var i in errors){

						const error = errors[i];

						error && documentActions.addInformerMessage(error);

						// error && documentActions.addInformerMessage({
						// 	text: error,
						// 	autohide: 4000,
						// });

					}

				}

				console.error(e);
			});

		this.setState({
			sending: false,
		});
		
	}


	clearErrors(name){
		
		const {
			item,
		} = this.state;

		let {
			_errors: errors,
		} = item;

		if(errors && errors[name]){
			errors[name] = "";
			this.forceUpdate();
		}

	}

	// Почему-то не приходит объект события
	onFocus = (name) => {

		// console.log('onFocus', event, a,b);

		this.clearErrors(name);

		return;

	}

	onChange = event => {

		const {
			item,
		} = this.state;

		let data = {};

		// console.log("onChange item", item);

		const {
			name,
			value,
		} = event.target;

		this.clearErrors(name);

		data[name] = value;

		switch(name){

			case 'address':
			case 'metro':
			case 'phones':
			case 'site':
			case 'work_time':
			case 'prices':

				let tvs = item.tvs || {};

				tvs[name] = value;

				data.tvs = tvs;

				break;

		}

		// console.log("onChange name, value", name, value);

		this.updateItem(item, data);

	}


	previewDiffs(diffs){

		// console.log("previewDiffs", diffs);

		const {
			diffs: currentDiffs,
		} = this.state;

		this.setState({
			diffs: currentDiffs && currentDiffs === diffs ? null : diffs,
		});

	}


	acceptDiffs(diffs){

		const {
			item,
		} = this.state;

		// console.log("acceptDiffs", diffs);

		// console.log("acceptDiffs item", item);

		if(!item || !diffs || !diffs.data ){
			return;
		}

		this.setState({
			diffs: null,
		}, () => {

			const {
				id: diffsId,
				data: {
					id,
					...newData,
				},
			} = diffs;

			this.updateItem(item, Object.assign(newData || {}, {
				diffsId,
			}));
			
		});


		// const {
		// 	diffs: currentDiffs,
		// } = this.state;

		// this.setState({
		// 	diffs: currentDiffs && currentDiffs === diffs ? null : diffs,
		// });

	}


  handleTabIndexChange = (event, tabIndex) => {
    this.setState({ tabIndex });
  }

	
	render(){

		const {
    	documentActions,
    	user,
    } = this.context;

    const {
    	user: currentUser,
    } = user || {};

		let {
			item,
			item: {
				...itemData,
			},
			tabIndex,
		} = this.state;

		// console.log("Company render item", item);

		const {
			galleryItem,
			galleryExpanded,
			sending,
			diffs,
		} = this.state;


		// let item = Object.assign({}, itemData);

		// Перегружаем измененные данные
		if(diffs && diffs.data){
			Object.assign(itemData, diffs.data);
		}


		let {
			id,
			id: companyId,
			name,
			uri,
			imageFormats: image,
			gallery,
			tvs,
			content: itemContent,
			city,
			createdon,
			createdby,
			coords,
			comments,
			editedon,
			editVersions,
			_errors: errors,
			_isDirty,
		// } = item;
		} = itemData;

		const inEditMode = _isDirty ? true : true;

		let content;

		// const canEdit = !createdby || (currentUser && currentUser.id === createdby || user.hasPermission("editAllCompanies"));
		const canEdit = true;

		const {
			metro,
			address,
			phones,
			site,
			work_time,
			prices,
			approved,
		} = tvs || {};

		let editDate = editedon || createdon;


		const helper = <Helper
			contrastIcons={false}
			ref="helper"
    >
    	<Paper
				style={{
					padding: 15,
				}}
			>
				<div>
					Размещать информацию о своем заведении у нас можно бесплатно. 
					Платно стоят некоторые отдельные функции (если хотите знать какие, свяжитесь с нами по почте <a href="mailto:info@gorodskie-bani.ru">info@gorodskie-bani.ru</a>). <a
						href="javascript:;"
						style={{
							// textShadow: "0px 0px 5px #ccc",
							// fontSize: 12,
							// background: "rgba(256,256,256,0.7)",
					  //   display: "block",
					  //   paddingRight: 10,
					  	display: "inline-flex",
						}}
						onClick={e => {

							const {
								localQuery,
							} = this.context;

							this.refs.helper.setState({
								open: false,
							});

							localQuery({
								operationName: "addCompany",
							});

						}}
						className="flex align-center"
					>
						{/*<Grid
							container
							gutter={0}
							align="center"
						>*/}
							<IconButton
			  				accent
			  				style={{
			  					height: 30,
			  					width: 30,
			  				}}
							>
			  				<AddIcon 
			  				/>
							</IconButton>
							Добавить заведение
						{/*</Grid>*/}
					</a>
				</div>
				
				{/*<p>
					Если вы являетесь владельцем заведения, вам доступна функция редактирования его. Для начала редактирования просто кликните соответствующую иконку.
				</p> 
				
				<p>
					Если вы не являетесь владельцем заведения, вы не сможете сохранить внесенные изменения 
					(хотя возможность редактирования вам будет доступна даже если вы не авторизованный.).
					В таком случае данная функция будет доступна вам в качестве ознакомительной.
				</p> */}

				<p>
					<WarningIcon 
						color="#F57C00"
						style={{
							// height: 26,
							// width: 26,
							// flex: "none",
							marginRight: 5,
						}}
					/>
					Информацию о заведении может отредактировать любой желающий. Подробнее об этом <Link
						to="/topics/obnovlennaya-versiya-portala-gorodskix-ban-1641.html"
						href="/topics/obnovlennaya-versiya-portala-gorodskix-ban-1641.html"
					>читайте здесь</Link>
				</p>

				<p>
					Если горит красная иконка в виде дискеты, это означает, что информация о вашем заведении отредактирована. Кликнув по этой иконке
					вы сохраните измененную информацию. <br />
					Если вы хотите отменить все изменения, просто обновите страницу и изменения сбросятся.
				</p> 

				<p>
					Если вы отредактировали заведение, но не были авторизованы или зарегестрированы, не переживайте - процедура авторизации и регистрации максимально упращена 
					и не требует перезагрузки окна. Вы легко авторизуетесь, после чего сможете сохранить внесенные изменения.
				</p>

			</Paper>
    </Helper>;


		// console.log("Company page item", item);


		let addresses = [];

		// if(city){
		// 	addresses.push(<span
		// 		key="city"
		// 	>{city}</span>);
		// }

		if(address){
			addresses.push(<span
				key="address"
			>{address}</span>);
		}

		let galleryItems = [];


		let Gallery;
		let galleryList = [];
		let galleryThumbs = [];


		// if(galleryItem){
		// 	galleryItems.push(<Grid
		// 		item
		// 		xs={12}
		// 		key={`big_image`}
		// 	>
		// 		<img 
		// 			src={galleryItem}
		// 			style={{
		// 				cursor: 'pointer',
		// 				maxWidth: '100%',
		// 			}}
		// 			onClick={event => {
		// 				this.setState({
		// 					galleryItem: undefined,
		// 				});
		// 			}}
		// 		/>
		// 	</Grid>);
		// }


		if(gallery && gallery.length){

			gallery.map((n, index) => {

				// if(index === 0){
				// 	return;
				// }

				const {
					imageFormats: image,
				} = n;

				if(!image){
					return;
				}

				const {
					original,
					thumb,
					slider_thumb,
					slider_dot_thumb,
					big,

				} = image;

				galleryThumbs.push(slider_dot_thumb);

				// if(galleryItem && galleryItem === n.image){

					

				// 	return;
				// }

				galleryItems.push(<img 
					// key={index}
					key={original}
					src={galleryExpanded ? big : slider_thumb}
					// src={original}
					style={{
						// cursor: !galleryExpanded ? 'pointer' : undefined,
						cursor: 'pointer',
						// height: "auto",
					}}
					onClick={event => {
						this.setState({
							galleryExpanded: !galleryExpanded,
						});
					}}
					// onClick={event => {
					// 	this.setState({
					// 		galleryItem: big,
					// 	});
					// }}
				/>);
			});

		}


		Gallery = inEditMode 
			?
			null
      :
      galleryItems && galleryItems.length && 
      <CardContent
				style={{
						paddingBottom: 40,
					}}
				>
							 
					{/*<Grid
						container
	  				gutter={0}
					>

						{galleryItems}

					</Grid>*/}
			
					<div
						className={typeof window === "undefined" ? "no-js" : ""}
					>
						<Slider {
							...{
					      dots: true,
					      // lazyLoad: typeof window === "undefined" ? false : true,
					      // adaptiveHeight: true,
					      adaptiveHeight: galleryExpanded ? true : false,
					      dotsClass: "slick-dots slick-paging",
					      infinite: true,
					      // centerMode: true,
					      speed: 2000,
					      slidesToShow: 1,
					      slidesToScroll: 1,
					      // lazyLoad: true,
					      responsive: [ 
					      	{ breakpoint: 768, settings: { slidesToShow: 1 } }, 
					      	{ breakpoint: 1024, settings: { slidesToShow: galleryExpanded ? 1 : 2 } }, 
					      	{ breakpoint: 1200, settings: { slidesToShow: galleryExpanded ? 1 : 3 } }, 
					      	{ breakpoint: 100000, settings: { slidesToShow: galleryExpanded ? 1 : 5 } } ,
					      ],
					      customPaging: function(i) {
					        // return <a><img src={`${baseUrl}/abstract0${i+1}.jpg`}/></a>

					        // console.log('galleryThumbs');

					        const thumb = galleryThumbs[i];
					        return <a><img src={thumb}/></a>
					      },
					    }}
				      className={[
				      	galleryExpanded ? "" : "no-expanded",
				      ].join(" ")}
			      >
			        {galleryItems}
			      </Slider> 
					</div>

			</CardContent>
		|| "";


		let itemMap;

		if(typeof window !== "undefined" && coords){

			itemMap = <CardContent>
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
	        	onFocus={() => this.onFocus('coords')}
	        	onChange={(item, data) => {

	        		// console.log("onChange data", data);

	        		this.clearErrors('coords');
	        	}}
	        	error={errors && errors.coords ? true : false}
	        	helperText={errors && errors.coords || undefined}
	        	helper={inEditMode && <Paper
            	style={{
            		padding: 15,
            	}}
            >

            	<p>
            		Это поле позволяет точно указать координаты вашего заведения. Для этого просто переместите на карте маркер мышкой в нужную позицию.
            	</p>

            	<p>
            		Если маркер находится не в том районе карты, где вам нужно, можете в этом поисковом поле набрать нужный вам адрес, после чего кликнуть подходящий 
            		предложенный вариант и маркер автоматически переместится в выбранный район.
            	</p>

            	<p>
            		Смотрите видео как это работает: <br />
            		<iframe width="560" height="315" src="https://www.youtube.com/embed/4V_GzUk0PTQ?rel=0&amp;showinfo=0" frameBorder="0" allowFullScreen></iframe>
            	</p>

            </Paper> || undefined}
	        />

				</Paper>
			</CardContent>

		}


		let editVersionsList;

		if(editVersions && editVersions.filter(n => n.status === "0").length){


			editVersionsList = <div>
				
				{diffs
					?
					<Button
						onClick={event => {
							this.setState({
								diffs: null,
							});
						}}
						raised
						accent
					>
						Отменить изменения и показать оригинал
					</Button>
					:
					null
				}

				<EditVersions 
					companyId={companyId}
					previewDiffs={::this.previewDiffs}
					acceptDiffs={::this.acceptDiffs}
					diffs={diffs}
					activeOnly={true}
				/>
			</div>

		}
		else{

			editVersionsList = <div>
				<Link
					to="/edits/"
					href="/edits/"
					rel="nofollow"
					className="flex align-center"
					// onClick={(event) => {

					// 	// Если есть изменения у самой компании, смотрим их
					// 	if(editVersions && editVersions.length){

					// 		event.preventDefault();
					// 		event.stopPropagation();

					// 		this.setState({
					// 			expandHistory: true,
					// 		});

					// 		return;
					// 	}

					// }}
				>
					<ListIcon 
						color="#F57C00"
					/> Лента изменений
				</Link>
			</div>

		}


		let editDateInfo = id > 0 && <Grid
			item
			xs={12}
			style={{
				marginTop: 15,
			}}
		>

			<b>Дата последнего редактирования: </b> {editDate && moment(editDate * 1000).format("DD-MM-YYYY")}

			{editVersionsList}

		</Grid> || null;


		// let editModeContent;
		// let readOnlyContent;


		const mainInfo = <CardContent
			key="mainInfo"
		>

			<Paper
				style={{
					padding: 15,
				}}
			>

				<Grid
					container
    			gutter={0}
				>
					<Grid
						item
					>

						{image
							?
								<img 
									src={image.thumb}
									style={{
										cursor: 'pointer',
										marginRight: 10,
									}}
									// onClick={event => {
									// 	this.setState({
									// 		galleryItem: image.big,
									// 	});
									// }}
								/> 
							:
							null
						}

						{inEditMode
							?

								<div>
									
									<ImagesUploader 
	                  label={image ? "Заменить изображение" : "Загрузить изображение"}
	                  multiple={false}
	                  dataName="file[]"
	                  url="/assets/components/modxsite/connectors/connector.php?pub_action=images/upload"
	                  optimisticPreviews
	                  onLoadEnd={(err, response) => {
	                    // console.log('onLoadEnd', err, response);

	                    if (err && err.message) {
	                      // console.error(err);
	                      // this.updateProject({
	                      //   _errors: {
	                      //     image: err.message,
	                      //   }
	                      // });

	                      const {
	                      	message,
	                      } = err.response || {};

	                      documentActions.addInformerMessage(message || "Ошибка загрузки файла");

	                    }
	                    else{

	                      // console.log('response', response);
	                      // console.log('item', item);


	                      let {
	                        0: image,
	                      } = response.object || {};

	                      // console.log('response image', image);

	                      if(image && image.url){
		                      
		                      this.updateItem(item, {
		                      	image: image.url,
		                      });

		                      this.clearErrors("image");

	                        // this.updateProject({
	                        //   thumb: image.thumb,
	                        //   image: image.url,
	                        //   newImage: image.url,
	                        // });
	                      }

	                      return;
	                    }
	                  }}
	                />

	                {errors && errors.image 
	                	?
	                		<p
	                			style={{
	                				color: "red",
	                			}}
	                		>
	                			{errors.image}
	                		</p>
	                	:
	                	null
	                }

								</div>

							:
							null
						}
						
					</Grid>

					<Grid
						item
						xs={12}
						sm
					>

						{inEditMode
							?
								<TextField 
									label="Адрес"
									error={errors && errors.address ? true : false}
									helperText={errors && errors.address || "Укажите подробный адрес"}
									name="address"
									value={address || ""}
									onChange={this.onChange}
									onFocus={() => this.onFocus('address')}
								/>
							:
							addresses.length ? <p>
								<b>Адрес: </b> {addresses.reduce((prev, curr) => [prev, ', ', curr])}
							</p> : ''
						}

						
						
						{inEditMode
							?
							<TextField 
								label="Метро"
								helperText="Укажите ближайшие станции метро через запятую"
								name="metro"
								value={metro || ""}
								onChange={this.onChange}
								onFocus={() => this.onFocus('metro')}
							/>
							:
							metro ? <p>
								<b>Метро: </b> {metro}
							</p> 
							: ''
						}
						
						{inEditMode
							?
							<TextField 
								label="Телефон"
								helperText="Можно указать несколько телефонов через запятую"
								name="phones"
								value={phones || ""}
								onChange={this.onChange}
								onFocus={() => this.onFocus('phones')}
							/>
							:
							phones ? <p>
								<b>Телефон: </b> {phones.split(/,|;/).map(n => n && n.trim()).filter(n => n).map(phone => {
									return phone && phone.length > 8 ? <a href={`tel:${phone}`}>{phone}</a> : phone;
								}).reduce((a,b) => [a,", ",b])}
							</p> 
							: ''
						}
						
						{inEditMode
							?
							<TextField 
								label="Сайт"
								helperText="Если адрес начинается с https, обязательно укажите вместе с ним, например, https://ваш_сайт/"
								name="site"
								value={site || ""}
								onChange={this.onChange}
								onFocus={() => this.onFocus('site')}
							/>
							:
							site ? <p>
								<b>Сайт: </b> <a 
									href={/^https?:/.test(site) ? site : `http://${site}`} 
									target="_blank" 
									rel={approved ? "follow" : "nofollow"}
								>{site}</a>
							</p> 
							: ''
						}
						
						{inEditMode
							?
							// <TextField 
							// 	label="Время работы"
							// 	error={errors && errors.work_time ? true : false}
							// 	helperText={errors && errors.work_time || "Распишите график работы заведения"}
							// 	name="work_time"
							// 	value={work_time || ""}
							// 	multiline
							// 	onChange={this.onChange}
							// 	onFocus={() => this.onFocus('work_time')}
							// />
							<Editor 
								// value={text || ""}
								// // readOnly={!inEditMode}
								// name="text"
								// label={inEditMode ? "Текст комментария" : undefined}
								// // error={errors && errors.text ? true : false}
								// // helperText={errors && errors.text || ""}
								// onChange={this.onChange}
								// // onFocus={() => this.onFocus('text')}
								label="Время работы"
								error={errors && errors.work_time ? true : false}
								helperText={errors && errors.work_time || "Распишите график работы заведения"}
								name="work_time"
								value={work_time || ""}
								// multiline
								onChange={this.onChange}
								onFocus={() => this.onFocus('work_time')}
							/>

							:
							work_time ? <div
								style={{
									overflow: 'hidden',
								}}
							>
								<b
									style={{
										float: 'left',
									}}
								>Время работы:&nbsp;</b>

								<div
									dangerouslySetInnerHTML={{ __html: work_time }}
								/>

								{/*approved
									?
									<div
										dangerouslySetInnerHTML={{ __html: work_time }}
									:
									<div
										style={{
											whiteSpace: "pre-wrap",
										}}
									>
										{work_time}
									</div>
								*/}

							</div>

						 : ''}

						{inEditMode
							?
							// <TextField 
							// 	label="Цены"
							// 	error={errors && errors.prices ? true : false}
							// 	helperText={errors && errors.prices || "Распишите цены, включая цены на допуслуги"}
							// 	name="prices"
							// 	value={prices || ""}
							// 	multiline
							// 	onChange={this.onChange}
							// 	onFocus={() => this.onFocus('prices')}
							// />
								<Editor 
									label="Цены"
									error={errors && errors.prices ? true : false}
									helperText={errors && errors.prices || "Распишите цены, включая цены на допуслуги"}
									name="prices"
									value={prices || ""}
									onChange={this.onChange}
									onFocus={() => this.onFocus('prices')}
								/>
							:
							
							prices
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
										>Цены:&nbsp;</b> 
										<div
											dangerouslySetInnerHTML={{ __html: prices }}
										/>
										{/*approved
											?
											<div
												dangerouslySetInnerHTML={{ __html: prices }}
											/>
											:
											<div
												style={{
													whiteSpace: "pre-wrap",
												}}
											>
												{prices}
											</div>
										*/}
									</div>
								:
								null
						}
					</Grid>


					{editDateInfo}

				</Grid>
			</Paper>

		</CardContent>


		if(inEditMode){

			let tabContent;



      switch(tabIndex){

      	case 0:

      		tabContent = mainInfo;

      		break;

      	case 1:

      		tabContent = <GalleryEditor
		        classes={{}}
		        item={item}
		        onSelectContactImage={() => {}}
		        style={{
		        	marginBottom: galleryItems && galleryItems.length ? 0 : 250,
		        }}
		      />;

      		break;

      	case 2:

      		tabContent = <div>

						<div
							dangerouslySetInnerHTML={{ __html: work_time }}
						/>

      			<ScheduleEditor
							item={item}
							onChange={(days) => {
								// console.log('onChange days', days);

								this.updateItem(item, {
									schedule: days,
								});
								
							}}
		        />

      		</div>

      		break;

      }


			content = <CardContent>
				
				<Tabs 
          index={tabIndex} 
          onChange={this.handleTabIndexChange} 
          textColor="accent" 
          fullWidth
        >
          <Tab label="Основная информация" />
          <Tab label="Галерея" />
          <Tab label="График работы" />

        </Tabs>

        {tabContent}

        

			</CardContent>;
		}
		else{
			content = [];

			content.push(mainInfo);
		}


		return <Card
			style={{
				boxShadow: "none",
			}}
		>

			{id < 0 
				?
				<CardContent
					style={{
						display: "flex",
					}}
				>
					
					<WarningIcon 
						color="#F57C00"
						style={{
							height: 26,
							width: 26,
							flex: "none",
							marginRight: 5,
						}}
					/> <span
						style={{
							fontSize: 16,
						}}
					>Размещение информации о банных заведениях на портале "Городские бани" бесплатное. Подробнее <Link
						to="/topics/obnovlennaya-versiya-portala-gorodskix-ban-1641.html"
						href="/topics/obnovlennaya-versiya-portala-gorodskix-ban-1641.html"
					>читайте здесь</Link></span>.

				</CardContent>
				:
				null
			}
			
			<CardHeader 
        title={<Grid
        	container
        	align="center"
        	// style={{
        	// 	display: 'flex',
        	// 	flexDirection: 'row',
        	// 	alignItems: 'center',
        	// }}
        >

    			<Grid
    				item
    				xs={12}
    				sm
    			>
	        	{inEditMode
	        		?
								<TextField 
									label="Название заведения"
									error={errors && errors.name ? true : false}
									helperText={errors && errors.name || ""}
									name="name"
									value={name || ""}
									onChange={this.onChange}
									onFocus={() => this.onFocus('name')}
								/>
	        		:
	        		name
	        	}
    			</Grid>


        	{_isDirty
        		?
        			<Grid
        				item
        			>
        				
        				<IconButton
	        				onClick={event => {
	        					this.saveItem();
	        				}}
	        				disabled={sending}
	        			>
	        				<SaveIcon 
	        					color="red"
	        				/>
	        			</IconButton>
		              
		            {helper}

        			</Grid>
        		:

        			canEdit
        			?
        			<Grid
        				item
        			>
        				
        				<IconButton
	        				onClick={event => {
	        					this.updateItem(item, {});
	        				}}
	        			>
	        				<EditIcon 
	        					// color="red"
	        				/>
	        			</IconButton>
 
	              {helper}

        			</Grid>	
        			:

        		null}

        </Grid>}
        subheader={<RatingField 
					item={item}
				/>}
			/>

				
			{content}


			{itemContent
				?
				<CardContent>
					<Paper
						style={{
							padding: 15,
						}}
						dangerouslySetInnerHTML={{ __html: itemContent }}
					/>
				</CardContent>
				:
				null
			}

			{itemMap}

			{Gallery}


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

