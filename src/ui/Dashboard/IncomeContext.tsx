// import React, { createContext, useState, useEffect, ReactNode } from 'react';

// interface Income {
    
//   _id: string;
//   title: string;
//   amount: number;
//   category: string;
//   description: string;
//   date: string;
// }

// interface ContextProps {
//   incomes: Income[];
//   getIncomes: () => void;
//   addIncome: (income: Omit<Income, '_id'>) => Promise<void>;
//   deleteIncome: (id: string) => Promise<void>;
// }

// export const IncomeContext = createContext<ContextProps | null>(null);

// export const IncomeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [incomes, setIncomes] = useState<Income[]>([]);
//   const userId = '6736ff16f6c87efbf91b0c4b'; // Hardcoded user ID

//   // Fetch incomes for the user
//   const getIncomes = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/income/${userId}`);
//       const data = await res.json();
//       if (Array.isArray(data)) {
//         setIncomes(data);
//       } else {
//         console.error('Expected an array but received:', data);
//         setIncomes([]); // Reset incomes on error
//       }
//     } catch (err) {
//       console.error('Error fetching incomes:', err);
//     }
//   };

//   // Add a new income for the user
//   const addIncome = async (income: Omit<Income, '_id'>) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/income`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(income),
//       });
//       const newIncome = await res.json();
//       setIncomes([newIncome.savedIncome, ...incomes]);
//     } catch (err) {
//       console.error('Error adding income:', err);
//     }
//   };

//   // Delete an income for the user
//   const deleteIncome = async (id: string) => {
//     try {
//       await fetch(`http://localhost:5000/api/income/${userId}/${id}`, {
//         method: 'DELETE',
//       });
//       setIncomes(incomes.filter(income => income._id !== id));
//     } catch (err) {
//       console.error('Error deleting income:', err);
//     }
//   };

//   useEffect(() => {
//     getIncomes();
//   }, []);

//   return (
//     <IncomeContext.Provider value={{ incomes, getIncomes, addIncome, deleteIncome }}>
//       {children}
//     </IncomeContext.Provider>
//   );
// };



import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  _id: string;
  email: string;
  username: string;
}

interface Income {
  _id: string;
  title: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface ContextProps {
  incomes: Income[];
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  getIncomes: () => void;
  addIncome: (income: Omit<Income, '_id'>) => Promise<void>;
  deleteIncome: (id: string) => Promise<void>;
}

export const IncomeContext = createContext<ContextProps | null>(null);

export const IncomeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);
  const userId = '6736ff16f6c87efbf91b0c4b'; // Hardcoded user ID

  const getIncomes = async () => {
    if (!currentUser) return;

    try {
      const res = await fetch(`http://localhost:5000/api/income/${currentUser}`);
      const data = await res.json();
      setIncomes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching incomes:', err);
    }
  };

  const addIncome = async (income: Omit<Income, '_id'>) => {
    if (!currentUser) return;

    try {
      const res = await fetch(`http://localhost:5000/api/income`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...income, userId: currentUser._id }),
      });
      const newIncome = await res.json();
      setIncomes([newIncome.savedIncome, ...incomes]);
    } catch (err) {
      console.error('Error adding income:', err);
    }
  };

  const deleteIncome = async (id: string) => {
    if (!currentUser) return;

    try {
      await fetch(`http://localhost:5000/api/income/${currentUser._id}/${id}`, {
        method: 'DELETE',
      });
      setIncomes(incomes.filter(income => income._id !== id));
    } catch (err) {
      console.error('Error deleting income:', err);
    }
  };

  return (
    <IncomeContext.Provider
      value={{
        incomes,
        currentUser,
        setCurrentUser,
        getIncomes,
        addIncome,
        deleteIncome,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
};

