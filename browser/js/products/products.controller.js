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

app.controller('ProductsCtrl', function($scope, $filter, $stateParams, products, categories, OrderFactory){

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

  $scope.filteredCategories = products;

	$scope.setSelected = function(categoryId){
		$scope.selectedCategoryId = categoryId;
    $scope.filteredCategories = $filter("categoryFilter")(products, categoryId)
    console.log("scope filtered cats", $scope.filteredCategories);
	};

	$scope.isActive = function(id){

		return +id === $scope.selectedCategoryId ? 'active' : '';

	}

    $scope.addToCart = function(product){
    OrderFactory.addToCart(product);
    OrderFactory.toggleShowCart();
  }
});


app.controller('singleProductCtrl', function($scope, product, categories, OrderFactory){

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

  $scope.addToCart = function(product){
    var showCart = OrderFactory.getShowCart();
    console.log('SHOW CART', showCart);
    if(showCart){
      OrderFactory.addToCart(product);
       console.log('SHOW CART whe show cart is true', showCart);
    }else{
      OrderFactory.addToCart(product);
      OrderFactory.setShowCart(true);
      console.log('SHOW CART whe show cart is false -else', showCart);
    }
  }
})
