import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { 
  FaUser, FaEnvelope, FaLock, FaArrowRight, 
  FaEye, FaEyeSlash, FaCheckCircle, FaExclamationTriangle, 
  FaHome, FaSignInAlt 
} from "react-icons/fa";
import { motion } from "framer-motion";
import Button from "../../Common/Button";
import SubmitButton from "../../Common/SubmitButton";
import { useCreateJwtMutation, useCreateUserMutation } from "../../../store/main/service/user/auth_api_service";
import { auth } from "../../../firebase/firebase.config";
import { addUser } from "../../../store/main/features/user/userSlice";



const FormInput = ({
  id, label, type = "text", placeholder, registerHookForm, error, icon,
  showPasswordToggle, isPasswordVisible, className = ''
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
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...registerHookForm}
        className={`
          w-full py-2.5 text-sm rounded-md transition-colors duration-150
          ${icon ? 'pl-10' : 'pl-3.5'} 
          ${showPasswordToggle ? 'pr-10' : 'pr-3.5'}
          placeholder-slate-400/80 border
          ${error 
            ? 'border-red-400 text-red-700 focus:ring-red-500/50 focus:border-red-500' 
            : 'border-slate-300 text-slate-700 focus:ring-emerald-500/50 focus:border-emerald-500'
          }
          focus:outline-none focus:ring-2
        `}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={showPasswordToggle}
          className="absolute inset-y-0 right-0 px-3.5 flex items-center text-slate-500 hover:text-emerald-600 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded-md"
          aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        >
          {isPasswordVisible ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
        </button>
      )}
    </div>
    {error && <p className="mt-1.5 text-xs text-red-500">{error.message}</p>}
  </div>
);

const PasswordRequirementItem = ({ isValid, text }) => (
  <li className={`flex items-center text-xs ${isValid ? 'text-emerald-600' : 'text-slate-500'}`}>
    {isValid ? 
      <FaCheckCircle className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" /> : 
      <FaExclamationTriangle className="mr-1.5 h-3.5 w-3.5 flex-shrink-0 text-amber-500" />
    }
    {text}
  </li>
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
        {/* Side Content - Always on top in mobile */}
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

const Registration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset
  } = useForm({
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const dispatch = useDispatch();
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

  const formItemVariants = (delay = 0) => ({
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.3 + delay * 0.08, duration: 0.4, ease: "easeOut" }
    }
  });

  const handleRegistration = async (data) => {
    if (!allPasswordChecksPassed) {
      toast.error("Password must meet all specified requirements.", { id: "validation_error" });
      return;
    }
    if (!data.agreeToTerms) {
      toast.error("You must agree to the terms and conditions to proceed.", { id: "terms_error" });
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

      if (firebaseResult?.user?.email) {
        await createJwt({ email: firebaseResult.user.email }).unwrap();
        
        const userDataForDB = {
          fName: data.fName,
          lName: data.lName,
          email: data.email,
          uid: firebaseResult.user.uid,
        };
        
        const dbResponse = await createUserInDB(userDataForDB).unwrap();

        if (dbResponse?.acknowledged || dbResponse?.id || dbResponse?.success) {
          dispatch(addUser({ ...userDataForDB, ...dbResponse }));
          toast.success("Account created successfully! Welcome aboard!", { id: toastId, icon: "🎉" });
          reset();
          navigate(from, { replace: true });
        }
      }
    } catch (error) {
      console.error("Registration Error:", error);
      let errorMessage = "An unexpected error occurred. Please try again later.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = `The email address ${data.email} is already registered.`;
      } else if (error.code) {
        errorMessage = `Registration failed: ${error.message.replace("Firebase: ", "")}`;
      } else if (error.data?.message) {
        errorMessage = error.data.message;
      }
      
      toast.error(errorMessage, { id: toastId, duration: 6000 });
    } finally {
      setIsLoading(false);
    }
  };

  const registrationSideContent = (
    <motion.div 
      className="relative z-10"
      initial={{ opacity:0, y: 20}}
      animate={{ opacity:1, y: 0}}
      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut"}}
    >
      <Link to="/" className="inline-block mb-6 group" aria-label="Go to Homepage">
        <FaHome className="text-4xl sm:text-5xl text-white p-2.5 border-2 border-white/60 rounded-full hover:bg-white/10 transition-colors duration-200 group-hover:scale-110" />
      </Link>
      <h2 className="mb-3 text-3xl font-bold sm:text-4xl">Join Our Community</h2>
      <p className="mx-auto mb-8 max-w-xs text-base sm:text-lg text-emerald-100/90">
        Create an account to enjoy exclusive benefits and faster checkout.
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
    <AuthLayout sideContent={registrationSideContent} sidePosition="right">
      <motion.div 
        className="flex flex-col justify-center"
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={formItemVariants(0)} className="mb-8 text-center md:text-left">
          <Link to="/" className="inline-block mb-6 group" aria-label="Go to homepage">
           
          </Link>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-slate-800">Create an Account</h1>
          <p className="mt-2 text-sm text-slate-500">Fill in the details below to get started.</p>
        </motion.div>

        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <motion.div variants={formItemVariants(1)}>
              <FormInput
                id="fName"
                label="First Name"
                placeholder="E.g., John"
                registerHookForm={register("fName", { required: "First name is required." })}
                error={errors.fName}
                icon={<FaUser className="w-4 h-4 text-slate-400" />}
              />
            </motion.div>
            <motion.div variants={formItemVariants(1.5)}>
              <FormInput
                id="lName"
                label="Last Name"
                placeholder="E.g., Doe"
                registerHookForm={register("lName", { required: "Last name is required." })}
                error={errors.lName}
                icon={<FaUser className="w-4 h-4 text-slate-400" />}
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
              icon={<FaEnvelope className="w-4 h-4 text-slate-400" />}
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
                validate: () => allPasswordChecksPassed || "Password doesn't meet all criteria."
              })}
              error={errors.password}
              icon={<FaLock className="w-4 h-4 text-slate-400" />}
              isPasswordVisible={showPassword}
              showPasswordToggle={() => setShowPassword(!showPassword)}
            />
          </motion.div>

          {(currentPassword || errors.password) && (
            <motion.div 
              variants={formItemVariants(3.5)} 
              className="p-3 mt-2 mb-1 rounded-md border bg-slate-50/70 border-slate-200/80"
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
          
          <motion.div variants={formItemVariants(4)} className="flex items-start pt-1 space-x-2">
            <input
              type="checkbox"
              id="agreeToTerms"
              {...register("agreeToTerms", { required: "Please agree to the terms."})}
              className="mt-0.5 h-4 w-4 text-emerald-600 border-slate-300 rounded focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
            />
            <div>
              <label htmlFor="agreeToTerms" className="text-xs cursor-pointer text-slate-600">
                I agree to the <Link to="/terms" className="font-medium text-emerald-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="font-medium text-emerald-600 hover:underline">Privacy Policy</Link>.
              </label>
              {errors.agreeToTerms && <p className="text-xs text-red-500 mt-0.5">{errors.agreeToTerms.message}</p>}
            </div>
          </motion.div>

          <motion.div variants={formItemVariants(5)} className="pt-3">
            <SubmitButton
              isLoading={isLoading || jwtLoading}
              className="flex justify-center items-center px-4 py-3 w-full text-sm font-semibold text-white bg-emerald-600 rounded-md shadow-sm transition-all duration-150 hover:bg-emerald-700 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-offset-2 group"
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
    </AuthLayout>
  );
};

export default Registration;