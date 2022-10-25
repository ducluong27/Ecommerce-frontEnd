import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ViewCategory = () => {

    const [category, setCategory] = useState()
    async function getData(){
        await  axios.get('api/view-category').then(res=>{
        // console.log(res.data.category);
            if(res.status===200){
                setCategory(res.data.category)
            }
        })
    }

    useEffect(() => {

        getData();   
    
    }, [])

    const deleteCategory = (e,id) =>{
        e.preventDefault();
        const thisClicked = e.currentTarget
        axios.delete(`/api/delete-category/${id}`).then(res =>{
            if(res.data.status===200){
                thisClicked.closest('tr').remove();
            }
            else if(res.data.status===404){
                console.log('tb');
            }
        })
    }
  return (
    <div className="mx-3 my-3">

        <div className="card-group">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Category
                        <Link to="../../admin/add-category" className="btn btn-primary float-end">Add Category</Link>
                    </h4>
                </div>
                <div className='card-body'>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                         {
                        category?
                        category.map((item) =>{
                            return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.slug}</td>
                                <td>{item.status}</td>
                                <td ><Link className='btn btn-danger' to={`../edit-category/${item.id}`} state={item}>Edit</Link></td>
                                <td><button type='button' className='btn btn-warning' onClick={(e)=>deleteCategory(e,item.id)}>Delete</button></td>
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

export default ViewCategory