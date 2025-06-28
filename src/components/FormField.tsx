interface FormFieldProps {
  field: {
    label: string;
    type: "text" | "number" | "password" | "textarea" | "date" | "file";
    value: string;
  };
  index: number;
  onUpdate: (
    index: number,
    updatedField: {
      label: string;
      type: "text" | "number" | "password" | "textarea" | "date" | "file";
      value: string;
    }
  ) => void;
  onRemove: (index: number) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  field,
  index,
  onUpdate,
  onRemove,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onUpdate(index, { ...field, value: e.target.value });
  };

  if (field.type === "textarea") {
    return (
      <div className="mb-4 p-4 border border-gray-300 rounded-lg shadow-md">
        <label>
          {field.label}
          <textarea
        value={field.value}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Remove
        </button>
      </div>
    );
  }

  if (field.type === "file") {
    return (
      <div className="mb-4 p-4 border border-gray-300 rounded-lg shadow-md">
        <label>
          {field.label}
          <input
            type="file"
            className="border border-gray-300 rounded-lg"
            onChange={(e) =>
              onUpdate(index, {
                ...field,
                value: e.target.files
                  ? Array.from(e.target.files)
                      .map((file) => file.name)
                      .join(", ")
                  : "",
              })
            }
          />
        </label>
        <button type="button" onClick={() => onRemove(index)}>
          Remove
        </button>
      </div>
    );
  }

  return (
    <div className="mb-4 p-4 border border-gray-300 rounded-lg shadow-md">
      <label>
        {field.label}
        <input
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type={field.type}
          value={field.type === "file" ? "" : field.value}
          onChange={handleChange}
        />
      </label>
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Remove
      </button>
    </div>
  );
};

export default FormField;
