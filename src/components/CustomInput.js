import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";

const CustomInput = ({
  label,
  required = false,
  value,
  onChange,
  type = "text",
  placeholder,
  icon = null,
  sx = {},
}) => {
  return (
    <FormControl sx={{ width: "350px", marginTop: "15px" }}>
      <FormLabel
        sx={{
          color: "#000000",
          fontFamily: "Gill Sans, sans-serif",
          fontSize: "14px",
          fontWeight: "550",
        }}
      >
        {label} {required && <span className="text-red-600">*</span>}
      </FormLabel>

      <Input
        required={required}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        startDecorator={icon}
        slotProps={{
          root: {
            sx: {
              background: "linear-gradient(to right, #ffffff, #F2F2F2)",
              fontSize: "13px",
              color: "#000000",
              borderRadius: "10px",
              padding: "10px",
              fontFamily: "Gill Sans, sans-serif",

              "&:hover": {
                border: "1px solid gray",
                borderRadius: "9px",
              },

              "&.Mui-focused": {
                "--Input-focusedHighlight": "#000000",
                "--Input-focusedThickness": "0.5px",
                boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.4)",
                borderRadius: "9px",
              },

              ...sx,
            },
          },
        }}
      />
    </FormControl>
  );
};

export default CustomInput;
