import { OutlinedInput, InputLabel, InputAdornment, Box, FormControl } from '@mui/material';

export default function ProfitSection({ metrics, onMetricChange }) {
  return (
<fieldset className="section-lucro">
      <legend>Extra</legend>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl variant="outlined" margin="dense">
          <InputLabel htmlFor="profit-input">Lucro</InputLabel>
          <OutlinedInput
            id="profit-input"
            name="profit"
            value={metrics.profit}
            onChange={onMetricChange}
            placeholder="0"
            label="Lucro"
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
          />
        </FormControl>
        <FormControl variant="outlined" margin="dense">
          <InputLabel htmlFor="discont-input">Desconto</InputLabel>
          <OutlinedInput
            id="discont-input"
            name="discont"
            value={metrics.discont}
            onChange={onMetricChange}
            placeholder="0"
            label="Desconto"
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
          />
        </FormControl>
      </Box>
    </fieldset>
  );
}