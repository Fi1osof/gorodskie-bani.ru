import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Link, browserHistory} from 'react-router';

// import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
// import Avatar from 'material-ui/Avatar';
// import TextField from 'material-ui/TextField';
// import Grid from 'material-ui/Grid';

import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';

import CompaniesList from 'modules/Site/components/Pages/Companies/List';

import Typography from 'material-ui/Typography';
// import Typography from 'material-ui/Typography';
// import Button from 'material-ui/Button';
// import IconButton from 'material-ui/IconButton';
// import Tabs, { Tab } from 'material-ui/Tabs';

// import SaveIcon from 'material-ui-icons/Save';
// import EditIcon from 'material-ui-icons/Edit';
// import AddIcon from 'material-ui-icons/AddCircle';
// import WarningIcon from 'material-ui-icons/Warning';

// import ListIcon from 'material-ui-icons/ErrorOutline';

// import Helper from 'modules/Site/components/Helper';

// import ItemMap from 'modules/Site/components/fields/Map';
// import Comments from 'modules/Site/components/Comments';

// import ImagesUploader from 'modules/Site/components/fields/ImageUploader';

// import GalleryEditor from 'modules/Site/components/Gallery';

// import CompanyTopics from './Topics';

// import GallerySlider from 'react-cms/src/app/components/Gallery/Slider';

// import Editor from 'modules/Site/components/fields/Editor';

// import ScheduleEditor from 'modules/Site/components/fields/Schedule/Editor';
// import Schedule from 'modules/Site/components/fields/Schedule';


// import RatingField from './fields/Rating';

// import SchedulesList from 'modules/Site/components/fields/Schedule/List';

// import moment from 'moment';

// import EditVersions from 'modules/Site/components/Pages/EditVersions';

// if(typeof window !== "undefined"){
// 	window.moment = moment;
// }


// import {
// 	WWW as SiteIcon,
// 	Mail as EmailIcon,
// 	Phone as PhoneIcon,
// 	Address as AddressIcon,
// 	Metro as MetroIcon,
// 	Clock as ClockIcon,
// 	Price as PriceIcon,
// 	Man as ManIcon,
// 	Woman as WomanIcon,
// 	Family as FamilyIcon,
// } from 'modules/Site/components/IconPack';

// import Site from 'modules/Site/components/fields/Site';

import CompanyView from './View';


import Page from '../../layout'; 


let {
	...contextTypes
} = Page.contextTypes;

Object.assign(contextTypes, {
	document: PropTypes.object.isRequired,
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
});

export default class CompanyPage extends Page{


	static contextTypes = contextTypes;

	constructor(props){

		super(props);

		const {
			// item,
		} = props;

		this.state = {
			// item,
			// sending: false,
			// galleryExpanded: false,
			// diffs: null,
			// tabIndex: 0,
		};
	}


	setPageTitle(title){

		const {
			setPageTitle,
		} = this.context;

		setPageTitle(title);
	}


	loadData(){

		const {
			location,
      // coords,
		} = this.context;

		const {
			pathname: uri,
		} = location || {};

		return uri && super.loadData({
			pathname: uri.replace(/^\/+/, ''),
			// coords,
		});

	}

	
	async loadServerData(provider, options = {}){

		const {
			cities: citiesNull,
			...debugOptions,
		} = options;



		const {
			// coords,
			page,
			limit = 12,
			withPagination = true,
			cities,
			pathname,
		} = options;

		if(!pathname){

			
			throw("Не указан УРЛ объекта");
		}

		let result;

		// Получаем список компаний
	  result = await provider({
			operationName: "CompanyPage",
			variables: {
				resourceUri: pathname,
				companyGetEditVersions: true,
				editVersionGetCreator: true,
				editVersionGetEditor: true,
				// companiesCenter: coords,
			},
	  })
	  .then(r => {
	    
	    
      const {
        company,
      } = r.data;


      if(!company){
        return null;
      }

	    return r;

	  })
	  .catch(e => {
	    throw(e);
	  });


	  if(result && result.data){

	  	let title;

	  	
			const {
				company,
			} = result.data;


	  	const city = cities && cities[0];

	  	if(city){

	  		title = city.longtitle;

	  	}

	  	title = company && company.name;

	  	if(page > 1){

	  		title = `${title}, страница ${page}`;

	  	}

  		Object.assign(result.data, {
  			title,
  		});

      // console.log("NearestCompanies company", company, coords);

  		// Если компания была получена, получаем ближайшие компании
  		if(company){

  			const {
  				id,
  				coords,
  			} = company;

  			if(id && coords){

	  			await provider({
						operationName: "NearestCompanies",
						variables: {
							// resourceUri: pathname,
							companyGetEditVersions: true,
							editVersionGetCreator: true,
							editVersionGetEditor: true,
							companiesCenter: coords,
							companiesExcludeIds: id,
						},
				  })
				  .then(r => {
				    
				    
			      const {
			        nearestCompaniesList,
			      } = r.data;


			      // if(!company){
			      //   return null;
			      // }

			      // console.log("NearestCompanies result", coords, nearestCompaniesList, r);

			      if(nearestCompaniesList){
			      	Object.assign(result.data, {
			      		nearestCompaniesList,
			      	});
			      }

				    return r;

				  })
				  .catch(e => {
				    throw(e);
				  });

  			}

  		}

	  }
	  else{
	  	return null;
	  }


	  return result;

	}

