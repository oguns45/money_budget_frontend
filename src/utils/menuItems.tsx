import { dashboard, expenses, transactions, trend,  } from './Icons';

// Define the type for a menu item
interface MenuItem {
    id: number;
    title: string;
    icon: JSX.Element;
    link: string;
}

// Menu items array with type annotations
export const menuItems: MenuItem[] = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard',
    },
    {
        id: 2,
        title: 'View Transactions',
        icon: transactions,
        link: '/dashboard',
    },
    {
        id: 3,
        title: 'Incomes',
        icon: trend,
        link: '/dashboard',
    },
    {
        id: 4,
        title: 'Expenses',
        icon: expenses,
        link: '/dashboard',
    },
    {
        id: 5,
        title: 'Budget',
        icon: expenses,
        link: '/dashboard',
    },
];
