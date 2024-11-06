import { Button, Link } from "@nextui-org/react";
import { hero_image } from "../assets/images";

const Hero = () => {
  return (
    <section
      className="relative w-full h-screen bg-center bg-cover"
      style={{
        backgroundImage: "url(" + hero_image + ")",
      }}
      aria-label="Photo by Carl Heyerdahl on Unsplash
  "
    >
      <div className="absolute inset-0 bg-black opacity-70" />
      <div className="relative flex items-center justify-center h-full text-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-white md:text-6xl">
            Welcome to DOER
          </h1>
          <p className="text-xl text-white md:text-2xl">
            Start organizing your work to do things.
          </p>
          <Button color="primary" variant="shadow" href="/login" as={Link}>
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
