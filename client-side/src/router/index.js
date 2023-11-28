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
        requireAuth: false
      }
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: {name: 'dashboard'},
      component: () => import('../views/AdminView.vue'),
      meta: {
        requireAuth: true,
        requireAdmin: ['Super Admin', 'Sales', 'Finance']
      },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/Admin/DashboardView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales', 'Finance']
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
          path: 'master/cars/:kodeMobil/edit',
          name: 'edit car',
          component: () => import('../views/Admin/Cars/EditCarView.vue'),
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
            requireAdmin: ['Super Admin', 'Sales', 'Finance']
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
        {
          path: 'master/customers/:nik/edit',
          name: 'edit customer',
          component: () => import('../views/Admin/Customers/EditCustomerView.vue'),
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
        },

        // Cash Path
        {
          path: 'transactions/cash',
          name: 'cash transactions',
          component: () => import('../views/Admin/Cash/CashView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales']
          }
        },
        {
          path: 'transactions/cash/create',
          name: 'create cash transaction',
          component: () => import('../views/Admin/Cash/CreateCashView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales']
          }
        },
        {
          path: 'transactions/cash/:kodeTransaksi',
          name: 'detail cash transaction',
          component: () => import('../views/Admin/Cash/DetailCashTransactionView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales']
          }
        },

        // Credit Transactions
        {
          path: 'transactions/credit',
          name: 'credit transactions',
          component: () => import('../views/Admin/Credit/CreditTransactionsView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales']
          }
        },
        {
          path: 'transactions/credit/create',
          name: 'create credit transaction',
          component: () => import('../views/Admin/Credit/CreateCreditTransactionView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales']
          }
        },
        {
          path: 'transactions/credit/:kodeTransaksi',
          name: 'detail credit transaction',
          component: () => import('../views/Admin/Credit/DetailCreditTransactionView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales']
          }
        },
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
  const store = userAuthStore();

  let _next;

  if (to.meta.requireAuth && !token) {
    _next = { name: 'login' }
  } else if (to.meta.requireGuest && token) {
    _next = { name: 'home' }
  }

  next(_next);
});

export default router
