import SideNavBar from "./components/SideNavBar";
import PageTable from "./components/table";
import TopNavBar from "./components/TopNavBar";

function App() {
  return (
    <div className="app">
      <TopNavBar />
      <div className="main-content">
        <SideNavBar />
        <PageTable />
      </div>
    </div>
  );
}

export default App;
