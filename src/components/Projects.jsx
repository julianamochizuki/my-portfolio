import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  CardHeader,
  Box,
  Link,
  ThemeProvider,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import { projects } from "../constants";
import { theme } from "../theme/theme";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../App.css";
import { projectsStyles } from "../theme/styles";

export default function Projects() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const ProjectSlides = () => {
    return (
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {projects.map((p) => (
          <SwiperSlide>
            <Card sx={projectsStyles.card}>
              <CardHeader title={p.name} sx={projectsStyles.cardHeader} />
              <Box className="card-box">
                <CardMedia
                  component="img"
                  maxHeight="450"
                  image={process.env.PUBLIC_URL + p.image}
                  className="cardMedia"
                />
                <Box className="overlay" sx={projectsStyles.cardBox}>
                  <Typography variant="subtitle1">
                    {p.name !== "Tweeter" && (
                      <span>
                        <Link
                          color="inherit"
                          underline="hover"
                          sx={projectsStyles.link}
                          onClick={() => window.open(p.live, "_blank")}
                        >
                          Live
                        </Link>
                        {" | "}
                      </span>
                    )}
                    <Link
                      color="inherit"
                      underline="hover"
                      sx={projectsStyles.link}
                      onClick={() => window.open(p.repo, "_blank")}
                    >
                      Repo
                    </Link>
                  </Typography>
                  <br />
                  <Typography variant="subtitle2" >{p.about}</Typography>
                  <br />
                  <Typography variant="subtitle2">
                    Tech Stack: {p.stack}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  return (
    <Grid
      container
      sx={projectsStyles.root}
      className={inView ? "section" : "opacity-0"}
      ref={ref}
      id="projects"
    >
      {inView ? (
        <ThemeProvider theme={theme}>
          <Grid
            xs={12}
            container
            sx={projectsStyles.container}
            className={`container ${inView ? "slide-in" : ""}`}
          >
            {/* title */}
            <Grid item xs={12} sx={projectsStyles.title}>
              <Typography variant="h4">
                <TypeAnimation
                  sequence={["", 2000, "Projects", 2000]}
                  cursor={false}
                />
              </Typography>
            </Grid>

            {/* project slides */}
            <Grid item xs={12} >
              <ProjectSlides />
            </Grid>
          </Grid>
        </ThemeProvider>
      ) : null}
    </Grid>
  );
}
