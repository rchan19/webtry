import { Container, InputAdornment, TextField, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type SearchBarProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const { palette } = useTheme();
  return (
    <Container maxWidth="md" sx={{ mt: 2, mb: 5 }}>
      <TextField
        id="search"
        type="search"
        label="Filter by User Id"
        value={value}
        onChange={onChange}
        sx={{
          width: 600,
          "& label": {
            color: palette.primary[100], // Color of the label (when not focused)
          },
          "& label.Mui-focused": {
            color: palette.primary[100], // Color of the label when focused
          },
          "& .MuiInputBase-input": {
            color: palette.primary[100], // Color of the input text
          },
          "& .MuiInputBase-input::placeholder": {
            color: palette.primary[100], // Color of the placeholder text
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: palette.primary[100], // Border color
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: palette.primary[100], // Hover state border color
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon sx={{ color: palette.primary[100] }} />
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
}
