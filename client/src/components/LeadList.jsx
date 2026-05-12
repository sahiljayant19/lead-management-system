import LeadCard from "./LeadCard";

const LeadList = ({ leads, fetchLeads }) => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">
                All Leads
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leads.length > 0 ? (
                    leads.map((lead) => (
                        <LeadCard
                            key={lead.id}
                            lead={lead}
                            fetchLeads={fetchLeads}
                        />
                    ))
                ) : (
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <p className="text-gray-500">
                            No leads available
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeadList;