import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addUser } from "../../../store/main/features/user/userSlice";
import { auth } from "../../../firebase/firebase.config";
import Input from "../../Common/Input";
import SubmitButton from "../../Common/SubmitButton";
import Button from "../../Common/Button";
import CommonModal from "../../Modals/CommonModal";
import ForgetPassword from "./ForgetPassword";
import { useCreateJwtMutation, useLazyGetUserQuery } from "../../../store/main/service/user/auth_api_service";
import { 
  FaLock, FaEnvelope, FaUserPlus, FaArrowRight, 
  FaEye, FaEyeSlash, FaShoppingCart, FaHeart,
  FaSignInAlt, FaHome
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Shared Components
const AppLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ecomLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: "var(--tw-color-emerald-600)", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "var(--tw-color-teal-500)", stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <path 
      fill="url(#ecomLogoGradient)"
      d="M10,5 Q15,0 20,5 T30,5 Q35,10 30,15 T20,15 Q15,20 20,25 T30,25 Q35,30 30,35 T20,35 Q15,40 10,35 T10,5 Z"
      transform="translate(0 -2)"
    />
    <text x="42" y="27" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="rgb(30 41 59)">
      ShopLux
    </text>
  </svg>
);

const AuthFeatureItem = ({ icon, title, description, delay }) => (
  <motion.li 
    className="flex items-start space-x-3"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
  >
    <div className="flex-shrink-0 mt-1">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-white text-md">{title}</h4>
      <p className="text-sm text-emerald-100/80">{description}</p>
    </div>
  </motion.li>
);

