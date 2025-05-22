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
import Input from "../../Common/Input"; // Assume Input handles error styling and merges className
import SubmitButton from "../../Common/SubmitButton";
import Button from "../../Common/Button";
import CommonModal from "../../Modals/CommonModal";
import ForgetPassword from "./ForgetPassword";
import { useCreateJwtMutation, useLazyGetUserQuery } from "../../../store/main/service/user/auth_api_service";
import { 
  FaLock, FaEnvelope, FaUserPlus, FaArrowRight, 
  FaEye, FaEyeSlash, FaShoppingCart, FaHeart, 
} from "react-icons/fa";


import { motion, AnimatePresence } from "framer-motion";

// More Abstract & Modern E-commerce Logo
const AppLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ecomLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: "var(--tw-color-emerald-600)", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "var(--tw-color-teal-500)", stopOpacity: 1}} />
      </linearGradient>
    </defs>
    {/* Abstract Shape 1 */}
    <path 
      fill="url(#ecomLogoGradient)"
      d="M10,5 Q15,0 20,5 T30,5 Q35,10 30,15 T20,15 Q15,20 20,25 T30,25 Q35,30 30,35 T20,35 Q15,40 10,35 T10,5 Z"
      transform="translate(0 -2)"
    />
    {/* Brand Name - Placeholder */}
    <text x="42" y="27" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="rgb(30 41 59)">
      ShopLux
    </text>
  </svg>
);

const EcommerceBenefitItem = ({ icon, title, description, delay }) => (
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
      <h4 className="text-md font-semibold text-white">{title}</h4>
      <p className="text-sm text-emerald-100/80">{description}</p>
    </div>
  </motion.li>
);


const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange", // Validate on change for better UX
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const dispatch = useDispatch();
  const [getUser] = useLazyGetUserQuery();
  const [createJwt, { isLoading: jwtLoading }] = useCreateJwtMutation();

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
            duration: 7000, // Longer duration for this important message
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
            } else {
              toast.error("Failed to load your profile. Please try again.", { id: toastId });
            }
          } else {
            toast.error("Authentication session could not be established.", { id: toastId });
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
          default: // Keep a generic message for other Firebase errors
            errorMessage = "Login failed. Please double-check your credentials.";
        }
      }
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -10 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.6,
  };

  const formItemVariants = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.2 + delay * 0.1, duration: 0.4, ease: "easeOut" }
    }
  });

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-slate-100 flex items-center justify-center p-4 lg:p-8 selection:bg-emerald-500 selection:text-white"
    >
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-10">
        
        {/* Left Column - Login Form (md:col-span-4) */}
        <motion.div 
          className="md:col-span-4 p-8 sm:p-10 lg:p-12 flex flex-col justify-center"
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={formItemVariants(0)} className="mb-8 text-center md:text-left">
            <Link to="/" className="inline-block mb-6 group" aria-label="Go to homepage">
              <AppLogo className="h-10 w-auto text-emerald-600 transition-opacity duration-300 group-hover:opacity-80" />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Sign In</h1>
            <p className="mt-2 text-sm text-slate-500">Access your account & continue shopping.</p>
          </motion.div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            <motion.div variants={formItemVariants(1)}>
              <label htmlFor="email" className="block text-xs font-medium text-slate-600 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FaEnvelope className="text-slate-400 h-4 w-4" />
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
                  <FaLock className="text-slate-400 h-4 w-4" />
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
                  {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </motion.div>

            <motion.div variants={formItemVariants(3)} className="flex items-center justify-end text-xs">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="font-medium text-emerald-600 hover:text-emerald-500 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded"
              >
                Forgot Password?
              </button>
            </motion.div>

            <motion.div variants={formItemVariants(4)} className="pt-1">
              <SubmitButton
                isLoading={isLoading || jwtLoading}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-offset-2 transition-all duration-150 flex items-center justify-center group text-sm"
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
                className="font-medium text-emerald-600 hover:text-emerald-500 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded"
              >
                Create an Account
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Right Column - E-commerce Benefits (md:col-span-6) */}
        <div className="md:col-span-6 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 hidden md:flex flex-col justify-center p-10 lg:p-16 text-white relative">
           {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="white"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#smallGrid)" />
            </svg>
          </div>
          
          <motion.div 
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">Unlock Member Benefits</h2>
            <p className="text-lg text-emerald-100/90 mb-8">
              Create an account to enjoy a smoother shopping experience and exclusive perks.
            </p>
            <ul className="space-y-5 mb-10">
              <EcommerceBenefitItem 
                icon={<FaShoppingCart className="h-5 w-5 text-emerald-300"/>}
                title="Faster Checkout"
                description="Save your details for a quicker purchase next time."
                delay={0.4}
              />
             
              <EcommerceBenefitItem 
                icon={<FaHeart className="h-5 w-5 text-emerald-300"/>}
                title="Wishlists & Favorites"
                description="Save products you love and come back to them later."
                delay={0.6}
              />
            </ul>
            <Link to="/sign-up">
              <Button className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 bg-white text-emerald-700 font-semibold rounded-md shadow-lg hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-emerald-700 transition-all duration-150 transform hover:scale-105">
                <FaUserPlus />
                Register for Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

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
    </motion.div>
  );
};

export default Login;