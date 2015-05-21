export default {
	'localhost': {
		client_id: 'daeb3e0cd31e3d848179',
		gatekeeper_url: 'https://ampersand-react-demo.herokuapp.com/authenticate'
	},
	'ampersand-react-surge-example.surge.sh': {
		client_id: '3ee5bcb35a28b7c69cbc',
		gatekeeper_url: 'https://ampersand-react-production.herokuapp.com/authenticate'
	}
}[window.location.hostname]