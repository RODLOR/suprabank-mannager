import axios from "axios";
import { useEffect, useState } from "react";

export default function Customers() {
    const [clientsData, setClientsData] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for "Add Client" modal
    const [newClientData, setNewClientData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        id_number: "",
        tel: "",
        address: "",
    });

    const fetchClients = async () => {
        try {
            const response = await axios.get("http://localhost:4000/clients");
            setClientsData(response.data);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const openModal = (client) => {
        setSelectedClient(client);
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeModal = () => {
        setSelectedClient(null);
        setIsModalOpen(false);
        setIsAddModalOpen(false);
    };

    const handleAddClient = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/clients", newClientData);
            fetchClients();
            closeModal();
            setNewClientData({
                id_number: "",
                first_name: "",
                last_name: "",
                email: "",
                address: "",
                tel: "",
            });
        } catch (error) {
            console.error("Error adding client:", error);
        }
    };

    const handleDeleteClient = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/clients/${id}`);
            closeModal();
            fetchStudents();
        } catch (error) {
            console.error("Error deleting student:", error);
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
            <div className="flex flex-col gap-2 w-full rounded-md bg-gradient-to-r from-purple-500 to-blue-500 p-5">
                <span className="text-xs">Total Customers</span>
                <span className="font-bold text-sm md:text-xl">{clientsData.length}</span>
            </div>
    </div>
            <div className="w-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-gray-200">
                <header className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                    <h2 className="font-semibold">Customers</h2>
                    <button id="addClient" onClick={openAddModal} className="font-semibold text-white  bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md">+</button>
                </header>
                {isAddModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-30 bg-opacity-50 bg-gray-900">
                        {/* Modal content */}
                        {/* Form for adding a new client */}
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
                            <form onSubmit={handleAddClient} className="flex flex-col gap-4">
                                <div className="flex flex-col">
                                    <label className="font-bold" htmlFor="First Name">First Name</label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        placeholder="First Name"
                                        value={newClientData.first_name}
                                        onChange={(e) => setNewClientData({ ...newClientData, first_name: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-bold"  htmlFor="Last Name">Last Name</label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        placeholder="Last Name"
                                        value={newClientData.last_name}
                                        onChange={(e) => setNewClientData({ ...newClientData, last_name: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-bold"  htmlFor="email">Email</label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="email"
                                        placeholder="example@email.com"
                                        value={newClientData.email}
                                        onChange={(e) => setNewClientData({ ...newClientData, email: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-bold"  htmlFor="Identification number">Identification number</label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        placeholder="xxx-xxxxxxx-x"
                                        value={newClientData.id_number}
                                        onChange={(e) => setNewClientData({ ...newClientData, id_number: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-bold" htmlFor="phone number">Phone Number</label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        placeholder="xxx-xxx-xxxx"
                                        value={newClientData.tel}
                                        onChange={(e) => setNewClientData({ ...newClientData, tel: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-bold"  htmlFor="Address">Address</label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        placeholder="address"
                                        value={newClientData.address}
                                        onChange={(e) => setNewClientData({ ...newClientData, address: e.target.value })}
                                    />
                                </div>

                                <button type="submit" className="bg-green-500 text-white rounded-md px-4 py-2 mt-3">
                                    Add Customer
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                <table className="min-w-full">
                    <thead className="text-gray-500 dark:text-gray-200 even:border-gray-200 bg-gray-200 dark:bg-slate-700">
                        <tr>
                            <th className="px-6 py-3 border-b  text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 border-b text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                ID Number
                            </th>
                            <th className="px-6 py-3 border-b text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                Phone Number
                            </th>
                            <th className="px-6 py-3 border-b text-center text-xs leading-4 font-medium uppercase tracking-wider">Details</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400">
                        {clientsData != [] ? clientsData.map((client) => (
                            <tr key={client.id}>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div className="flex items-center">
                                        <div className="">
                                            <div className="text-sm leading-5 font-medium text-gray-900 dark:text-white">{client.first_name} {client.last_name}</div>
                                            <div className="text-sm leading-5 ">{client.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <span className="text-sm leading-5 text-gray-900 dark:text-white">{client.id_number}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 ">
                                    <span className="text-sm leading-5 text-gray-900 dark:text-white">{client.tel}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-center border-b border-gray-200 text-sm leading-5 font-medium">
                                    <button onClick={() => openModal(client)} className="text-green-500 hover:text-green-600 focus:outline-none focus:underline">Show</button>
                                </td>
                            </tr>
                        )) : null}
                    </tbody>
                </table>
                {isModalOpen && selectedClient && (
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
                                        Client Details
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
                                    <p className="">
                                        <strong className="dark:text-white text-gray-900">ID:</strong> {selectedClient.id}
                                    </p>
                                    <p className="">
                                        <strong className="dark:text-white text-gray-900">First Name:</strong> {selectedClient.first_name}
                                    </p>
                                    <p className="">
                                        <strong className="dark:text-white text-gray-900">Last Name:</strong>  {selectedClient.last_name}
                                    </p>
                                    <p className="">
                                        <strong className="dark:text-white text-gray-900">Email:</strong> {selectedClient.email}
                                    </p>
                                    <p className="">
                                        <strong className="dark:text-white text-gray-900">ID Number:</strong> {selectedClient.id_number}
                                    </p>
                                    <p className="">
                                        <strong className="dark:text-white text-gray-900">Phone Number:</strong> {selectedClient.tel}
                                    </p>
                                    <p className="">
                                        <strong className="dark:text-white text-gray-900">Address:</strong> {selectedClient.address}
                                    </p>
                                    <p className="">
                                        <strong className="dark:text-white text-gray-900">Creation date:</strong> {formatDate(selectedClient.createAt)}
                                    </p>
                                </div>
                                {/* Modal buttons */}
                                <div>
                                    <button
                                        onClick={() => handleDeleteClient(selectedClient.id)}
                                        className="bg-red-500 hover:bg-red-600 rounded-md p-3"
                                    >
                                        Delete Client
                                    </button>
                                </div>
                            </div>
                            </div>
                        </div>
                    )}
            </div>
        </section>
    );
}
