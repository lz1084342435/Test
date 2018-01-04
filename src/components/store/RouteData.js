
const RouteData=[
    {
        name: "销售管理",
        path: "/nest/app/sales",
        key: "1",
        parentKey: "sub1",
        data: [
            { name: "销售管理", path: "/nest/app/sales" }
        ]
    },
    {
        name: "合同管理",
        path: "/nest/app/sales/SaleDescription",
        key: "16",
        parentKey: "sub1",
        data: [
            { name: "销售管理", path: "/nest/app/sales" },
            { name: "合同管理", path: "/nest/app/sales/SaleDescription" },
        ]
    },
    {
        name: "新增合同",
        path: "/nest/app/sales/addSale",
        key: "17",
        parentKey: "sub1",
        data: [
            { name: "销售管理", path: "/nest/app/sales" },
            { name: "新增合同", path: "/nest/app/sales/addSale" },
        ]
    },
];