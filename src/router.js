import Router from 'ampersand-router'
import React from 'react'
import Qs from 'qs'
import uuid from 'node-uuid'
import xhr from 'xhr'


// Config
import config from './config'

// Layout
import Layout from './layout'

// Pages
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import RepoDetailPage from './pages/repo-detail'

// Export Router
export default Router.extend({
	// Router renders page
	renderPage (page, opts = {layout: true}) {
		if(opts.layout) {
			page = (
				<Layout me={app.me}>
					{page}
				</Layout>
			)
		}

		React.render(page, document.body)
	},

	// Routes
	routes: {
		'': 'public',
		'repos': 'repos',
		'repo/:owner/:name': 'repoDetailPage',
		'login': 'login',
		'logout': 'logout',
		'auth/callback?:query': 'authCallback'
	},

	// Public homepage
	public() {
		this.renderPage(<PublicPage />, {layout: false})
	},

	// Repos page
	repos() {
		this.renderPage(<ReposPage repos={app.me.repos} />)
	},

	repoDetailPage(owner, name) {
		const repo = app.me.repos.getByFullName(owner + '/' + name)
		this.renderPage(<RepoDetailPage repo={repo} labels={repo.labels} />)
	},

	// login via github
	login() {
		const state = uuid()
		window.localStorage.state = state
		window.location = 'https://github.com/login/oauth/authorize?' + Qs.stringify({
			client_id: config.client_id,
			redirect_uri: window.location.origin + '/auth/callback',
			scope: 'user,repo',
			state: state
		})
	},

	// Logout of application
	logout() {
		window.localStorage.clear()
		window.location = '/'
	},

	// Auth callback
	authCallback(query) {
		query = Qs.parse(query);

		if(query.state === window.localStorage.state) {
			delete window.localStorage.state

		}

		// Send POST request for authentication token
		xhr({
		    uri: config.gatekeeper_url + '/' + query.code,
		    json: true
		}, (err, resp, body) => {
			if(err) {
				console.log('Something went wrong: ', err)
			} else {
				app.me.token = body.token
				this.redirectTo('/repos')
			}
		})

	} // end auth()

})