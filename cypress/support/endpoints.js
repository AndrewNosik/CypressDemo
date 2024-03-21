export const endpoints = {
  path: {
    child: "/endpoint",
    child2: (id) => `/endpoint/${id}`
  },
  pet: {
    delete: (petId) => `/pet/${petId}`,
    pet: "/pet",
    findByStatus: "/pets/findByStatus"
  },
  store: {
    order: "/store/order",
    inventory: "/store/inventory"
  },
  user: {
    create: "/user", 
    login: "/user/login",
    logout: "/user/logout",
    byUsername: (username) => `/user/${username}`,
  }
}