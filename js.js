document.addEventListener('DOMContentLoaded', function() {
  const apiUrl = 'https://dummyjson.com/recipes';
  let recipesData = [];
  const initialRecipesCount = 8;
  let showingAllRecipes = false;

  // Fetching data from API
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          if (data.recipes && data.recipes.length > 0) {
              recipesData = data.recipes;
              displayRecipes(recipesData.slice(0, initialRecipesCount));
          } else {
              console.error('No recipes found');
          }
      })
      .catch(error => console.error('Error fetching recipes:', error));

  // Function to display recipes
  function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipeContainer');
    recipeContainer.innerHTML = ''; // Bersihkan kontainer

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        
        // Menggunakan kelas Bootstrap yang lebih lengkap untuk responsif
        recipeCard.className = 'col-12 col-sm-12 col-md-4 col-lg-3 mb-4';

        recipeCard.innerHTML = `
            <div class="card h-100 recipe-card">
                <img src="${recipe.image || 'https://via.placeholder.com/100'}" class="card-img-top" alt="${recipe.name || 'No Title'}">
                <div class="card-body">
                    <p class="card-text text-center">Rating: ${recipe.rating || 'No Rating'} ⭐</p>
                    <h5 class="card-title text-center">${recipe.name || 'No Title Available'}</h5>
                </div>
                <div class="card-overlay text-center">
                    <button class="btn btn-success view-recipe-btn" data-bs-toggle="modal" data-bs-target="#recipeModal" 
                        onclick='showRecipeDetails(${JSON.stringify(recipe)})'>
                        View Recipe
                    </button>
                </div>
            </div>
        `;

        // Tambahkan card ke dalam container
        recipeContainer.appendChild(recipeCard);
    });
}



 window.showRecipeDetails = function(recipe) {
  // Judul dan gambar
  document.getElementById('modalRecipeTitle').innerText = recipe.name || 'No Title Available';
  document.getElementById('modalRecipeImage').src = recipe.image || 'https://via.placeholder.com/300';

  // Tampilkan ingredients
  const ingredientsList = document.getElementById('modalIngredientsList');
  ingredientsList.innerHTML = ''; // Bersihkan daftar sebelumnya
  (recipe.ingredients || []).forEach(ingredient => {
      const li = document.createElement('li');
      li.innerText = ingredient;
      ingredientsList.appendChild(li);
  });

   // Tampilkan instructions
   const instructionsList = document.getElementById('modalInstructionsList');
   instructionsList.innerHTML = ''; // Bersihkan daftar sebelumnya
   (recipe.instructions || []).forEach(instruction => {
       const li = document.createElement('li');
       li.innerText = instruction;
       instructionsList.appendChild(li);
   });

  // Informasi umum
  document.getElementById('modalPrepTime').innerText = recipe.prepTimeMinutes || 'N/A';
  document.getElementById('modalCookTime').innerText = recipe.cookTimeMinutes || 'N/A';
  document.getElementById('modalServings').innerText = recipe.servings || 'N/A';
  document.getElementById('modalDifficulty').innerText = recipe.difficulty || 'N/A';
  document.getElementById('modalCuisine').innerText = recipe.cuisine || 'N/A';
  document.getElementById('modalCalories').innerText = recipe.caloriesPerServing || 'N/A';
  document.getElementById('modalReviewCount').innerText = recipe.reviewCount || 'N/A';
  document.getElementById('modalMealType').innerText = recipe.mealType ? recipe.mealType.join(', ') : 'N/A';

}

  // Toggle function for showing all recipes
  window.toggleRecipes = function() {
      if (showingAllRecipes) {
          displayRecipes(recipesData.slice(0, initialRecipesCount));
          document.getElementById('toggleBtn').innerText = 'See More';
      } else {
          displayRecipes(recipesData);
          document.getElementById('toggleBtn').innerText = 'See Less';
      }
      showingAllRecipes = !showingAllRecipes;
  }
});

  
    // JavaScript to handle navbar background change on scroll
  window.addEventListener("scroll", () => {
      const navbar = document.querySelector(".navbar");
      
      if (window.scrollY > 0) {
          navbar.classList.add("navbar-scrolled");
      } else {
          navbar.classList.remove("navbar-scrolled");
      }
  });
  

  // testimoni 
  var swiper = new Swiper('.mySwiper', {
    slidesPerView: 1,
    
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      clickable: true, // Membuat bullet bisa diklik
    },
    breakpoints: {
      576: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 40
      }
    },
    autoHeight: true,
    slidesPerGroup: 1,
  });
  
window.addEventListener('load', function() {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    document.querySelector('#home').style.paddingTop = `${navbarHeight}px`;
});

