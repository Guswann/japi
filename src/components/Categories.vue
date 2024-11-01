<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1 class="text-center mb-4">List of Categories</h1>

        <div class="mb-4 text-center">
          <button class="btn btn-success" @click="openAddCategory">Tambah Data</button>
        </div>

        <div v-if="categories.length" class="list-group">
          <div v-for="category in categories" :key="category.id"
            class="list-group-item list-group-item-action mb-3 shadow-sm">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="mb-1">
                <strong>{{ category.name }}</strong>
              </h5>
              <small class="text-muted">
                Updated at: {{ new Date(category.updated_at).toLocaleString() }}
              </small>
            </div>
            <p class="mb-1">Created at: {{ new Date(category.created_at).toLocaleString() }}</p>
            <div class="mt-2">
              <button class="btn btn-warning btn-sm" @click="openEditCategory(category)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="destroyCategory(category.id)">
                Delete
              </button>
            </div>
          </div>
        </div>

        <div v-else class="alert alert-info text-center">No categories available.</div>
      </div>
    </div>

    <!-- Add Modal -->
    <div class="modal" tabindex="-1" style="display: block" v-if="showAddCategory">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tambah Kategori</h5>
            <button type="button" class="btn-close" @click="closeAddCategory"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addCategory">
              <div class="mb-3">
                <label for="newCategoryName" class="form-label">Nama Kategori</label>
                <input type="text" class="form-control" id="newCategoryName" v-model="newCategoryName" required />
              </div>
              <button type="submit" class="btn btn-success">Tambah</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div class="modal" tabindex="-1" style="display: block" v-if="showEditCategory">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Category</h5>
            <button type="button" class="btn-close" @click="closeEditCategory"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateCategory">
              <div class="mb-3">
                <label for="categoryName" class="form-label">Category Name</label>
                <input type="text" class="form-control" id="categoryName" v-model="formData.name" required />
              </div>
              <button type="submit" class="btn btn-primary">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import api from '@/services/api';

export default {
  name: 'CategoryList',
  data() {
    return {
      categories: [],
      showAddCategory: false,
      showEditCategory: false,
      newCategoryName: '', // Define newCategoryName
      formData: {
        id: null,
        name: ''
      },
      intervalId: null
    }
  },
  mounted() {
    this.fetchCategories();
    this.intervalId = setInterval(this.fetchCategories, 5000)
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await api.getCategories();
        this.categories = response.data.data;
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    },
    async addCategory() {
      try {
        const response = await api.addCategory({ name: this.newCategoryName });

        // Check if the request was successful using HTTP status or existence of data
        if (response.status === 201 && response.data.data) {
          this.categories.push(response.data.data); // Add category to list
          alert('Category Added Successfully.');
          this.closeAddCategory(); // Close modal and clear input
        } else {
          alert('Failed to Add Category');
        }
      } catch (error) {
        console.error('Error adding category: ', error);
        alert('An error occurred while adding category.');
      }
    },
    openAddCategory() {
      this.showAddCategory = true;
    },
    closeAddCategory() {
      this.showAddCategory = false;
      this.newCategoryName = ''; // Clear input field when modal is closed
    },
    async destroyCategory(id) {
      if (confirm("U sure to delete a category?")) {
        try {
          const response = await api.destroyCategory(id)
          if (response.status === 200) {
            this.categories = this.categories.filter((category) => category.id !== id)
            alert("deleted successfuly")
          } else {
            alert('Category not found.')
          }
        } catch (error) {
          console.error('Error deleting category:', error)
          alert('An error occurred while deleting the category.')
        }
      }
    },
    openEditCategory(category) {
      this.formData.id = category.id
      this.formData.name = category.name
      this.showEditCategory = true
    },
    closeEditCategory() {
      this.showEditCategory = false
      this.formData = { id: null, name: '' }
    },
    async updateCategory() {
      try {
        const response = await api.updateCategory(this.formData.id, {
          name: this.formData.name
        })
        if (response.status === 200) {
          this.categories = this.categories.map((category) =>
            category.id === this.formData.id ? response.data.data : category
          )
          alert('Category Updated Successfully')
        } else {
          alert('Category not found')
        }
      } catch (error) {
        console.error('Error updating category', error)
        alert('An error occurred while updating the category.')
      }
    }
  }
}
</script>
