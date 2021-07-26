import { experimentalStyled as styled } from "@material-ui/core/styles";
import {
	Card,
	CardHeader,
	Box,
	TextField,
	OutlinedInput,
	InputAdornment,
	Button,
} from "@material-ui/core";
import searchFill from "@iconify/icons-eva/search-fill";
import { Icon } from "@iconify/react";

//

// ----------------------------------------------------------------------

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
	width: 240,
	transition: theme.transitions.create(["box-shadow", "width"], {
		easing: theme.transitions.easing.easeInOut,
		duration: theme.transitions.duration.shorter,
	}),
	"&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
	"& fieldset": {
		borderWidth: `1px !important`,
		borderColor: `${theme.palette.grey[500_32]} !important`,
	},
}));
export default function AppTextfield() {
	return (
		<Card>
			<SearchStyle
				placeholder="IP address"
				startAdornment={
					<InputAdornment position="start">
						<Box
							component={Icon}
							icon={searchFill}
							sx={{ color: "text.disabled" }}
						/>
					</InputAdornment>
				}
			/>
			<Button variant="contained" style={{ margin: 10 }}>
				Get Information
			</Button>
		</Card>
	);
}
