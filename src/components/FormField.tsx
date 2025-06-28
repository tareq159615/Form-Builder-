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

  const fieldId = `field-${index}`;

  return (
    <div className="mb-4 p-4 border border-gray-300 rounded-lg shadow-md">
      <label htmlFor={fieldId} className="block mb-2 font-medium">
        {field.label}
      </label>
      
      {field.type === "textarea" ? (
        <textarea
          id={fieldId}
          value={field.value}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : field.type === "file" ? (
        <input
          id={fieldId}
          type="file"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      ) : (
        <input
          id={fieldId}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type={field.type}
          value={field.value}
          onChange={handleChange}
        />
      )}
      
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        aria-label={`Remove ${field.label} field`}
      >
        Remove
      </button>
    </div>
  );
};

export default FormField;