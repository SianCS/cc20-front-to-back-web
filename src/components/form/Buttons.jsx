import { Loader } from "lucide-react";
function Buttons({ isSubmitting, label }) {
  return (
    <div>
      <button
        disabled={isSubmitting}
        className="bg-black text-white p-2 rounded-md"
      >
        {isSubmitting ? (
          <div className="flex gap-2">
            {" "}
            <Loader className="animate-spin" /> <p>Loading</p>
          </div>
        ) : (
          label
        )}
      </button>
    </div>
  );
}
export default Buttons;
