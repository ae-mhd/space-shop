import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch,useSelector } from "react-redux";
import {listProducts} from '../actions/productActions'
import { useParams } from 'react-router-dom'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const keyword = useParams().keyword
    const filter = useParams().filter
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList;
    useEffect(() => {
        dispatch(listProducts(keyword,filter))
    },[dispatch,keyword,filter])
return (
    <>
        <h1 className="text-center">Latest Products</h1>
        {loading
            ? <Loader/>
            : error ? <Message variant='danger' >{error}</Message>
            : <Row>
                {products.map(product => {
                    return (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product }/>
                        </Col>
                    )
                })}
            </Row>}
        
    </>
)
}

export default HomeScreen
