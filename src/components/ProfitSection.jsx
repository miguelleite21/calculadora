// components/ProfitSection.js
import { OutlinedInput, InputLabel, InputAdornment } from '@mui/material';

export default function ProfitSection({ metrics, onMetricChange }) {
  return (
    <fieldset className="section-lucro">
      <legend>Extra</legend>
      <InputLabel htmlFor="profit-input">Lucro:</InputLabel>
      <OutlinedInput
        id="profit-input"
        name="profit"
        value={metrics.profit}
        onChange={onMetricChange}
        placeholder="0"
        margin="dense"
        endAdornment={<InputAdornment position="end">%</InputAdornment>}
      />
    </fieldset>
  );
}