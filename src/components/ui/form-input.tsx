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
  label?: string;
  maxLength?: number;
  accept?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};


const FormInput = (props: FormInputProps) => {
  const {
    beforeIcon,
    name,
    type,
    control,
    placeholder,
    className,
    label,
    maxLength,
    accept,
    onChange
  } = props;
  return (
    <div>
      {label && (<label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>)}
    
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
              maxLength={maxLength}
              accept={accept}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                if (onChange) {
                  onChange(e);
                }
              }}
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">{error.message}</p>
            )}
          </div>
        );
      }}
    />
    </div>
  );
};
export default FormInput;