import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ViewProduct = () => {

  const [product, setProduct] = useState()
  async function getData(){
      await  axios.get('api/view-product').then(res=>{
      // console.log(res.data.category);
          if(res.status===200){
            setProduct(res.data.product)
          }
      })
  }
  useEffect(() => {

    getData();   

  }, [])
  console.log(product);
  return (
    <div>
      <div className="card-group">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Product
                        <Link to="../../admin/add-product" className="btn btn-primary float-end">Add Product</Link>
                    </h4>
                </div>
                <div className='card-body'>
                    <table className="table table-striped table-bordered table-responsive">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Category Name</th>
                                <th>Product Name</th>
                                <th>Selling Price</th>
                                <th>Image</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                          product?
                          product.map((item) =>{
                              return (
                              <tr key={item.id}>
                                  <td>{item.id}</td>
                                  <td>{item.category.name}</td>
                                  <td>{item.name}</td>
                                  <td>{item.sellingPrice}</td>
                                  <td><img src={`http://127.0.0.1:8000/${item.image}`} width="75px"/></td>
                                  <td ><Link className='btn btn-danger' to={`../edit-product/${item.id}`}>Edit</Link></td>
                                  <td><button type='button' className='btn btn-warning' >Delete</button></td>
                              </tr>
                              )
                              
                              }):<></>
      
                          } 
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewProduct