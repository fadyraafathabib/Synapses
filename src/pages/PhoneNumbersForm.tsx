import { Plus, Trash2, User } from "lucide-react";
import { Button } from "../components/ui/button";
import FormInput from "../components/ui/form-input";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useEffect } from "react";

const phoneNumberSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  middleName: yup.string().required("Middle name is required"),
  phoneNumbers: yup
    .array()
    .of(
      yup.object().shape({
        number: yup
          .string()
          .required("Phone number is required")
          .matches(/^[0-9+\-\d()]+$/, "Invalid phone number format")
          .min(11, "Phone number must be at least 11 characters")

          .test(
            "has-enough-digits",
            "Phone number must contain at least 11 digits",
            (value) => {
              if (!value) return false;
              const digits = value.replace(/\D/g, "");
              return digits.length >= 11;
            }
          ),
      })
    )
    .required("Phone numbers are required")
    .min(1, "At least one phone number is required"),
});

type PhoneNumberFormData = yup.InferType<typeof phoneNumberSchema>;

export default function PhoneNumbersForm() {
  const { control, handleSubmit, reset, watch } = useForm<PhoneNumberFormData>({
    defaultValues: {
      phoneNumbers: [{ number: "" }],
      firstName: "",
      middleName: "",
    },
    resolver: yupResolver(phoneNumberSchema),
    mode: "onChange",
  });

  const { fields, append, remove  } = useFieldArray({
    control,
    name: "phoneNumbers",
  });

  const onSubmit = (data: PhoneNumberFormData) => {
    console.log("Form submitted:", data);

    const savedRecords = JSON.parse(
      localStorage.getItem("phoneNumbersData") || "[]"
    );
    const updatedRecords = [...savedRecords, data];
    localStorage.setItem("phoneNumbersData", JSON.stringify(updatedRecords));

    localStorage.removeItem("currentFormData");
    alert("Form submitted successfully! Check console for data.");
    reset({
      phoneNumbers: [{ number: "" }],
      firstName: "",
      middleName: "",
    });
  };

    const formValues = watch();


  useEffect(() => {
    const storedData = localStorage.getItem("currentFormData");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        reset({
          firstName: parsed.firstName || "",
          middleName: parsed.middleName || "",
          phoneNumbers:
            parsed.phoneNumbers && parsed.phoneNumbers.length > 0
              ? parsed.phoneNumbers
              : [{ number: "" }],
        });
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
      }
    }
  }, [reset]);

  useEffect(() => {
    const hasData =
      formValues.firstName ||
      formValues.middleName ||
      (formValues.phoneNumbers &&
        formValues.phoneNumbers.some((p) => p.number));

    if (hasData) {
      localStorage.setItem("currentFormData", JSON.stringify(formValues));
    }
  }, [formValues]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-500 mb-6">
          Add Phone Numbers
        </h2>

        <form className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-6">
              <div className="flex gap-2">
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
                    name={`phoneNumbers.${index}.number`}
                    control={control}
                    type="tel"
                    placeholder="Enter phone number"
                    label={`Phone Number ${index + 1}`}
                    inputMode="tel"
                    maxLength={13}
                    onKeyDown={(e) => {
                      if (
                        !/^[0-9+\-\d()]+$/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Tab"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="default"
                    onClick={() => remove(index)}
                    className="flex-shrink-0 text-red-600 mt-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="default"
            onClick={() => append({ number: "" })}
            className="w-full mt-4 text-blue-600 border-blue-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Phone Number
          </Button>

          <Button
            type="button"
            variant="default"
            size="lg"
            onClick={handleSubmit(onSubmit)}
            className="w-full mt-6 bg-primary-600 text-white rounded-xl py-3 font-semibold "
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
