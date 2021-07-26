import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import {
	Box,
	Stack,
	Link,
	Card,
	Button,
	Divider,
	Typography,
	CardHeader,
} from '@material-ui/core';
import cloudServerOutlined from '@iconify/icons-ant-design/cloud-server-outlined';
import routerNetwork from '@iconify-icons/mdi/router-network';
// utils
import { mockImgCover } from '../../../utils/mockImages';
//
import Scrollbar from '../../Scrollbar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const NEWS = [...Array(5)].map((_, index) => {
	const setIndex = index + 1;
	return {
		title: faker.name.title(),
		description: faker.lorem.paragraphs(),
		image: mockImgCover(setIndex),
		postedAt: faker.date.soon(),
	};
});

// ----------------------------------------------------------------------

NewsItem.propTypes = {
	news: PropTypes.object.isRequired,
};

function NewsItem({ news, arr }) {
	// const { image, title, description, postedAt } = news;

	const { hostid, host, onIdClick } = arr;
	return (
		<Stack direction="row" alignItems="center" spacing={2}>
			<Box
				component="icon"
				// alt={title}
				// src={image}
			>
				{host.length > 0 && host.includes('server' || 'Server') ? (
					<Icon
						icon={cloudServerOutlined}
						width={24}
						height={24}
						sx={{ width: 48, height: 48, borderRadius: 1.5 }}
					/>
				) : (
					<Icon
						icon={routerNetwork}
						width={24}
						height={24}
						sx={{ width: 48, height: 48, borderRadius: 1.5 }}
					/>
				)}
			</Box>
			<Box sx={{ minWidth: 240 }}>
				<Typography variant="subtitle2" noWrap>
					{host}
					{/* {title} */}
				</Typography>

				<Typography
					variant="body2"
					sx={{ color: 'text.secondary' }}
					noWrap
				>
					{hostid}
					{/* {description} */}
				</Typography>
			</Box>
			<Typography
				variant="caption"
				sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}
			>
				{/* {formatDistance(postedAt, new Date())} */}
			</Typography>
		</Stack>
	);
}

export default function AppItemUpdate() {
	const hostData = useSelector((state) => state.host);
	const [direct, setDirect] = useState([]);

	useEffect(() => {
		if (hostData.length > 0) {
			setDirect('/dashboard/item');
		} else {
			setDirect('#');
		}
	}, [hostData]);

	return (
		<Card>
			<CardHeader title="Devices Information" />
			<Scrollbar>
				<Stack spacing={3} sx={{ p: 3, pr: 0 }}>
					{hostData.length > 0 &&
						hostData.map((item) => (
							<NewsItem key={item.hostid} arr={item} />
						))}
					{/* {NEWS.map((news) => (
						<NewsItem key={news.title} news={news} />
					))} */}
				</Stack>
			</Scrollbar>
			<Divider />
			<Box sx={{ p: 2, textAlign: 'right' }}>
				<Button
					to={direct}
					size="small"
					color="inherit"
					component={RouterLink}
					endIcon={<Icon icon={arrowIosForwardFill} />}
				>
					View Detail
				</Button>
			</Box>
		</Card>
	);
}
