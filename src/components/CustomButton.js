import Button from "@mui/material/Button";

const CustomButton = ({
  children,
  sx = {},
  variant = "contained",
  ...props
}) => {
  return (
    <Button
      variant={variant}
      sx={{
        backgroundColor: "#000000",
        color: "#ffffff",
        padding: "8px 10px 8px 10px",
        width: "fitcontent",
        textTransform: "none",
        fontSize: "15px",
        fontWeight: "bold",
        borderRadius: "8px",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