	updateItem = (item, data) => {

		const {
			// updateContactItem,
			updateItem,
		} = this.context;

		// updateContactItem(item, data);
		updateItem(item, data);

		this.forceUpdate();

	}



  // componentDidUpdate(prevProps, prevState, prevContext){

  //   const {
  //     location,
  //   } = this.props;

  //   const {
  //     location: prevLocation,
  //   } = prevProps;

  //   console.log("componentDidUpdate", location, prevLocation, location === prevLocation);

  //   // if((username || prevUsername) && username !== prevUsername){
  //   //   this.reloadData();
  //   // }

  //   super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState, prevContext);
  // }

	

  render(){


		let {
			company: item,
			nearestCompaniesList,
		} = this.state;

		if(!item){
			return null;
		}

		const {
			id,
		} = item;

		const {
			total: nearesCompaniesTotal,
			...nearestCompanies
		} = nearestCompaniesList || {};


  	return super.render(<div>
  		
  		<CompanyView
	  		key={id}
	  		item={item}
	  		updateItem={::this.updateItem}
	  		reloadData={::this.reloadData}
	  	/>

	  	{nearestCompanies && nearestCompanies.count 
	  		?
	  		<CardContent
					key="recentCompaniesList"
				>
					<Typography
						type="title"
						style={{
							marginTop: 30,
							marginBottom: 20,
						}}
					>
						Другие заведения поблизости
					</Typography>

					<CompaniesList
						data={nearestCompanies}
						showCities={false}
					/>
				</CardContent>
				:
				null
			}

		</div>);

  }

	
	// render(){

	// 	const {
 //    	documentActions,
 //    	user,
 //    } = this.context;

 //    const {
 //    	user: currentUser,
 //    } = user || {};

	// 	let {
	// 		company: item,
	// 		tabIndex,
	// 	} = this.state;


	// 	if(!item){
	// 		return null;
	// 	}

	// 	let itemData = {...item};

	// 	const {
	// 		galleryItem,
	// 		galleryExpanded,
	// 		sending,
	// 		diffs,
	// 	} = this.state;

	// 	const newCommentForm = currentUser ? true : false;

	// 	// Перегружаем измененные данные
	// 	if(diffs && diffs.data){
	// 		Object.assign(itemData, diffs.data);
	// 	}


	// 	let {
	// 		id,
	// 		id: companyId,
	// 		name,
	// 		uri,
	// 		imageFormats: image,
	// 		gallery,
	// 		tvs,
	// 		content: itemContent,
	// 		city,
	// 		createdon,
	// 		createdby,
	// 		coords,
	// 		comments,
	// 		editedon,
	// 		editVersions,
	// 		schedule,
	// 		schedule_men,
	// 		schedule_women,
	// 		schedule_family,
	// 		prices,
	// 		_errors: errors,
	// 		_isDirty,
	// 	// } = item;
	// 	} = itemData;

	// 	// let schedules = [];

	// 	const schedulesContent = <SchedulesList
	// 		item={item}
	// 	/>;

	// 	const inEditMode = _isDirty ? true : false;

