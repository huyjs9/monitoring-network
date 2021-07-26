import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Button, Typography, Container } from '@material-ui/core';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
	display: 'flex',
	minHeight: '100%',
	alignItems: 'center',
	paddingTop: theme.spacing(15),
	paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Protected() {
	return (
		<RootStyle title="Protected Page">
			<Container>
				<MotionContainer initial="initial" open>
					<Box
						sx={{
							maxWidth: 480,
							margin: 'auto',
							textAlign: 'center',
						}}
					>
						<motion.div variants={varBounceIn}>
							<Typography variant="h3" paragraph>
								Sorry, please login first!
							</Typography>
						</motion.div>
						{/* <Typography sx={{ color: 'text.secondary' }}>
							Sorry, we couldn’t find the page you’re looking for.
							Perhaps you’ve mistyped the URL? Be sure to check
							your spelling.
						</Typography> */}

						<motion.div variants={varBounceIn}>
							<Box
								component="img"
								src="/static/illustrations/illustration_protected.svg"
								sx={{
									height: 260,
									mx: 'auto',
									my: { xs: 5, sm: 10 },
								}}
							/>
						</motion.div>

						<Button
							to="/login"
							size="large"
							variant="contained"
							component={RouterLink}
						>
							Back to Login
						</Button>
					</Box>
				</MotionContainer>
			</Container>
		</RootStyle>
	);
}
