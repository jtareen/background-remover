import ReactLogo from "../../assets/react.svg";

const Branding = () => {
    return (
      <div className="flex cursor-pointer items-center space-x-2">
        <img src={ReactLogo} alt="Logo" className="w-6 h-6 md:w-10 md:h-10" /> {/* Replace with actual logo path */}
        <span className="font-poppins font-bold text-black dark:text-white text-lg md:text-3xl">BGone</span>
      </div>
    );
  };
  
  export default Branding;
  