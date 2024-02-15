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
// Scroll into view: https://stackblitz.com/edit/react-8m4oaw?file=index.js

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function ProjectCard({ title, text, img, url }) {
  console.log(url);
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
        <CardActionArea onClick={() => window.open(url, "_blank")}>
          <CardMedia
            component="img"
            height="200"
            image={img || flow}
            alt="image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ wordWrap: "break-word" }}
            >
              {text}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(url, "_blank")}
          >
            Learn More
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
