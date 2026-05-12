import { useForm } from "react-hook-form";
import API from "../services/api";

const LeadForm = ({ fetchLeads }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await API.post("/leads", data);

      console.log(response.data);

      fetchLeads();

      reset();

    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-4">
        Add New Lead
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Enter Name"
            className="w-full border p-3 rounded-lg"
            {...register("name", {
              required: "Name is required",
            })}
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            type="number"
            placeholder="Enter Phone Number"
            className="w-full border p-3 rounded-lg"
            {...register("phone", {
              required: "Phone number is required",
              minLength: {
                value: 10,
                message: "Phone number must be 10 digits",
              },

              maxLength: {
                value: 10,
                message: "Phone number must be 10 digits",
              },
            })}
          />

          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Source */}
        <div>
          <select
            className="w-full border p-3 rounded-lg cursor-pointer"
            {...register("source", {
              required: "Source is required",
            })}
          >
            <option value="">Select Source</option>
            <option value="Call">Call</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Field">Field</option>
          </select>

          {errors.source && (
            <p className="text-red-500 text-sm mt-1">
              {errors.source.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
        >
          Add Lead
        </button>
      </form>
    </div>
  );
};

export default LeadForm;