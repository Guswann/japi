<template>
  <div class="">
    <div class="d-flex justify-content-center align-content-center">
      <div class="d-flex justify-content-between align-content-center w-75">
        <h4 class="">Product List</h4>
        <button class="btn btn-success" @click="openAdd">Tambah Data</button>
      </div>
    </div>
    <div class="m-5">
      <div class="">
        <table class="table table-striped-columns">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-if="products.length">
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.stock }}</td>
              <td>
                <button class="btn btn-warning btn-sm" @click="openEdit(product)">Edit</button>
                <button class="btn btn-danger btn-sm" @click="destroyProduct(product.id)">Delete</button>
              </td>
            </tr>
          </tbody>
          <tbody v-else class="justify-content-center align-content-center d-flex">
            <tr class="justify-content-center align-content-center d-flex">
              <h3>No Product Available</h3>
            </tr>
          </tbody>
        </table>

        <!-- form add -->
        <div class="modal" tabindex="-1" style="display: block" v-if="showAdd">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Tambah Kategori</h5>
                <button type="button" class="btn-close" @click="closeAdd"></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="addProducts">
                  <div class="mb-3">
                    <label for="newCategoryName" class="form-label">Nama</label>
                    <input type="text" class="form-control" id="newName" v-model="newName" required />
                  </div>
                  <div class="mb-3">
                    <label for="newCategoryName" class="form-label">Description</label>
                    <input type="text" class="form-control" id="newDescription" v-model="newDescription" required />
                  </div>
                  <div class="mb-3">
                    <label for="newCategoryName" class="form-label">Category id</label>
                    <input type="text" class="form-control" id="newCatId" v-model="newCatId" required />
                  </div>
                  <div class="mb-3">
                    <label for="newCategoryName" class="form-label">Price</label>
                    <input type="text" class="form-control" id="newPrice" v-model="newPrice" required />
                  </div>
                  <div class="mb-3">
                    <label for="newCategoryName" class="form-label">Stock</label>
                    <input type="number" class="form-control" id="newStock" v-model="newStock" required />
                  </div>
                  <button type="submit" class="btn btn-success">Tambah</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- form add end -->
      <!-- form edit start -->

      <div class="modal" tabindex="-1" style="display: block" v-if="showAdd">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Tambah Kategori</h5>
              <button type="button" class="btn-close" @click="closeAdd"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addProducts">
                <div class="mb-3">
                  <label for="newCategoryName" class="form-label">Nama</label>
                  <input type="text" class="form-control" id="newName" v-model="newName" required />
                </div>
                <div class="mb-3">
                  <label for="newCategoryName" class="form-label">Description</label>
                  <input type="text" class="form-control" id="newDescription" v-model="newDescription" required />
                </div>
                <div class="mb-3">
                  <label for="newCategoryName" class="form-label">Category id</label>
                  <input type="text" class="form-control" id="newCatId" v-model="newCatId" required />
                </div>
                <div class="mb-3">
                  <label for="newCategoryName" class="form-label">Price</label>
                  <input type="text" class="form-control" id="newPrice" v-model="newPrice" required />
                </div>
                <div class="mb-3">
                  <label for="newCategoryName" class="form-label">Stock</label>
                  <input type="number" class="form-control" id="newStock" v-model="newStock" required />
                </div>
                <button type="submit" class="btn btn-success">Tambah</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- form edit end -->
  </div>
</template>

<script>
import api from '@/services/api';
export default {
  name: 'ProductList',
  data() {
    return {
      products: [],
      showAdd: false,
      newName: '',
      newDescription: '',
      newCatId: '',
      newPrice: '',
      newStock: '',
      formData: {
        id: null,
        name: '',
        description: '',
        price: 0,
        stock: 0
      }
    }
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await api.getProduct()
        this.products = response.data.data
      } catch (error) {
        console.error('Error fetch products', error)
      }
    },

    openAdd() {
      this.showAdd = true
    },
    closeAdd() {
      this.showAdd = false,
        this.newName = ''
      this.newDescription = ''
      this.newCatId = ''
      this.newPrice = ''
      this.newStock = ''
    },

    async addProducts() {
      try {
        const response = await api.addProduct({
          name: this.newName,
          description: this.newDescription,
          category_id: this.newCatId,
          price: this.newPrice,
          stock: this.newStock
        });
        console.log(response);  // Check the actual response from the API
        if (response.status === 200 && response.data.data) {
          this.products.push(response.data.data);
          alert('Product added successfully.');
          this.closeAdd();
        } else {
          alert('Failed to add Product.');
        }
      } catch (error) {
        console.error('Error adding product:', error);
        alert('An error occurred while adding the product.');
      }
    },

    async destroyProduct(id) {
      if (confirm('Are you sure you want to delete this product?')) {
        try {
          const response = await api.destroyProduct(id)
          if (response.status === 200) {
            this.products = this.products.filter((product) => product.id !== id)
            alert('Product deleted successfully.')
          } else {
            alert('Failed to delete product.')
          }
        } catch (error) {
          console.error('Error deleting product:', error)
          alert('An error occurred while deleting the product.')
        }
      }
    },

    openEdit(product) {
      this.formData.id
    }


  }

}
</script>