	// 	let content;

	// 	const canEdit = typeof window !== "undefined";

	// 	const {
	// 		metro,
	// 		address,
	// 		phones,
	// 		site,
	// 		work_time,
	// 		// prices,
	// 		approved,
	// 	} = tvs || {};

	// 	let editDate = editedon || createdon;


	// 	const helper = <Helper
	// 		contrastIcons={false}
	// 		ref="helper"
 //    >
 //    	<Paper
	// 			style={{
	// 				padding: 15,
	// 			}}
	// 		>
	// 			<div>
	// 				Размещать информацию о своем заведении у нас можно бесплатно. 
	// 				Платно стоят некоторые отдельные функции (если хотите знать какие, свяжитесь с нами по почте <a href="mailto:info@gorodskie-bani.ru">info@gorodskie-bani.ru</a>). <a
	// 					href="javascript:;"
	// 					style={{
	// 				  	display: "inline-flex",
	// 					}}
	// 					onClick={e => {

	// 						const {
	// 							localQuery,
	// 						} = this.context;

	// 						this.refs.helper.setState({
	// 							open: false,
	// 						});

	// 						localQuery({
	// 							operationName: "addCompany",
	// 						});

	// 					}}
	// 					className="flex align-center"
	// 				>
	// 					<IconButton
	// 	  				accent
	// 	  				style={{
	// 	  					height: 30,
	// 	  					width: 30,
	// 	  				}}
	// 					>
	// 	  				<AddIcon 
	// 	  				/>
	// 					</IconButton>
	// 					Добавить заведение
	// 				</a>
	// 			</div>
				

	// 			<p>
	// 				<WarningIcon 
	// 					color="#F57C00"
	// 					style={{
	// 						marginRight: 5,
	// 					}}
	// 				/>
	// 				Информацию о заведении может отредактировать любой желающий. Подробнее об этом <Link
	// 					to="/topics/obnovlennaya-versiya-portala-gorodskix-ban-1641.html"
	// 					href="/topics/obnovlennaya-versiya-portala-gorodskix-ban-1641.html"
	// 				>читайте здесь</Link>
	// 			</p>

	// 			<p>
	// 				Если горит красная иконка в виде дискеты, это означает, что информация о вашем заведении отредактирована. Кликнув по этой иконке
	// 				вы сохраните измененную информацию. <br />
	// 				Если вы хотите отменить все изменения, просто обновите страницу и изменения сбросятся.
	// 			</p> 

	// 			<p>
	// 				Если вы отредактировали заведение, но не были авторизованы или зарегестрированы, не переживайте - процедура авторизации и регистрации максимально упращена 
	// 				и не требует перезагрузки окна. Вы легко авторизуетесь, после чего сможете сохранить внесенные изменения.
	// 			</p>

	// 		</Paper>
 //    </Helper>;


	// 	let addresses = [];


	// 	if(address){
	// 		addresses.push(<span
	// 			key="address"
	// 		>{address}</span>);
	// 	}

	// 	let Gallery;

	// 	Gallery = inEditMode 
	// 		?
	// 		null
 //      :
 //      gallery && gallery.length && 
 //      <CardContent
	// 			style={{
	// 					paddingBottom: 40,
	// 				}}
	// 			>
							 
	// 				<GallerySlider 
	// 					gallery={gallery}
	// 				/>

	// 		</CardContent>
	// 	|| "";


	// 	let itemMap;

	// 	if(typeof window !== "undefined" && coords){

	// 		itemMap = <CardContent>
	// 			<Paper
	// 				style={{
	// 					height: 400,
	// 				}}
	// 			>
					
	// 				<ItemMap
	//         	item={item}
	//         	updateItem={this.updateItem}
	//         	// updateItem={updateItem}
	//         	showSearchControl={true}
	//         	onFocus={() => this.onFocus('coords')}
	//         	onChange={(item, data) => {



	//         		this.clearErrors('coords');
	//         	}}
	//         	error={errors && errors.coords ? true : false}
	//         	helperText={errors && errors.coords || undefined}
	//         	helper={inEditMode && <Paper
 //            	style={{
 //            		padding: 15,
 //            	}}
 //            >

 //            	<p>
 //            		Это поле позволяет точно указать координаты вашего заведения. Для этого просто переместите на карте маркер мышкой в нужную позицию.
 //            	</p>

