import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Loans() {
    const [loansData, setLoansData] = useState([]);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [clientsData, setCliensData] = useState(false);
    const [selectedClientData, setSelectedClientData] = useState(null);
    const [totalLoans, setTotalLoans] = useState(0);
    const [newLoanData, setNewLoanData] = useState({
        requirement_date: "",
        id_number: "",
        required_amount: '',
        cuotes_quantity: '',
        cuotes_amount: '',
        monthly_interest: '',
    });

    const fetchLoans = async () => {
        try {
            const response = await axios.get("http://localhost:4000/loans");
            setLoansData(response.data);
        } catch (error) {
            console.error("Error fetching loans:", error);
        }
    };

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchClient = async () => {
        try {
            const response = await axios.get("http://localhost:4000/clients");
            setCliensData(response.data);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    useEffect(() => {
        fetchClient();
    }, []);

    const openModal = (loan) => {
        setSelectedLoan(loan);
        clientsData.forEach(e => (
            e.id_number === loan.client_id_number ? setSelectedClientData(e) : null
        ))
        setIsModalOpen(true);
    }

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeModal = () => {
        setSelectedLoan(null);
        setIsModalOpen(false);
        setIsAddModalOpen(false);
    };

    const handleAddLoan = async (e) => {
        e.preventDefault();
        console.log(newLoanData);

        try {
            const requiredAmount = parseFloat(newLoanData.required_amount);
            const cuotesQuantity = parseInt(newLoanData.cuotes_quantity);
            const monthlyInterest = parseFloat(newLoanData.monthly_interest);

            const cuotesAmount = (requiredAmount / cuotesQuantity) * (1 + (monthlyInterest / 100));

            await axios.post("http://localhost:4000/loans", {
                ...newLoanData,
                cuotes_amount: cuotesAmount
            });

            fetchLoans();
            closeModal();
            setNewLoanData({
                requirement_date: "",
                id_number: "",
                required_amount: '',
                cuotes_quantity: '',
                cuotes_amount: '',
                monthly_interest: '',
            });
        } catch (error) {
            console.error("Error adding loan:", error);
        }
    };

    function formatDate(date) {
        const isoDate = new Date(date);

        const year = isoDate.getFullYear();
        const month = String(isoDate.getMonth() + 1).padStart(2, "0");
        const day = String(isoDate.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    return (
        <section className="flex flex-col justify-center antialiased text-gray-600 dark:text-white w-full pr-5 mb-8">
            <div className="flex mb-4 justify-center flex-wrap text-white">
                <div className="flex flex-col gap-2 w-full rounded-md bg-gradient-to-r from-green-500 to-cyan-500 p-5">
                    <span className="text-xs">Loans quantity</span>
                    <span className="font-bold text-sm md:text-xl">{loansData.length}</span>
                </div>
            </div>
            <div className="w-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-gray-200">
                <header className="flex justify-between px-5 py-4 border-b border-gray-100">
                    <h2 className="font-semibold">Loans</h2>
                    <button id="addLoan" onClick={openAddModal} className="font-semibold text-white  bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md">+</button>
                </header>
                {isAddModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-30 bg-opacity-50 bg-gray-900">
                        {/* Modal content */}
                        {/* Form for adding a new loan */}
                        <div className="flex flex-col gap-4 bg-white dark:bg-slate-800 p-6 rounded-md shadow-lg w-11/12 sm:w-8/12 md:w-7/12">
                            <div className="flex justify-between items-center dark:text-white text-gray-900 border-b border-gray-500 pb-2">
                                <h3 className="text-lg font-bold">Add New Customer</h3>
                                <button
                                    className="p-3 px-5 dark:hover:bg-slate-700 hover:bg-gray-200 rounded-md transition-all"
                                    onClick={closeModal}
                                >
                                    x
                                </button>
                            </div>
                            <form id="createNewLoan" onSubmit={handleAddLoan} className="flex flex-col gap-4 text-gray-800 dark:text-gray-400">
                                <div className="flex flex-col">
                                    <label className="font-bold" htmlFor="First Name">Client (By ID Number)</label>
                                    <select
                                        value={newLoanData.id_number}
                                        onChange={(e) => setNewLoanData({ ...newLoanData, id_number: e.target.value })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                    >
                                        <option value="" disabled>Select a client Id number</option>
                                        {clientsData.map((client) => (
                                            <option key={client.id_number} value={client.id_number}>
                                                {client.id_number}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-bold" htmlFor="First Name">Final Date</label>
                                    <input
                                        type="date"
                                        placeholder="Requirement Date"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                        value={newLoanData.requirement_date}
                                        onChange={(e) => setNewLoanData({ ...newLoanData, requirement_date: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-bold" htmlFor="First Name">Amount</label>
                                    <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                        type="number"
                                        placeholder="Amount"
                                        value={newLoanData.required_amount}
                                        onChange={(e) => setNewLoanData({ ...newLoanData, required_amount: e.target.value })}
                                    /></div>
                                <div className="flex flex-col">
                                    <label className="font-bold" htmlFor="First Name">Cuotes Quantity</label>
                                    <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                        type="number"
                                        placeholder="Cuotes quantity"
                                        value={newLoanData.cuotes_quantity}
                                        onChange={(e) => setNewLoanData({ ...newLoanData, cuotes_quantity: e.target.value })}
                                    /></div>
                                <div className="flex flex-col">
                                    <label className="font-bold" htmlFor="First Name">Monthtly Interest</label>
                                    <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                        type="number"
                                        placeholder="Monthly interest"
                                        value={newLoanData.monthly_interest}
                                        onChange={(e) => setNewLoanData({ ...newLoanData, monthly_interest: e.target.value })}
                                    /></div>
                                <div className="flex flex-col">

                                    <p className="bg-green-300">{newLoanData.cuotes_amount}</p>
                                </div>
                                <button type="submit" className="bg-green-500 text-white rounded-md px-4 py-2 mt-3">
                                    Add Loan
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                <table className="min-w-full">
                    <thead className="text-gray-500 dark:text-gray-200 even:border-gray-200 bg-gray-200 dark:bg-slate-700">
                        <tr>
                            <th className="px-6 py-3 border-b  text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                                User ID Number
                            </th>
                            <th className="px-6 py-3 border-b  text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                Total Amount
                            </th>
                            <th className="px-6 py-3 border-b  text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                Cuotes Amount
                            </th>
                            <th className="px-6 py-3 border-b  text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                                Payment Date
                            </th>
                            <th className="px-6 py-3 border-b text-center text-xs leading-4 font-medium uppercase tracking-wider">Details</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-400">
                        {loansData != [] ? loansData.map((loan, i) => (
                            <tr key={loan.id}>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <span className="text-sm leading-5 ">{loan.client_id_number}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                    <span className="text-sm leading-5 ">RD${loan.required_amount}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                    <span className="text-sm leading-5 ">RD${loan.cuotes_amount}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                    <span className="text-sm leading-5 ">{formatDate(loan.requirement_date)}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-center border-b border-gray-200 text-sm leading-5 font-medium">
                                    <button onClick={() => openModal(loan)} className="text-green-600 hover:text-green-900 focus:outline-none focus:underline">Show</button>
                                </td>
                            </tr>
                        )) : null}
                    </tbody>

                </table>
                {isModalOpen && selectedLoan && (
                    <div className="fixed inset-0 flex items-center justify-center z-30 bg-opacity-50 bg-gray-900">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            {/* Background overlay */}
                            <div className="fixed inset-0 transition-opacity">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            {/* Modal content */}
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                            <div className="p-5 inline-block align-bottom bg-white dark:bg-slate-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                {/* Modal content */}
                                <div className="flex justify-between items-center border-b pb-2 border-gray-400">
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                        Loan Details
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="hover:bg-gray-200 dark:hover:bg-slate-700 rounded-md p-3 px-5"
                                    >
                                        x
                                    </button>
                                </div>
                                <div className="my-4 flex flex-col gap-2 text-gray-600 dark:text-gray-300">
                                    <p className="text-sm leading-5 text-gray-500">
                                        <strong className="dark:text-white text-gray-900">Client Name:</strong> {selectedClientData.first_name} {selectedClientData.last_name}
                                    </p>
                                    <p className="text-sm leading-5 text-gray-500">
                                        <strong className="dark:text-white text-gray-900">Client Id Number:</strong> {selectedLoan.client_id_number}
                                    </p>
                                    <p className="text-sm leading-5 text-gray-500">
                                        <strong className="dark:text-white text-gray-900">Amount:</strong>  RD${selectedLoan.required_amount}
                                    </p>
                                    <p className="text-sm leading-5 text-gray-500">
                                        <strong className="dark:text-white text-gray-900">Cuotes:</strong> {selectedLoan.cuotes_quantity}
                                    </p>
                                    <p className="text-sm leading-5 text-gray-500">
                                        <strong className="dark:text-white text-gray-900">Montly Payment:</strong> RD${selectedLoan.cuotes_amount}
                                    </p>
                                    <p className="text-sm leading-5 text-gray-500">
                                        <strong className="dark:text-white text-gray-900">Montly Interest:</strong> {selectedLoan.monthly_interest}%
                                    </p>
                                    <p className="text-sm leading-5 text-gray-500">
                                        <strong className="dark:text-white text-gray-900">Payment Date:</strong> {formatDate(selectedLoan.requirement_date)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}