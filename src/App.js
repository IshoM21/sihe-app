import './App.css';
import { AppRouter } from './routers/AppRouter';
import { TableAxios } from './tables/TableAxios';
import { TableBasic } from './tables/TableBasic';
import { TableJson } from './tables/TableJson';

function App() {
  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
