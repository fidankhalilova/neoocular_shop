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

//  Filter
function renderFilters(products) {
    // Categories
    const categories = [...new Set(products.flatMap(p => p.product_categories.map(c => c.name)))];
    document.getElementById("categories").innerHTML = categories.map(cat => `
    <li class="flex justify-between hover:text-gray-900 cursor-pointer filter-category" data-name="${cat}">
        <span>${cat}</span>
    </li>
        `).join('') + '<li class="text-gray-500 hover:underline cursor-pointer">+ View more</li>';

    // Availability
    document.getElementById("availability").innerHTML = `
    <li class="flex justify-between hover:text-gray-900 cursor-pointer filter-stock" data-stock="instock">
        <span>In stock</span>
    </li>
    <li class="flex justify-between text-gray-400 cursor-not-allowed filter-stock" data-stock="outstock">
        <span>Out of stock</span>
    </li>
    `;

    // Colors
    const colors = [...new Set(products.flatMap(p => p.product_colors.map(c => c.name)))];
    document.getElementById("colors").innerHTML = colors.map(color => `
    <button class="h-5 w-5 rounded-full border border-gray-300 filter-color" 
    style="background-color:${color}" data-color="${color}"></button>
    `).join('');

    // Sizes
    const sizes = [...new Set(products.flatMap(p => p.product_sizes.map(s => s.name)))];
    document.getElementById("sizes").innerHTML = sizes.map(size => `
    <button class="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-100 filter-size" data-size="${size}">
    ${size} <span class="text-gray-400">(${products.filter(p => p.product_sizes.some(s2 => s2.name === size)).length})</span>
    </button>
    `).join('');
    // flatMap-hər məhsulun rəngləri və ölçüləri bir array olaraq düzləşdirilsin və sonra unikal dəyərlər çıxarılsın.
}

// filter klik
function addFilterListeners() {
    const selectedCategories = new Set();
    const selectedStocks = new Set();
    const selectedColors = new Set();
    const selectedSizes = new Set();

    function applyFilters() {
        let filtered = [...allProducts];

        if (selectedCategories.size > 0) {
            filtered = filtered.filter(p => p.product_categories.some(c => selectedCategories.has(c.name)));
        }
        if (selectedStocks.size > 0) {
            filtered = filtered.filter(p => {
                const stockNames = p.product_stocks.map(s => s.name === "instock" ? "instock" : "outstock");
                return [...selectedStocks].some(stock => stockNames.includes(stock));
            });
        }
        if (selectedColors.size > 0) {
            filtered = filtered.filter(p => p.product_colors.some(c => selectedColors.has(c.name)));
        }
        if (selectedSizes.size > 0) {
            filtered = filtered.filter(p => p.product_sizes.some(s => selectedSizes.has(s.name)));
        }

        renderProducts(filtered);
    }

    //Category
    document.querySelectorAll(".filter-category").forEach(el => {
        el.addEventListener("click", () => {
            const name = el.dataset.name;
            if (selectedCategories.has(name)) selectedCategories.delete(name);
            else selectedCategories.add(name);
            el.classList.toggle("bg-gray-200");
            applyFilters();
        });
    });

    //Stock
    document.querySelectorAll(".filter-stock").forEach(el => {
        el.addEventListener("click", () => {
            const stock = el.dataset.stock;
            if (selectedStocks.has(stock)) selectedStocks.delete(stock);
            else selectedStocks.add(stock);
            el.classList.toggle("bg-gray-200");
            applyFilters();
        });
    });

    //  Color
    document.querySelectorAll(".filter-color").forEach(el => {
        el.addEventListener("click", () => {
            const color = el.dataset.color;
            if (selectedColors.has(color)) selectedColors.delete(color);
            else selectedColors.add(color);
            el.classList.toggle("ring-2", "ring-gray-500");
            applyFilters();
        });
    });

    // Size
    document.querySelectorAll(".filter-size").forEach(el => {
        el.addEventListener("click", () => {
            const size = el.dataset.size;
            if (selectedSizes.has(size)) selectedSizes.delete(size);
            else selectedSizes.add(size);
            el.classList.toggle("bg-gray-200");
            applyFilters();
        });
    });
}
getApiData();