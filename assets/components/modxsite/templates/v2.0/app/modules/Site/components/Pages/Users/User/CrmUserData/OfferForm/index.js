
import './styles/styles.less';

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import moment from 'moment';

import Button from 'material-ui/Button';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import {
	// Editor, 
	EditorState,
	convertFromHTML,
	ContentState,
  CompositeDecorator,
  convertToRaw, 
  convertFromRaw,
} from 'draft-js';

import Editor from 'modules/Site/components/Editor';

import {stateToHTML} from 'draft-js-export-html';

import TextField from 'material-ui/TextField';


const date = moment(new Date().getTime() + (24*60*60*2*1000)).format("DD-MM-YYYY");

// const sampleMarkup = `
// <p>
// Здравствуйте! <br />
// </p>

// <p>
// Мы запустили обновленную версию нашего портала: <a href="http://gorodskie-bani.ru/">http://gorodskie-bani.ru/</a> <br />
// </p>

// <p>
// Теперь Вы можете самостоятельно и бесплатно разместить информацию о вашем заведении. На главной странице в левом нижнем углу есть для этого кнопка "Добавить заведение". 
// Процедура добавления объекта максимально упрощена.<br />
// </p>

// <p>
// Плюс к бесплатному размещению мы можем предложить Вам дополнительные платные функции:<ul>
// <li>
// Индивидуальная иконка на карте сайта. Пример: <a href="http://joxi.ru/zANepBNhlKR6X2">http://joxi.ru/zANepBNhlKR6X2</a><br />
// С индивидуальной иконкой ваша компания будет более заметной и привлечет внимание большего количества клиентов.
// </li>
// <li>
// Геотаргетинговая реклама: вывод вашего рекламного баннера в зависимости от того, где на карте находится посетитель.< br/>
// Как это работает? У нас бани и сауны разбросаны по всей карте России. Нет смысла показывать вашу рекламу пользователю, который находится в Якутии. 
// Но очень хорошо показывать ее тому пользователю, который находится в радиусе километра от вас. Вероятность привлечь более челевую аудитория сильно возрастает.
// Вот наглядный пример: <a href="https://youtu.be/Mv6gCJ1-3Zc">https://youtu.be/Mv6gCJ1-3Zc</a>
// </li>
// <li>
// В ближайшее время будут внедрены еще несколько полезных функций, включая просмотр статистики посещений карточки, показов на карте, количество кликов иконки и баннера и т.п.
// </li>
// </ul>
// </p>

// <p>
// Если Вас заинтересовали платные функции, мы готовы сделать Вам индивидуальное выгодное предложение:
// При оплате до ${date}, премиальное размещение на год обойдется вам всего в 15 000 рублей разово. Уверяю, это очень выгодное предложение.
// Вот динамика посещения портала: <a href="http://joxi.ru/Drlz7Mqc4JdNL2">http://joxi.ru/Drlz7Mqc4JdNL2</a> На этот новый год, уверен, будет более 2000 пользователей, 
// а к следующему НГ не менее 10 000 (так как сейчас будет объектов добавляться много, соответственно больше материала для поискового трафика будет). 
// У нас весь трафик белый, не покупной (90% - переходы из поисковых систем). Можем предоставить доступ в Яндекс.Метрику для просмотра статистики.<br />
// </p>
// <p>
// Возможна оплата по договору.<br />
// </p>
// <p>
// Если у Вас возникнут какие-либо вопросы, Вы можете задать их мне, я с удовольствием отвечу на все Ваши вопросы.
// </p>`;


// function findLinkEntities(contentBlock, callback, contentState) {
//   contentBlock.findEntityRanges(
//     (character) => {
//       const entityKey = character.getEntity();
//       return (
//         entityKey !== null &&
//         contentState.getEntity(entityKey).getType() === 'LINK'
//       );
//     },
//     callback
//   );
// }

// const Link = (props) => {
//   const {url} = props.contentState.getEntity(props.entityKey).getData();
//   return (
//     <a href={url} >
//       {props.children}
//     </a>
//   );
// };
// function findImageEntities(contentBlock, callback, contentState) {
//   contentBlock.findEntityRanges(
//     (character) => {
//       const entityKey = character.getEntity();
//       return (
//         entityKey !== null &&
//         contentState.getEntity(entityKey).getType() === 'IMAGE'
//       );
//     },
//     callback
//   );
// }
// const Image = (props) => {
//   const {
//     height,
//     src,
//     width,
//   } = props.contentState.getEntity(props.entityKey).getData();
//   return (
//     <img src={src} height={height} width={width} />
//   );
// };

