// App.js
import { Box, Typography, Button } from '@mui/material';
import './App.css';
import GeneralForm from './components/GeneralForm';
import FabricsSection from './components/FabricsSection';
import NotionsSection from './components/NotionsSection';
import CategorySection from './components/CategorySection';
import ProfitSection from './components/ProfitSection';
import ResultDisplay from './components/ResultDisplay';
import { categories } from './utils/data';
import useCalculator from './hooks/useCalculator';

export default function App() {
  const {
    metrics,
    notionOptions,
    clothsOptions,
    result,
    resultDetails,
    handleMetricChange,
    handleToggleNotion,
    handleValueNotion,
    handleValueCloth,
    calculateResult,
    handleReset,
    setClothsOptions,
  } = useCalculator();

  return (
    <Box className="kawaii-container">
      <form className="kawaii-form" onSubmit={(e) => e.preventDefault()}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          Calculadora Pink Paradise
        </Typography>

        <GeneralForm metrics={metrics} onMetricChange={handleMetricChange} />

        <FabricsSection
          clothsOptions={clothsOptions}
          onValueChange={handleValueCloth}
          setClothsOptions={setClothsOptions}
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

        <ResultDisplay result={result} details={resultDetails} />
      </form>
    </Box>
  );
}