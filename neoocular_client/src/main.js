//  Filter
// function renderFilters(products) {
//     // Categories
//     const categories = [...new Set(products.flatMap(p => p.product_categories.map(c => c.name)))];
//     document.getElementById("categories").innerHTML = categories.map(cat => `
//     <li class="flex justify-between hover:text-gray-900 cursor-pointer filter-category" data-name="${cat}">
//         <span>${cat}</span>
//     </li>
//         `).join('') + '<li class="text-gray-500 hover:underline cursor-pointer">+ View more</li>';

//     // Availability
//     document.getElementById("availability").innerHTML = `
//     <li class="flex justify-between hover:text-gray-900 cursor-pointer filter-stock" data-stock="instock">
//         <span>In stock</span>
//     </li>
//     <li class="flex justify-between text-gray-400 cursor-not-allowed filter-stock" data-stock="outstock">
//         <span>Out of stock</span>
//     </li>
//     `;

//     // Colors
//     const colors = [...new Set(products.flatMap(p => p.product_colors.map(c => c.name)))];
//     document.getElementById("colors").innerHTML = colors.map(color => `
//     <button class="h-5 w-5 rounded-full border border-gray-300 filter-color" 
//     style="background-color:${color}" data-color="${color}"></button>
//     `).join('');

//     // Sizes
//     const sizes = [...new Set(products.flatMap(p => p.product_sizes.map(s => s.name)))];
//     document.getElementById("sizes").innerHTML = sizes.map(size => `
//     <button class="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-100 filter-size" data-size="${size}">
//     ${size} <span class="text-gray-400">(${products.filter(p => p.product_sizes.some(s2 => s2.name === size)).length})</span>
//     </button>
//     `).join('');
//     // flatMap-hər məhsulun rəngləri və ölçüləri bir array olaraq düzləşdirilsin və sonra unikal dəyərlər çıxarılsın.
// }

// // filter klik
// function addFilterListeners() {
//     const selectedCategories = new Set();
//     const selectedStocks = new Set();
//     const selectedColors = new Set();
//     const selectedSizes = new Set();

//     function applyFilters() {
//         let filtered = [...allProducts];

//         if (selectedCategories.size > 0) {
//             filtered = filtered.filter(p => p.product_categories.some(c => selectedCategories.has(c.name)));
//         }
//         if (selectedStocks.size > 0) {
//             filtered = filtered.filter(p => {
//                 const stockNames = p.product_stocks.map(s => s.name === "instock" ? "instock" : "outstock");
//                 return [...selectedStocks].some(stock => stockNames.includes(stock));
//             });
//         }
//         if (selectedColors.size > 0) {
//             filtered = filtered.filter(p => p.product_colors.some(c => selectedColors.has(c.name)));
//         }
//         if (selectedSizes.size > 0) {
//             filtered = filtered.filter(p => p.product_sizes.some(s => selectedSizes.has(s.name)));
//         }

//         renderProducts(filtered);
//     }

//     //Category
//     document.querySelectorAll(".filter-category").forEach(el => {
//         el.addEventListener("click", () => {
//             const name = el.dataset.name;
//             if (selectedCategories.has(name)) selectedCategories.delete(name);
//             else selectedCategories.add(name);
//             el.classList.toggle("bg-gray-200");
//             applyFilters();
//         });
//     });

//     //Stock
//     document.querySelectorAll(".filter-stock").forEach(el => {
//         el.addEventListener("click", () => {
//             const stock = el.dataset.stock;
//             if (selectedStocks.has(stock)) selectedStocks.delete(stock);
//             else selectedStocks.add(stock);
//             el.classList.toggle("bg-gray-200");
//             applyFilters();
//         });
//     });

//     //  Color
//     document.querySelectorAll(".filter-color").forEach(el => {
//         el.addEventListener("click", () => {
//             const color = el.dataset.color;
//             if (selectedColors.has(color)) selectedColors.delete(color);
//             else selectedColors.add(color);
//             el.classList.toggle("ring-2", "ring-gray-500");
//             applyFilters();
//         });
//     });

//     // Size
//     document.querySelectorAll(".filter-size").forEach(el => {
//         el.addEventListener("click", () => {
//             const size = el.dataset.size;
//             if (selectedSizes.has(size)) selectedSizes.delete(size);
//             else selectedSizes.add(size);
//             el.classList.toggle("bg-gray-200");
//             applyFilters();
//         });
//     });
// }
// getApiData();