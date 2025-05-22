import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaUser, FaEnvelope, FaLock, FaArrowRight,
  FaEye, FaEyeSlash, FaCheckCircle, FaExclamationTriangle, FaHome, FaSignInAlt
} from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Button from "../../Common/Button"; // Assuming this is a styled general button
// We will create a more specific FormInput below, or you can use your existing Input and adapt it
// import Input from "../../Common/Input";
import SubmitButton from "../../Common/SubmitButton"; // Assuming this is a styled submit button
import { useCreateJwtMutation, useCreateUserMutation } from "../../../store/main/service/user/auth_api_service";
import { auth } from "../../../firebase/firebase.config";
import { addUser } from "../../../store/main/features/user/userSlice";
import { motion } from "framer-motion";

// --- Reusable UI Components (Consider moving to separate files) ---

// App Logo (Placeholder - Replace with your actual logo component or SVG)
const AppLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="appLogoRegGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: "var(--tw-color-emerald-600)", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "var(--tw-color-teal-500)", stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <path 
      fill="url(#appLogoRegGradient)"
      d="M10,5 Q15,0 20,5 T30,5 Q35,10 30,15 T20,15 Q15,20 20,25 T30,25 Q35,30 30,35 T20,35 Q15,40 10,35 T10,5 Z"
      transform="translate(0 -2) scale(0.9)"
    />
    <text x="40" y="27" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="bold" fill="rgb(30 41 59)">
      YourBrand
    </text>
  </svg>
);

