import { AppBar, Box, Container, Divider, Tab, Tabs } from "@mui/material";
import React from "react";
import TabPanel from "../components/TabPanel/TabPanel";
import ManageProducts from "../components/ManageList/ManageProducts";
import ManageStones from "../components/ManageList/ManageStones";
import ManageCategories from "../components/ManageList/ManageCategories";

const tabNames = ["Products", "Categories", "Stones"];

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Manage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Container maxWidth={"xl"}>
        <AppBar position="static" sx={{ bgcolor: "background.paper" }}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            {tabNames.map((name, index) => (
              <Tab key={index} label={name} {...a11yProps(index)} />
            ))}
          </Tabs>
        </AppBar>
      </Container>
      <TabPanel value={value} index={0} children={<ManageProducts />} />
      <TabPanel value={value} index={1} children={<ManageCategories />} />
      <TabPanel value={value} index={2} children={<ManageStones />} />
    </Box>
  );
};

export default Manage;
