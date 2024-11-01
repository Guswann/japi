import axios from "axios";
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  }
})

export default{
  getCategories(){
    return apiClient.get('category');
  },
  addCategory(data){
    return apiClient.post('category', data)
  },
  updateCategory(id, data){
    return apiClient.put(`category/${id}`, data)
  },
  destroyCategory(id){
    return apiClient.delete(`category/${id}`)
  },

  getProduct(){
    return apiClient.get('product');
  },

  addProduct(data){
    return apiClient.post('product', data)
  },

  updateProduct(id, data){
    return apiClient.put(`product/${id}`, data)
  },

  destroyProduct(id){
    return apiClient.delete(`product/${id}`)
  }
}