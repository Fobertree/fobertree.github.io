"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import flow from "./images/flowfield1.png";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function ProjectCard({ title, text, img, url }) {
  console.warn("Project Card");
  const handleClick = () => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          maxWidth: 345,
          textAlign: "initial",
          marginTop: "2vh",
          marginRight: "2vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardActionArea onClick={handleClick}>
          <CardMedia
            component="img"
            height="200"
            image={img || flow}
            alt={title}
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {text}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions>
          <Button size="small" color="primary" onClick={handleClick}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}

export default ProjectCard;