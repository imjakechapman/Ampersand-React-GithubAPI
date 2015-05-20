import Model from 'ampersand-model'
import GithubMixin from '../helpers/github-mixin'
import LabelCollection from './label-collection'

export default Model.extend(GithubMixin, {
	url () {
		return 'https://api.github.com/repos/' + this.full_name
	},

	props: {
		id: 'number',
		name: 'string',
		full_name: 'string'
	},

	collections: {
		labels: LabelCollection
	},

	derived: {
		app_url: {
			deps: ['id'],
			fn() {
				return 'repo/' + this.full_name
			}
		}
	},
	fetch () {
    Model.prototype.fetch.apply(this, arguments)
    this.labels.fetch()
  }
})