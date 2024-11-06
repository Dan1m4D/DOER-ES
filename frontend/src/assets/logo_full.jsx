import logo from "./logo.svg";

const LogoBig = () => {
  return (
    <div className="flex items-center gap-2">
      <img src={logo} alt="Logo" className="h-[3rem] aspect-auto p-2" />
      <p className="font-bold text-2xl text-[#44AAA9]">DOER</p>
    </div>
  );
};

export default LogoBig;
