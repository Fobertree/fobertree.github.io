import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
//import { ThemeProvider } from "@emotion/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// https://abhik-b.medium.com/cards-full-screen-expand-and-close-react-and-framer-motion-af0f5cf83f45

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function ProjectCard({ title, text, imgSrc }) {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 345, background: "white", textAlign: "initial" }}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={imgSrc} alt="image" />
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
