import Hero from "./Components/Hero";
import Contact from "./Components/Contact";
import ContentPanel from "./Components/ContentPanel";

const Home = () => (
  <section id="Home">
    <ContentPanel offset="home">
      <Hero />
      <Contact />
    </ContentPanel>
  </section>
);

export default Home;