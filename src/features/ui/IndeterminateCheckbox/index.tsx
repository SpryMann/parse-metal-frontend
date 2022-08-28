import React from "react";

const IndeterminateCheckbox = ({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate: boolean } & React.HTMLProps<HTMLInputElement>) => {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className}
      style={{ cursor: "pointer" }}
      {...rest}
    />
  );
};

export default IndeterminateCheckbox;