export default class OfferForm extends Component{

	static propTypes = {
		user: PropTypes.object.isRequired,
		onSuccess: PropTypes.func.isRequired,
	};


	static contextTypes = {
		user: PropTypes.object.isRequired,
		request: PropTypes.func.isRequired,
		documentActions: PropTypes.object.isRequired,
	};


	constructor(props){

		super(props);


		this.state = {
  		subject: "Спецразмещение информации о вашем заведении на портале Городские бани.ру",
		};
	}


	componentWillMount(){

		const {
			user: {
				user: currentUser,
			},
		} = this.context;

		const user_id = currentUser && currentUser.id;

		// const site_link = `<a href="http://gorodskie-bani.ru/?mid=${user_id}">Городские бани.ру</a>`;

 		const link = `https://gorodskie-bani.ru/?mid=${user_id}`;
 
		this.state.contentState = {"entityMap":{
			"0":{
				"type":"LINK","mutability":"MUTABLE",
				"data":{
					"href":link,
					"url":link
				}},
				"1":{
					"type":"LINK","mutability":"MUTABLE",
					"data":{
						"href":link,
						"url":link
					}}}
					,"blocks":[{"key":"5svtd","text":"Здравствуйте!\n ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dng6v","text":"Предлагаем Вам разместить информацию о Вашем заведении на одном из старейших порталов по баням Городские бани.ру.  ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":95,"length":17,"key":0}],"data":{}},{"key":"4qckh","text":"Городские бани.ру - это современный портал с высокой посещаемостью и целевой аудиторией, имеющий уникальную гео-таргетинговую систему подачи контента. Посетителям выдается в первую очередь ближайшие к ним заведения, в зависимости от того, где посетитель находится. Таким образом информацию о Вашем заведении больше видят те пользователи, которые к Вам ближе, а значит и шанс, что этот посетитель станет Вашим клиентом, значительно выше.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":17,"key":1}],"data":{}},{"key":"74gvv","text":"Кроме того, мы разработали и развиваем собственный уникальный редактор контента на базе технологий от интернет-гиганта facebook.com. Это позволяет нам делать максимально эффективную внутреннюю перелинковку и визуализацию контента, что улучшает вовлеченность пользователей, стимулирует их просматривать больше контента, а в сам контент вставлять активные карточки организаций, чтобы предоставлять пользователям более простой и наглядный доступ к всегда актуальной информации о заведении. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"47fte","text":"Размещаяся у нас, Вы получаете гарантированный канал привлечения клиентов.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},
					{"key":"7u0qk",
					"text":`До ${date} действует специальное предложение - всего 10 000 рублей за годовое размещение. Спешите! Предложение ограничено.`
					,"type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]
			};
	}

 

// 	componentWillMount(){

// 		const {
// 			user: {
// 				user: currentUser,
// 			},
// 		} = this.context;

// 		const user_id = currentUser && currentUser.id;

// 		const site_link = `<a href="http://gorodskie-bani.ru/?mid=${user_id}">Городские бани.ру</a>`;

// const sampleMarkup = `
// <p>
// Здравствуйте!<br />
// </p>

// <p>
// Предлагаем Вам разместить информацию о Вашем заведении на одном из старейших порталов по баням ${site_link}. 
// </p>

// <p>
// ${site_link} - это современный портал с высокой посещаемостью и целевой аудиторией, имеющий уникальную гео-таргетинговую систему подачи контента.
// Посетителям выдается в первую очередь ближайшие к ним заведения, в зависимости от того, где посетитель находится. Таким образом информацию о Вашем заведении больше видят те пользователи,
// которые к Вам ближе, а значит и шанс, что этот посетитель станет Вашим клиентом, значительно выше.
// </p>

// <p>
// Один из  переживает свое новое рождение. Теперь это свободная площадка, на которой любой желающий абсолютно бесплатно может разместить информацию о своем банном заведении, а так же самостоятельно редактировать информацию, 
// не дожидаясь реакции администрации.
// </p>

