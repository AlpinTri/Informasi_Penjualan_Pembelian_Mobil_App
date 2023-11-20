import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import userAuthStore from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: {name: 'dashboard'},
      component: () => import('../views/AdminView.vue'),
      meta: {
        requireAuth: true,
        requireAdmin: true
      },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/Admin/DashboardView.vue'),
          meta: {
            requireAuth: true,
          }
        },

        // Car Path
        {
          path: 'master/cars',
          name: 'cars',
          component: () => import('../views/Admin/Cars/CarsView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales']
          }
        },
        {
          path: 'master/cars/create',
          name: 'create car',
          component: () => import('../views/Admin/Cars/CreateCarView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin']
          }
        },
        {
          path: 'master/cars/:kodeMobil',
          name: 'detail car',
          component: () => import('../views/Admin/Cars/DetailCarView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales']
          }
        },

        // User Path
        {
          path: 'master/users',
          name: 'users',
          component: () => import('../views/Admin/Users/UsersView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin']
          }
        },
        {
          path: 'master/users/create',
          name: 'create user',
          component: () => import('../views/Admin/Users/CreateUserView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin']
          }
        },
        {
          path: 'master/users/:kodeUser',
          name: 'detail user',
          component: () => import('../views/Admin/Users/DetailUserView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin']
          }
        },

        // Customer Path
        {
          path: 'master/customers',
          name: 'customers',
          component: () => import('../views/Admin/Customers/CustomersView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales']
          }
        },
        {
          path: 'master/customers/create',
          name: 'create customer',
          component: () => import('../views/Admin/Customers/CreateCustomerView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales']
          }
        },
        {
          path: 'master/customers/:nik',
          name: 'detail customer',
          component: () => import('../views/Admin/Customers/DetailCustomerView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales']
          }
        },

        // Credit Package Path
        {
          path: 'master/credit-packages',
          name: 'credit packages',
          component: () => import('../views/Admin/Credit Packages/CreditPackagesView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin']
          }
        },
        {
          path: 'master/credit-packages/create',
          name: 'create credit package',
          component: () => import('../views/Admin/Credit Packages/CreateCreditPackagesView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin']
          }
        },
        {
          path: 'master/credit-packages/:kodePaketKredit',
          name: 'detail credit package',
          component: () => import('../views/Admin/Credit Packages/DetailCreditPackagesView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin']
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        requireGuest: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const storage = userAuthStore()
  const token = storage.getAccessToken
  let _next;
  if (to.meta.requireAuth && !token) {
    _next = { name: 'login' }
  } else if (to.meta.requireGuest && token) {
    _next = { name: 'home' }
  }

  next(_next);
});

export default router
