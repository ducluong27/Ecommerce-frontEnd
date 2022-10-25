import React from 'react'
import {Routes, Route} from 'react-router-dom'
import '../../assets/admin/css/styles.css'
import '../../assets/admin/js/scripts'
import Category from '../../components/admin/Category/Category'
import EditCategory from '../../components/admin/Category/EditCategory'
import ViewCategory from '../../components/admin/Category/ViewCategory'
import Dashboard from '../../components/admin/Dashboard'
import EditProduct from '../../components/admin/Product/EditProduct'
import Product from '../../components/admin/Product/Product'
import ViewProduct from '../../components/admin/Product/ViewProduct'
import Profile from '../../components/admin/Profile'

import Footer from './Footer'
import { Navbar } from './Navbar'
import Slidebar from './Slidebar'

export const MasterLayout = () => {
  return (
    <div className='sb-nav-fixed'>

        <Navbar/>

        <div id="layoutSidenav">

            <div id="layoutSidenav_nav">
                <Slidebar/>
            </div>

            <div id="layoutSidenav_content">
                <main>
                  <Routes>
                    <Route path='dashboard' element={<Dashboard />}/>
                    <Route path='profile' element={<Profile />}/>
                    <Route path='add-category' element={<Category/>}/>
                    <Route path='view-category' element={<ViewCategory/>}/>
                    <Route path='edit-category/:id' element={<EditCategory/>}/>
                    <Route path='add-product' element={<Product/>}/>
                    <Route path='view-product' element={<ViewProduct/>}/>
                    <Route path='edit-product/:id' element={<EditProduct/>}/>
                  </Routes>  
                </main>
                <Footer/>
            </div>

        </div>
    </div>
  )
}