// <p>
// Кроме того, мы разработали и развиваем собственный уникальный редактор контента на базе технологий от интернет-гиганта facebook.com, что позволяет нам делать максимально эффективную внутреннюю перелинковку, 
// 	что улучшает вовлеченность пользователей, стимулирует их просматривать больше контента, а в сам контент вставлять активные карточки организаций, чтобы предоставлять пользователям более простой и наглядный доступ к всегда актуальной информации о заведении.
// </p>
// `;


// // <p>
// // Чтобы предоставить Вам эти уникальные возможности, мы почти полностью переписали портал с применением самых последних веб-технологий. Пока еще не все функции опубликованы, 
// // но мы выкладываем обновления каждый день, делая портал еще более удобным и информативным.
// // </p>

// // <p>
// // Разместив информацию о своем заведении, вы получите дополнительный канал привлечения целевой клиентуры. У нас 100% белый трафик, без всяких покупных ссылок и т.п. 
// // В карточке организации можно указывать и свой сайт.
// // </p>

// // <p>
// // А если вы захотите привлекать еще больше клиентов, у нас есть дополнительные полезные функции. К примеру, геотаргетинговая реклама. 
// // Вот наглядный пример как это работает: <a href="https://youtu.be/Mv6gCJ1-3Zc">https://youtu.be/Mv6gCJ1-3Zc</a>
// // Так же можем проработать совместные стратегии, включая более глубокую аналитику и медийные кампании.
// // </p>


// 		const blocksFromHTML = convertFromHTML(sampleMarkup);

// 		console.log("blocksFromHTML", blocksFromHTML);

// 		const contentState = ContentState.createFromBlockArray(
// 		  blocksFromHTML.contentBlocks,
// 		  blocksFromHTML.entityMap
// 		); 

// 		this.state.contentState = convertToRaw(contentState);

// 	}


	onEditorChange(event, text, editorState){

		// console.log("onEditorChange", event);
		// // console.log("onEditorChange a", a);
		// console.log("onEditorChange editorState", editorState);

		const {
			value: contentState,
		} = event.target;

		this.setState({
			contentState,
			// editorState,
		});

	}

	onChange = event => { 

		let data = {};

		const {
			name,
			value,
		} = event.target;

		data[name] = value;

		this.setState(data);

	}


	send(){

		const {
			// editorState,
			subject,
			contentState,
		} = this.state;

		const {
			request,
			documentActions,
		} = this.context;

		const {
			user,
			onSuccess,
		} = this.props;

		const{
			id,
		} = user;

		const editorState = convertFromRaw(contentState);

		// console.log("editorState", editorState);

		// const html = editorState && stateToHTML(editorState.getCurrentContent());
		const html = editorState && stateToHTML(editorState);

		// console.log("html", html, editorState);

		request('offer', false, 'crm/users/sendOffer', {
			id,
			subject,
			offer: html,
		})
		.then(r => {



			r.success && onSuccess && onSuccess(r);

			documentActions.addInformerMessage("Предложение успешно отправлено");

		})
		.catch(e => {
			console.error(e);
		});

	}


	render(){

		const {
			editorState,
			subject,
			contentState,
		} = this.state;



		// const html = editorState && stateToHTML(editorState.getCurrentContent());



		return <Card>
			
			<CardHeader 
				title="Отправка коммерческого предложения"
			/>

			<CardContent>

				<TextField 
					label="Тема письма"
					name="subject"
					value={subject}
					onChange={::this.onChange}
				/>
				
      	<Editor 
      		// editorState={editorState} 
      		// value={this.state.blocksFromHTML}
      		// value={convertToRaw(editorState.getCurrentContent())}
      		// value={convertToRaw(blocksFromHTML.getCurrentContent())}
      		value={contentState}
      		onChange={::this.onEditorChange}
      		style={{
      			border: "1px solid",
      		}}
      	/>

			</CardContent>

			{/*<CardContent>
				
				<div 
					dangerouslySetInnerHTML={{ __html: html }}
				/>
	 

			</CardContent>*/}

			{/*<CardContent>
				
				{html}

			</CardContent>*/}

			<CardActions>

				<Button
					raised
					onClick={::this.send}
				>
					Отправить
				</Button>

			</CardActions>

		</Card>
	}
}
