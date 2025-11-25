import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { User, X } from "lucide-react";
import FormInput from "../components/ui/form-input";
import FormSelect from "../components/ui/form-select";
import FormRadio, { FormRadioCard } from "../components/ui/form-radio";
import { useState } from "react";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  middleName: yup.string().required("Middle name is required"),
  lastName: yup.string().required("Last name is required"),
  socialSecurityNumber: yup
    .string()
    .required("Social Security Number is required")
    .matches(
      /^\d{3}-\d{2}-\d{4}$/,
      "Social security number must be in format XXX-XX-XXXX"
    ),
  dateOfBirth: yup.string().required("Date of birth is required"),
  dodId: yup
    .string()
    .required("DoD ID Number is required")
    .matches(/^\d{0,9}$/, "DoD ID must be 8-10 digits"),
  vaFileNumber: yup
    .string()
    .required("VA File Number is required")
    .matches(
      /^C\d{0,9}$/,
      "VA File Number must start with C followed by 7-9 digits"
    ),
  militaryBranch: yup.string().required("Military branch is required"),
  hasMedicalRecords: yup.string().required("Please select an option"),
  recordsOption: yup.string().when("hasMedicalRecords", {
    is: "no",
    then: (schema) =>
      schema.required("Please select a records retrieval option"),
    otherwise: (schema) => schema.notRequired(),
  }),

  age: yup.string().required("Age is required"),
  creditCardNumber: yup.string().when("age", {
    is: (age: string) => {
      if (!age) return false;
      const birthDate = new Date(age);
      const today = new Date();
      const calculatedAge =
        today.getFullYear() -
        birthDate.getFullYear() -
        (today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
          today.getDate() < birthDate.getDate())
          ? 1
          : 0);
      return calculatedAge >= 18;
    },
    then: (schema) =>
      schema
        .required("Credit card number is required")
        .matches(/^\d{16}$/, "Credit card number must be 16 digits"),
    otherwise: (schema) => schema.notRequired(),
  }),
  creditCardExpiry: yup.string().when("age", {
    is: (age: string) => {
      if (!age) return false;
      const birthDate = new Date(age);
      const today = new Date();
      const calculatedAge = today.getFullYear() - birthDate.getFullYear();
      return calculatedAge >= 18;
    },
    then: (schema) =>
      schema
        .required("Expiry date is required")
        .matches(
          /^(0[1-9]|1[0-2])\/\d{2}$/,
          "Expiry date must be in MM/YY format"
        ),
    otherwise: (schema) => schema.notRequired(),
  }),
  creditCardCVV: yup.string().when("age", {
    is: (age: string) => {
      if (!age) return false;
      const birthDate = new Date(age);
      const today = new Date();
      const calculatedAge = today.getFullYear() - birthDate.getFullYear();
      return calculatedAge >= 18;
    },
    then: (schema) =>
      schema
        .required("CVV is required")
        .matches(/^\d{3}$/, "CVV must be 3 digits"),
    otherwise: (schema) => schema.notRequired(),
  }),

  idImage: yup.mixed().when("age", {
    is: (age: string) => {
      if (!age) return false;
      const birthDate = new Date(age);
      const today = new Date();
      const calculatedAge = today.getFullYear() - birthDate.getFullYear();
      return calculatedAge >= 18;
    },
    then: (schema) => schema.required("ID image is required for users +18"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export default function VeteranRegistrationForm() {
  const { control, handleSubmit, watch, trigger } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      socialSecurityNumber: "",
      dateOfBirth: "",
      dodId: "",
      vaFileNumber: "",
      militaryBranch: "",
      hasMedicalRecords: "",
      recordsOption: "",
      age: undefined,
      creditCardNumber: "",
      creditCardExpiry: "",
      creditCardCVV: "",
      idImage: undefined,
    },
    mode: "onChange",
  });

  const hasMedicalRecords = watch("hasMedicalRecords");

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully! Check console for data.");
  };

  const militaryBranches = [
    { key: "army", label: "Army" },
    { key: "marinecorps", label: "Marine Corps" },
    { key: "navy", label: "Navy" },
    { key: "airforce", label: "Air Force" },
    { key: "coastguard", label: "Coast Guard" },
    { key: "spaceforce", label: "Space Force" },
  ];

  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = async () => {
    const isValid = await trigger([
      "firstName",
      "middleName",
      "lastName",
      "socialSecurityNumber",
      "dateOfBirth",
    ]);

    if (isValid) {
      setCurrentStep(2);
    }
  };

  const age = watch("age");

  const isAdult = () => {
    if (!age) return false;
    const birthDate = new Date(age);
    const today = new Date();
    const calculatedAge = today.getFullYear() - birthDate.getFullYear();
    return calculatedAge >= 18;
  };

  const [imageView, setImageView] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageView(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageView(null);

  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Registration Form
        </h1>

        <div className="space-y-6">
          {currentStep === 1 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormInput
                  label="Frist Name"
                  name="firstName"
                  control={control}
                  placeholder="Username"
                  beforeIcon={
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  }
                  className="pl-10"
                />
                <FormInput
                  label="Middle Name"
                  name="middleName"
                  control={control}
                  placeholder="Username"
                  beforeIcon={
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  }
                  className="pl-10"
                />
                <FormInput
                  label="Last Name"
                  name="lastName"
                  control={control}
                  placeholder="Username"
                  beforeIcon={
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  }
                  className="pl-10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Social Security Number"
                  name="socialSecurityNumber"
                  control={control}
                  placeholder="456-67-9997"
                />
                <FormInput
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  control={control}
                  placeholder="Username"
                  className=" flex justify-between"
                />
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="DoD ID Number"
                  name="dodId"
                  type="number"
                  control={control}
                  placeholder="12345690"
                />

                <FormInput
                  label="VA File Number"
                  name="vaFileNumber"
                  control={control}
                  placeholder="C1234567"
                />
              </div>
              <FormInput
                label="Age"
                name="age"
                type="date"
                control={control}
                placeholder="Enter your age"
              />
              {isAdult() && (
                <>
                  <div className="border-t pt-6 mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Payment Information (+18 Required)
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                        label="Credit Card Number"
                        name="creditCardNumber"
                        control={control}
                        placeholder="1234567890123456"
                        maxLength={16}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormInput
                          label="Expiry Date"
                          name="creditCardExpiry"
                          control={control}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                        <FormInput
                          label="CVV"
                          name="creditCardCVV"
                          control={control}
                          placeholder="123"
                          maxLength={3}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <FormInput
                        label="Upload ID Image (JPEG or PNG)"
                        name="idImage"
                        type="file"
                        control={control}
                        accept="jpeg,png"
                        onChange={handleImageChange}
                      />

                      {imageView && (
                        <div className="mt-4 border rounded-lg p-4 bg-gray-50 relative">
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X className="h-5 w-5" />
                          </button>
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            ID Image View:
                          </p>
                          <img
                            src={imageView}
                            alt="ID View"
                            className="max-w-full h-auto max-h-64 rounded-lg shadow-sm"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              <FormSelect
                label=" Military Branch"
                name="militaryBranch"
                control={control}
                placeholder="Select"
                items={militaryBranches}
              />

              <FormRadio
                label="Do you have your medical records"
                name="hasMedicalRecords"
                control={control}
                items={[
                  { key: "yes", label: "Yes" },
                  { key: "no", label: "No" },
                ]}
                direction="horizontal"
                helperText="*We'll contact the appropriate medical providers and retrieve your documents securely&"
              />

              {hasMedicalRecords === "no" && (
                <div>
                  <FormRadioCard
                    name="recordsOption"
                    control={control}
                    items={[
                      {
                        key: "lawfirm",
                        title: "Get Records via Our Law Firm",
                        description: "Estimated Time: 30 days",
                        bgColor: "bg-gray-50",
                        borderColor: "border-primary-100",
                      },
                      {
                        key: "foia",
                        title: "Request Free Records via FOIA Website",
                        description: "Estimated Time: 9-12 months",
                        bgColor: "bg-gray-50",
                        borderColor: "border-gray-200",
                      },
                    ]}
                    columns={3}
                  />
                </div>
              )}
            </>
          )}
          <div className="pt-4  flex justify-end">
            {currentStep === 2 && (
              <button
                onClick={() => setCurrentStep(1)}
                type="button"
                className=" mr-4 w-32 bg-primary-200 text-white rounded-xl py-3 font-semibold hover:bg-primary-700 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={currentStep == 1 ? handleNext : handleSubmit(onSubmit)}
              type={currentStep === 1 ? "button" : "submit"}
              className="w-32 bg-primary-600 text-white rounded-xl py-3 font-semibold hover:bg-primary-700 transition-colors"
            >
              {currentStep === 1 ? "Next" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
