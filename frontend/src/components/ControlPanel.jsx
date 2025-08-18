import { Plus } from "lucide-react";
import SearchBar from "./SearchBar";

const ControlPanel = ({ onAddNew }) => {
  return (
    <div className="card mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <SearchBar />
        <button
          className="btn-primary flex items-center gap-2"
          onClick={onAddNew}
        >
          <Plus size={20} />
          추가
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
