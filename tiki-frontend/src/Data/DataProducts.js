import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../services/ProductService";

const DataProducts = async () => {
  const fetchAllProduct = async () => {
    const res = await ProductService.getAllProduct();
    console.log("res", res);
    return res;
  };
  const { isLoading, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProduct,
    retry: 3,
    retryDelay: 1000,
  });
  const Data = products.data;
  return Data;
};

export default DataProducts;
