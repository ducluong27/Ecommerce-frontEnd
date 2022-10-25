import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Category from '../Category/Category'

const Product = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState()
    const [productInput, setProductInput] = useState({
        category_id:'',
        slug:'',
        name:'',
        description:'',

        meta_title:'',
        meta_keyword:'',
        meta_description:'',

        sellingPrice: '',
        originalPrice: '',
        quantity: '',
        brand: '',
        featured: '',
        popular: '',
        status: '',

    })
    const [picture,setPicture] = useState([])
    const [errors,setErrors] = useState([])
    async function getData(){
        await  axios.get('api/view-category').then(res=>{
        // console.log(res.data.category);
            if(res.status===200){
                setCategories(res.data.category)
            }
        })
    }

    useEffect(() => {

        getData();   
    
    }, [])
    const submitProduct= (e)=>{
        e.preventDefault();

        const formData = new FormData()
        formData.append('image',picture)
        formData.append('category_id',productInput.category_id)
        formData.append('slug',productInput.slug)
        formData.append('name',productInput.name)
        formData.append('description',productInput.description)

        formData.append('meta_title',productInput.meta_title)
        formData.append('meta_keyword',productInput.meta_keyword)
        formData.append('meta_description',productInput.meta_description)

        formData.append('sellingPrice',productInput.sellingPrice)
        formData.append('originalPrice',productInput.originalPrice)
        formData.append('quantity',productInput.quantity)
        formData.append('brand',productInput.brand)
        formData.append('featured',productInput.featured)
        formData.append('popular',productInput.popular)
        formData.append('status',productInput.status)

        axios.post(`/api/store-product`,formData).then(res=>{
            if(res.data.status ===200){
                console.log('thanhcong');
                navigate('/admin');
            }
            else if(res.data.status===422){
                setErrors(res.data.errors)
            }
        })
    }
  return (
    <div>
        <div className="card mx-3 my-3">
            <h4 className="card-header">Add product
                <Link to="/admin/view-product" className='btn btn-primary float-end'>View products</Link>
            </h4>
            <form encType='multipart/form-data' onSubmit={submitProduct}>
                <div className="card-body">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="seotags-tab" data-bs-toggle="tab" data-bs-target="#seotags" type="button" role="tab" aria-controls="seotags" aria-selected="false">Seo Tag</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="otherDetails-tab" data-bs-toggle="tab" data-bs-target="#otherDetails" type="button" role="tab" aria-controls="otherDetails" aria-selected="false">Other Details</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent"> 
                        <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="form-group mb-3">
                                <label className='mx-1'>Select Category</label>
                                <select className="form-control" name="" id="" onChange={(e)=>setProductInput({...productInput,category_id:e.target.value})}>
                                    <option>Select Category</option>
                                    {categories?categories.map((category)=>{
                                        return( <option key={category.id} value={category.id}>{category.name}</option>)
                                    }):<></>}
                                </select>
                                <small className='text-warning'>{errors.category_id}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label className='mx-1'>Slug</label>
                                <input type="text"className="form-control" placeholder="" aria-describedby="helpId"onChange={(e)=>setProductInput({...productInput,slug:e.target.value})}/>
                                <small className='text-warning'>{errors.slug}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label className='mx-1'>Name</label>
                                <input type="text"className="form-control" placeholder="" aria-describedby="helpId" onChange={(e)=>setProductInput({...productInput,name:e.target.value})}/>
                                <small className='text-warning'>{errors.name}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label className='mx-1'>Description</label>
                                <textarea className="form-control" placeholder="" aria-describedby="helpId" onChange={(e)=>setProductInput({...productInput,description:e.target.value})}/>
                            </div>
                        </div>
                        <div className="tab-pane card-body border fade" id="seotags" role="tabpanel" aria-labelledby="seotags-tab">
                            <div className="form-group mb-3">
                                <label className='mx-1'>Meta Title</label>
                                <input type="text"className="form-control" placeholder="" aria-describedby="helpId" onChange={(e)=>setProductInput({...productInput,meta_title:e.target.value})}/>
                                <small className='text-warning'>{errors.meta_title}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label className='mx-1'>Meta Keyword</label>
                                <input type="text"className="form-control" placeholder="" aria-describedby="helpId" onChange={(e)=>setProductInput({...productInput,meta_keyword:e.target.value})}/>
                            </div>
                            <div className="form-group mb-3">
                                <label className='mx-1'>Meta Description</label>
                                <textarea className="form-control" placeholder="" aria-describedby="helpId" onChange={(e)=>setProductInput({...productInput,meta_description:e.target.value})}/>
                            </div>
                        </div>
                        <div className="tab-pane card-body border fade" id="otherDetails" role="tabpanel" aria-labelledby="otherDetails-tab">
                            <div className="row">
                                <div className="col-md-4 mb-3 form-group">
                                    <label className='mx-1'>Selling Price</label>
                                    <input type="text"className="form-control" placeholder="" aria-describedby="helpId" onChange={(e)=>setProductInput({...productInput,sellingPrice:e.target.value})}/>
                                    <small className='text-warning'>{errors.sellingPrice}</small>
                                </div>
                                <div className="col-md-4 mb-3 form-group">
                                    <label className='mx-1'>Original Price</label>
                                    <input type="text"className="form-control" placeholder="" aria-describedby="helpId" onChange={(e)=>setProductInput({...productInput,originalPrice:e.target.value})}/>
                                    <small className='text-warning'>{errors.originalPrice}</small>
                                </div>
                                <div className="col-md-4 mb-3 form-group">
                                    <label className='mx-1'>Quantity</label>
                                    <input type="text"className="form-control" placeholder="" aria-describedby="helpId" onChange={(e)=>setProductInput({...productInput,quantity:e.target.value})}/>
                                    <small className='text-warning'>{errors.quantity}</small>
                                </div>
                                <div className="col-md-4 mb-3 form-group">
                                    <label className='mx-1'>Brand</label>
                                    <input type="text"className="form-control" placeholder="" aria-describedby="helpId" onChange={(e)=>setProductInput({...productInput,brand:e.target.value})}/>
                                    <small className='text-warning'>{errors.brand}</small>
                                </div>
                                <div className="col-md-8 mb-3 form-group">
                                    <label className='mx-1'>Image</label>
                                    <input type="file"className="form-control" placeholder="" aria-describedby="helpId" onChange={(e)=>setPicture(e.target.files[0])}/>
                                    <small className='text-warning'>{errors.image}</small>
                                </div>
                                <div className="col-md-4 mb-3 form-group">
                                    <label className='mx-1'>Featured</label>
                                    <input type="checkbox"placeholder="" aria-describedby="helpId" onChange={(e)=>setProductInput({...productInput,featured:e.target.value})}/>
                                </div>
                                <div className="col-md-4 mb-3 form-group">
                                    <label className='mx-1'>Popular</label>
                                    <input type="checkbox"placeholder="" aria-describedby="helpId" onChange={(e)=>setProductInput({...productInput,popular:e.target.value})}/>
                                </div>
                                <div className="col-md-4 mb-3 form-group">
                                    <label className='mx-1'>Status</label>
                                    <input type="checkbox"placeholder="" aria-describedby="helpId" onChange={(e)=>setProductInput({...productInput,status:e.target.value})}/>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <button type='submit' className='btn btn-primary mt-3'>Save</button> 
                </div>
            </form>
        </div>
    </div>
  )
}

export default Product