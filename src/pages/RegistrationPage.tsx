import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { User } from "lucide-react";
import FormInput from "../components/ui/form-input";
import FormSelect from "../components/ui/form-select";
import FormRadio, { FormRadioCard } from "../components/ui/form-radio";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  middleName: yup.string().required("First name is required"),
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
    const {
      control,
      handleSubmit,
      watch,
    } = useForm({
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Registration Form
        </h1>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <FormInput
                name="firstName"
                control={control}
                placeholder="Username"
                beforeIcon={
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                }
                className="pl-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Middle Name
              </label>
              <FormInput
                name="middleName"
                control={control}
                placeholder="Username"
                beforeIcon={
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                }
                className="pl-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <FormInput
                name="lastName"
                control={control}
                placeholder="Username"
                beforeIcon={
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                }
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Social Security Number
              </label>
              <FormInput
                name="socialSecurityNumber"
                control={control}
                placeholder="456-67-9997"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <FormInput
                name="dateOfBirth"
                type="date"
                control={control}
                placeholder="Username"
                className=" flex justify-between"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                DoD ID Number
              </label>
              <FormInput
                name="dodId"
                control={control}
                placeholder="12345690"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                VA File Number
              </label>
              <FormInput
                name="vaFileNumber"
                control={control}
                placeholder="C1234567"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Military Branch
            </label>
            <FormSelect
              name="militaryBranch"
              control={control}
              placeholder="Select"
              items={militaryBranches}
            />
          </div>

          <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                Do you have your medical records
                </label>
                
                <FormRadio
                name="hasMedicalRecords"
                control={control}
                items={[
                    { key: 'yes', label: 'Yes' },
                    { key: 'no', label: 'No' }
                ]}
                direction="horizontal"
                helperText="*We'll contact the appropriate medical providers and retrieve your documents securely&"
                />
            </div>

            {hasMedicalRecords === 'no' && (
                <div>
                <FormRadioCard
                    name="recordsOption"
                    control={control}
                    items={[
                    {
                        key: 'lawfirm',
                        title: 'Get Records via Our Law Firm',
                        description: 'Estimated Time: 30 days',
                        bgColor: 'bg-primary-50',
                        borderColor: 'border-primary-100'
                    },
                    {
                        key: 'foia',
                        title: 'Request Free Records via FOIA Website',
                        description: 'Estimated Time: 9-12 months',
                        bgColor: 'bg-gray-50',
                        borderColor: 'border-gray-200'
                    }
                    ]}
                    columns={3}
                />
                </div>
            )}
          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSubmit(onSubmit)}
              className=" w-25 bg-primary-600 text-white rounded-xl py-3 font-semibold hover:bg-primary-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
