
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
Мы запустили обновленную версию нашего портала: <a href="http://gorodskie-bani.ru/">http://gorodskie-bani.ru/</a> <br />
</p>

<p>
Теперь Вы можете самостоятельно и бесплатно разместить информацию о вашем заведении. На главной странице в левом нижнем углу есть для этого кнопка "Добавить заведение". 
Процедура добавления объекта максимально упрощена.<br />
</p>

<p>
Плюс к бесплатному размещению мы можем предложить Вам дополнительные платные функции:<ul>
<li>
Индивидуальная иконка на карте сайта. Пример: <a href="http://joxi.ru/zANepBNhlKR6X2">http://joxi.ru/zANepBNhlKR6X2</a><br />
С индивидуальной иконкой ваша компания будет более заметной и привлечет внимание большего количества клиентов.
</li>
<li>
Геотаргетинговая реклама: вывод вашего рекламного баннера в зависимости от того, где на карте находится посетитель.< br/>
Как это работает? У нас бани и сауны разбросаны по всей карте России. Нет смысла показывать вашу рекламу пользователю, который находится в Якутии. 
Но очень хорошо показывать ее тому пользователю, который находится в радиусе километра от вас. Вероятность привлечь более челевую аудитория сильно возрастает.
Вот наглядный пример: <a href="https://youtu.be/Mv6gCJ1-3Zc">https://youtu.be/Mv6gCJ1-3Zc</a>
</li>
<li>
В ближайшее время будут внедрены еще несколько полезных функций, включая просмотр статистики посещений карточки, показов на карте, количество кликов иконки и баннера и т.п.
</li>
</ul>
</p>

<p>
Если Вас заинтересовали платные функции, мы готовы сделать Вам индивидуальное выгодное предложение:
При оплате до ${date}, премиальное размещение на год обойдется вам всего в 15 000 рублей разово. Уверяю, это очень выгодное предложение.
Вот динамика посещения портала: <a href="http://joxi.ru/Drlz7Mqc4JdNL2">http://joxi.ru/Drlz7Mqc4JdNL2</a> На этот новый год, уверен, будет более 2000 пользователей, 
а к следующему НГ не менее 10 000 (так как сейчас будет объектов добавляться много, соответственно больше материала для поискового трафика будет). 
У нас весь трафик белый, не покупной (90% - переходы из поисковых систем). Можем предоставить доступ в Яндекс.Метрику для просмотра статистики.<br />
</p>
<p>
Возможна оплата по договору.<br />
</p>
<p>
Если у Вас возникнут какие-либо вопросы, Вы можете задать их мне, я с удовольствием отвечу на все Ваши вопросы.
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