 //            	<p>
 //            		Если маркер находится не в том районе карты, где вам нужно, можете в этом поисковом поле набрать нужный вам адрес, после чего кликнуть подходящий 
 //            		предложенный вариант и маркер автоматически переместится в выбранный район.
 //            	</p>

 //            	<p>
 //            		Смотрите видео как это работает: <br />
 //            		<iframe width="560" height="315" src="https://www.youtube.com/embed/4V_GzUk0PTQ?rel=0&amp;showinfo=0" frameBorder="0" allowFullScreen></iframe>
 //            	</p>

 //            </Paper> || undefined}
	//         />

	// 			</Paper>
	// 		</CardContent>

	// 	}


	// 	let editVersionsList;

	// 	if(editVersions && editVersions.filter(n => n.status === "0").length && inEditMode){


	// 		editVersionsList = <div>
				
	// 			{diffs
	// 				?
	// 				<Button
	// 					onClick={event => {
	// 						this.setState({
	// 							diffs: null,
	// 						});
	// 					}}
	// 					raised
	// 					accent
	// 				>
	// 					Отменить изменения и показать оригинал
	// 				</Button>
	// 				:
	// 				null
	// 			}

	// 			{typeof window !== "undefined" 
	// 				? 
	// 				<EditVersions 
	// 					companyId={companyId}
	// 					previewDiffs={::this.previewDiffs}
	// 					acceptDiffs={::this.acceptDiffs}
	// 					diffs={diffs}
	// 					activeOnly={true}
	// 				/>
	// 				: null
	// 			}

	// 		</div>

	// 	}
	// 	else{

	// 		editVersionsList = <div>
	// 			<Link
	// 				to="/edits/"
	// 				href="/edits/"
	// 				rel="nofollow"
	// 				className="flex align-center"
	// 			>
	// 				<ListIcon 
	// 					color="#F57C00"
	// 				/> Лента изменений
	// 			</Link>
	// 		</div>

	// 	}


	// 	let editDateInfo = id > 0 && <Grid
	// 		item
	// 		xs={12}
	// 		style={{
	// 			marginTop: 15,
	// 		}}
	// 	>

	// 		<b>Дата последнего редактирования: </b> {editDate && moment(editDate * 1000).format("DD-MM-YYYY")}

	// 		{editVersionsList}

	// 	</Grid> || null;



	// 	const mainInfo = <CardContent
	// 		key="mainInfo"
	// 	>

	// 		<Paper
	// 			style={{
	// 				padding: 15,
	// 			}}
	// 		>

	// 			<Grid
	// 				container
 //    			gutter={0}
	// 			>
	// 				<Grid
	// 					item
	// 				>

	// 					{image
	// 						?
	// 							<img 
	// 								src={image.thumb}
	// 								style={{
	// 									cursor: 'pointer',
	// 									marginRight: 10,
	// 									marginBottom: 10,
	// 								}}
	// 							/> 
	// 						:
	// 						null
	// 					}

	// 					{inEditMode
	// 						?

	// 							<div>
									
	// 								<ImagesUploader 
	//                   label={image ? "Заменить изображение" : "Загрузить изображение"}
	//                   multiple={false}
	//                   dataName="file[]"
	//                   url="/assets/components/modxsite/connectors/connector.php?pub_action=images/upload"
	//                   optimisticPreviews
	//                   onLoadEnd={(err, response) => {


	//                     if (err && err.message) {

	//                       const {
	//                       	message,
	//                       } = err.response || {};

	//                       documentActions.addInformerMessage(message || "Ошибка загрузки файла");

	//                     }
	//                     else{





	//                       let {
	//                         0: image,
	//                       } = response.object || {};



	//                       if(image && image.url){
		                      
	// 	                      this.updateItem(item, {
	// 	                      	image: image.url,
	// 	                      });

	// 	                      this.clearErrors("image");
	//                       }

	//                       return;
	//                     }
	//                   }}
	//                 />

	//                 {errors && errors.image 
	//                 	?
	//                 		<p
	//                 			style={{
	//                 				color: "red",
	//                 			}}
	//                 		>
	//                 			{errors.image}
	//                 		</p>
	//                 	:
	//                 	null
	//                 }

