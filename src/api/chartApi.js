import axios from 'axios';

const chartApi = {
	post: (ip, hostgroup) => {
		const url = `http://${ip}/zabbix/api_jsonrpc.php`;
		return axios.post(url, {
			jsonrpc: '2.0',
			method: 'item.get',
			params: {
				output: [
					'itemid',
					'hostid',
					'name',
					'description',
					'lastvalue',
					'units',
				],
				hostids: hostgroup,
				search: {
					name: 'Memory utilization',
				},
				sortfield: 'name',
			},
			auth: JSON.parse(localStorage.getItem('tokenZabbix')),
			id: 1,
		});
	},
};

export default chartApi;
