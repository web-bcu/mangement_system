export const EmployeeManagement = [
    {
        href: "/employee/details",
        label: "Personnel Information",
        icon: (
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="24"
                height="24"
                >
                <path d="M21 3H3c-1.1 0-1.99.89-1.99 2L1 19c0 1.1.89 2 1.99 2h18c1.1 0 1.99-.89 1.99-2L23 5c0-1.11-.89-2-2-2zM12 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
                </svg>

        )
    },
    {
        href: "/employee/teams",
        label: "Department",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="24"
                height="24"
            >
                <path d="M21 2H3v20h18V2zM3 4h18v2H3V4zm0 4h18v2H3V8zm0 4h18v2H3v-2zm0 4h18v2H3v-2zm0 4h18v2H3v-2z" />
            </svg>
        )
    },
    {
        href: "/employee/projects",
        label: "Project",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="24"
                height="24"
            >
                <path d="M21 6h-6V3H9v3H3v15h18V6zm-7 2h5v3h-5V8zm0 5h5v3h-5v-3zm-6 0h5v3H8v-3zm0 5h5v3H8v-3z" />
            </svg>
        )
    }
];



export const FinanceManagement = [
    {
        href: "/finance/budgets",
        label: "Budget",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="24"
                height="24"
            >
                <path d="M4 22h16v-2H4v2zm3-7h2V9H7v6zm4 4h2V5h-2v14zm4-8h2V3h-2v8z" />
            </svg>
        )
    },
    {
        href: "/finance/transactions",
        label: "Transaction",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="24"
                height="24"
            >
                <path d="M21 2H3v20l3-2 3 2 3-2 3 2 3-2 3 2V2zm-6 14H9v-2h6v2zm0-4H9V8h6v4z" />
            </svg>
        )
    }
];
