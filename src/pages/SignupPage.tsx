import React from "react";
import { User, Mail, MapPin, Lock, PhoneCall } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "@tanstack/react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faApple,
  faFacebook,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "../components/ui/form-input";
import FormSelect from "../components/ui/form-select";

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


  const { handleSubmit, control } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted successfully:", data);
    alert("Account created successfully!");
  };

  const locations = [
    { key: "cairo", label: "Cairo" },
    { key: "alexandria", label: "Alexandria" },
    { key: "giza", label: "Giza" },
  ];

  const Specialists = [
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" },
    { key: "web-developer", label: "Web Developer" },
  ];

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
              <FormInput
                beforeIcon={
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                }
                name="officeName"
                control={control}
                placeholder="Office Name"
                className="pl-10"
              />

              <FormInput
                beforeIcon={
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                }
                name="email"
                type="email"
                control={control}
                placeholder="Email"
                className="pl-10"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-500">
              <FormInput
                beforeIcon={
                  <PhoneCall className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                }
                name="phoneNumber"
                control={control}
                placeholder=" +288 | Phone Number"
                className="pl-10"
              />

              <FormSelect
                items={locations}
                beforeIcon={
                  <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                }
                name="location"
                control={control}
                placeholder="Location"
                className="pl-10"
              />
            </div>

            <FormSelect
              items={Specialists}
              name="specialists"
              control={control}
              placeholder="Specialists"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
                <FormInput
                  beforeIcon={
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  }
                  name="password"
                  control={control}
                  type={ "password"}
                  placeholder="Password"
                  className="pl-10 pr-10"
                />

                <FormInput
                  beforeIcon={
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  }
                  name="confirmPassword"
                  control={control}
                  type={"password"}
                  placeholder="Confirm Password"
                  className="pl-10 pr-10"
                />
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
