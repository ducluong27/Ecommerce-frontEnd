import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const EditCategory = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  // const location= useLocation()
  // const data= location.state
  const [errors, setErrors]= useState([])
  const [categoryEdit, setCategoryEdit] = useState([])
  useEffect(() => {
    
    const category_id = id
    axios.get(`/api/edit-category/${category_id}`).then(res=>{
      
      if(res.data.status===200){
        setCategoryEdit(res.data.category)
      }
      else if(res.data.status===404){
        Swal.fire('error', res.data.message,'warning')
        navigate('/admin/view-category')
      }
    })
  }, [id])
  const updateCategory=(e) => {
    e.preventDefault();
    axios.put(`/api/update-category/${id}`,categoryEdit).then(res=>{
      if(res.data.status ===200){
        Swal.fire('success', res.data.message,'success')
      }
      else if(res.data.status ===404){
        Swal.fire('warning', res.data.message,'warning')
        navigate('/admin/view-category')
      }
      else if(res.data.status ===422){
        setErrors(res.data.errors)
      }
    });
  } 
  return (
    <div>
        <div className='mx-3 card px-3 py-3 mt-3'>
          <h2 className='text-center mt-3 mb-2'>Category</h2>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
              </li>
              <li className="nav-item" role="presentation">
                  <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">Seo </button>
              </li>
          </ul>
          <form onSubmit={updateCategory}>
          <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active " id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" >
                <div className="form-group ">
                    <label >Slug</label>
                    <input type="text"className="form-control" placeholder="" aria-describedby="helpId" onChange={(e)=>setCategoryEdit({...categoryEdit,slug:e.target.value})} defaultValue={categoryEdit.slug}/>
                    <small className='text-danger'>{errors.slug}</small>
                </div>
                <div className="form-group">
                    <label >Name</label>
                    <input type="text"className="form-control" placeholder="" aria-describedby="helpId" onChange={(e)=>setCategoryEdit({...categoryEdit,name:e.target.value})} defaultValue={categoryEdit.name}/>
                    <small className='text-danger'>{errors.name}</small>
                </div>
                <div className="form-group">
                    <label >Description</label>
                    <textarea className="form-control" placeholder="" aria-describedby="helpId"onChange={(e)=>setCategoryEdit({...categoryEdit,description:e.target.value})} defaultValue={categoryEdit.defaultValue}/>
                </div>
                <div className="form-group">
                    <label >Status</label>
                    <input type="checkbox" placeholder="" aria-describedby="helpId" name='status' className='mt-2' onChange={(e)=>setCategoryEdit({...categoryEdit,status:e.target.value})}/> Status 0=shown/1=hidden
                </div>   
              </div>
              <div className="tab-pane fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab" >
                <div className="form-group">
                  <label >Meta title</label>
                  <input type="text"className="form-control" placeholder="" aria-describedby="helpId" onChange={(e)=>setCategoryEdit({...categoryEdit,meta_title:e.target.value})} defaultValue={categoryEdit.meta_title}/>
                  <small className='text-danger'>{errors.meta_title}</small>
                </div>

                <div className="form-group">
                  <label >Meta Keywords</label>
                  <textarea className="form-control" placeholder="" aria-describedby="helpId" onChange={(e)=>setCategoryEdit({...categoryEdit,meta_ketword:e.target.value})} defaultValue={categoryEdit.meta_ketword}/>
                </div>

                <div className="form-group">
                  <label >Meta Description</label>
                  <textarea className="form-control" placeholder="" aria-describedby="helpId" onChange={(e)=>setCategoryEdit({...categoryEdit,meta_description:e.target.value})} defaultValue={categoryEdit.meta_description}/>
                </div>
              </div>
            </div>
            <button type="submit" className='btn btn-outline-success mt-1' name="save" id="save">Update</button>
          </form>
      </div>
    </div>
  )
}

export default EditCategory