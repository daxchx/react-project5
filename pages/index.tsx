import { useState } from "react";

let nextId = 0;

export default function List() {
  const [name, setName] = useState("");
  const [count, setCount] = useState<any>("");
  const [tableType, setTableType] = useState("テーブル");

  const [watings, setWatings] = useState<any>([]);
  const [enters, setEnters] = useState<any>([]);

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold leading-7 text-gray-900">
          Wating Board
        </h1>
      </div>
      <div className="p-6 text-sm">
        <input
          className="py-1 px-2 border rounded bg-gray-50"
          value={name}
          placeholder="お名前"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="ml-2 py-1 px-2 border rounded bg-gray-50"
          type="number"
          value={count}
          onChange={(e) => setCount(+e.target.value)}
          placeholder="人数"
        />
        <select
          className="ml-2 py-1 px-2 border rounded bg-gray-50"
          value={tableType}
          onChange={(e) => setTableType(e.target.value)}
        >
          <option value="テーブル">テーブル</option>
          <option value="カウンター">カウンター</option>
          <option value="どちらでも可">どちらでも可</option>
        </select>
        <button
          className="ml-2 py-1 px-2 border border-green-500 rounded bg-green-500 text-white"
          onClick={() => {
            setWatings([
              ...watings,
              { id: nextId++, name: name, count: count, tableType: tableType },
            ]);
            setName("");
            setCount("");
            setTableType("テーブル");
          }}
        >
          順番待ちに追加する
        </button>
      </div>
      <div className="p-6 border-t bg-gray-50">
        <table className="w-full border bg-white text-sm">
          <caption className="mb-4 text-base font-semibold text-left">
            順番待ち
          </caption>
          <thead>
            <tr className="border-b font-semibold text-gray-900">
              <td className="w-1/4 py-3 px-4 border-r">名前</td>
              <td className="w-1/4 py-3 px-4 border-r">人数</td>
              <td className="w-1/4 py-3 px-4 border-r">テーブル</td>
              <td className="w-1/4 py-3 px-4 border-r">アクション</td>
            </tr>
          </thead>
          <tbody>
            {watings.length == 0 && (
              <tr>
                <td className="w-1/4 py-3 px-4 border-r opacity-0">
                  山田 太郎
                </td>
                <td className="w-1/4 py-3 px-4 border-r opacity-0">1</td>
                <td className="w-1/4 py-3 px-4 border-r opacity-0">
                  どちらでも可
                </td>
                <td className="w-1/4 py-3 pr-1 pl-4 opacity-0">
                  <button disabled={true} className="py-1 px-2 border text-xs">
                    取り消し
                  </button>
                  <button
                    disabled={true}
                    className="ml-2 py-1 px-2 border text-xs"
                  >
                    案内
                  </button>
                </td>
              </tr>
            )}
            {watings.map(
              (wating: {
                id: number;
                name: string;
                count: number;
                tableType: string;
              }) => (
                <tr className="border-b" key={wating.id}>
                  <td className="py-3 px-4 border-r">{wating.name}</td>
                  <td className="py-3 px-4 border-r text-gray-500">
                    {wating.count}
                  </td>
                  <td className="py-3 px-4 border-r text-gray-500">
                    {wating.tableType}
                  </td>
                  <td className="py-3 pr-1 pl-4">
                    <button
                      className="py-1 px-2 border border-red-500 rounded bg-red-50 text-xs text-red-500"
                      onClick={() => {
                        setWatings(
                          watings.filter(
                            (a: { id: number }) => a.id !== wating.id
                          )
                        );
                      }}
                    >
                      取消
                    </button>
                    <button
                      className="ml-2 py-1 px-2 border border-green-500 rounded bg-green-50 text-xs text-green-500"
                      onClick={() => {
                        setEnters([
                          ...enters,
                          {
                            id: wating.id,
                            name: wating.name,
                            count: wating.count,
                            tableType: wating.tableType,
                          },
                        ]);
                        setWatings(
                          watings.filter(
                            (a: { id: number }) => a.id !== wating.id
                          )
                        );
                      }}
                    >
                      案内
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="p-6 border-t bg-gray-50">
        <table className="w-full border bg-white text-sm">
          <caption className="mb-4 text-base font-semibold text-left">
            店内
          </caption>
          <thead>
            <tr className="border-b font-semibold text-gray-900">
              <td className="py-3 px-4 border-r">名前</td>
              <td className="py-3 px-4 border-r">人数</td>
              <td className="py-3 px-4 border-r">テーブル</td>
              <td className="py-3 px-4 border-r">アクション</td>
            </tr>
          </thead>
          <tbody>
            {enters.length == 0 && (
              <tr>
                <td className="w-1/4 py-3 px-4 border-r opacity-0">
                  山田 太郎
                </td>
                <td className="w-1/4 py-3 px-4 border-r opacity-0">1</td>
                <td className="w-1/4 py-3 px-4 border-r opacity-0">
                  どちらでも可
                </td>
                <td className="w-1/4 py-3 pr-1 pl-4 opacity-0">
                  <button
                    disabled={true}
                    className="ml-2 py-1 px-2 border border-green-500 rounded bg-green-50 text-xs text-green-500"
                  >
                    退店
                  </button>
                </td>
              </tr>
            )}
            {enters.map(
              (enter: {
                id: number;
                name: string;
                count: number;
                tableType: string;
              }) => (
                <tr className="border-b" key={enter.id}>
                  <td className="w-1/4 py-3 px-4 border-r">{enter.name}</td>
                  <td className="w-1/4 py-3 px-4 border-r text-gray-500">
                    {enter.count}
                  </td>
                  <td className="w-1/4 py-3 px-4 border-r text-gray-500">
                    {enter.tableType}
                  </td>
                  <td className="w-1/4 py-3 px-4">
                    <button
                      className="py-1 px-2 border border-red-500 rounded bg-red-50 text-xs text-red-500"
                      onClick={() => {
                        setEnters(
                          enters.filter(
                            (a: { id: number }) => a.id !== enter.id
                          )
                        );
                      }}
                    >
                      退店
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
