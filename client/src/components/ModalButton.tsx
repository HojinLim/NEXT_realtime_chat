const ModalButton = ({
  onClick,
  handleNameChange,
  handleClose,
  name,
}: {
  onClick: () => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
  name: string;
}) => {
  return (
    <div className="fixed border border-black flex">
      <div className="bg-white rounded-lg p-4 shadow-md">
        <button
          className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClick}
        >
          Go to Other Page
        </button>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
          className="mt-3 p-2 border border-gray-300 rounded"
        />
        <button
          className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default ModalButton;
