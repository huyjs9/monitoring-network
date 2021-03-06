/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// import { Link as RouterLink } from 'react-router-dom';
// material
import {
	Grid,
	Button,
	Container,
	Stack,
	Typography,
	Box,
	Link,
	Card,
} from '@material-ui/core';

// components
import Page from '../components/Page';
import { ChartCard } from '../components/_dashboard/piechart';
//
import POSTS from '../_mocks_/blog';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import chartApi from 'src/api/chartApi';
import graphApi from 'src/api/graphApi';
import { SelectOption, SelectTime } from 'src/components/charts';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
	{ value: 'latest', label: 'Latest' },
	{ value: 'popular', label: 'Popular' },
	{ value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function Blog() {
	const [chartx, setChartx] = useState([]);
	const [graphx, setGraphx] = useState([]);
	const [selected, setSelected] = useState(''); // Handle select option
	const [selectTime, setSelectTime] = useState('1h'); // Handle select option

	const hostData = useSelector((state) => state.host);
	const ipUrl = useSelector((state) => state.ipaddress);

	const handleSelected = (value) => {
		setSelected(value);
	};

	const handleSelectTime = (value) => {
		setSelectTime(value);
	};

	let hostgroup = [];
	for (let i = 0; i < hostData.length; i++) {
		hostgroup.push(hostData[i].hostid);
	}

	useEffect(() => {
		async function AutoChart() {
			try {
				const chartData = await chartApi.post(ipUrl, hostgroup);
				const graphData = await graphApi.post(ipUrl, selected);
				setChartx(chartData.data.result); //Lưu dữ liệu mảng Chart
				setGraphx(graphData.data.result);
			} catch (err) {
				throw err;
			}
		}
		AutoChart();
		const timeInterval = setInterval(AutoChart, 500000);
		return () => {
			clearInterval(timeInterval);
		};
	}, [hostData, selected]);
	console.log('5 phut chart', chartx);
	console.log('graph', graphx);

	let arrtest = [];

	for (let i = 0; i < hostData.length; i++) {
		for (let y = 0; y < chartx.length; y++) {
			let objtest = {};
			//Hanle cho % used memmory
			if (
				chartx[y].hostid.includes(hostData[i].hostid) &&
				chartx[y].name.includes('Memory utilization')
			) {
				objtest['name'] = hostData[i].host;
				objtest['lable'] = chartx[y].name;
				objtest['value'] = chartx[y].lastvalue;
				objtest['units'] = chartx[y].units;
				arrtest.push(objtest);
			}
		}
	}
	// console.log(arrtest);
	//Handle cho router
	//Lẩy mảng cho tổng lable với value series
	let serieslable = [];
	let seriesvalue = [];
	for (let i = 0; i < hostData.length; i++) {
		for (let y = 0; y < arrtest.length; y++) {
			if (arrtest[y].name.includes(hostData[i].host)) {
				serieslable.push(
					arrtest[y].lable.replace('Memory utilization', '') &&
						arrtest[y].lable.replace(': Memory utilization', '')
				);
				seriesvalue.push(Number(parseFloat(arrtest[y].value).toFixed(1)));
				seriesvalue.push(
					Number((100 - parseFloat(arrtest[y].value)).toFixed(1))
				);
			}
		}
	}

	// //Tách ra theo cặp 2
	let sepratevalue = [];
	for (let i = 0; i < seriesvalue.length; i += 2) {
		sepratevalue.push(seriesvalue.slice(i, i + 2));
	}

	return (
		<Page title="Chart | Monitoring-UI">
			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Typography variant="h4" gutterBottom>
						Chart
					</Typography>
				</Stack>

				{/* <Stack
					mb={5}
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<BlogPostsSearch posts={POSTS} />
					<BlogPostsSort options={SORT_OPTIONS} />
				</Stack> */}

				<Grid container spacing={3}>
					{sepratevalue.map((item, index) => (
						<Grid item xs={12} md={6} lg={4}>
							<ChartCard
								series={item}
								title={arrtest[index].name}
								subtitle={serieslable[index]}
							/>
						</Grid>
					))}
					{/* {POSTS.map((post, index) => (
						<BlogPostCard key={post.id} post={post} index={index} />
					))} */}
				</Grid>

				{/* <Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Typography variant="h4" gutterBottom>
						Graph List
					</Typography>
				</Stack>

				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Box display="flex">
							<Box display="inline-block" style={{ padding: 10 }}>
								<SelectOption onSelected={handleSelected} />
							</Box>
							<Box display="inline-block" style={{ padding: 10 }}>
								<SelectTime onSelectTime={handleSelectTime} />
							</Box>
						</Box>
					</Grid>

				</Grid> */}
			</Container>
		</Page>
	);
}
