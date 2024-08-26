import { Box, } from "@mui/material";
import ManageProducts from "../ManageList/ManageProducts";
import ManageStones from "../ManageList/ManageStones";
import ManageCategories from "../ManageList/ManageCategories";

type Props = {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}



const TabPanel = (props: Props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, flexDirection: "column", gap: 2, width: "100%",padding:0 }}>
          {children}
        </Box>
      )}
    </Box>
  );
}

export default TabPanel