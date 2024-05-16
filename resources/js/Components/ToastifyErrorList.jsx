
export default function ToastifyErrorList({ data }) {

  const errorElements = [];

  for (const campo in data) {

    const campoErrors = data[campo]?.map((error, index) => (
      <li key={`${campo}-${index}`} className='text-sm text-gray-600'>
        {error}
      </li>
    ));

    errorElements.push(...campoErrors);

  }

  return (
    <ul className='list-none p-2 space-y-1'>
      {errorElements}
    </ul>
  );
}
