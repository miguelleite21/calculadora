import { OutlinedInput, InputLabel, Select, MenuItem } from '@mui/material';
export default function GeneralForm({ metrics, onMetricChange, pieceName, onPieceNameChange, quantity, onQuantityChange, selectedPreset, onPresetChange, presets}) {
  return (
    <fieldset className="section-geral">
      <legend>Geral</legend>
      <InputLabel htmlFor="preset-select">Selecione uma Peça Pré-definida:</InputLabel>
      <Select
        id="preset-select"
        value={selectedPreset}
        onChange={onPresetChange}
        fullWidth
        className="full-Imputs"
        sx={{ mb: 2 }}
      >
        {presets.map(preset => (
          <MenuItem key={preset.key} value={preset.key}>
            {preset.name}
          </MenuItem>
        ))}
      </Select>
      <InputLabel htmlFor="piece-name">Nome da Peça:</InputLabel>
      <OutlinedInput
        id="piece-name"
        value={pieceName}
        onChange={onPieceNameChange}
        placeholder="Nome"
        margin="dense"
        className="full-Imputs"
      />
      <InputLabel htmlFor="quantity-input">Quantidade:</InputLabel>
      <OutlinedInput
        id="quantity-input"
        value={quantity}
        onChange={onQuantityChange}
        placeholder="1"
        margin="dense"
        className="full-Imputs"
      />
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