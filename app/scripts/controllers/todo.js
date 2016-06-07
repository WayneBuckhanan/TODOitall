'use strict';

// Module for todo CRUD features
angular.module('softwareEngineeringTeamApp')
  .controller('ToDoCtrl', function($scope, $filter, pDB, remoteDB, $q) {

    // Define text to be displayed by the edit button when viewing todos
    // Variable needed to change text to 'Cancel' when actually editing a todo
    $scope.editButton = "Edit";
    // Define variable to hold the priority when adding a todo
    $scope.todoPriority = '';
    // Define variable to hold the selected priority of which the todos should be filtered on
    $scope.filterPriority = '';
    // Define possible priorities to filter todo by
    $scope.priorityOptions = [
                           {value:'High'},
                           {value:'Medium'},
                           {value:'Low'}];
    // Define array to hold todo objects from the database
    $scope.todos = [];
    // Define array to hold the object pairing of a todo with its mission
    $scope.missions = [];
    // Define array to hold the object pairing of a todo with its income
    $scope.incomes = [];
    // Define array to hold the object pairing of a todo with its value
    $scope.values = [];
    // Define array to hold the object pairing of a todo with its effort
    $scope.efforts = [];
    // Define array to hold the object pairing of a todo with its challenge
    $scope.challenges = [];
    // Define array to hold the object pairing of a todo with its ability
    $scope.abilities = [];
    // SHOULD NO LONGER BE NECESSARY
    $scope.priorities = [];

    // Called to clear stored values after adding a todo to the database
    $scope.resetValues = function(){
        // Set defaults for new todo
    	$scope.todoText = null;
    	$scope.todoPriority = 'Low';
    	$scope.todoMission = 'Optional';
    	$scope.todoIncome = 'Conserving';
    	$scope.todoEffort = null;
    	$scope.todoValue = null;
   		$scope.todoChallenge = null;
    	$scope.todoAbility = null;
    }

	// Called for validation of new todo data
    $scope.checkValues = function(){
    	// If any added values are null, set them to 0
    	// Otherwise, set them to whatever was entered
    	$scope.todoEffort = ($scope.todoEffort == null) ? 0 : $scope.todoEffort;
    	$scope.todoValue = ($scope.todoValue == null) ? 0 : $scope.todoValue;
    	$scope.todoChallenge = ($scope.todoChallenge == null) ? 0 : $scope.todoChallenge;
    	$scope.todoAbility = ($scope.todoAbility == null) ? 0 : $scope.todoAbility;
    }

    // Called to sync todo fields with appropriate arrays
    $scope.setValues = function(todo){
    	// Set object pairing for each field
        $scope.missions[todo._id] = todo.mission;
        $scope.incomes[todo._id] = todo.income;
        $scope.values[todo._id] = todo.value;
        $scope.efforts[todo._id] = todo.effort;
        $scope.challenges[todo._id] = todo.challenge;
        $scope.abilities[todo._id] = todo.ability;
        $scope.priorities[todo._id] = todo.priority;
    }

    // Data table options for view 'missions'
    $scope.missionOptions = {
      // Do not show vertical scrollbar
  	  scrollbarV: false
    };

	// Data table options for view 'income'
    $scope.incomeOptions = {
      // Do not show vertical scrollbar
  	  scrollbarV: false
    };

    // Data table options for view 'effort'
    $scope.effortOptions = {
      // Do not show vertical scrollbar
  	  scrollbarV: false
    };

    // Data table options for view 'options'
    $scope.abilityOptions = {
      // Do not show vertical scrollbar
  	  scrollbarV: false
    };

    $scope.selected = {value: 0};

    // Called to change the mission of a todo
    $scope.changeMission = function (todo, mission) {
    	// Edit mission field of the todo
    	todo.mission = mission;
    	// Update todo in the database
    	pDB.put(todo);

	};

	// Called to change the mission of a todo
	$scope.changeIncome = function (todo, income) {
    	// Edit income field of the todo
    	todo.income = income;
    	// Update todo in the database
    	pDB.put(todo);

	};

	// Called to update a todo
	$scope.submit = function(todo) {
      pDB.put(todo);

    };

    $scope.changeIncome = function(todo, income) {

      todo.income = income;
      $scope.incomes[todo._id] = income;
      pDB.put(todo);

    };

    $scope.submit = function(todo) {
      pDB.put(todo);
    };

    $scope.updateDisplay = function() {
      //update display from local database
      pDB.allDocs({
        include_docs: true
      }, function(err, response) {
        $scope.$apply(function() {
          $scope.todos = [];
          $scope.missions = [];
          $scope.efforts = [];
          response.rows.forEach(function(row) {
            $scope.todos.push(row.doc);
            // Populate appropriate arrays with data about the todo
            $scope.setValues(row.doc);
          });
        });
      });
    }

    //Update the display when page is opened
    $scope.updateDisplay();

    pDB.sync(remoteDB, {
      live: true,
      retry: true
    }).on('change', function(info) {
      console.log(info);
      //update display when local or remote database changes
      $scope.updateDisplay();
    }).on('paused', function(info) {
      console.log(info);
    }).on('active', function(info) {
      console.log(info);
      //Update display when database becomes active
      $scope.updateDisplay();
    }).on('complete', function(info) {
      console.log(info);
    }).on('error', function(err) {
      console.log(err);
    });

    $scope.priorityOptions = [{
      value: 'High'
    }, {
      value: 'Medium'
    }, {
      value: 'Low'
    }];


    $scope.addTodo = function() {
      $scope.checkValues();

      //create todo
      var newTodo = {
        _id: Math.uuid,
        text: $scope.todoText,
        done: false,
        priorityy: $scope.todoPriority,
        mission: $scope.todoMission,
        income: $scope.todoIncome,
        effort: $scope.todoEffort,
        value: $scope.todoValue,
        challenge: $scope.todoChallenge,
        ability: $scope.todoAbility
        };

      $scope.todos.push(newTodo);

      //push todo into local database
      $q.when(pDB.post(newTodo, function(err, res) {
        if (err) {
          console.log(err);
        }
        newTodo._id = res.id;
        newTodo._rev = res.rev;
      }));

      // Populate appropriate arrays with data about the added todo
      $scope.setValues(newTodo);
      // Clear stored values after the todo is added
      $scope.resetValues();
    };

    // Called to remove a specific todo from the database
    $scope.remove = function(todo){
   		 pDB.remove(todo);
    };

    // Called to remove all todos from the database
    $scope.removeAll = function() {
      angular.forEach($scope.todos, function(todo) {
        pDB.remove(todo);
      });
    };

    // Called to remove only the todos that are marked complete from the database
    $scope.removeDone = function() {
      // Cache todos in separate array
      var oldTodos = $scope.todos;
      // Clear todos in current array
      $scope.todos = [];
      // For each todo in the cached array,
      angular.forEach(oldTodos, function(todo) {
        // If marked complete,
        if (!todo.done) {
          // Push to todo array
          $scope.todos.push(todo);
        // If not marked complete,
        } else {
          // Remove from the database
          pDB.remove(todo);
        }
      });
    };

    // Called to toggle a todo as complete or not
    $scope.updateTodo = function(todo) {
      // If todo was already done, mark it as not done
      // If todo was not already done, mark it as done
      todo.done ? todo.done = false : todo.done = true;
      // Update todo in the database
      pDB.put(todo);
    };

    // Called to get count of todos not marked complete
    $scope.remaining = function() {
      // Define counter
      var count = 0;
      // For each todo,
      angular.forEach($scope.todos, function(todo) {
        // Increment counter by 1 if todo is marked done
        count += todo.done ? 0 : 1;
      });
      // When done, return counter
      return count;
    };

	// Called to filter the todos by chosen priority
    $scope.filterPriorityFunction = function(todo) {
    	// If no filter is selected,
    	if ($scope.filterPriority === ''){
    		// Return all todos to view
    		return true;
    	}
    	// If a filter is selected,
    	else{
    		// Return only those todos with the selected priority to view
    		return $scope.priorities[todo._id] === $scope.filterPriority ? true : false;
  		}
	};

	// Used to cache a todo to edit
	// Necessary as a user may wish to cancel editing and not save their changes
	$scope.cache = function(edit, todo) {
		// If edit is pressed,
    	if (edit === true){
    	    // Change the edit button text to cancel
  			$scope.editButton = "Cancel";
  			// Create a separate object with the data of todo being edited
    		$scope.cachedTodo = {
				text: todo.text,
				priorityy: todo.priorityy,
				mission: todo.mission,
				income: todo.income,
				effort: todo.effort,
				value: todo.value,
				challenge: todo.challenge,
				ability: todo.ability
		  };
    	}
    	// If cancel is pressed,
    	else{
    		// Change the edit button text back to edit
    		$scope.editButton = "Edit";
    		// Do nothing
  		}
	};

	// Called to save an edited todo to the database
	$scope.save = function(todo, cachedTodo) {
    	// Set values of original todo to the corresponding data of the edited cached version
    	todo.text = cachedTodo.text
    	todo.priorityy = cachedTodo.priorityy
    	todo.mission = cachedTodo.mission
    	todo.income = cachedTodo.income
    	todo.effort = cachedTodo.effort
    	todo.value = cachedTodo.value
    	todo.challenge = cachedTodo.challenge
    	todo.ability = cachedTodo.ability
  		// Update the todo in the database
  		pDB.put(todo);
	};

  })