	// 							</div>

	// 						:
	// 						null
	// 					}
						
	// 				</Grid>

	// 				<Grid
	// 					item
	// 					xs={12}
	// 					sm
	// 				>

	// 					{inEditMode
	// 						?
	// 							<TextField 
	// 								label="Адрес"
	// 								error={errors && errors.address ? true : false}
	// 								helperText={errors && errors.address || "Укажите подробный адрес"}
	// 								name="address"
	// 								value={address || ""}
	// 								onChange={this.onChange}
	// 								onFocus={() => this.onFocus('address')}
	// 							/>
	// 						:
	// 						addresses.length ? <Grid
	// 							container
	// 							gutter={0}
	// 							style={{
	// 								marginBottom: 10,
	// 							}}
	// 							align="center"
	// 						>
	// 							<AddressIcon /> <span
	// 								style={{
	// 									paddingLeft: 5,
	// 									paddingRight: 3,
	// 								}}
	// 							>Адрес:</span> {addresses.reduce((prev, curr) => [prev, ', ', curr])}
	// 						</Grid> : ''
	// 					}

						
						
	// 					{inEditMode
	// 						?
	// 						<TextField 
	// 							label="Метро"
	// 							helperText="Укажите ближайшие станции метро через запятую"
	// 							name="metro"
	// 							value={metro || ""}
	// 							onChange={this.onChange}
	// 							onFocus={() => this.onFocus('metro')}
	// 						/>
	// 						:
	// 						metro ? <Grid
	// 							container
	// 							gutter={0}
	// 							style={{
	// 								marginBottom: 10,
	// 							}}
	// 							align="center"
	// 						>
	// 							<MetroIcon /> <span
	// 								style={{
	// 									paddingLeft: 5,
	// 									paddingRight: 3,
	// 								}}
	// 							>Метро:</span> {metro}
	// 						</Grid>
	// 						: ''
	// 					}
						
	// 					{inEditMode
	// 						?
	// 						<TextField 
	// 							label="Телефон"
	// 							helperText="Можно указать несколько телефонов через запятую"
	// 							name="phones"
	// 							value={phones || ""}
	// 							onChange={this.onChange}
	// 							onFocus={() => this.onFocus('phones')}
	// 						/>
	// 						:
	// 						phones ? <Grid
	// 							container
	// 							gutter={0}
	// 							style={{
	// 								marginBottom: 10,
	// 							}}
	// 							align="center"
	// 						>
	// 							<PhoneIcon /> <span
	// 								style={{
	// 									paddingLeft: 5,
	// 									paddingRight: 3,
	// 								}}
	// 							>Телефон:</span> {phones.split(/,|;/).map(n => n && n.trim()).filter(n => n).map(phone => {
	// 								return phone && phone.length > 8 ? <a href={`tel:${phone}`}>{phone}</a> : phone;
	// 							}).reduce((a,b) => [a,", ",b])}
	// 						</Grid>
	// 						: ''
	// 					}
						
	// 					{inEditMode
	// 						?
	// 						<TextField 
	// 							label="Сайт"
	// 							helperText="Если адрес начинается с https, обязательно укажите вместе с ним, например, https://ваш_сайт/"
	// 							name="site"
	// 							value={site || ""}
	// 							onChange={this.onChange}
	// 							onFocus={() => this.onFocus('site')}
	// 						/>
	// 						:
	// 						site ? <Grid
	// 							container
	// 							gutter={0}
	// 							style={{
	// 								marginBottom: 10,
	// 							}}
	// 							align="center"
	// 						>
	// 							<SiteIcon /> <span
	// 								style={{
	// 									paddingLeft: 5,
	// 									paddingRight: 3,
	// 								}}
	// 							>Сайт:</span> <Site 
	// 								item={item}
	// 							/>
	// 						</Grid>
	// 						: ''
	// 					}
						
	// 					{inEditMode
	// 						?

	// 						null

	// 						:
	// 						work_time || schedulesContent ? <div
	// 							style={{
	// 								overflow: 'hidden',
	// 							}}
	// 						>

