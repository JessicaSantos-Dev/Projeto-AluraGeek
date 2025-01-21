const BASE_URL = "https://675dd40663b05ed07978eeaf.mockapi.io/products";

const productList = async () => {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Erro ao buscar produto: ", error);
    }
};

const createProduct = async (name, price, image) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, price, image})
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Erro ao criar produto: ", error)
    }
}

const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error("Erro ao excluir o produto");
        }
    } catch (error) {
        console.log("Erro ao excluir produto: ", error);
        throw error;
    }
};

export const servicesProducts = {
    productList,
    createProduct,
    deleteProduct, // Adicionando a nova função no objeto exportado
};