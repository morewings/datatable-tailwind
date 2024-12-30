import { DataTable } from './DataTable/DataTable.tsx';
import { generateData } from './mocks/generateData.ts';

const SEED = 66;

const ROWS_AMOUNT = 333;

const tableData = generateData(ROWS_AMOUNT, SEED);

const App = () => {
  return (
    <div>
      <DataTable locale="en-US" tableData={tableData} />
    </div>
  );
};

export default App;
