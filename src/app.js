import app from 'ampersand-app'
import Router from './router'
import styles from './styles/main.styl'
import icons from '../node_modules/octicons/octicons/octicons.css'

import Me from './models/me'

// Expose app to browser console
window.app = app;

app.extend({
	init() {
		this.me = new Me()
		this.me.fetchInitialData()
		this.router = new Router()

		this.router.history.start({ pushState: true })
	}
})

app.on('hello', (data) => {
	console.log(data);
})

app.init()