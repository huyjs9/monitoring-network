import axios from 'axios';

const graphApi = {
	post: (ip, hostgroup) => {
		const url = `http://${ip}/zabbix/api_jsonrpc.php`;
		return axios.post(url, {
			jsonrpc: '2.0',
			method: 'graph.get',
			params: {
				output: ['graphid', 'name', 'width', 'height'],
				hostids: hostgroup,
				sortfield: 'name',
			},
			auth: JSON.parse(localStorage.getItem('tokenZabbix')),
			id: 1,
		});
	},
};

export default graphApi;
