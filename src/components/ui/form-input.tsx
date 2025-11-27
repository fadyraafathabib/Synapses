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
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
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
    onChange,
    onKeyPress
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
        const {value, ...remining}= field;
        return (
          <div className="w-full">
            <div className="relative">
              {beforeIcon}
              {type === "file" ? (
                <Input
                  type="file"
                  className={className}
                  maxLength={maxLength}
                  accept={accept}
                  {...remining}
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0]);
                    if (onChange) {
                      onChange(e);
                    }
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              ) : (
                <Input
                  type={type || "text"}
                  placeholder={placeholder}
                  error={error?.message}
                  className={className}
                  maxLength={maxLength}
                  accept={accept}
                  onKeyPress={onKeyPress} 
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    if (onChange) {
                      onChange(e);
                    }
                  }}
                />
              )}
            </div>
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