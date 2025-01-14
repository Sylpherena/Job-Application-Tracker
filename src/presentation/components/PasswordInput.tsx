import { Eye, EyeClosed, KeyRound, LucideIcon } from "lucide-react";
import React, { useState } from "react";
import clsx from "clsx";
import Input, { InputProps } from "./Input";

export interface PasswordInputProps extends InputProps {
  className?: string;
  label?: string;
  Icon?: LucideIcon;
  hideIcon?: boolean;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (props: PasswordInputProps, ref) => {
    const { placeholder = "Password", Icon, hideIcon = false, ...rest } = props;

    const [isPasswordShown, setPasswordShown] = useState<boolean>(false);

    const handleShowPassword = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      e.stopPropagation();
      setPasswordShown((prev) => !prev);
    };

    const getIconToRender = () => {
      if (hideIcon) {
        return undefined;
      } else {
        return Icon ?? KeyRound;
      }
    };

    return (
      <Input
        Icon={getIconToRender()}
        placeholder={placeholder}
        type={isPasswordShown ? "text" : "password"}
        endSlot={
          <div
            aria-label="Show password"
            className={clsx("swap swap-rotate z-20", [
              { "swap-active": isPasswordShown },
            ])}
            onClick={(e) => handleShowPassword(e)}
          >
            <div className="swap-off">
              <EyeClosed />
            </div>
            <div className="swap-on">
              <Eye />
            </div>
          </div>
        }
        ref={ref}
        {...rest}
      />
    );
  }
);

export default PasswordInput;
