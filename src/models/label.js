import app from 'ampersand-app'
import Model from 'ampersand-model'
import xhr from 'xhr'
import GithubMixin from '../helpers/github-mixin'

export default Model.extend(GithubMixin, {
	idAttribute: 'name',

	props: {
		name: 'string',
		color: 'string'
	}, // end props{}

	session: {
		editing: {
			type: 'boolean',
			default: false
		},
		saved: {
			type: 'boolean',
			default: true
		}
	}, // end session{}

	isNew () {
		return !this.saved
	},

	update (newAttributes) {

		xhr({
			url: this.url(),
			json: newAttributes,
			headers: {
				Authorization: 'token ' + app.me.token
			},
			method: 'PATCH'
		}, (err, resp, body) => {
			
		})

		this.set(newAttributes)

	} // end update()
})