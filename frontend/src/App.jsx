import Header from "./components/Header";
import StatsCard from "./components/StatsCard";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-red-100 max-w-4xl mx-auto px-4 py-8">
        <Header />
        <StatsCard />
      </div>
    </div>
  );
};

export default App;
