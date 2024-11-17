import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContextProvider';

const AddItem = () => {
  const { token, navigate, backendUrl,name, setName,textarea, setTextarea,addNote} = useContext(ShopContext);

  return (
    <div>      <form
    className="flex flex-col items-center h-full gap-5 justify-center p-10 rounded w-[40vw] max-w-[30rem] bg-slate-400"
    onSubmit={addNote}
  >
    <h1>Take Note</h1>
    <input
      type="text"
      onChange={(e) => setName(e.target.value)}
      className="p-2 bottom-1 border-gray-950 rounded"
      id=""
      placeholder="Note Name ..."
    />
    <textarea
      onChange={(e) => setTextarea(e.target.value)}
      className="p-2 bottom-1 border-gray-950 rounded"
      id=""
      placeholder="Add Note ..."
    />

    <div className="w-full">
      <input
        type="submit"
        className="p-2 bottom-1 w-full border-gray-950 rounded bg-green-900 text-white"
        id=""
        value="Add"
      />
 <p
              onClick={() => navigate("/")}
              className="mt-4 cursor-pointer text-white hover:bg-black p-2 max-w-[4rem] rounded"
            >
              Cancel
            </p>    </div>
  </form>
</div>
  )
}

export default AddItem