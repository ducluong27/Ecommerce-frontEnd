import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
const Category = () => {
    const [categoryInput,setCategoryInput]=useState({
        slug:'',
        name:'',
        description:'',
        status:'',
        meta_title:'',
        meta_keyword:'',
        meta_description:'',
        errorList:''
    })
    const submitCategory =(e)=> {
        e.preventDefault();
        const data ={
            slug:categoryInput.slug,
            name:categoryInput.name,
            description:categoryInput.description,
            status:categoryInput.status,
            meta_title:categoryInput.meta_title,
            meta_keyword:categoryInput.meta_keyword,
            meta_description:categoryInput.meta_description
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/store-category',data).then(res=>{
                if(res.data.status ===200){
                    Swal.fire(
                        'Success!',
                        res.data.message,
                        'success'
                    )
                }
                else if(res.data.status ===400){
                    setCategoryInput({...categoryInput,errorList:res.data.errors})
                }
            })
        });
    }
    let Errors=[];
    if(categoryInput.errorList){
        Errors=[categoryInput.errorList.slug,
        categoryInput.errorList.meta_title,categoryInput.errorList.name]
    }
  return (
    
    <div className='mx-3 card px-3 py-3 mt-3'>
        <h2 className='text-center mt-3 mb-2'>Category</h2>
        {Errors.map((error)=>{
            return(<p className='my-1 text-red'>{error}</p>)
        })}
        <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">Seo </button>
            </li>
        </ul>
        <form onSubmit={submitCategory}>
        <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active " id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" >
                
               
                    <div className="form-group ">
                        <label >Slug</label>
                        <input type="text"className="form-control" placeholder="" aria-describedby="helpId" onChange={(e)=>setCategoryInput({...categoryInput,slug:e.target.value})}/>
                        {categoryInput.errorList.slug?<span className='my-3'>{categoryInput.errorList.slug}</span>:<></>}
                    </div>
                    <div className="form-group">
                        <label >Name</label>
                        <input type="text"className="form-control" placeholder="" aria-describedby="helpId" onChange={(e)=>setCategoryInput({...categoryInput,name:e.target.value})}/>
                        {categoryInput.errorList.name?<span className='my-3'>{categoryInput.errorList.name}</span>:<></>}
                    </div>
                    <div className="form-group">
                        <label >Description</label>
                        <textarea className="form-control" placeholder="" aria-describedby="helpId"onChange={(e)=>setCategoryInput({...categoryInput,description:e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label >Status</label>
                        <input type="checkbox" placeholder="" aria-describedby="helpId" name='status' className='mt-2' onChange={(e)=>setCategoryInput({...categoryInput,status:e.target.value})}/> Status 0=shown/1=hidden
                    </div>

                    
            </div>
            <div className="tab-pane fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">

                <div className="form-group">
                  <label >Meta title</label>
                  <input type="text"className="form-control" placeholder="" aria-describedby="helpId" onChange={(e)=>setCategoryInput({...categoryInput,meta_title:e.target.value})}/>
                  {categoryInput.errorList.meta_title?<span className='my-3'>{categoryInput.errorList.meta_title}</span>:<></>}
                </div>

                <div className="form-group">
                  <label >Meta Keywords</label>
                  <textarea className="form-control" placeholder="" aria-describedby="helpId" onChange={(e)=>setCategoryInput({...categoryInput,meta_ketword:e.target.value})}/>
                </div>

                <div className="form-group">
                  <label >Meta Description</label>
                  <textarea className="form-control" placeholder="" aria-describedby="helpId" onChange={(e)=>setCategoryInput({...categoryInput,meta_description:e.target.value})}/>
                </div>


            </div>
        </div>
        <button type="submit" className='btn btn-outline-success mt-1' name="save" id="save">Save</button>
        </form>
    </div>
  )
}

export default Category;