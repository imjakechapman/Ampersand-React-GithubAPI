import Collection from 'ampersand-rest-collection'
import GithubMixin from '../helpers/github-mixin'
import Repo from './repo'

export default Collection.extend(GithubMixin, {
	url: 'https://api.github.com/user/repos',
	model: Repo,

	getByFullName(fullname) {
		let model = this.findWhere({
			full_name: fullname
		})
		if(!model) {
			model = new Repo({
				full_name: fullname
			})
		}
		model.fetch()
		return model
	} // end getByFullName

})