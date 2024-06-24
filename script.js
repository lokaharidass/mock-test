document.getElementById('ingredientForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const ingredients = document.getElementById('ingredientInput').value.trim();
    if (ingredients === '') {
      alert('Please enter at least one ingredient.');
      return;
    }
  
    fetchRecipes(ingredients);
  });
  
  async function fetchRecipes(ingredients) {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=10&apiKey=54b46465f1364681b6ef3945841f35d6`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      displayRecipes(data, ingredients);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }
  
  function displayRecipes(recipes, ingredients) {
    const resultsTitle = document.getElementById('resultsTitle');
    resultsTitle.textContent = `Recipes Using: ${ingredients}`;
  
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '';
  
    recipes.forEach(recipe => {
      const recipeCard = createRecipeCard(recipe);
      recipeList.appendChild(recipeCard);
    });
  
    document.getElementById('inputPage').style.display = 'none';
    document.getElementById('resultsPage').style.display = 'block';
  }
  
  function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.classList.add('recipe-card');
  
    const title = document.createElement('h3');
    title.textContent = recipe.title;
    card.appendChild(title);
  
    const image = document.createElement('img');
    image.src = recipe.image;
    image.alt = recipe.title;
    card.appendChild(image);
  
    const missingIngredients = document.createElement('p');
    missingIngredients.textContent = `Missing Ingredients: ${recipe.missedIngredients.length}`;
    card.appendChild(missingIngredients);
  
    const usedIngredients = document.createElement('p');
    usedIngredients.textContent = `Used Ingredients: ${recipe.usedIngredients.length}`;
    card.appendChild(usedIngredients);
  
    const link = document.createElement('a');
    link.href = recipe.sourceUrl;
    link.textContent = 'View Recipe';
    link.target = '_blank';
    card.appendChild(link);
  
    return card;
  }
  