import API from "../services/api";
import { useState } from "react";


const LeadCard = ({ lead, fetchLeads }) => {

    const [showModal, setShowModal] = useState(false);

    // Update Status
    const handleStatusChange = async (e) => {
        try {
            const newStatus = e.target.value;

            await API.put(`/leads/${lead.id}`, {
                status: newStatus,
            });

            fetchLeads(); // fetchLeads because whenever user changes status it will update the state and page will not reload.
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            await API.delete(`/leads/${lead.id}`);

            fetchLeads();

        } catch (error) {
            console.log(error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Interested":
                return "text-blue-500";

            case "Converted":
                return "text-green-500";

            case "Not Interested":
                return "text-red-500";

            default:
                return "text-gray-500";
        }
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">
                {lead.name}
            </h3>

            <p className="text-gray-600">
                Phone: {lead.phone}
            </p>

            <p className="text-gray-600">
                Source: {lead.source}
            </p>

            {/* Status Dropdown */}
            <div className="mt-4">
                <select
                    value={lead.status}
                    onChange={handleStatusChange}
                    className={`border p-2 rounded-lg cursor-pointer ${getStatusColor(lead.status)}`}
                >
                    <option value="Interested">
                        Interested
                    </option>

                    <option value="Not Interested">
                        Not Interested
                    </option>

                    <option value="Converted">
                        Converted
                    </option>
                </select>

                <button
                    onClick={() => setShowModal(true)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-90 ml-4 hover:bg-red-700 transition-all duration-300 cursor-pointer"
                >
                    Delete
                </button>


                {
                    showModal && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-xl shadow-lg w-[350px]">

                                <h2 className="text-xl font-semibold mb-3">
                                    Confirm Delete
                                </h2>

                                <p className="text-gray-600 mb-5">
                                    Are you sure you want to delete this lead?
                                </p>

                                <div className="flex justify-end gap-3">

                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="mt-4 bg-white border border-black text-black px-4 py-2 rounded-lg hover:opacity-90 ml-4 hover:bg-gray-200 transition-all duration-300 cursor-pointer"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={async () => {
                                            await handleDelete();
                                            setShowModal(false);
                                        }}
                                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-90 ml-4 hover:bg-red-700 transition-all duration-300 cursor-pointer"
                                    >
                                        Delete
                                    </button>

                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default LeadCard;