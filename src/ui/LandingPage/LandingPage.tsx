import React, { useState } from "react";
import "./LandingPage.css";
import Orb from "../../components/Orb/orb";
import Navigation from "../../components/navigation/Navigation";
import Dashboard from "../../components/dashboard/Dashboard";
import IncomeList from "../../ui/sample/IncomeList";
import { useIncomeContext } from '../../context/IncomeContext';
// import { useGlobalContext } from "../context/globalContext";
import Income from '../../components/Income/Incomes'
import Expenses from '../../components/Expense/Expenses'
import Budget from "../../components/Budget/Budgets";

// Define the props for the page (if needed)
interface NewPageProps {
  title?: string;
}

// Functional Component
const LandingPage: React.FC<NewPageProps> = ({ title = "Default Title" }) => {
  const [active, setActive] = useState<number>(1); // Manage the active menu item
 
  const global = useIncomeContext();

  console.log(global);

  const displayData = (): JSX.Element => {
    switch (active) {
      case 1:
        return <Dashboard />;
      // case 2:
      //   return <IncomeList />;
       case 3:
         return <Income />;
      case 4:
        return <Expenses />;
      case 5:
        return <Budget />;
      default:
        return <Dashboard />;
    }
  };

  
  return (
    <div className="App">
      <Orb />
      <div className="mainlayout">
        <div className="innerlayout">
          <Navigation active={active} setActive={setActive} />
          <main>
            {displayData()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
