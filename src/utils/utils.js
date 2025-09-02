export const rawNotions = [
  { name: "Botão 1mm nº16", key: "botao_10mm", parent: "Botão", value: 0.1, unit: "und" },
  { name: "Botão de pressão nº10", key: "botao_pressao", parent: "Botão", value: 0.2, unit: "und" },
  { name: "Agulha máquina reta", key: "agulha_maquina_reta", parent: "Agulha", value: 1.0, unit: "und" },
  { name: "Agulha overlock", key: "agulha_overlock", parent: "Agulha", value: 2.0, unit: "und" },
  { name: "Elástico 8mm", key: "elastico_8mm", parent:"Elástico", value: 0.8, unit: "m" },
  { name: "Elástico 15mm", key: "elastico_15mm", parent:"Elástico", value: 0.5, unit: "m" },
  { name: "Elástico preto 19mm", key: "elastico_19mm", parent:"Elástico", value: 1.3, unit: "m" },
  { name: "Elástico preto 20mm", key: "elastico_20mm", parent:"Elástico", value: 0.6, unit: "m" },
  { name: "Elástico preto 23mm", key: "elastico_23mm", parent:"Elástico", value: 1.6, unit: "m" },
  { name: "Elástico preto 35mm", key: "elastico_35mm", parent:"Elástico", value: 0.8, unit: "m" },
  { name: "Elástico 40mm", key: "elastico_40mm", parent:"Elástico", value: 1.3, unit: "m" },
  { name: "Elástico 50mm", key: "elastico_50mm", parent:"Elástico", value: 1.0, unit: "m" },
  { name: "Cursor zíper nº 5", key: "cursor_5", value: 0.31, unit: "und" },
  { name: "Linha Retrôs", key: "linha_retros", parent:"Linha", value: 3.0, unit: "und" },
  { name: "Linha de pesponto", key: "linha_pesponto", parent:"Linha", value: 4.0, unit: "und" },
  { name: "Linha cone", key: "linha_cone", parent:"Linha", value: 6.0, unit: "und" },
  { name: "Linha overlock", key: "linha_cone_overlock", parent:"Linha", value: 9.0, unit: "und" },
  { name: "Tinta tecido pote", key: "tinta_tecido", value: 6.0, unit: "und" },
  { name: "Renda nº 5 najar", key: "renda_najar_5", value: 0.7, unit: "m" },
  { name: "Sianinha", key: "sianinha", parent: "Fita", value: 1.5, unit: "m" },
  { name: "Fita cetim n° 9 (38mm)", key: "fita_cetim_9", parent: "Fita", value: 11.5, unit: "und" },
  { name: "Fita cetim n° 3 (15mm)", key: "fita_cetim_3", parent: "Fita", value: 5.49, unit: "und" },
  { name: "Fita cetim n° 2 (10mm)", key: "fita_cetim_2", parent: "Fita", value: 4.7, unit: "und" },
  { name: "Zíper Nylon 15cm NYBC", key: "ziper_nylon_15cm", parent: "Ziper", value: 0.34, unit: "und" },
  { name: "Zíper Nylon 20cm NYBC", key: "ziper_nylon_20cm", parent: "Ziper", value: 0.42, unit: "und" },
  { name: "Zíper Nylon 50cm NYBC", key: "ziper_nylon_50cm", parent: "Ziper", value: 0.61, unit: "und" },
  { name: "Zíper Invisível 15cm NYBC", key: "ziper_invisivel_15cm", parent: "Ziper", value: 0.49, unit: "und" },
  { name: "Zíper Invisível 20cm NYBC", key: "ziper_invisivel_20cm", parent: "Ziper", value: 0.49, unit: "und" },
  { name: "Zíper Invisível 50cm NYBC", key: "ziper_invisivel_50cm", parent: "Ziper", value: 0.87, unit: "und" },
  { name: "Zíper Destacável Niq Fino Ping 60cm NYBC", key: "ziper_destacavel_60cm", parent: "Ziper", value: 5.62, unit: "und" },
  { name: "Zíper Destacável Niq Fino Ping 70cm NYBC", key: "ziper_destacavel_70cm", parent: "Ziper", value: 5.92, unit: "und" },
  { name: "Zíper Destacável Niq Fino Ping 75cm NYBC", key: "ziper_destacavel_75cm", parent: "Ziper", value: 6.06, unit: "und" },
  { name: "Lastex Real 500 mts Branco", key: "lastex_500mts_branco", parent: "Lastex", value: 34.65, unit: "und" },
  { name: "Lastex Real 10 mts Branco", key: "lastex_10mts_branco", parent: "Lastex", value: 2.24, unit: "und" },
  { name: "Kit alça 4 und", key: "kitAlca4und", value: 1.59, unit: "und" },
  { name: "Par Alça sutiã media", key: "alcasutiamedia", value: 5.10, unit: "und" },
  { name: "Par Alça sutiã media", key: "alcasutiamedia", value: 5.10, unit: "und" },
  { name: "Elastico azelha 2,3mm", key: "azelha", parent: "Elástico", value: 1, unit: "m" }
].slice()
.sort((a, b) => a.name.localeCompare(b.name));

export const cloths = [
  { key: 'oxfordine', name: 'Oxfordine', cost: 15.90 },
  { key: 'tricoline', name: 'Tricoline', cost: 25.90 },
  { key: 'amanda_crepe', name: 'Crepe Amanda', cost: 22.90 },
  { key: 'dune_crepe', name: 'Crepe Duna', cost: 19.90 },
  { key: 'black_leather', name: 'Couro Preto', cost: 63.90 },
  { key: 'black_cirre', name: 'Cirrê Preto', cost: 34.90 },
  { key: 'gabardine', name: 'Gabardine', cost: 22.90 },
  { key: 'two_way_crepe', name: 'Crepe Two Way', cost: 19.90 },
  { key: 'satin_no_stretch', name: 'Cetim sem elastano', cost: 7.90 },
  { key: 'satin_with_stretch', name: 'Cetim com elastano', cost: 12.90 },
  { key: 'silky', name: 'Sedinha', cost: 44.90 },
  { key: 'tailoring', name: 'Alfaiataria', cost: 26.90 },
  { key: 'light_brim', name: 'Brim Leve', cost: 34.90 },
  { key: 'mixed_light_brim', name: 'Brim Leve Misto', cost: 29.90 },
  { key: 'neoprene', name: 'Neoprene', cost: 32.90 },
  { key: 'lycra', name: 'Lycra', cost: 33.90 },
  { key: 'pure_linen', name: 'Linho Puro', cost: 119.90 },
  { key: 'refresh', name: 'Refresh', cost: 15.90 },
  { key: 'oxford', name: 'Oxford', cost: 8.90 },
  { key: 'cannes_tricoline', name: 'Tricoline Cannes', cost: 22.90 },
  { key: 'cotton_knit', name: 'Malha de Algodão', cost: 24.90 },
  { key: 'viscose_linen', name: 'Viscolinho', cost: 24.90 },
  { key: 'Organza', name: 'Organza', cost: 12.90 },
  { key: 'organzaimportada', name: 'Organza importada', cost: 19.90 },
  { key: 'lame', name: 'lamê ', cost: 39.90 },
].slice()
.sort((a, b) => a.name.localeCompare(b.name));


export function splitIntoColumns(items, numCols) {
  const cols = Array.from({ length: numCols }, () => []);
  items.forEach((item, idx) => cols[idx % numCols].push(item));
  return cols;
}

export function parseNumber(val) {
  return parseFloat((val || '0').toString().replace(',', '.')) || 0;
}
