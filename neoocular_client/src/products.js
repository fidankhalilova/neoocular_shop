import axios from "axios";
const AxiosInstance = axios.create({
    baseURL: "http://localhost:1337/api",
    timeout: 1000,
});

const getApiData = async (endpoint) => {
    try {
        const response = await AxiosInstance.get(endpoint);
        return response;
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw error;
    }
};

const ProductListHtmlView = document.querySelector("#productlist");

const renderProductList = (products) => {
    products?.map((product) => {
        ProductListHtmlView.innerHTML += `
    <div id="product" class=" flex flex-col gap-4 justify-center items-center py-6">
                        <div id="prod-img">
                            <img src=${`http://localhost:1337${product.image.url}`}
                                alt="" class="w-[400px] h-[216px] object-cover">
                        </div>
                        <h1 class="uppercase tracking-wide font-semibold">${product.name}</h1>
                        <h3 class="font-light">Classic style / Round</h3>
                        <p class="text-[17px]">$${product.discountedPrice}</p>
                        <div class="flex justify-center items-center gap-6">
                            <i class="ri-heart-line text-[20px] font-light"></i>
                            <i class="ri-shopping-cart-line text-[20px] font-light"></i>
                            <div onclick="openModal()">
                                <i class="ri-eye-line text-[20px] font-light"></i>
                            </div>
                            <div id="overlay" class="fixed inset-0 bg-black/50 hidden z-40"></div>

                            <div id="modal" class="fixed inset-0 flex items-center justify-center hidden z-50">
                                <div class="bg-white w-[90%] max-w-4xl rounded-lg shadow-lg relative">

                                    <button class="absolute top-4 right-4 text-gray-500 hover:text-black"
                                        onclick="closeModal()">✕</button>

                                    <div class="grid grid-cols-1 md:grid-cols-2">

                                        <div class="p-6 flex justify-center items-center">
                                            <img src=${`http://localhost:1337${product.image.url}`}
                                                alt="Product" class="rounded-lg">
                                        </div>

                                        <div class="p-6 space-y-4">
                                            <h2 class="text-2xl font-semibold">${product.name}</h2>
                                            <p class="text-sm text-gray-500">By Wpbingo</p>
                                            <p class="text-gray-400 line-through">$${product.discountedPrice.toFixed(2)}</p>
                                            <p class="text-xl font-bold text-red-600">$${product.originalPrice.toFixed(2)}</p>
                                            <p class="text-gray-600 text-sm">
                                                ${product.desc}
                                            </p>

                                            <div>
                                                <p class="text-sm mb-2">Color:</p>
                                                <div class="flex gap-2">
                                                    <button class="w-8 h-8 border rounded-full bg-gray-400"></button>
                                                    <button class="w-8 h-8 border rounded-full bg-yellow-400"></button>
                                                </div>
                                            </div>

                                            <p class="text-green-600 text-sm">✔ In stock</p>

                                            <div class="flex gap-2 items-center">
                                                <input type="number" value="1"
                                                    class="w-16 border rounded-lg text-center p-2">
                                                <button
                                                    class="flex-1 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>`;

    });
};

getApiData("/products?populate=*").then((res) => {
    console.log(res?.data?.data);
    renderProductList(res?.data?.data);
});