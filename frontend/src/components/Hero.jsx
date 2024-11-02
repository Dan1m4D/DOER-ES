import { Button } from "@nextui-org/react"

const Hero = () => {
  return (
    <section
      className="relative w-full h-screen bg-center bg-cover"
      style={{ backgroundImage: "url(https://placeholder.svg?height=1080&width=1920)" }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative flex items-center justify-center h-full text-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-white md:text-6xl">Welcome to DOER</h1>
          <p className="text-xl text-white md:text-2xl">Start organizing your work to do things.</p>
          <Button color="primary" variant="shadow">Get Started</Button>
        </div>
      </div>
    </section>
  )
}

export default Hero