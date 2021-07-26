import axios from 'axios';

const alertApi = {
	post: (ip, hostgroup) => {
		const url = `http://${ip}/zabbix/api_jsonrpc.php`;
		return axios.post(url, {
			jsonrpc: '2.0',
			method: 'alert.get',
			params: {
				output: 'extend',
				hostids: hostgroup,
			},
			auth: JSON.parse(localStorage.getItem('tokenZabbix')),
			id: 1,
		});
	},
};

export default alertApi;