const AuthLayout = ({ children, sideContent, sidePosition = 'right' }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={{
        initial: { opacity: 0, scale: 0.98, y: 10 },
        in: { opacity: 1, scale: 1, y: 0 },
        out: { opacity: 0, scale: 0.98, y: -10 },
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="flex justify-center items-center p-4 min-h-screen bg-slate-100 lg:p-6 selection:bg-emerald-500 selection:text-white"
    >
      {/* Animated background */}
      <div className="overflow-hidden fixed inset-0 -z-10">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-emerald-400 rounded-full opacity-20 mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-teal-400 rounded-full opacity-20 mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-1/4 left-1/3 w-1/2 h-1/2 bg-cyan-400 rounded-full opacity-20 mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden min-h-[600px] flex flex-col md:flex-row">
        {/* Side Content - Always on top in mobile, position based on sidePosition in desktop */}
        <div className={`w-full md:w-5/12 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 flex flex-col items-center justify-center p-8 sm:p-12 text-center text-white relative ${sidePosition === 'left' ? 'md:order-first' : 'md:order-last'}`}>
          {sideContent}
        </div>
        
        {/* Main Form Content */}
        <div className={`w-full md:w-7/12 p-8 sm:p-10 lg:p-12 flex flex-col justify-center ${sidePosition === 'left' ? 'md:order-last' : 'md:order-first'}`}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const dispatch = useDispatch();
  const [getUser] = useLazyGetUserQuery();
  const [createJwt, { isLoading: jwtLoading }] = useCreateJwtMutation();

  const formItemVariants = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.2 + delay * 0.1, duration: 0.4, ease: "easeOut" }
    }
  });

  const handleLogin = async ({ email, password }) => {
    setIsLoading(true);
    const toastId = toast.loading("Signing In...");

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (!result?.user?.emailVerified) {
        try {
          await sendEmailVerification(result?.user);
          toast.success("Verification email sent. Please check your inbox to complete sign-in.", {
            id: toastId,
            duration: 7000,
          });
        } catch (error) {
          console.error("Error sending verification email:", error);
          toast.error("Could not send verification email. Please try again.", {
            id: toastId,
          });
        }
        setIsLoading(false);
        return;
      }

      if (result.user.email) {
        try {
          const jwtResponse = await createJwt({ email: result.user.email }).unwrap();
          if (jwtResponse?.token) {
            const userResponse = await getUser(result.user.email).unwrap();
            if (userResponse?.email) {
              dispatch(addUser(userResponse));
              toast.success("Welcome back! Happy shopping!", {
                id: toastId,
                icon: "🛍️",
              });
              navigate(from, { replace: true });
            }
          }
        } catch (err) {
          console.error("Login API error:", err);
          toast.error(err?.data?.message || "An error occurred while logging you in.", { id: toastId });
        }
      }
    } catch (error) {
      console.error("Firebase sign-in error:", error);
      let errorMessage = "An unexpected login error occurred. Please try again.";
      if (error.code) {
        switch (error.code) {
          case "auth/wrong-password":
          case "auth/invalid-credential":
            errorMessage = "The email or password you entered is incorrect.";
            break;
          case "auth/user-not-found":
            errorMessage = "No account found with this email address.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Access temporarily disabled due to too many failed attempts. Try again later or reset your password.";
            break;
          case "auth/user-disabled":
            errorMessage = "This account has been disabled by an administrator.";
            break;
          default:
            errorMessage = "Login failed. Please double-check your credentials.";
        }
      }
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const loginSideContent = (
    <motion.div 
      className="relative z-10"
      initial={{ opacity:0, y: 20}}
      animate={{ opacity:1, y: 0}}
      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut"}}
    >
      <Link to="/" className="inline-block mb-6 group" aria-label="Go to Homepage">
        <FaHome className="text-4xl sm:text-5xl text-white p-2.5 border-2 border-white/60 rounded-full hover:bg-white/10 transition-colors duration-200 group-hover:scale-110" />
      </Link>
      <h2 className="mb-3 text-3xl font-bold sm:text-4xl">Welcome Back!</h2>
      <p className="mx-auto mb-8 max-w-xs text-base sm:text-lg text-emerald-100/90">
        Already have an account? Sign in to continue your journey with us.
      </p>
      <Link to="/sign-in">
        <Button 
          className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3 bg-white text-emerald-700 font-semibold rounded-lg shadow-lg hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-emerald-700 transition-all duration-150 transform hover:scale-105"
        >
          <FaSignInAlt />
          Sign In
        </Button>
      </Link>
    </motion.div>
  );

  return (
    <AuthLayout sideContent={loginSideContent} sidePosition="right">
      <motion.div 
        className="flex flex-col justify-center"
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={formItemVariants(0)} className="mb-8 text-center md:text-left">
          <Link to="/" className="inline-block mb-6 group" aria-label="Go to homepage">
            <AppLogo className="w-auto h-10 text-emerald-600 transition-opacity duration-300 group-hover:opacity-80" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-slate-800">Sign In</h1>
          <p className="mt-2 text-sm text-slate-500">Access your account & continue shopping.</p>
        </motion.div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          <motion.div variants={formItemVariants(1)}>
            <label htmlFor="email" className="block text-xs font-medium text-slate-600 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <FaEnvelope className="w-4 h-4 text-slate-400" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required.",
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email format." },
                })}
                className="pl-10 py-2.5 text-sm border-slate-300 focus:ring-emerald-500/60 focus:border-emerald-500"
                error={errors.email}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </motion.div>

          <motion.div variants={formItemVariants(2)}>
            <label htmlFor="password" className="block text-xs font-medium text-slate-600 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <FaLock className="w-4 h-4 text-slate-400" />
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required.",
                  minLength: { value: 6, message: "Password must be at least 6 characters." },
                })}
                className="pl-10 pr-10 py-2.5 text-sm border-slate-300 focus:ring-emerald-500/60 focus:border-emerald-500"
                error={errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3.5 flex items-center text-slate-500 hover:text-emerald-600 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded-md"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FaEyeSlash className="w-4 h-4" />
                ) : (
                  <FaEye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </motion.div>

          <motion.div variants={formItemVariants(3)} className="flex justify-end items-center text-xs">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="font-medium text-emerald-600 rounded hover:text-emerald-500 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
            >
              Forgot Password?
            </button>
          </motion.div>

          <motion.div variants={formItemVariants(4)} className="pt-1">
            <SubmitButton
              isLoading={isLoading || jwtLoading}
              className="flex justify-center items-center px-4 py-3 w-full text-sm font-semibold text-white bg-emerald-600 rounded-md shadow-sm transition-all duration-150 hover:bg-emerald-700 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-offset-2 group"
            >
              {isLoading || jwtLoading ? "Signing In..." : (
                <>
                  Sign In to Your Account
                  <FaArrowRight className="ml-2 h-3.5 w-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </>
              )}
            </SubmitButton>
          </motion.div>
        </form>
        
        <motion.div variants={formItemVariants(5)} className="mt-8 text-center md:text-left">
          <p className="text-xs text-slate-500">
            New customer?{" "}
            <Link
              to="/sign-up"
              className="font-medium text-emerald-600 rounded hover:text-emerald-500 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
            >
              Create an Account
            </Link>
          </p>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <CommonModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            className="w-full max-w-md"
            title="Reset Your Password"
          >
            <ForgetPassword 
              onSuccess={() => {
                setIsModalOpen(false);
                toast.success("If your email is registered, password reset instructions have been sent.");
              }}
              onCancel={() => setIsModalOpen(false)}
            />
          </CommonModal>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
};

export default Login;