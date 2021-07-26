import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Chart from './pages/Chart';
import Item from './pages/Item';
import NotFound from './pages/Page404';
import Protected from './pages/Protected';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function Router() {
	const isUser = localStorage.getItem('tokenFirebase');

	return useRoutes([
		{
			path: '/',
			element: isUser ? <DashboardLayout /> : <Navigate to="/login" />,
			children: [
				{
					path: '/dashboard',
					element: <Navigate to="/dashboard/app" replace />,
				},
				{
					path: 'dashboard/app',
					element: <DashboardApp />,
				},
				{
					path: 'dashboard/item',
					element: <Item />,
				},
				{
					path: 'dashboard/chart',
					element: <Chart />,
				},
				{ path: '*', element: <Navigate to="/404" replace /> },
				{ path: '/', element: <Navigate to="/dashboard" /> },
			],
		},

		{
			path: '/',
			element: !isUser ? (
				<LogoOnlyLayout />
			) : (
				<Navigate to="/dashboard" />
			),
			children: [
				{
					path: 'login',
					element: <Login />,
				},
				{
					path: 'register',
					element: <Register />,
				},
				{
					path: 'protected',
					element: <Protected />,
				},
				{ path: '404', element: <NotFound /> },
				{
					path: '/',
					element: <Navigate to="/login" />,
				},

				{ path: '*', element: <Navigate to="/404" /> },
			],
		},
		{
			path: '/404',
			element: <LogoOnlyLayout />,
			children: [
				{ path: '/', element: <NotFound /> },
				{ path: '*', element: <Navigate to="/404" replace /> },
			],
		},

		{
			path: '*',
			element: <Navigate to="/404" replace />,
		},
	]);
}
