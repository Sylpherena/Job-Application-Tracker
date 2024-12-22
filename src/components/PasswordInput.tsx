import { Eye, EyeClosed, KeyRound, LucideIcon } from "lucide-react";
import React, { useState } from "react";
import Input, { InputProps } from "./Input";

export interface PasswordInputProps extends InputProps {
  className?: string;
  label?: string;
  Icon?: LucideIcon;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (props: PasswordInputProps, ref) => {
    const { placeholder = "Password", Icon, ...rest } = props;

    const [isPasswordShown, setPasswordShown] = useState<boolean>(false);

    const handleShowPassword = (
      e: React.MouseEvent<HTMLInputElement, MouseEvent>
    ) => {
      e.stopPropagation();
      setPasswordShown((prev) => !prev);
    };

    return (
      <Input
        Icon={Icon ?? KeyRound}
        placeholder={placeholder}
        type={isPasswordShown ? "text" : "password"}
        endSlot={
          <label className="swap swap-rotate z-20">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" onClick={(e) => handleShowPassword(e)} />
            <div className="swap-off">
              <EyeClosed />
            </div>
            <div className="swap-on">
              <Eye />
            </div>
          </label>
        }
        ref={ref}
        {...rest}
      />
    );
  }
);

export default PasswordInput;
