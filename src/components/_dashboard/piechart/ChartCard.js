import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {
	useTheme,
	experimentalStyled as styled,
} from '@material-ui/core/styles';
import { Card, CardHeader } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
	height: CHART_HEIGHT,
	marginTop: theme.spacing(5),
	'& .apexcharts-canvas svg': { height: CHART_HEIGHT },
	'& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
		overflow: 'visible',
	},
	'& .apexcharts-legend': {
		height: LEGEND_HEIGHT,
		alignContent: 'center',
		position: 'relative !important',
		borderTop: `solid 1px ${theme.palette.divider}`,
		top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
	},
}));

// ----------------------------------------------------------------------

const CHART_DATA = [52, 48];

export default function AppCurrentVisits(props) {
	const theme = useTheme();
	const { series, title, subtitle } = props;

	const chartOptions = merge(BaseOptionChart(), {
		colors: [theme.palette.error.main, theme.palette.primary.main],
		labels: ['Used Memory', 'Free Memory'],
		stroke: { colors: [theme.palette.background.paper] },
		legend: { floating: true, horizontalAlign: 'center' },
		dataLabels: { enabled: true, dropShadow: { enabled: false } },
		// title: {
		// 	text: ['Hello'],
		// 	align: 'left',
		// },
		// subtitle: {
		// 	text: ['it me'],
		// 	align: 'left',
		// 	margin: 10,
		// 	offsetX: 5,
		// 	offsetY: 20,
		// 	floating: false,
		// 	style: {
		// 		fontSize: '12px',
		// 		fontWeight: 'normal',
		// 		fontFamily: undefined,
		// 		color: '#9699a2',
		// 	},
		// },
		tooltip: {
			fillSeriesColor: false,
			y: {
				formatter: (seriesName) => fNumber(seriesName),
				title: {
					formatter: (seriesName) => `#${seriesName}`,
				},
			},
		},
		plotOptions: {
			pie: { donut: { labels: { show: false } } },
		},
	});

	return (
		<Card>
			<CardHeader title={title} subheader={subtitle} />
			<ChartWrapperStyle dir="ltr">
				<ReactApexChart
					type="pie"
					series={series}
					options={chartOptions}
					height={280}
				/>
			</ChartWrapperStyle>
		</Card>
	);
}
