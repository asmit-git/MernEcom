import React, { useEffect, useState } from 'react'
import AdminMenu from '../../Components/SidebarMenu/AdminMenu'
import Layout from '../../Layout/Layout'
import { AiFillCloseCircle, AiFillDelete, AiFillEdit, AiFillPlusCircle } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateCategory = () => {
  const [name, setName] = useState("")
  const [updatename, setUpdateName] = useState("")
  const [categories, setCategories] = useState([])
  const [open, setOpen] = useState(false)
  const [id, setId] = useState(false)


  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-categories`);
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        await getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong creating category");
    }
  }

  const handleEdit = async (item) => {
    setOpen(true);
    setUpdateName(item.name)
    setId(item._id)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${id}`,
        { name: updatename }
      );
      if (data.success) {
        toast.success(`${updatename} is updated`);
        setUpdateName("");
        setOpen(false);
        await getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const handleDelete = async (item) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${item._id}`
      );
      if (data.success) {
        toast.success(`category is deleted`);
        await getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }


  return (
    <>
      <Layout>
        <div className="container m-auto md:px-12 lg:py-0 lg:px-7">
          <div className='flex my-10 gap-5'>
            <div className='h-screen'>
              <AdminMenu />
            </div>
            <div className='h-screen overflow-hidden lg:min-w-[75%]'>
              {
                open ?
                  <>
                    <div id="content" className="w-full max-w-md mx-auto p-6">
                      <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-4 sm:p-7">
                          <div className="mt-5">
                            <form onSubmit={handleUpdate}>
                              <div className="grid gap-y-4">
                                <div className="top-0 right-0">
                                  <AiFillCloseCircle onClick={() => setOpen(false)} size="1.5em" />
                                </div>
                                <div>
                                  <label htmlFor="category" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Update Category</label>
                                  <div className="relative">
                                    <input
                                      type="text"
                                      id="name"
                                      name="name"
                                      value={updatename}
                                      onChange={(e) => setUpdateName(e.target.value)}
                                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm shadow-sm" required aria-describedby="email-error" />
                                  </div>
                                </div>
                                <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-700 text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 transition-all text-sm dark:focus:ring-offset-gray-800">Update Category</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                  :
                  <>
                    <div className="relative overflow-x-auto">
                      <form onSubmit={addCategory}>
                        <div className='sm:flex flex-row items-center gap-2 m-2 '>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="py-3 px-4 block border-2 border-gray-200 rounded-md text-sm shadow-sm dark:bg-gray-400 dark:border-gray-800  outline-0" required />
                          <button type="submit" className="bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-300 font-bold py-2 px-4 rounded inline-flex items-center w-500">
                            <AiFillPlusCircle size="2em" />
                            <span className='ml-1'>Add New Category</span>
                          </button>
                        </div>
                      </form>
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories?.map((item) => (
                            <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <p>{item.name}</p>
                              </th>
                              <td className="flex gap-2 px-6 py-4">
                                <AiFillEdit size="2em" onClick={() => handleEdit(item)} />
                                <AiFillDelete size="2em" onClick={() => handleDelete(item)} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
              }
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CreateCategory