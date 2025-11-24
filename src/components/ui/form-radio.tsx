import { Controller } from "react-hook-form";
import { Clock } from "lucide-react";

type RadioOption = {
  key: string;
  label: string;
};

type FormRadioProps = {
  name: string;
  control: any;
  items: RadioOption[];
  className?: string;
  direction?: "horizontal" | "vertical";
  helperText?: string;
  label?:string;
};

export const FormRadio = (props: FormRadioProps) => {
  const {
    name,
    control,
    items,
    direction = "horizontal",
    helperText,
    label
  } = props;

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>
      )}
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <div
            className={`flex ${
              direction === "horizontal"
                ? "items-center gap-8"
                : "flex-col gap-3"
            } mb-4`}
          >
            {items.map((item) => (
              <label
                key={item.key}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  value={item.key}
                  checked={field.value === item.key}
                  onChange={() => field.onChange(item.key)}
                  className="w-4 h-4 text-primary-600 cursor-pointer"
                />
                <span className="text-gray-700">{item.label}</span>
              </label>
            ))}
            {helperText && (
              <span className="text-sm text-gray-600">{helperText}</span>
            )}
          </div>
          {fieldState.error && (
            <p className="text-red-500 text-xs mt-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
    </div>
  );
};

type CardOption = {
  key: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  bgColor?: string;
  borderColor?: string;
};

type FormRadioCardProps = {
  name: string;
  control: any;
  items: CardOption[];
  className?: string;
  columns?: 1 | 2 | 3;
  label?:string;
};

export const FormRadioCard = (props: FormRadioCardProps) => {
  const { name, control, items, className, columns = 3,label } = props;

  const gridClass = {
    1: "grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
  }[columns];

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>
      )}
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <div
            className={`grid grid-cols-1 ${gridClass} gap-4 ${className || ""}`}
          >
            {items.map((item) => (
              <label key={item.key} className="cursor-pointer">
                <input
                  type="radio"
                  value={item.key}
                  checked={field.value === item.key}
                  onChange={() => field.onChange(item.key)}
                  className="peer sr-only"
                />
                <div
                  className={`
                    ${item.bgColor || "bg-gray-50"} 
                    border-2 
                    ${item.borderColor || "border-gray-200"} 
                    rounded-xl p-4 
                    peer-checked:bg-primary-100 
                    transition-all
                    hover:border-primary-300
                  `}
                >
                  {item.icon && (
                    <div className="mb-3 text-primary-600">{item.icon}</div>
                  )}
                  <div className="text-primary-600 font-semibold mb-2">
                    {item.title}
                  </div>
                  {item.description && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{item.description}</span>
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
          {fieldState.error && (
            <p className="text-red-500 text-xs mt-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
    </div>
  );
};

export default FormRadio;
