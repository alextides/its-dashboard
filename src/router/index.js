import Vue from 'vue'
import VueRouter from 'vue-router'

// New Imports
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getHomeRouteForLoggedInUser } from '@/auth/utils'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        action: 'read',
        resource: 'Home',
      },
    },
    {
      path: '/course-finder',
      name: 'course-finder',
      component: () => import('@/views/CourseFinder.vue'),
      meta: {
        action: 'read',
        resource: 'CourseFinder',
      },
    },
    {
      path: '/basic-school-db',
      name: 'basic-school-db',
      component: () => import('@/views/SchoolDB/BasicSchool.vue'),
      meta: {
        action: 'read',
        resource: 'SchoolDB',
      },
    },
    {
      path: '/featured-school-db',
      name: 'featured-school-db',
      component: () => import('@/views/SchoolDB/FeaturedSchool.vue'),
      meta: {
        action: 'read',
        resource: 'SchoolDB',
      },
    },
    {
      path: '/exam-forms',
      name: 'exam-forms',
      component: () => import('@/views/ExamForm/ExamForm.vue'),
      meta: {
        action: 'read',
        resource: 'ExamForms',
      },
    },
    {
      path: '/form-subjects/:fid',
      name: 'form-subjects',
      component: () => import('@/views/ExamForm/FormSubjects.vue'),
      meta: {
        action: 'read',
        resource: 'ExamForms',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
        action: 'read',
        resource: 'Auth',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
        action: 'read',
        resource: 'Auth',
      },
    },
    {
      path: '/not-authorized',
      name: 'not-authorized',
      // ! Update import path
      component: () => import('@/views/error/NotAuthorized.vue'),
      meta: {
        layout: 'full',
        action: 'read',
        resource: 'Auth',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// Router Before Each hook for route protection
router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()

  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    // ! We updated login route name here from `auth-login` to `login` in starter-kit
    if (!isLoggedIn) return next({ name: 'login' })

    // If logged in => not authorized
    return next({ name: 'not-authorized' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    next(getHomeRouteForLoggedInUser())
  }

  return next()
})

export default router
