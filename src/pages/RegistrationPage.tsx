import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { User } from "lucide-react";
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
    },
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

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleNext}
                  type="button"
                  className="w-32 bg-primary-600 text-white rounded-xl py-3 font-semibold hover:bg-primary-700 transition-colors"
                >
                  Next
                </button>
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
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleSubmit(onSubmit)}
                  type="button"
                  className="w-32 bg-primary-600 text-white rounded-xl py-3 font-semibold hover:bg-primary-700 transition-colors"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
