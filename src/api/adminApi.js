import axios from 'axios';

const adminApi = {
	post: (ip) => {
		const url = `http://${ip}/zabbix/api_jsonrpc.php`;
		return axios.post(url, {
			jsonrpc: '2.0',
			method: 'user.login',
			params: {
				user: 'Admin',
				password: 'zabbix',
			},
			id: 1,
			auth: null,
		});
	},
};

export default adminApi;
