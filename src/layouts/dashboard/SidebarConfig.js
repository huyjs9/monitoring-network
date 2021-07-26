import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import sitemapIcon from '@iconify-icons/mdi/sitemap';
import chartScatterPlot from '@iconify-icons/mdi/chart-scatter-plot';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
	{
		title: 'dashboard',
		path: '/dashboard/app',
		icon: getIcon(pieChart2Fill),
	},
	{
		title: 'item',
		path: '/dashboard/item',
		icon: getIcon(sitemapIcon),
	},
	// {
	// 	title: 'product',
	// 	path: '/dashboard/products',
	// 	icon: getIcon(shoppingBagFill),
	// },
	{
		title: 'chart',
		path: '/dashboard/chart',
		icon: getIcon(chartScatterPlot),
	},
	// {
	// 	title: 'login',
	// 	path: '/login',
	// 	icon: getIcon(lockFill),
	// },
	// {
	// 	title: 'register',
	// 	path: '/register',
	// 	icon: getIcon(personAddFill),
	// },
	// {
	// 	title: 'Not found',
	// 	path: '/404',
	// 	icon: getIcon(alertTriangleFill),
	// },
];

export default sidebarConfig;
