import Businesses from "./Components/Businesses";
import Reviews from "./Components/Reviews"; 

function App() {
  return (
    <div className="App">
      <Businesses/> 
      <Reviews businessId={2} />
    </div>
  );
}

export default App;
