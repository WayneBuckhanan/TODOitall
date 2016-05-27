'use strict';

/**
 * @ngdoc function
 * @name softwareEngineeringTeamApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the softwareEngineeringTeamApp
 */
angular.module('softwareEngineeringTeamApp')
  .controller('ToDoCtrl', function($scope, $filter, pDB, pouchDB) {
  
    var remoteDB = pouchDB('http://todoitall.mercs.net:5984/todo');
    
    $scope.todos = [];
    $scope.missions = [];
    $scope.values = [];
    $scope.efforts = [];
    $scope.challenges = [];
    $scope.abilities = [];
    $scope.priorities = [];
    
    
    $scope.missionOptions = {
  	  scrollbarV: false
    };
    
    $scope.effortOptions = {
  	  scrollbarV: false
    };
    
    $scope.abilityOptions = {
  	  scrollbarV: false
    };
    
    $scope.selected = {value: 0};
    
    $scope.changeMission = function (todo, mission) {
    	
    	todo.mission = mission;
    	$scope.missions[todo._id] = mission;
    	pDB.put(todo);
    	
    	console.log(todo);
	};
	
	$scope.submit = function(todo) {
	
	          console.log(todo);

      pDB.put(todo);
    };
	
    pDB.sync(remoteDB, {
      live: true,
      retry: true
    }).on('change', function(info) {
      console.log(info);
      pDB.allDocs({
        include_docs: true
      }, function(err, response) {
        $scope.$apply(function() {
          $scope.todos = [];
          $scope.missions = [];
          response.rows.forEach(function(row) {
            $scope.todos.push(row.doc);
            var todo = row.doc;
          	$scope.missions[todo._id] = todo.mission;
          	$scope.values[todo._id] = todo.value;
          $scope.efforts[todo._id] = todo.effort;
          $scope.challenges[todo._id] = todo.challenge;
          $scope.abilities[todo._id] = todo.ability;
          $scope.priorities[todo._id] = todo.priority;
          });
        });
      });
    }).on('paused', function(info) {
      console.log(info);
    }).on('active', function(info) {
      console.log(info);
    }).on('complete', function(info) {
      console.log(info);
    }).on('error', function(err) {
      console.log(err);
    });


    pDB.allDocs({
      include_docs: true
    }, function(err, response) {
      $scope.$apply(function() {
        $scope.todos = [];
        $scope.missions = [];
        $scope.efforts = [];
        response.rows.forEach(function(row) {
          $scope.todos.push(row.doc);
          var todo = row.doc;
          $scope.missions[todo._id] = todo.mission;
            $scope.values[todo._id] = todo.value;
          $scope.efforts[todo._id] = todo.effort;
          $scope.challenges[todo._id] = todo.challenge;
          $scope.abilities[todo._id] = todo.ability;
          $scope.priorities[todo._id] = todo.priority;
        });
      });
    });

    $scope.priorityOptions = [
                           {value:'High'},
                           {value:'Medium'},
                           {value:'Low'}];
    $scope.todoPriority = '';
    //Prioty used for filtering :TODO need to change the name
    $scope.filterPriority = '';

    $scope.addTodo = function() {
    
    	if($scope.todoPriority == ''){
        	$scope.todoPriority = 'Low';
        }
      var newTodo = {
        _id: Math.uuid,
        text: $scope.todoText,
        done: false,
        priority: $scope.todoPriority,
        mission: "none",
        effort: 0,
        value: 0,
        challenge: $scope.todoChallenge,
        ability: $scope.todoAbility
      };
      console.log($scope.todoPriority);
      console.log(newTodo);
      $scope.todos.push(newTodo);
      $scope.todoText = '';
      pDB.post(newTodo, function(err, res) {
        if (err) {
          console.log(err);
        }
        newTodo._id = res.id;
        newTodo._rev = res.rev;
      });
      $scope.todoPriority = ''
      $scope.missions[newTodo._id] = newTodo.mission;
      $scope.values[newTodo._id] = newTodo.value;
      $scope.efforts[newTodo._id] = newTodo.effort;
      $scope.challenges[newTodo._id] = newTodo.challenge;
      $scope.abilities[newTodo._id] = newTodo.ability;
      $scope.priorities[todo._id] = newTodo.priority;
    };
    
    $scope.remove = function(todo){
   		 pDB.remove(todo);
    };
    
    $scope.removeDone = function() {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) {
          $scope.todos.push(todo);
        } else {
          pDB.remove(todo);
        }
      });
    };

    $scope.updateTodo = function(todo) {
      
      todo.done ? todo.done = false : todo.done = true;
      pDB.put(todo);
    };

    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

  })
  
