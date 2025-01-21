import { servicesProducts } from "../services/products-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");
const buttonClean = document.querySelector(".button-clean");  // Seleciona o botão Limpar


// Função para criar o card de produto
function createCard({name, price, image, id}) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="product-card" id="${id}">
            <div class="container-img">
            <img class="star-wars-img" src="${image}" />
            </div>

        <div class="title-product">${name}</div>
            <div class="container-value">
                <div class="value">R$ ${price}</div>
                <!-- Botão envolvendo a imagem da lixeira -->
                <button class="icon-trash-button">
                    <img class="icon-trash" src="assets/trash.png" alt="Imagem lixeira"/>
                </button>
            </div>
    `;



        // Adicionando o evento de exclusão
        const deleteButton = card.querySelector(".icon-trash-button");
        deleteButton.addEventListener("click", async () => {

            const confirmDelete = confirm("Você tem certeza que deseja excluir este produto?");

            if (confirmDelete) {
                try {
                    console.log(`Tentando excluir o produto com ID: ${id}`); // Confirmação no console

                    // Deletar produto da API
                    await servicesProducts.deleteProduct(id);

                    // Remover o card da interface
                    card.remove();
                    console.log(`Produto com ID ${id} excluído com sucesso!`);
                } catch (error) {
                    alert("Erro ao excluir o produto. Tente novamente.");
                    console.error(error);
                }
            }
});

    return card
}

// Função para renderizar os produtos
    const renderProducts = async () => {
        try {
            const listProducts= await servicesProducts.productList();
            listProducts.forEach((product) => {
                const productCard = createCard(product);
                productContainer.appendChild(productCard);
            });

        } catch (error) {
            console.log(error);
        }
};

// Evento de submit do formulário para adicionar produtos
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

        try {
            const newProduct = await servicesProducts.createProduct(name, price, image);
            const newCard = createCard(newProduct);
            productContainer.appendChild(newCard);
        } catch (error) {
            alert("Erro ao adicionar o produto. Tente novamente.");
            console.log(error)
        }
});

// Evento para o botão "Limpar"
    buttonClean.addEventListener("click", (event) => {
        event.preventDefault();  // Impede o envio do formulário ao clicar em Limpar
        form.reset();  // Limpa os campos do formulário
});


renderProducts();