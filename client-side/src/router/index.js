import { createRouter, createWebHistory, useRouter } from 'vue-router'
import userAuthStore from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'public',
      redirect: {
        name: 'home'
      },
      component: () => import('../views/PublicView.vue'),
      meta: {
        requireAuth: false
      },
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/Public/HomeView.vue')
        },
        {
          path: '/search',
          name: 'search',
          component: () => import('../views/Public/SearchView.vue'),
          meta: {
            requireAuth: false
          },
        },
        {
          path: '/mobil/:kodeMobil',
          name: 'publicCarDetail',
          component: () => import('../views/Public/DetailCarView.vue'),
          meta: {
            requireAuth: false
          }
        }
      ]
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
          },
        },

        // Car Path
        {
          path: 'master/cars',
          name: 'cars',
          component: () => import('../views/Admin/Cars/CarsView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales']
          },
        },
        {
          path: 'master/cars/create',
          name: 'create car',
          component: () => import('../views/Admin/Cars/CreateCarView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin']
          },
        },
        {
          path: 'master/cars/:kodeMobil/edit',
          name: 'edit car',
          component: () => import('../views/Admin/Cars/EditCarView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin']
          },
        },
        {
          path: 'master/cars/:kodeMobil',
          name: 'detail car',
          component: () => import('../views/Admin/Cars/DetailCarView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales']
          },
        },

        // User Path
        {
          path: 'master/users',
          name: 'users',
          component: () => import('../views/Admin/Users/UsersView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin']
          },
        },
        {
          path: 'master/users/create',
          name: 'create user',
          component: () => import('../views/Admin/Users/CreateUserView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin']
          },
        },
        {
          path: 'master/users/:kodeUser',
          name: 'detail user',
          component: () => import('../views/Admin/Users/DetailUserView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin']
          },
        },

        // Customer Path
        {
          path: 'master/customers',
          name: 'customers',
          component: () => import('../views/Admin/Customers/CustomersView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales']
          },
        },
        {
          path: 'master/customers/create',
          name: 'create customer',
          component: () => import('../views/Admin/Customers/CreateCustomerView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales']
          },
        },
        {
          path: 'master/customers/:nik',
          name: 'detail customer',
          component: () => import('../views/Admin/Customers/DetailCustomerView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales']
          },
        },
        {
          path: 'master/customers/:nik/edit',
          name: 'edit customer',
          component: () => import('../views/Admin/Customers/EditCustomerView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales']
          },
        },

        // Credit Package Path
        {
          path: 'master/credit-packages',
          name: 'credit packages',
          component: () => import('../views/Admin/Credit Packages/CreditPackagesView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales', 'Finance']
          },
        },
        {
          path: 'master/credit-packages/create',
          name: 'create credit package',
          component: () => import('../views/Admin/Credit Packages/CreateCreditPackagesView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Finance']
          },
        },
        {
          path: 'master/credit-packages/:kodePaketKredit',
          name: 'detail credit package',
          component: () => import('../views/Admin/Credit Packages/DetailCreditPackagesView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Finance']
          },
        },

        // Cash Path
        {
          path: 'transactions/cash',
          name: 'cash transactions',
          component: () => import('../views/Admin/Cash/CashView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales', 'Finance']
          },
        },
        {
          path: 'transactions/cash/create',
          name: 'create cash transaction',
          component: () => import('../views/Admin/Cash/CreateCashView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales']
          },
        },
        {
          path: 'transactions/cash/:kodeTransaksi',
          name: 'detail cash transaction',
          component: () => import('../views/Admin/Cash/DetailCashTransactionView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales', 'Finance']
          },
        },

        // Credit Transactions
        {
          path: 'transactions/credit',
          name: 'credit transactions',
          component: () => import('../views/Admin/Credit/CreditTransactionsView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales', 'Finance']
          },
        },
        {
          path: 'transactions/credit/create',
          name: 'create credit transaction',
          component: () => import('../views/Admin/Credit/CreateCreditTransactionView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales']
          },
        },
        {
          path: 'transactions/credit/:kodeTransaksi',
          name: 'detail credit transaction',
          component: () => import('../views/Admin/Credit/DetailCreditTransactionView.vue'),
          meta: {
            requireAuth: true,
            requireAdmin: ['Super Admin', 'Sales', 'Finance']
          },
        },
      ]
    },

    {
      path: '/print',
      name: 'print file',
      component: () => import('../views/Report/PrintFileView.vue'),
      meta: {
        requireAuth: true,
        requireAdmin: ['Super Admin', 'Finance']
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        requireGuest: true
      },
      // beforeEnter: (to, from, next) => {
      //   const router = useRouter();
      //   const store = userAuthStore();
      //   // console.log(store.getAccessToken, 'Before Enter')
      //   next()
      //   // if (to.meta.requireGuest && store.getAccessToken) {
      //   //   router.push({
      //   //     name: 'home'
      //   //   });
      //   // } else {
      //   //   next();
      //   // }
      // }
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: () => import('../views/ForbiddenView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = userAuthStore();
  const user = store.getUserInfo();

  if (to.meta.requireAuth && !store.isAuthenticated()) {
    
    // If doesn't login
    next({
      name: 'login'
    });

  } else if (to.meta.requireGuest && store.isAuthenticated()) {
    
    // if user has login and want to access login page
    next({
      name: 'admin'
    });

  } else if (!to.matched.length) {
    
    // if user try to access not defined page/route
    next({
      name: 'not found'
    });

  } else if (to.meta.requireAdmin && !to.meta.requireAdmin.includes(user.status)) {
    
    // if user does not have access to page/route
    next({
      name: 'forbidden'
    });

  } else {

    next();

  }

});

export default router;
