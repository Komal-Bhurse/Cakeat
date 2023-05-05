
import React, { useState } from "react";

function Admin() {
  const [data, setData] = useState({
    ProductId:"",
    Name: "",
    Price: "",
    Description: "",
  });

  const handleOnChange = (e) =>{
     setData({...data,[e.target.name]:e.target.value})
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(data);
  //   const res = await axios.post("http://localhost:5000/api/product",data);
  //   alert(res.data.massage);
  // };

  return (
    <div className="border w-96 m-auto text-center p-10 mt-10">
      <form action="https://cakeat.vercel.app/api/product" method="post" encType="multipart/form-data">
      
      <label className="mb-5">Product Id</label><br/>
        <label className="mr-5 cursor-pointer">
        <input
          type={"radio"}
          name="ProductId"
          value={"cake"}
          onChange={handleOnChange}
          className="mr-1 border cursor-pointer"
        />
        Cake
        </label>

        <label className="mr-5 cursor-pointer">
        <input
          type={"radio"}
          name="ProductId"
          value={"accessorie"}
          onChange={handleOnChange}
          className="mr-1 border cursor-pointer"
        />
        Accessorie</label>

        <label className="cursor-pointer">
        <input
          type={"radio"}
          name="ProductId"
          value={"cookie"}
          onChange={handleOnChange}
          className="mr-1 border cursor-pointer"
        />
        Cookie</label>
        <br />

        <label className="mb-5">Product Name</label>
        <br />
        <input
          type={"text"}
          placeholder="Name"
          name="Name"
          value={data.Name}
          onChange={handleOnChange}
          className="mb-5 border"
        />
        <br />

        <label className="mb-5">Product Price</label>
        <br />
        <input
          type={"Number"}
          placeholder="Price"
          name="Price"
          value={data.Price}
          onChange={handleOnChange}
          className="mb-5 border"
        />
        <br />

        <label className="mb-5">Product Description</label>
        <br />
        <input
          type={"text"}
          placeholder="Description"
          name="Description"
          value={data.Description}
          onChange={handleOnChange}
          className="mb-5 border"
        />
        <br />

        <label className="mb-5">Product Image</label>
        <br />
        <input type={"file"} className="mb-5" name="image"/>
        <br />

        <button type="submit" onSubmit={(e)=>e.preventDefault()} className="border">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Admin;
