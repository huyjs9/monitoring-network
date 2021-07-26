import axios from 'axios';

const itemApi = {
	post: (ip, hostid) => {
		const url = `http://${ip}/zabbix/api_jsonrpc.php`;
		return axios.post(url, {
			jsonrpc: '2.0',
			method: 'item.get',
			params: {
				output: ['itemid', 'name', 'description', 'lastvalue', 'units'],
				hostids: hostid,
				search: {
					name: '',
				},
				sortfield: 'name',
			},
			auth: JSON.parse(localStorage.getItem('tokenZabbix')),
			id: 1,
		});
	},
};

export default itemApi;
