// components/GeneralForm.js
import { OutlinedInput, InputLabel } from '@mui/material';

export default function GeneralForm({ metrics, onMetricChange }) {
  return (
    <fieldset className="section-geral">
      <legend>Geral</legend>
      <InputLabel htmlFor="pattern-input">Modelagem:</InputLabel>
      <OutlinedInput
        id="pattern-input"
        name="pattern"
        value={metrics.pattern}
        onChange={onMetricChange}
        placeholder="0"
        margin="dense"
        className="full-Imputs"
      />
      <InputLabel htmlFor="sewing-input">Costura:</InputLabel>
      <OutlinedInput
        id="sewing-input"
        name="sewing"
        value={metrics.sewing}
        onChange={onMetricChange}
        placeholder="0"
        margin="dense"
        className="full-Imputs"
      />
    </fieldset>
  );
}