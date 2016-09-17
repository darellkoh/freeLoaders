app.filter( 'categoryFilter', function(){

    return function(products, selectedCatId){
    	
        if( selectedCatId > 0 ){
        	return products.filter(function(product){
        		return (product.categoryId === selectedCatId);
        	})
        }
        else
        	return products;
    }
})

app.controller('ProductsCtrl', function($scope, $stateParams, products, categories){

	$scope.products = products;

	$scope.categories = categories;

	$scope.categoryCount = function(categoryId){
		var catCount = 0;

		products.forEach(function(product){
			if( product.categoryId === categoryId ){
				catCount++
			}
		})

		return catCount;
	}

	$scope.selectedCategoryId = $stateParams.categoryID; // Initialize to all on initial page load

	$scope.selectedCategoryStr = function(){

		return $scope.selectedCategoryId === -1  ? 
		'' : 
		categories[$scope.selectedCategoryId - 1].name;
	}

	$scope.setSelected = function(categoryId){
		$scope.selectedCategoryId = categoryId;
	};

	$scope.isActive = function(id){

		return +id === $scope.selectedCategoryId ? 'active' : '';

	}
});

app.controller('singleProductCtrl', function($scope, product, categories){
  
  $scope.product = product;
  $scope.products = products;

  $scope.getCategoryStr = function(categoryId){
  	return categories[categoryId - 1].name;
  }
  
  var products = [];
  for(var i = 0; i < 4; i++){
    products.push(product)
  }
  
  $scope.leaveReview = {};

  $scope.submitReview = function(){
    console.log($scope.leaveReview)
  }

  $scope.reviewArray = [
  {
    title: "title for you",
    rating: 4,
    content: "this is great!",
    user: "Milad Nazeri"
  },
  {
    title: "title title title",
    rating: 2,
    content: "this is fucking great!",
    user: "Joe"
  },
  ]

})
