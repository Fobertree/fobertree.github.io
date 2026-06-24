import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <h1>Hello</h1>
      <h2>I am Alexander Liu</h2>
      <h4>I hold a BS in CS/Math and Econ Minor from Emory University</h4>
      <h4>
        Currently focusing on learning CPP and drawing in my free time (Wacom
        tablet :). May turn this into a blog and post art later)
      </h4>
    </div>
  );
};

export default Hero;