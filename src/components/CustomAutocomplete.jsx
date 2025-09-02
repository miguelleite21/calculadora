import { Autocomplete, TextField, Paper } from '@mui/material';

export default function CustomAutocomplete({
  options,
  value,
  onChange,
  multiple = false,
  label,
  placeholder,
  getOptionLabel,
  renderTags,
}) {
  return (
    <Autocomplete
      fullWidth
      multiple={multiple}
      options={options}
      disableCloseOnSelect={multiple}
      disablePortal
      getOptionLabel={getOptionLabel}
      value={value}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label={label}
          placeholder={placeholder}
          className="full-Imputs"
          InputLabelProps={{
            sx: {
              color: '#D83082',
              '&.Mui-focused': {
                color: '#D83082',
              },
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#EF8DAA',
            },
          }}
        />
      )}
      PopperProps={{
        sx: {
          width: '100% !important',
          overflowX: 'hidden',
        },
      }}
      PaperComponent={(props) => <Paper {...props} />}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          boxSizing: 'border-box',
          bgcolor: '#ffe2f1',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        },
      }}
      ListboxProps={{
        sx: {
          maxHeight: 200,
          overflowY: 'auto',
          '& .MuiAutocomplete-option': {
            color: '#F7C0D0',
            '&.Mui-focused': {
              bgcolor: '#D83082',
              color: '#fff',
            },
          },
        },
      }}
      renderTags={renderTags}
    />
  );
}