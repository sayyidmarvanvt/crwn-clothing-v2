import { FC, InputHTMLAttributes } from "react";
import { FormInputLabel, Input, Group } from "./form-input.styles";

type FormInputProps = {
  label: string;
  id: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, id, ...otherProps }) => {
  return (
    <Group>
      <Input id={id} {...otherProps} />
      <FormInputLabel
        htmlFor={id}
        $shrink={Boolean(
          otherProps.value &&
            otherProps.value === "string" &&
            otherProps.value.length
        )}
      >
        {label}
      </FormInputLabel>
    </Group>
  );
};

export default FormInput;
