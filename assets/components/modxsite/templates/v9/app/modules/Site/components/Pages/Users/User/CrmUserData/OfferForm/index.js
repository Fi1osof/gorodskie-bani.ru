
import './styles/styles.less';

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import moment from 'moment';

import Button from 'material-ui/Button';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import {
	Editor, 
	EditorState,
	convertFromHTML,
	ContentState,
} from 'draft-js';

import {stateToHTML} from 'draft-js-export-html';


const date = moment(new Date().getTime() + (24*60*60*7*1000)).format("DD-MM-YYYY");

const sampleMarkup = `
<p>
Здравствуйте! <br />
</p>

<p>
Мы запустили обновленную версию нашего проекта: <a href="http://gorodskie-bani.ru/">http://gorodskie-bani.ru/</a> <br />
</p>

<p>
Теперь портал будет развиваться в формате глобального картографического сервиса с направленностью на обширную аудиторию.  <br />
</p>

<p>
В течение месяца будет опубликован функционал для самостоятельного добавления бань и саун на карте (что должно обеспечить значительную генерацию контента и увеличение посещаемости, 
вовлеченности и т.п.). 
Но будут вводиться и платные функции (индивидуальные иконки, расширенные карточки организаций, онлайн-формы, аналитика и т.п.). 
По аналитике у нас будут вообще очень интересные решения вплоть до возможности просмотреть в каких районах карты какое количество просмотров пользователей и т.п., 
а так же возможность видеть пользователей онлайн и возможность инициировать диалог с пользователем. 
Сейчас мы планируем вводить оплату за каждую услугу в отдельности, чтобы каждый сам решал какие бюджеты выделять на этот рекламный канал. 
По нашим оценкам средний чек нашего партнера будет составлять 3 - 10 тысяч рублей в месяц уже через 3 месяца (когда мы введем бОльшую часть запланированного функционала). 
Но на развитие проекта финансы нужны уже сейчас, поэтому у нас есть для Вас спецпредложение: премиальное размещение на год всего за 15 000 рублей разово. 
При оплате до ${date} мы разместим Вашу карточку, присвоим Вашей компании индивидуальную иконку на карте, а так же гарантируем предоставление всех вводимых на портале услуг 
в течение этого года бесплатно. Плюс ко всему этому гарантируется наше особое отношение к Вашей компании и максимальная лояльность во всем, включая пожелания к развитию проекта 
(кроме политики пользовательских отзывов и т.п., с этом у нас очень серьезно все.). Уверяю, это очень выгодное предложение. 
Вот динамика посещения портала: <a href="http://joxi.ru/Drlz7Mqc4JdNL2">http://joxi.ru/Drlz7Mqc4JdNL2</a> На этот новый год, уверен, будет более 2000 пользователей, 
а к следующему НГ не менее 10 000 (так как сейчас будет объектов добавляться много, соответственно больше материала для поискового трафика будет). 
У нас весь трафик белый, не покупной. Могу предоставить доступ в Яндекс.Метрику для просмотра статистики.
 <br />
</p>

<p>
Возможна оплата по договору.
</p>`;


export default class OfferForm extends Component{

	static propTypes = {
		user: PropTypes.object.isRequired,
		onSuccess: PropTypes.func.isRequired,
	};


	static contextTypes = {
		request: PropTypes.func.isRequired,
		documentActions: PropTypes.object.isRequired,
	};


	constructor(props){

		super(props);


		const blocksFromHTML = convertFromHTML(sampleMarkup);
		const state = ContentState.createFromBlockArray(
		  blocksFromHTML.contentBlocks,
		  blocksFromHTML.entityMap
		);

		this.state = {
  		editorState: EditorState.createWithContent(state),
		};
	}


	onEditorChange(editorState){

		this.setState({
			editorState,
		});

	}


	send(){

		const {
			editorState,
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

		const html = editorState && stateToHTML(editorState.getCurrentContent());

		request('offer', false, 'crm/users/sendOffer', {
			id,
			offer: html,
		})
		.then(r => {

			// console.log("OfferForm result", r);

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
		} = this.state;

		// console.log('editorState', editorState);

		const html = editorState && stateToHTML(editorState.getCurrentContent());

		// console.log('html', html);

		return <Card>
			
			<CardHeader 
				title="Отправка коммерческого предложения"
			/>

			<CardContent>
				
      	<Editor 
      		editorState={editorState} 
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
