import { useState, useEffect } from 'react'

// same as other race condition exercise: use abort controller to cancel prev requests in flight if the productId changes
const Product = ({ productId }: {productId: number}) => {
  const [product, setProduct] = useState(null)
  useEffect(() => {
   const controller = new AbortController()
   fetch(`/api/product/${productId}`, { signal: controller.signal })
    .then(res => {
      if(!res.ok) throw new Error("oops")
      return res.json()
    })
    .then(data => setProduct(data))
    .catch((err) => {
     if(err.name === 'AbortError') return
     console.log(err.message)
    })
    return () => controller.abort()
  }, [productId])
  return <pre>{JSON.stringify(product, null, 2)}</pre>
}

export default Product
