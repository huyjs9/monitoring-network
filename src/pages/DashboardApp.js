// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
	AppTasks,
	AppProblemReports,
	AppUnknown,
	AppItemUpdate,
	AppServers,
	AppOrderTimeline,
	AppCurrentVisits,
	AppWebsiteVisits,
	AppTrafficBySite,
	AppCurrentSubject,
	AppConversionRates,
	AppTextfield,
	AppMap,
	AppRouters,
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
	return (
		<Page title="Dashboard | Monitoring-UI">
			<Container maxWidth="xl">
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6} md={3}>
						<AppServers />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppRouters />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppUnknown />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppProblemReports />
					</Grid>

					<Grid item xs={12}>
						<AppItemUpdate />
					</Grid>

					{/* <Grid item xs={12} md={6} lg={4}>
						<AppCurrentVisits />
					</Grid>

					<Grid item xs={12} md={6} lg={8}>
						<AppConversionRates />
					</Grid>

					<Grid item xs={12} md={6} lg={4}>
						<AppCurrentSubject />
					</Grid>

					<Grid item xs={12} md={6} lg={8}>
						<AppWebsiteVisits />
					</Grid>

					<Grid item xs={12} md={6} lg={4}>
						<AppOrderTimeline />
					</Grid>

					<Grid item xs={12} md={6} lg={4}>
						<AppTrafficBySite />
					</Grid>

					<Grid item xs={12} md={6} lg={8}>
						<AppTasks />
					</Grid> */}
				</Grid>
			</Container>
		</Page>
	);
}
