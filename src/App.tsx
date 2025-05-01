import { DataTable } from './DataTable/DataTable.tsx';
import { generateData } from './mocks/generateData.ts';
import { RowSelectionState } from '@tanstack/react-table';

const SEED = 66;

const ROWS_AMOUNT = 33333;

const tableData = generateData(ROWS_AMOUNT, SEED);

const handleSelection = (selectionState: RowSelectionState) => {
  console.log('selectionState', selectionState)
}

const App = () => {
  return (
    <div>
      <DataTable locale="en-US" tableData={tableData} onRowSelect={handleSelection} />
    </div>
  );
};

export default App;