	// 							{schedulesContent
	// 								?
	// 								schedulesContent
	// 								:
	// 								<Grid
	// 									container
	// 									gutter={0}
	// 									style={{
	// 										marginBottom: work_time ? 10 : undefined,
	// 									}}
	// 								>
	// 									<ClockIcon /> <span
	// 										style={{
	// 											paddingLeft: 5,
	// 											paddingRight: 3,
	// 										}}
	// 									>Время работы</span>
	// 								</Grid>
	// 							}

	// 							{work_time && <div
	// 								style={{
	// 									whiteSpace: "pre-wrap",
	// 								}}
	// 							>
	// 								{work_time}
	// 							</div> || null}


	// 						</div>

	// 					 : ''}

	// 					{inEditMode
	// 						?
	// 							<div>

	// 								<span
	// 									style={{
	// 										fontWeight: 800,
	// 										fontSize: "12px",
	// 										color: "rgba(0, 0, 0, 0.54)",
	// 										display: "inline-block",
	// 										marginTop: 20,
	// 									}}
	// 								>
	// 									Цены
	// 								</span>

	// 								<Editor 
	// 									// label="Цены"
	// 									error={errors && errors.prices ? true : false}
	// 									helperText={errors && errors.prices || "Распишите цены, включая цены на допуслуги"}
	// 									name="prices"
	// 									value={prices || ""}
	// 									onChange={event => {

	// 										const {
	// 											target,
	// 										} = event || {};

	// 										if(!target){
	// 											return;
	// 										}

	// 										const {
	// 											name,
	// 											value,
	// 										} = target;

	// 										let {
	// 											_isDirty,
	// 										} = item;

	// 										_isDirty = _isDirty || {};

	// 										Object.assign(_isDirty, {
	// 											prices: value,
	// 										});

	// 										Object.assign(item, {
	// 											prices,
	// 											_isDirty,
	// 										});

	// 									}}
	// 									onFocus={() => this.onFocus('prices')}
	// 								/>
	// 							</div>
	// 						:
							
	// 						prices
	// 							?
	// 								<div
	// 									style={{
	// 										overflow: 'hidden',
	// 									}}
	// 								>
	// 									<Grid
	// 										container
	// 										gutter={0}
	// 										align="center"
	// 									>
	// 										<PriceIcon /> <span
	// 											style={{
	// 												paddingLeft: 5,
	// 												paddingRight: 3,
	// 											}}
	// 										>Цены</span>
	// 									</Grid>


	// 									<Editor 
	// 										name="prices"
	// 										value={prices || ""}
	// 										readOnly
	// 									/>

	// 								</div>
	// 							:
	// 							null
	// 					}
	// 				</Grid>


	// 				{editDateInfo}

	// 			</Grid>
	// 		</Paper>

	// 	</CardContent>


	// 	if(inEditMode){

	// 		let tabContent;



 //      switch(tabIndex){

 //      	case 0:

 //      		tabContent = mainInfo;

 //      		break;

 //      	case 1:

 //      		tabContent = <div
 //      			style={{
 //      				paddingTop: 20,
 //      			}}
 //      		>

 //        		{schedulesContent}

 //        		<div
	//       			style={{
	//       				paddingTop: 20,
	//       			}}
 //      			>
        			
	// 						<TextField
	// 							label="Уточнение к графику работы"
	// 							multiline
	// 							error={errors && errors.work_time ? true : false}
	// 							helperText={errors && errors.work_time || "Например, время работы кассы"}
	// 							name="work_time"
	// 							value={work_time || ""}
	// 							// multiline
	// 							onChange={this.onChange}
	// 							onFocus={() => this.onFocus('work_time')}
	// 						/>

 //        		</div>

 //      			<ScheduleEditor
	// 						item={item}
	// 						onChange={::this.updateItem}
	// 						onFocus={::this.onFocus}
	// 	        />

 //      		</div>

 //      		break;

 //      	case 2:

 //      		tabContent = <GalleryEditor
	// 	        classes={{}}
	// 	        item={item}
	// 	        onSelectContactImage={() => {}}
	// 	        updateItem={::this.updateItem}
	// 	        style={{
	// 	        	marginBottom: gallery && gallery.length ? 0 : 250,
	// 	        }}
	// 	      />;

 //      		break;

 //      }


	// 		content = <div>
				
	// 			<CardContent >

