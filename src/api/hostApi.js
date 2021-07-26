import axios from 'axios';

const hostApi = {
	post: (ip) => {
		const url = `http://${ip}/zabbix/api_jsonrpc.php`;
		return axios.post(url, {
			jsonrpc: '2.0',
			method: 'host.get',
			params: {
				output: ['hostid', 'host'],
				filter: {
					host: [],
				},
			},
			auth: JSON.parse(localStorage.getItem('tokenZabbix')),
			id: 1,
		});
	},
};

export default hostApi;
