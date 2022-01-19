import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState(null);
  const [data, setData] = useState();
  const [short, setShort] = useState(null);

  const getData = async () => {
    const data = await fetch('/data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json());
    setData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const shortenUrl = async (e) => {
    e.preventDefault();
    await fetch('/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: url , short: short })
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    getData();
  };

  return (
    <div className="app">
      <h1 className={'text-7xl font-bold text-center text-white mb-10 title'}>Url Shortner</h1>
      <div>
        <form
          className={'flex w-screen items-center justify-center'}
          onSubmit={shortenUrl}
        >
          <div className={'flex items-center justify-center w-max border-b border-white py-3'}>
            <input
              className={
                'col appearance-none border-r-2 bg-transparent w-fit text-white mr-3 py-1 px-2 leading-tight focus:outline-none text-1xl'
              }
              required={true}
              type={'text'}
              placeholder={'Insert Your URL Here!'}
              aria-label={'Long Url'}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
            <input
              className={
                'appearance-none bg-transparent border-none w-fit text-white mr-3 py-1 px-2 leading-tight focus:outline-none text-1xl'
              }
              required={true}
              type={'text'}
              placeholder={'Insert Custom URL Here!'}
              aria-label={'Short Url'}
              onChange={(e) => {
                setShort(e.target.value);
              }}
            />
            <button
              className={
                'flex-shrink-0 bg-green-500 hover:bg-yellow-200 border-green-500 hover:border-yellow-200 text-sm border-4 text-white hover:text-black py-1 px-2 rounded'
              }
              type={'submit'}
            >
              Shorten
            </button>
            <button
              className={
                'flex-shrink-0 border-transparent border-4 text-white hover:text-pri-800 text-sm py-1 px-2 rounded'
              }
              type={'button'}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div className="tableContainer w-screen flex justify-center items-center">
        <table className="divide-y divide-white mt-4 w-5/6">
          <thead className={'bg-gray-500'}>
            <tr>
              <th
                scope={'col'}
                className={
                  'px-9 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'
                }
              >
                Long-URL
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Short-URL
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Clicks
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data && data.map((item) => (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.long_url}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a href={`http://localhost:3000/s/` + item.short} target={'_blank'} className="text-sm text-gray-900">
                    {`localhost:3000/` + item.short}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {item.clicks}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;