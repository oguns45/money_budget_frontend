// Define the interface for a Transaction
export interface Transaction {
  _id?: string | number; // Optional ID field
  type?: "income" | "expense"; // Union type for transaction type
  createdAt: Date | string; // Date when the transaction was created
  title: string; // Title of the transaction
  amount: number; // Amount for the transaction
  date: Date | string; // Date of the transaction
  category: string; // Category for the transaction
  description: string; // Description of the transaction
  user: string; // User ID associated with the income
  updatedAt?: Date | string; // Optional timestamp for when the income entry was last updated
  
}
export interface IUser {
  user: string; // User ID associated with the income
  userId: string;
  email: string;
  name: string;
  id?: string;
}

// Define the interface for an Income
export interface IIncome {
  user: string; // User ID associated with the income
  title: string; // Title of the income (e.g., "Salary", "Bonus")
  amount: number; // Amount of income
  // type: "income" | string; // Always set to "income"
  date: string; // Date of the income entry
  category: string; // Category of income (e.g., "Job", "Investment")
  description: string; // Description or note for the income
  //createdAt?: Date | string; // Optional timestamp for when the income entry was created
  //updatedAt?: Date | string; // Optional timestamp for when the income entry was last updated
}

// Define the interface for a Budget
export interface IBudget {
  type: string;
  user: string; // User ID associated with the budget
  month: number; // Month of the budget (1-12)
  year: number; // Year of the budget
  amount: number; // Amount of income
  totalIncome: number; // Total income for the month
  categories: string; // Category breakdown of the budget
  totalExpenses: number; // Total expenses for the month
  date: string; // Date of the income entry
  //days: string | DayEntry[]; // Array of daily entries
  description: string; // Description or note for the income
  //createdAt?: Date | string; // Optional timestamp for when the budget was created
  //updatedAt?: Date | string; // Optional timestamp for when the budget was last updated
}

// Define the interface for Categories in a Budget
export interface ICategory {
  [key: string]: number; // Category name as key, budget amount as value
}

// Define the interface for an Expense
export interface IExpense {
  user: string; // User ID associated with the expense
  title: string; // Title of the expense
  amount: number; // Amount for the expense
  type: "expense" | string; // Always set to "expense"
  date: string; // Date of the expense
  category: string; // Category of the expense
  description: string; // Description or note for the expense
  //createdAt?: Date | string; // Optional timestamp for when the expense was created
  //updatedAt?: Date | string; // Optional timestamp for when the expense was last updated
}

// Define the interface for a DayEntry
export interface DayEntry {
  day: number; // Day of the month (1-31)
  dailyIncome: number; // Income recorded for the day
  dailyExpenses: number; // Expenses recorded for the day
  categoryExpenses: Record<string, number>; // Map of category name to expense amount
}
