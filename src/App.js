import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);

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
      body: JSON.stringify({ url: url })
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
      <div className={'w-fit flex items-end'}>
        <div className={'startTitle p-0 text-8xl text-white'}>
          Does Size Matter?
        </div>
        <form
          className={'input w-full max-w-sm'}
          onSubmit={shortenUrl}
        >
          <div className={'flex items-center border-b border-white py-3'}>
            <input
              className={
                'col appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none text-1xl'
              }
              required={true}
              type={'text'}
              placeholder={'Insert Your URL Here!'}
              aria-label={'Full name'}
              onChange={(e) => {
                setUrl(e.target.value);
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
        <div className={'endTitle text-white text-8xl'}>and Find Out!</div>
      </div>
      <div className="tableContainer">
        <table className="min-w-full divide-y divide-white mt-4">
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
                  <a href={`/s/` + item.short} target={'_blank'} className="text-sm text-gray-900">
                    {`https://urishorty.ml/`+ item.short}
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