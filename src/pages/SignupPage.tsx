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

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    officeName: "",
    email: "",
    phoneNumber: "",
    location: "",
    specialists: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d{9,15}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.officeName.trim()) {
      newErrors.officeName = "Office name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number (9-15 digits)";
    }

    if (!formData.location) {
      newErrors.location = "Please select a location";
    }

    if (!formData.specialists) {
      newErrors.specialists = "Please select specialist type";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully:", formData);
      alert("Account created successfully!");
    }
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
                    name="officeName"
                    placeholder="Office Name"
                    value={formData.officeName}
                    onChange={handleChange}
                    error={errors.officeName}
                    className="pl-10 text-gray-500"
                  />
                </div>
                {errors.officeName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.officeName}
                  </p>
                )}
              </div>

              <div>
                <div className="relative text-gray-500">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 " />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    className="pl-10"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-500">
              <div>
                <div className="relative ">
                  <PhoneCall className="absolute left-3 top-3.5 h-5 w-5 " />
                  <Input
                    type="tel"
                    name="phoneNumber"
                    placeholder="+288  |  Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    error={errors.phoneNumber}
                    className="pl-10  "
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div>
                <div className="relative text-gray-500 ">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 pointer-events-none z-10" />
                  <Select
                    value={formData.location}
                    onValueChange={(value) =>
                      handleSelectChange("location", value)
                    }
                  >
                    <SelectTrigger error={errors.location} className="pl-10">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cairo">Cairo</SelectItem>
                      <SelectItem value="alexandria">Alexandria</SelectItem>
                      <SelectItem value="giza">Giza</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {errors.location && (
                  <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                )}
              </div>
            </div>

            <div>
              <div className="relative">
                <Select
                  value={formData.specialists}
                  onValueChange={(value) =>
                    handleSelectChange("specialists", value)
                  }
                >
                  <SelectTrigger error={errors.specialists}>
                    <SelectValue placeholder="Specialists" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="web-developer">Web Developer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {errors.specialists && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.specialists}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
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
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
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
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <Button
              onClick={handleSubmit}
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
