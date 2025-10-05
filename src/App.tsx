import { DataTable } from './DataTable/DataTable.tsx';
import { generateData } from './mocks/generateData.ts';
import { RowSelectionState } from '@tanstack/react-table';
import { EditState } from './DataTable/types.ts';

const SEED = 66;

const ROWS_AMOUNT = 33333;

const tableData = generateData(ROWS_AMOUNT, SEED);

const handleSelection = (selectionState: RowSelectionState) => {
  console.log('selectionState', selectionState)
}

const handleEdit = (editState: EditState) => {
  console.log('editState', editState)
}

const App = () => {
  return (
    <div>
      <DataTable locale="en-US" tableData={tableData} onRowSelect={handleSelection} onTableEdit={handleEdit} />
    </div>
  );
};

export default App;
