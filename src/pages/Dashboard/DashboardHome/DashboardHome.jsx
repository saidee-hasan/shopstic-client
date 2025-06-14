import welcome_img from "../../../assets/Dashboard/welcome.png";

const DashboardHome = () => {
  return (
    <div className="flex justify-center items-center p-4 min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="flex flex-col gap-6 items-center p-8 w-full max-w-3xl bg-white rounded-3xl shadow-2xl sm:p-12 animate-fade-in">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 sm:text-4xl md:text-5xl">
          Welcome to Our Dashboard
        </h1>
        <p className="max-w-lg text-center text-gray-500">
          Manage everything in one place. Enjoy a clean and intuitive dashboard experience.
        </p>
        <img
          src={welcome_img}
          alt="Welcome"
          className="w-full max-h-[400px] object-contain rounded-xl"
        />
        <button className="px-6 py-3 mt-4 font-semibold text-white rounded-xl shadow-sm transition bg-accent hover:bg-accent/90">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default DashboardHome;
