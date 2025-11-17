import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  MapPin,
  Lock,
  PhoneCall,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "@tanstack/react-router";

import { Input } from "../components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faApple,
  faFacebook,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validationSchema = yup.object({
  officeName: yup
    .string()
    .min(4, "Office name must be at least 4 characters")
    .max(20, "Office name must be at most 20 characters")
    .required("Office name is required")
    .trim(),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^01[0125]\d{1,8}$/,
      "Please enter a valid phone number (11 digits)"
    ),
  location: yup.string().required("Please select a location"),
  specialists: yup.string().required("Please select specialist type"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^[A-Z][a-z0-9]{1,9}$/,
      "Password must start with an uppercase letter followed by lowercase letters or digits"
    )
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

type FormData = yup.InferType<typeof validationSchema>;

const SignupForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted successfully:", data);
    alert("Account created successfully!");
  };

  return (
    <div className="min-h-screen ">
      <header className="bg-white border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/" className="inline-block">
              <img
                src="/logo.png"
                alt="Synapses"
                className="h-15 w-22 mt-2 rounded-full flex-shrink-0"
              />
            </Link>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center p-4 pt-12">
        <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-700 mb-2">
              Create Account
            </h1>
            <p className="text-gray-500">Sign up to get started!</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Office Name"
                    {...register("officeName")}
                    error={errors.officeName?.message}
                    className="pl-10 "
                  />
                </div>
                {errors.officeName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.officeName?.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative text-gray-500">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 " />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    {...register("email")}
                    error={errors.email?.message}
                    className="pl-10"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-500">
              <div>
                <div className="relative ">
                  <PhoneCall className="absolute left-3 top-3.5 h-5 w-5 " />
                  <Input
                    type="tel"
                    placeholder="+288  |  Phone Number"
                    {...register("phoneNumber")}
                    error={errors.phoneNumber?.message}
                    className="pl-10  "
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber?.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative text-gray-500 ">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 pointer-events-none z-10" />
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          error={errors.location?.message}
                          className="pl-10"
                        >
                          <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cairo">Cairo</SelectItem>
                          <SelectItem value="alexandria">Alexandria</SelectItem>
                          <SelectItem value="giza">Giza</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                {errors.location && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.location?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="relative">
                <Controller
                  name="specialists"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger error={errors.specialists?.message}>
                        <SelectValue placeholder="Specialists" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Frontend</SelectItem>
                        <SelectItem value="backend">Backend</SelectItem>
                        <SelectItem value="web-developer">
                          Web Developer
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              {errors.specialists && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.specialists?.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password")}
                    error={errors.password?.message}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <Eye className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password?.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <Eye className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              onClick={handleSubmit(onSubmit)}
              variant="primary"
              className="mt-6  ml-25 w-100"
            >
              Signup
            </Button>
            <div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-2 flex justify-around ">
                <Button type="button" variant="social">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    style={{ fontSize: "20px" }}
                    className="text-primary-500"
                  />
                </Button>
                <Button type="button" variant="social">
                  <FontAwesomeIcon
                    icon={faApple}
                    style={{ fontSize: "20px" }}
                  />
                </Button>
                <Button type="button" variant="social">
                  <FontAwesomeIcon
                    icon={faGoogle}
                    style={{ fontSize: "20px" }}
                    className="text-primary-500 "
                  />
                </Button>
              </div>
            </div>

            <p className="text-center text-gray-500">
              Not a member?{" "}
              <a href="#" className="text-primary-500">
                Login now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