	// 				<Tabs 
	//           index={tabIndex} 
	//           onChange={this.handleTabIndexChange} 
	//           textColor="accent" 
	//           fullWidth
	//         >
	        
	//           <Tab label="Основная информация" />
	//           <Tab label="График работы" />
	//           <Tab label="Галерея" />

	//         </Tabs>

	// 			</CardContent>

 //        {tabContent}

        

	// 		</div>;
	// 	}
	// 	else{
	// 		content = [];

	// 		content.push(mainInfo);
	// 	}


	// 	return super.render(<Card
	// 		style={{
	// 			boxShadow: "none",
	// 		}}
	// 	>

	// 		{id < 0 
	// 			?
	// 			<CardContent
	// 				style={{
	// 					display: "flex",
	// 				}}
	// 			>
					
	// 				<WarningIcon 
	// 					color="#F57C00"
	// 					style={{
	// 						height: 26,
	// 						width: 26,
	// 						flex: "none",
	// 						marginRight: 5,
	// 					}}
	// 				/> <span
	// 					style={{
	// 						fontSize: "16px",
	// 					}}
	// 				>Размещение информации о банных заведениях на портале "Городские бани" бесплатное. Подробнее <Link
	// 					to="/topics/obnovlennaya-versiya-portala-gorodskix-ban-1641.html"
	// 					href="/topics/obnovlennaya-versiya-portala-gorodskix-ban-1641.html"
	// 				>читайте здесь</Link></span>.

	// 			</CardContent>
	// 			:
	// 			null
	// 		}
			
	// 		<CardHeader 
 //        title={<Grid
 //        	container
 //        	align="center"
 //        >

 //    			<Grid
 //    				item
 //    				xs={12}
 //    				sm
 //    			>
	//         	{inEditMode
	//         		?
	// 							<TextField 
	// 								label="Название заведения"
	// 								error={errors && errors.name ? true : false}
	// 								helperText={errors && errors.name || ""}
	// 								name="name"
	// 								value={name || ""}
	// 								onChange={this.onChange}
	// 								onFocus={() => this.onFocus('name')}
	// 							/>
	//         		:
	//         		name
	//         	}
 //    			</Grid>


 //        	{_isDirty
 //        		?
 //        			<Grid
 //        				item
 //        			>
        				
 //        				<IconButton
	//         				onClick={event => {
	//         					this.saveItem();
	//         				}}
	//         				disabled={sending}
	//         			>
	//         				<SaveIcon 
	//         					color="red"
	//         				/>
	//         			</IconButton>
		              
	// 	            {helper}

 //        			</Grid>
 //        		:

 //        			canEdit
 //        			?
 //        			<Grid
 //        				item
 //        			>
        				
 //        				<IconButton
	//         				onClick={event => {
	//         					this.updateItem(item, {});
	//         				}}
	//         			>
	//         				<EditIcon 
	//         					// color="red"
	//         				/>
	//         			</IconButton>
 
	//               {helper}

 //        			</Grid>	
 //        			:

 //        		null}

 //        </Grid>}
 //        subheader={<RatingField 
	// 				item={item}
	// 			/>}
	// 		/>

				
	// 		{content}


	// 		{itemContent
	// 			?
	// 			<CardContent>
	// 				<Paper
	// 					style={{
	// 						padding: 15,
	// 					}}
	// 					dangerouslySetInnerHTML={{ __html: itemContent }}
	// 				/>
	// 			</CardContent>
	// 			:
	// 			null
	// 		}

	// 		{itemMap}

	// 		{Gallery}


	// 		{!inEditMode && <CompanyTopics 
	// 			item={item}
	// 		/> || null}
			
				
	// 		{!inEditMode && comments && comments.length
	// 			?
	// 			<CardContent>
					
	// 				<Paper
	// 					style={{
	// 						padding: 15,
	// 					}}
	// 				>

	// 					<Typography
	// 						type="title"
	// 					>
	// 						{comments.length} комментариев
	// 					</Typography>

	// 					<Comments 
	// 						comments={comments}
	// 						resource={item}
	// 						newCommentForm={newCommentForm}
	// 						onSuccess={::this.reloadData}
	// 					/>

	// 				</Paper>

	// 			</CardContent>
	// 			:
	// 			null
	// 		}


	// 	</Card>)
	// }
}

