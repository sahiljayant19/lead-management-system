import { useEffect, useState } from "react";

import API from "../services/api";

import LeadForm from "../components/LeadForm";
import LeadList from "../components/LeadList";

const Home = () => {

  const [leads, setLeads] = useState([]);

  // Fetch Leads
  const fetchLeads = async () => {
    try {
      const response = await API.get("/leads");

      setLeads(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">

      <LeadForm fetchLeads={fetchLeads} />

      <LeadList
        leads={leads}
        fetchLeads={fetchLeads}
      />

    </div>
  );
};

export default Home;