import Model from 'ampersand-model'
import RepoCollection from './repo-collection'
import GithubMixin from '../helpers/github-mixin'

export default Model.extend(GithubMixin, {
	url: 'https://api.github.com/user',

	initialize() {
		this.token = window.localStorage.token
		this.on('change:token', this.onChangetoken)
	},


	// Model properties
	props: {
		id: 'number',
		login: 'string',
		avatar_url: 'string'
	},

	// Session properties (not serialized when sending back to server)
	session: {
		token: 'string'
	},

	collections: {
		repos: RepoCollection
	},

	onChangetoken() {
		window.localStorage.token = this.token
		this.fetchInitialData()
	},

	fetchInitialData() {
		if(this.token) {
			this.fetch()
			this.repos.fetch()
		}
	}

})