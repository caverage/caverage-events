import Vue from "vue";
import Router from "vue-router";

import RouterComponent from "./components/RouterComponent.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "start" */ "./views/main/Start.vue"),
      children: [
        {
          path: "register",
          component: () =>
            import(/* webpackChunkname: "register" */ "./views/Register.vue"),
        },
        {
          path: "login",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "login" */ "./views/Login.vue"),
        },
        {
          path: "login-code/:code",
          alias: "lc/:code",
          component: () =>
            import(
              /* webpackChunkName: "login-code" */ "./views/LoginCode.vue"
            ),
        },
        {
          path: "recover-password",
          component: () =>
            import(
              /* webpackChunkName: "recover-password" */ "./views/PasswordRecovery.vue"
            ),
        },
        {
          path: "reset-password",
          component: () =>
            import(
              /* webpackChunkName: "reset-password" */ "./views/ResetPassword.vue"
            ),
        },
        {
          path: "main",
          component: () =>
            import(/* webpackChunkName: "main" */ "./views/main/Main.vue"),
          children: [
            {
              path: "dashboard",
              component: () =>
                import(
                  /* webpackChunkName: "main-dashboard" */ "./views/main/Dashboard.vue"
                ),
            },
            {
              path: "profile",
              component: RouterComponent,
              redirect: "profile/view",
              children: [
                {
                  path: "view",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-profile" */ "./views/main/profile/UserProfile.vue"
                    ),
                },
                {
                  path: "edit",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-profile-edit" */ "./views/main/profile/UserProfileEdit.vue"
                    ),
                },
                {
                  path: "password",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-profile-password" */ "./views/main/profile/UserProfileEditPassword.vue"
                    ),
                },
              ],
            },
            {
              path: "admin",
              component: () =>
                import(
                  /* webpackChunkName: "main-admin" */ "./views/main/admin/Admin.vue"
                ),
              redirect: "admin/users/all",
              children: [
                {
                  path: "users",
                  redirect: "users/all",
                },
                {
                  path: "users/all",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-admin-users" */ "./views/main/admin/AdminUsers.vue"
                    ),
                },
                {
                  path: "users/view/:id",
                  name: "main-admin-users-view",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-admin-users-view" */ "./views/main/admin/AdminUser.vue"
                    ),
                },
                {
                  path: "users/edit/:id",
                  name: "main-admin-users-edit",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-admin-users-edit" */ "./views/main/admin/EditUser.vue"
                    ),
                },
                {
                  path: "users/create",
                  name: "main-admin-users-create",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-admin-users-create" */ "./views/main/admin/CreateUser.vue"
                    ),
                },
                {
                  path: "events",
                  redirect: "events/all",
                },
                {
                  path: "events/all",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-admin-events" */ "./views/main/admin/AdminEvents.vue"
                    ),
                },
                {
                  path: "events/:id",
                  name: "main-admin-events-view",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-admin-events-view" */ "./views/main/admin/AdminEvent.vue"
                    ),
                },
                {
                  path: "events/edit/:id",
                  name: "main-admin-events-edit",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-admin-events-edit" */ "./views/main/admin/EditEvent.vue"
                    ),
                },
                {
                  path: "events/create",
                  name: "main-admin-events-create",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-admin-events-create" */ "./views/main/admin/CreateEvent.vue"
                    ),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/*",
      redirect: "/",
    },
  ],
});
