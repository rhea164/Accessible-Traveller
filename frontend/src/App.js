import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <div className="flex flex-col items-center justify-center p-14 gap-y-10">
        <h1 className="text-6xl">Hi, where would you like to go?</h1>
        <h4 className="text-2xl">Tell us your preferences</h4>
      </div>
      <div className="flex border-4 w-2/3 p-3 rounded-lg">
        <div className="flex flex-row">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Search 
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
