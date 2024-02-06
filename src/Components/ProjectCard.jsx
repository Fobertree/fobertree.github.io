import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
//import { ThemeProvider } from "@emotion/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import flow from "./images/flowfield1.png";

// https://abhik-b.medium.com/cards-full-screen-expand-and-close-react-and-framer-motion-af0f5cf83f45

const images = require.context("./images", true);
const imageList = images.keys().map((image) => images(image));

console.log(imageList);

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function ProjectCard({ title, text, img }) {
  console.log("img");
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 345, textAlign: "initial", marginRight: "2vw" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={img || flow}
            alt="image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {text};
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}

export default ProjectCard;

/*export default function ProjectCard() {
  <div>
    <Cards
      title="Test"
      text="test \n\nContent"
      imgSrc="../../public/images/flowfield1.png"
    />
  </div>;
}
*/
