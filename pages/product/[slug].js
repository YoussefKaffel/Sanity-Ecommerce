import React from  'react'
import {useState} from "react";
import {client , urlFor} from '../../lib/client'
import Product from "../../components/Product";
import {useStateContext} from "../../context/StateContext";
const ProductDetails = ({product,products}) => {
    const [index , setIndex] = useState(0)
    const {decQty,incQty,onAdd,cartQty} = useStateContext();
    return(
        <div>
            <div className='product-detail-container'>
                <div>
                    <div className='image-container'>
                        <img src={urlFor(product.image && product.image[index])} className='product-detail-image' />
                    </div>
                    <div className='small-images-container'>
{product.image?.map((image , i) => (
<img src={urlFor(image)} className={i === index ? 'small-image selected-image':'small-image'} onMouseEnter={() => setIndex(i)} />
))}

                    </div>
                    <div className='product-detail-desc'>
                        <h1>{product.name}</h1>
                        <div className="reviews">
                            reviews
                        </div>

                    </div>
                    <h4> Details :</h4>
                    <p>{product.details}</p>
                    <p className="price">${product.price}</p>
                    <div className="quantity">
                        <h3>Quantity</h3>
                        <p className="quantity-desc">
                            <span   className="minus" onClick={decQty}>-</span>
                            <span   className="minus" >{cartQty}</span>
                            <span   className="minus" onClick={incQty}>+</span>

                        </p>
                    </div>
                    <div className="buttons">
                        <button type="button" className="add-to-cart" onClick={()=>onAdd(product,cartQty)}>Add to cart</button>
                        <button type="button" className="buy-now" onClick="">Buy now</button>

                    </div>

                </div>
            </div>
            <div className="maylike-products-wrapper">
                <h2>May like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products.map((product) => (
                            <Product key={product._id} product={product}/>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}
export const getStaticPaths = async () => {
const query = `*[_type == "product"]{
    slug {
        current 
        }
    }`
    const products = await client.fetch(query)
    const paths = products.map(product => ({
        params: {slug: product.slug.current}
    }))
    return {paths, fallback: 'blocking'}
}

export const getStaticProps = async ({ params : {slug}}) => {
    const query = `*[_type == "product" &&  slug.current == '${slug}'][0]`
    const productQuery = '*[_type == "product"]'
    const product = await client.fetch(query)
    const products = await client.fetch(productQuery)


    return {
        props: {
            products,product
        }
    }
}
export default ProductDetails