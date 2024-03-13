import { TIIButtonInstance } from "../../props";
import { Button, ButtonProps } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Link } from "react-router-dom";
import { LinkProps } from "react-router-dom";

export const TIIButton = forwardRef<TIIButtonInstance, ButtonProps>(
  (props, ref) => {
    const [loading, setLoading] = useState<boolean>(false);
    useImperativeHandle(ref, () => ({
      setLoading,
    }));
    return (
      <Button
        {...props}
        loading={loading || props.loading}
        style={{ ...props.style, borderRadius: "4px" }}
      >
        {props.children}
      </Button>
    );
  }
);

export const TIILink = (
  props: LinkProps & React.RefAttributes<HTMLAnchorElement>
) => {
  return <Link {...props} style={{ borderBottom: "1px solid #2094E8" }} />;
};
