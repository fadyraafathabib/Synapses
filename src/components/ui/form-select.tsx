import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type FormSelectProps = {
  beforeIcon?: React.ReactNode;
  name: string;
  control: any;
  placeholder?: string;
  className?: string;
  items: { key: string; label: string }[];
};

const FormSelect = (props: FormSelectProps) => {
  const { beforeIcon, name, control, placeholder, className, items } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { error } = fieldState;
        return (
          <div>
            <div className="relative text-gray-500">
              {beforeIcon}
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger error={error?.message} className={className}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {items.map((item) => (
                    <SelectItem key={item.key} value={item.key}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {error && (
              <p className="text-red-500 text-xs mt-1">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default FormSelect;
