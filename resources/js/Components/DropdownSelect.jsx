export default function DropdownSelect({ options, value, className = '', ...props }) {
    const optionKeys = Object.keys(options);

    return (
        <select {...props} defaultValue={value} className={`font-medium text-sm text-gray-700 ` + className}>
            {optionKeys.map((index) => {
                const option = options[index];

                return (
                    <option key={index} value={index}>{option}</option>
                );
            })}
        </select>
    );
}
