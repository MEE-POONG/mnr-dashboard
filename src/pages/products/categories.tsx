import { Categories } from "@prisma/client";
import useAxios from "axios-hooks";
import { useEffect, useState } from "react";


interface Params {
    page: number;
    pageSize: number;
    searchKey: string;
    totalPages: number;
}


const CategoryEdit: React.FC = () => {
    const [params, setParams] = useState<Params>({
        page: 1,
        pageSize: 10,
        searchKey: "",
        totalPages: 1,
    });


    const [
        { data: categoriesData },
        getCategories
    ] = useAxios({
        url: `/api/categories?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchKey}`,
        method: "GET",
    });

    const [
        { data: productsData },
        getProducts
      ] = useAxios({
        url: `/api/products?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchKey}`,
        method: "GET",
      });


    const [filteredcategoryData, setFilteredcategoryData] = useState<Categories[]>([]);
    

    useEffect(() => {
        getCategories();
        getProducts();
      }, [params]);

    useEffect(() => {
        setFilteredcategoryData(categoriesData?.categories ?? []);
    }, [categoriesData]);


    


    return (


        <div>
            <div className="flex justify-between mx-2 ">
                <h2 className="font-semibold text-2xl">รายการประเภทสินค้า</h2>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs lg:text-sm text-gray-50 uppercase bg-gray-950 ">
                        <tr>
                            <th scope="col" className="py-3 px-4 lg:px-px text-center border-r">No.</th>
                            <th scope="col" className="px-6 py-3">
                                Category Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Stock
                            </th>
                            <th scope="col" className="">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {filteredcategoryData.map((categories, index) => (

                            <tr key={categories.id} className="bg-white border-b ">
                                <td className="text-center border-r">{index + 1}</td>
                                <th className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap">
                                    {categories.name}
                                </th>
                                <td className="px-6 py-3">
                                    <span className="ml-3 rounded-full bg-yellow-100 py-1 px-3 text-xs text-yellow-900 font-semibold">
                                        2
                                    </span>
                                </td>

                                <td className="px-6 py-3 flex">

                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>

    )
}
export default CategoryEdit;