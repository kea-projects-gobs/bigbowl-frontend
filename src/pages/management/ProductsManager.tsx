import { useEffect, useState } from "react";
import { getProducts, createProducts, updateProducts, deleteProducts, getCategories } from "../../services/api/api";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import { Product, Category } from "../../interfaces/interfaces";
import { Button } from "@/components/ui/button";

export function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit" | "delete">(
    "create"
  );

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const response = await getProducts();
    setProducts(response.data);
  };

  const fetchCategories = async () => {
    const response = await getCategories();
    setCategories(response.data);
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form with modalType:", modalType);
    console.log("Selected Product:", selectedProduct);
    console.log("Selected Category:", selectedCategory);
  
    if (modalType === "edit" && selectedProduct && selectedProduct.id) {
      console.log("Attempting to update product with ID:", selectedProduct.id);
      await updateProducts(selectedProduct.id, selectedProduct);
    } else if (modalType === "create" && selectedProduct) {
      console.log("Attempting to create product");
      await createProducts(selectedProduct);
    }
    await fetchProducts();
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedProduct(prev => {
      if (prev === null) {
        // if null, create new product object with default values and the updated field to satisfy TS...
        const newProduct: Product = {
          name: "",
          stock: 0,
          price: 0,
          description: "",
          imageUrl: "",
          productCategory: "",
          [name]: value,
        };
        return newProduct;
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  const openModal = (type: "create" | "edit" | "delete", product?: Product) => {
    setModalType(type);
    setSelectedProduct(product || null);
    setIsModalOpen(true);

    if (product) {
        const category = categories.find(c => c.name === product.productCategory);
        setSelectedCategory(category || null);
      } else {
        setSelectedCategory(null);
      }
  };

  const handleDelete = async () => {
    if (selectedProduct && selectedProduct.id) {
      await deleteProducts(selectedProduct.id);
      fetchProducts();
      setIsModalOpen(false);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const category = categories.find(category => category.name === value);
    setSelectedProduct(prev => {
      if (prev === null) {
        // If prev is null, create a new product with default values (to satisfy TS)
        return {
          name: "", 
          stock: 0, 
          price: 0, 
          description: "", 
          imageUrl: "", 
          productCategory: ""
        };
      } else {
        return {
          ...prev,
          productCategory: category ? category.name : ""
        };
      }
    });
    setSelectedCategory(category || null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold leading-tight text-gray-900">
        Administration
      </h1>
      <Button
        onClick={() => openModal("create")}
        className="mt-4 py-2 px-4 rounded"
      >
        Tilføj nyt produkt
      </Button>

      <ul className="mt-6">
        {products.map(product => (
          <li
            key={product.id}
            className="flex justify-between items-center bg-white shadow px-4 py-2 rounded-lg mt-2"
          >
            <span className="font-medium text-gray-800">
                {product.name}
            </span>
            <div>
              <Button
                onClick={() => openModal("edit", product)}
                variant="secondary"
                className="py-1 px-3 rounded mr-2 hover:bg-gray-200"
              >
                Rediger
              </Button>
              <Button
                onClick={() => openModal("delete", product)}
                variant="secondary"
                className="py-1 px-3 rounded hover:bg-gray-200"
              >
                Slet
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${
          modalType.charAt(0).toUpperCase() + modalType.slice(1)
        } Produkt`}
      >
        {modalType !== "delete" ? (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <InputField
              label="Navn"
              name="name"
              value={selectedProduct?.name ?? ""}
              onChange={handleInputChange}
              placeholder="Produkt navn"
              required
            />
            <InputField
              label="Inventar"
              name="stock"
              value={selectedProduct?.stock ?? ""}
              onChange={handleInputChange}
              placeholder="Stock"
              required
            />
            <InputField
              label="Pris"
              name="price"
              value={selectedProduct?.price ?? ""}
              onChange={handleInputChange}
              placeholder="Pris"
              required
            />
            <InputField
              label="Beskrivelse"
              name="description"
              value={selectedProduct?.description ?? ""}
              onChange={handleInputChange}
              placeholder="Beskrivelse"
            />
            <InputField
              label="Billede URL"
              name="imageUrl"
              value={selectedProduct?.imageUrl ?? ""}
              onChange={handleInputChange}
              placeholder="Billede URL"
            />
            <div>
              <label>Kategori</label>
              <select
                value={selectedCategory?.name ?? ""}
                onChange={handleCategoryChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Vælg en kategori</option>
                {categories.map(category => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              className="mt-4 py-2 px-4 rounded"
            >
              {modalType === "create" ? "Opret produkt" : "Gem ændringer"}
            </Button>
          </form>
        ) : (
          <div>
            <p className="text-lg mb-4">
              Er du sikker på at du vil slette dette produkt?
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-gray-800 font-semibold">
                <span className="text-blue-600">{selectedProduct?.name}</span>
              </h2>
            </div>
            <div className="flex justify-end items-center p-4 mt-4 border-t border-gray-200">
              <Button
                onClick={handleDelete}
                variant="destructive"
                className=" py-2 px-4 rounded-l"
              >
                Ja, slet
              </Button>
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="secondary"
                className=" py-2 px-4 rounded-r ml-2 hover:bg-gray-200"
              >
                Nej, gå tilbage
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
