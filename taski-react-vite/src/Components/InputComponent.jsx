import { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';

const InputComponent = (props) => {
  const [inputText, setInputText] = useState('');

  const inputUpdated = (e) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    console.log(`Input text updated: ${inputText}`);
  }, [inputText]);

  const buttonClicked = () => {
    props.addButtonAction(inputText);
    setInputText('');
  };

  return (
    <div className="flex w-full mb-1">
      <input
        type="text"
        className="flex-grow pl-3 py-2 mr-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onInput={inputUpdated}
        value={inputText}
        placeholder="Enter a task..."
      />
      <Button
        className="py-2 px-4 text-sm border-l border-gray-300 rounded-r-lg"
        onClick={buttonClicked}
      >
        Add
      </Button>
    </div>
  );
};

export default InputComponent;

