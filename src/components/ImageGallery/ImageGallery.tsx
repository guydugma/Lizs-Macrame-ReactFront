import { Box, Container, Slide, Tabs } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import "./ImageGallery.scss";
import { HashLink } from "react-router-hash-link";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { useEffect, useRef, useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Slider from "@ant-design/react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { OrderType } from "../../@types/types";
import { Directions } from "@mui/icons-material";
import { JSDOM } from "jsdom";
import $ from "jquery";

type Props = {
  images: string[];
};

const Gallery = (props: Props) => {
  const images = props.images;
  const [value, setValue] = useState("0");
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );
  const containerRef = useRef<HTMLElement>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSlideDirection(newValue > value ? "right" : "left");
    setValue(newValue);
  };

  return (
    value && (
      <TabContext value={value}>
        <Box
          sx={{
            gap: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              height: "60vh",
              maxWidth: "100vw",
              justifyContent: "center",
              overflow: "hidden",
            }}
            ref={containerRef}
          >
            {images.map((image) => (
              <Slide
                mountOnEnter
                unmountOnExit
                appear={false}
                direction={slideDirection}
                in={value === `${images.indexOf(image)}`}
                container={containerRef.current}
                key={images.indexOf(image)}
              >
                <TabPanel
                  value={`${images.indexOf(image)}`}
                  key={image}
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <img
                    className="w-full h-full object-scale-down"
                    src={`${
                      import.meta.env.VITE_SERVER_URL
                    }/public/products/${image}`}
                  />
                </TabPanel>
              </Slide>
            ))}
          </Box>
          <Box>
            <Tabs
              value={value}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              selectionFollowsFocus
              onChange={handleChange}
            >
              {images.map((image) => (
                <Tab
                  key={image}
                  value={`${images.indexOf(image)}`}
                  icon={
                    <img
                      src={`${
                        import.meta.env.VITE_SERVER_URL
                      }/public/products/${image}`}
                      alt="image"
                      className="h-[80px] w-[80px] m-2 object-cover rounded-full"
                    />
                  }
                />
              ))}
            </Tabs>
          </Box>
        </Box>
      </TabContext>
    )
  );
};

export default Gallery;
