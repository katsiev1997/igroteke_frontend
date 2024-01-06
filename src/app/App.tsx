import { Header } from '../widgets/Header/ui/Header';
import RouteProvider from './provider/RouteProvider/RouteProvider';
import './styles/index.scss';

function App() {
  return (
    <div className='app'>
      <div className='container'>
        <Header />
        <RouteProvider />
      </div>
    </div>
  );
}

export default App;
