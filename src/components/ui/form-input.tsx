import { Input } from "./input";
import { Controller } from "react-hook-form";

type FormInputProps = {
    beforeIcon?: React.ReactNode;
    name: string;
    type?: string;
    control: any;
    placeholder?: string;
    error?: string;
    className?: string;
}


const FormInput = (props: FormInputProps) => {
  const { beforeIcon, name, type, control, placeholder, className } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { error } = fieldState;
        return (
          <div className="relative">
            {beforeIcon}
            <Input
              type={type || "text"}
              placeholder={placeholder}
              error={error?.message}
              className={className}
                {...field}
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};
export default FormInput;