import { useState } from 'react';
import { Box, Button } from '@mui/material';
import './App.css';
import GeneralForm from './components/GeneralForm';
import FabricsSection from './components/FabricsSection';
import NotionsSection from './components/NotionsSection';
import CategorySection from './components/CategorySection';
import ProfitSection from './components/ProfitSection';
import ResultDisplay from './components/ResultDisplay';
import { categories } from './utils/data';
import useCalculator from './hooks/useCalculator';
import PinkParadiseImg from './assets/pnkParadise.png';

export default function App() {
  const [customFabrics, setCustomFabrics] = useState([]);
  
  const {
    metrics,
    notionOptions,
    clothsOptions,
    pieceName,
    quantity,
    result,
    resultDetails,
    pieces,
    presets,
    selectedPreset,
    handleMetricChange,
    handlePieceNameChange,
    handleQuantityChange,
    handleToggleNotion,
    handleValueNotion,
    handleValueCloth,
    calculateResult,
    handleReset,
    addPiece,
    setClothsOptions,
    handlePresetChange,
  } = useCalculator(customFabrics);

  return (
    <Box className="kawaii-container">
      <form className="kawaii-form" onSubmit={(e) => e.preventDefault()}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Box
            component="img"
            src={PinkParadiseImg}
            alt="Pink Paradise Ateliê"
            sx={{ width: "65%", height: 'auto' }} 
          />
        </Box>

        <GeneralForm
          metrics={metrics}
          onMetricChange={handleMetricChange}
          pieceName={pieceName}
          onPieceNameChange={handlePieceNameChange}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          selectedPreset={selectedPreset}
          onPresetChange={handlePresetChange}
          presets={presets}
        />

        <FabricsSection
          clothsOptions={clothsOptions}
          onValueChange={handleValueCloth}
          setClothsOptions={setClothsOptions}
          customFabrics={customFabrics}
          setCustomFabrics={setCustomFabrics}
        />

        <NotionsSection
          notionOptions={notionOptions}
          onToggle={handleToggleNotion}
          onValueChange={handleValueNotion}
        />

        {categories.map((cat) => (
          <CategorySection
            key={cat.key}
            category={cat}
            notionOptions={notionOptions}
            onToggle={handleToggleNotion}
            onValueChange={handleValueNotion}
          />
        ))}

        <ProfitSection metrics={metrics} onMetricChange={handleMetricChange} />

        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button onClick={calculateResult} sx={{ flex: 2 }} className="calc">
            Calcular
          </Button>
          <Button
            className="reset"
            variant="outlined"
            color="secondary"
            onClick={handleReset}
            sx={{ flex: 1 }}
          >
            Limpar
          </Button>
        </Box>

        <ResultDisplay
          result={result}
          details={resultDetails}
          addPiece={addPiece}
          pieces={pieces}
          handleReset={handleReset}
          customFabrics={customFabrics}
        />
      </form>
    </Box>
  );
}