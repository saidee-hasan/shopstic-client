import welcome_img from "../../../assets/Dashboard/welcome.png";
const DashboardHome = () => {
  return (
    <div className="bg-bg_primary h-svh flex flex-col items-center justify-center md:justify-start">
      <div className="flex flex-col gap-4 justify-center items-center bg-bg_primary p-5">
        <h1 className="font-bold text-3xl md:text-4xl uppercase text-center text-white">
          Welcome to our dashboard
        </h1>
        <img className="h-[450px]" src={welcome_img} alt="welcome_image" />
      </div>
    </div>
  );
};

export default DashboardHome;
