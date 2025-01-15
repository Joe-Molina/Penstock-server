export const PAHTS = {

  // dashboard
  DASHBOARD: '/dashboard',
  DASHBOARD_CLIENTES: '/dashboard/clientes',
  DASHBOARD_VENDEDORES: '/dashboard/vendedores',
  DASHBOARD_PRODUCTOS: '/dashboard/productos',
  DASHBOARD_CATEGORIAS_PRODUCTOS: '/dashboard/products/categorys',
  DASHBOARD_PEDIDOS: '/dashboard/pedidos',
  DASHBOARD_VENTAS: '/dashboard/ventas',

  // auth 
  LOGIN: '/login',
}

export const PAHTS_API = {

  navAdmin: [
    {
      title: "Ver Catalogo",
      url: '#',
      // icon: ShoppingCart,
    },
    {
      title: "Administración de cuentas",
      url: "#",
      // icon: Users,
      isActive: true,
      items: [
        {
          title: "Clientes",
          url: PAHTS.DASHBOARD_CLIENTES,
        },
        {
          title: "Vendedores",
          url: PAHTS.DASHBOARD_VENDEDORES,
        }
      ],
    },
    {
      title: "Productos",
      url: PAHTS.DASHBOARD_PRODUCTOS,
    },
    {
      title: "Pedidos",
      url: "#",
      // icon: ShoppingCart,
      items: [{
        title: "Crear Pedido",
        url: PAHTS.DASHBOARD_PEDIDOS,
      }
      ],
    },
    {
      title: "Ventas",
      url: "#",
      // icon: Settings2,
      items: [
        {
          title: "ver ventas",
          url: "3",
        },
        {
          title: "ventas por cliente",
          url: "#",
        },
        {
          title: "ventas por vendedor",
          url: "#",
        }
      ],
    },
  ],

  navSeller: [
    {
      title: "Ver Catalogo",
      url: '#',
      // icon: ShoppingCart,
    },
    {
      title: "ver mis clientes",
      url: PAHTS.DASHBOARD_CLIENTES,
      // icon: Users,
      isActive: true,
    },
    {
      title: "Pedidos",
      url: "#",
      // icon: ShoppingCart,
      items: [{
        title: "Crear Pedido",
        url: PAHTS.DASHBOARD_PEDIDOS,
      }
      ],
    },
    {
      title: "Mis Ventas",
      url: "#",
      // icon: Settings2,
      items: [
        {
          title: "ver ventas",
          url: "3",
        },
        {
          title: "ventas por cliente",
          url: "#",
        }
      ],
    },
  ],

  navClient: [
    {
      title: "Ver Catalogo",
      url: '#',
      // icon: ShoppingCart,
    },
    {
      title: "Mis pedidos",
      url: PAHTS.DASHBOARD_PEDIDOS,
      // icon: ShoppingCart,
    },
    {
      title: "Historial de compras",
      url: "#",

    },
  ]

}