import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import FormInput from "../components/ui/form-input";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const phoneNumberSchema = yup.object().shape({
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
  const { control, handleSubmit } = useForm<PhoneNumberFormData>({
    defaultValues: {
      phoneNumbers: [{ number: "" }],
    },
    resolver: yupResolver(phoneNumberSchema),
  });

  const { fields, append } = useFieldArray({
    control,
    name: "phoneNumbers",
  });

  const onSubmit = (data: PhoneNumberFormData) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully! Check console for data.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow p-8">
        <h2 className="text-2xl font-bold text-gray-500 mb-6">
          Add Phone Numbers
        </h2>

        <form className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-2">
                <div className="flex-1">
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