// Enhanced Form Input Component
const FormInput = ({
  id, label, type = "text", placeholder, registerHookForm, error, icon,
  showPasswordToggle, isPasswordVisible, className = '', inputClassName = '', ...rest
}) => (
  <div className={`w-full ${className}`}>
    {label && (
      <label htmlFor={id} className="block text-xs font-medium text-slate-600 mb-1.5">
        {label}
      </label>
    )}
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input // Using a standard input tag for easier integration with react-hook-form
        id={id}
        type={type}
        placeholder={placeholder}
        {...registerHookForm} // Spread the registration props here
        className={`
          form-input w-full py-2.5 text-sm 
          ${icon ? 'pl-10' : 'pl-3.5'} 
          ${showPasswordToggle ? 'pr-10' : 'pr-3.5'}
          rounded-md transition-colors duration-150
          placeholder-slate-400/80 
          ${error 
            ? 'border-red-400 text-red-700 focus:ring-red-500/50 focus:border-red-500' 
            : 'border-slate-300 text-slate-700 focus:ring-emerald-500/50 focus:border-emerald-500'
          }
          focus:outline-none focus:ring-2 
          ${inputClassName}
        `}
        {...rest}
      />
      {showPasswordToggle && (
         <button
            type="button"
            onClick={showPasswordToggle}
            className="absolute inset-y-0 right-0 px-3.5 flex items-center text-slate-500 hover:text-emerald-600 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded-md"
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          >
            {isPasswordVisible ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
          </button>
      )}
    </div>
    {error && <p className="mt-1.5 text-xs text-red-500">{error.message}</p>}
  </div>
);

// Password Requirement Item
const PasswordRequirementItem = ({ isValid, text }) => (
  <li className={`flex items-center text-xs ${isValid ? 'text-emerald-600' : 'text-slate-500'}`}>
    {isValid ? 
      <FaCheckCircle className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" /> : 
      <FaExclamationTriangle className="mr-1.5 h-3.5 w-3.5 flex-shrink-0 text-amber-500" />
    }
    {text}
  </li>
);
// --- End Reusable UI Components ---


const Registration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // No need for separate passwordValue, react-hook-form's watch will handle it

  const { handleSubmit, register, formState: { errors }, watch, reset } = useForm({
    mode: "onBlur", // Validate on blur
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const dispatch = useDispatch(); // Corrected variable name from disptach
  const [createUserInDB] = useCreateUserMutation();
  const [createJwt, { isLoading: jwtLoading }] = useCreateJwtMutation();

  // Watch password for requirements UI
  const currentPassword = watch("password", "");
  
  const passwordChecks = {
    minLength: currentPassword.length >= 8,
    hasLetter: /[a-zA-Z]/.test(currentPassword),
    hasNumber: /\d/.test(currentPassword),
    hasSpecialChar: /[@$!%*?&]/.test(currentPassword),
  };
  const allPasswordChecksPassed = Object.values(passwordChecks).every(Boolean);

  const handleRegistration = async (data) => {
    // Password validation (using the live checks)
    if (!allPasswordChecksPassed) {
      toast.error(
        "Password must meet all specified requirements.",
        { id: "validation_error", duration: 5000 }
      );
      return;
    }
     if (!data.agreeToTerms) { // Check for terms agreement
        toast.error("You must agree to the terms and conditions to proceed.", { id: "terms_error"});
        return;
    }


    setIsLoading(true);
    const toastId = toast.loading("Creating your account...");

    try {
      const firebaseResult = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Check if Firebase user creation was successful
      if (firebaseResult?.user?.email) {
        // Optionally create JWT. Ensure this is necessary for your flow.
        // If JWT is primarily for backend auth, this might happen after DB user creation.
        await createJwt({ email: firebaseResult.user.email }).unwrap(); // .unwrap() to handle RTK Query promise
        
        // Prepare data for your database (exclude password)
        const userDataForDB = {
          fName: data.fName,
          lName: data.lName,
          email: data.email,
          uid: firebaseResult.user.uid, // Good practice to store Firebase UID
          // Add any other fields you need
        };
        
        const dbResponse = await createUserInDB(userDataForDB).unwrap(); // .unwrap()

        if (dbResponse?.acknowledged || dbResponse?.id || dbResponse?.success) { // Adjust based on your API response
          dispatch(addUser({ ...userDataForDB, ...dbResponse })); // Add what your backend returns, ensure it matches userSlice structure
          toast.success("Account created successfully! Welcome aboard!", { id: toastId, icon: "🎉" });
          reset(); // Clear form fields
          navigate(from, { replace: true });
        } else {
          // Firebase user created, but DB user creation failed
          // Consider more robust error handling here (e.g., delete Firebase user or log for manual intervention)
          toast.error("Account partly created. Please contact support for assistance.", { id: toastId, duration: 7000 });
        }
      } else {
        // Firebase user creation failed (should be caught by outer catch, but good to have a specific check)
        toast.error("Failed to initialize account. Please try again.", { id: toastId });
      }
    } catch (error) {
      console.error("Registration Error:", error);
      let errorMessage = "An unexpected error occurred. Please try again later.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = `The email address ${data.email} is already registered.`;
      } else if (error.code) { // Other Firebase error codes
        errorMessage = `Registration failed: ${error.message.replace("Firebase: ", "")}`;
      } else if (error.data?.message) { // RTK Query error
        errorMessage = error.data.message;
      }
      
      toast.error(errorMessage, { id: toastId, duration: 6000 });
    } finally {
      setIsLoading(false);
    }
  };

  // Page and element animation variants
  const pageVariants = {
    initial: { opacity: 0, scale: 0.98, y: 10 },
    in: { opacity: 1, scale: 1, y: 0 },
    out: { opacity: 0, scale: 0.98, y: -10 },
  };
  const pageTransition = { type: "spring", stiffness: 200, damping: 25 };
  
  const formItemVariants = (delay = 0) => ({
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.3 + delay * 0.08, duration: 0.4, ease: "easeOut" }
    }
  });

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-slate-100 flex items-center justify-center p-4 lg:p-6 selection:bg-emerald-500 selection:text-white"
    >
      {/* Animated background blobs (subtle gradient mesh approximation) */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-1/4 left-1/3 w-1/2 h-1/2 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
       {/* Add to your global CSS or a <style> tag in this component if not using tailwind.config.js for keyframes */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.05); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: -3.3s; } /* Offset for smoother continuous feel */
        .animation-delay-4000 { animation-delay: -6.6s; }
      `}</style>

      <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-11">
        
        {/* Left Column - Welcome Message & Sign In CTA (md:col-span-5) */}
        {/* Original: md:rounded-r-[30%] */}
        <div className="md:col-span-5 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 flex flex-col items-center justify-center p-8 sm:p-12 text-center text-white relative order-last md:order-first md:rounded-r-none lg:rounded-r-2xl">
           <motion.div
            className="absolute -top-1/4 -left-1/4 w-2/3 h-2/3 bg-white/5 rounded-full filter blur-2xl opacity-50 animate-pulse"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6, type: "spring" }}
          />
          <motion.div 
            className="relative z-10"
            initial={{ opacity:0, y: 20}}
            animate={{ opacity:1, y: 0}}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut"}}
          >
            <Link to="/" className="inline-block mb-6 group" aria-label="Go to Homepage">
              <FaHome className="text-4xl sm:text-5xl text-white p-2.5 border-2 border-white/60 rounded-full hover:bg-white/10 transition-colors duration-200 group-hover:scale-110" />
            </Link>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Welcome Back!</h2>
            <p className="text-base sm:text-lg text-emerald-100/90 mb-8 max-w-xs mx-auto">
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
        </div>

        {/* Right Column - Registration Form (md:col-span-6) */}
        <motion.div 
          className="md:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-center order-first md:order-last"
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={formItemVariants(0)} className="mb-6 text-center md:text-left">
            <Link to="/" className="inline-block mb-4 group" aria-label="Go to homepage">
              <AppLogo className="h-10 w-auto text-emerald-600 transition-opacity duration-300 group-hover:opacity-80" />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Create an Account</h1>
            <p className="mt-1.5 text-sm text-slate-500">Fill in the details below to get started.</p>
          </motion.div>

          <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
              <motion.div variants={formItemVariants(1)}>
                <FormInput
                  id="fName"
                  label="First Name"
                  placeholder="E.g., John"
                  registerHookForm={register("fName", { required: "First name is required." })}
                  error={errors.fName}
                  icon={<FaUser className="text-slate-400 h-4 w-4" />}
                />
              </motion.div>
              <motion.div variants={formItemVariants(1.5)}>
                 <FormInput
                  id="lName"
                  label="Last Name"
                  placeholder="E.g., Doe"
                  registerHookForm={register("lName", { required: "Last name is required." })}
                  error={errors.lName}
                  icon={<FaUser className="text-slate-400 h-4 w-4" />}
                />
              </motion.div>
            </div>
            
            <motion.div variants={formItemVariants(2)}>
              <FormInput
                id="email"
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                registerHookForm={register("email", { 
                  required: "Email is required.",
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email format." }
                })}
                error={errors.email}
                icon={<FaEnvelope className="text-slate-400 h-4 w-4" />}
              />
            </motion.div>

            <motion.div variants={formItemVariants(3)}>
              <FormInput
                id="password"
                label="Create Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter a strong password"
                registerHookForm={register("password", { 
                  required: "Password is required.",
                  validate: () => allPasswordChecksPassed || "Password doesn't meet all criteria." // This message might be too generic if individual items are shown
                })}
                error={errors.password} // Show main error if validation fails on submit
                icon={<FaLock className="text-slate-400 h-4 w-4" />}
                isPasswordVisible={showPassword}
                showPasswordToggle={() => setShowPassword(!showPassword)}
              />
            </motion.div>

            {/* Password Requirements UI */}
            {(currentPassword || errors.password) && ( // Show if user starts typing or if there's a submit error
              <motion.div 
                variants={formItemVariants(3.5)} 
                className="mt-2 mb-1 p-3 bg-slate-50/70 rounded-md border border-slate-200/80"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                  <h3 className="text-xs font-semibold text-slate-700 mb-1.5">Password Requirements:</h3>
                  <ul className="space-y-0.5">
                      <PasswordRequirementItem isValid={passwordChecks.minLength} text="At least 8 characters" />
                      <PasswordRequirementItem isValid={passwordChecks.hasLetter} text="At least one letter (a-z, A-Z)" />
                      <PasswordRequirementItem isValid={passwordChecks.hasNumber} text="At least one number (0-9)" />
                      <PasswordRequirementItem isValid={passwordChecks.hasSpecialChar} text="At least one special character (@$!%*?&)" />
                  </ul>
              </motion.div>
            )}
            
            <motion.div variants={formItemVariants(4)} className="flex items-start space-x-2 pt-1">
                <input
                    type="checkbox"
                    id="agreeToTerms"
                    {...register("agreeToTerms", { required: "Please agree to the terms."})}
                    className="mt-0.5 h-4 w-4 text-emerald-600 border-slate-300 rounded focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
                />
                <div>
                  <label htmlFor="agreeToTerms" className="text-xs text-slate-600 cursor-pointer">
                      I agree to the <Link to="/terms" className="font-medium text-emerald-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="font-medium text-emerald-600 hover:underline">Privacy Policy</Link>.
                  </label>
                   {errors.agreeToTerms && <p className="text-xs text-red-500 mt-0.5">{errors.agreeToTerms.message}</p>}
                </div>
            </motion.div>


            <motion.div variants={formItemVariants(5)} className="pt-3">
              <SubmitButton
                isLoading={isLoading || jwtLoading}
                type="submit" // Explicitly set type
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-offset-2 transition-all duration-150 flex items-center justify-center group text-sm"
                disabled={!allPasswordChecksPassed && !!currentPassword} // Optionally disable if password typed but not valid
              >
                {isLoading || jwtLoading ? "Processing..." : (
                  <>
                    Create Account
                    <FaArrowRight className="ml-2 h-3.5 w-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </>
                )}
              </SubmitButton>
            </motion.div>
          </form>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Registration;