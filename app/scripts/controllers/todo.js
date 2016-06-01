'use strict';

/**
 * @ngdoc function
 * @name softwareEngineeringTeamApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the softwareEngineeringTeamApp
 */
angular.module('softwareEngineeringTeamApp')
  .controller('ToDoCtrl', function($scope, $filter, pDB, remoteDB, $q) {
    $scope.todos = [];
    $scope.missions = [];
    $scope.incomes = [];
    $scope.values = [];
    $scope.efforts = [];
    $scope.challenges = [];
    $scope.abilities = [];
    $scope.priorities = [];

    $scope.resetValues = function() {
      $scope.todoText = null;
      $scope.todoPriority = 'Low';
      $scope.todoMission = 'optional';
      $scope.todoIncome = 'conserving';
      $scope.todoEffort = null;
      $scope.todoValue = null;
      $scope.todoChallenge = null;
      $scope.todoAbility = null;
    }

    $scope.setValues = function(document) {
      var todo = document;
      $scope.missions[todo._id] = todo.mission;
      $scope.incomes[todo._id] = todo.income;
      $scope.values[todo._id] = todo.value;
      $scope.efforts[todo._id] = todo.effort;
      $scope.challenges[todo._id] = todo.challenge;
      $scope.abilities[todo._id] = todo.ability;
      $scope.priorities[todo._id] = todo.priority;
    }

    $scope.checkValues = function() {
      $scope.todoEffort = ($scope.todoEffort == null) ? 0 : $scope.todoEffort;
      $scope.todoValue = ($scope.todoValue == null) ? 0 : $scope.todoValue;
      $scope.todoChallenge = ($scope.todoChallenge == null) ? 0 : $scope.todoChallenge;
      $scope.todoAbility = ($scope.todoAbility == null) ? 0 : $scope.todoAbility;
    }

    $scope.missionOptions = {
      scrollbarV: false
    };

    $scope.incomeOptions = {
      scrollbarV: false
    };

    $scope.effortOptions = {
      scrollbarV: false
    };

    $scope.abilityOptions = {
      scrollbarV: false
    };

    $scope.selected = {
      value: 0
    };

    $scope.changeMission = function(todo, mission) {

      todo.mission = mission;
      $scope.missions[todo._id] = mission;
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
            $scope.setValues(row.doc);
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
          $scope.setValues(row.doc);
        });
      });
    });

    $scope.priorityOptions = [{
      value: 'High'
    }, {
      value: 'Medium'
    }, {
      value: 'Low'
    }];

    $scope.todoPriority = '';
    //Prioty used for filtering :TODO need to change the name
    $scope.filterPriority = '';

    $scope.addTodo = function() {
      $scope.checkValues();

      var newTodo = {
        _id: Math.uuid,
        text: $scope.todoText,
        done: false,
        tPriority: $scope.todoPriority,
        mission: $scope.todoMission,
        income: $scope.todoIncome,
        effort: $scope.todoEffort,
        value: $scope.todoValue,
        challenge: $scope.todoChallenge,
        ability: $scope.todoAbility
      };
      console.log($scope.todoPriority);
      console.log(newTodo);

      $q.when(pDB.post(newTodo, function(err, res) {
        if (err) {
          console.log(err);
        }
        newTodo._id = res.id;
        newTodo._rev = res.rev;
      }));

      $scope.setValues(newTodo);

      $scope.resetValues();
    };

    $scope.remove = function(todo) {
      pDB.remove(todo);
    };

    $scope.removeAll = function() {
      angular.forEach($scope.todos, function(todo) {
        pDB.remove(todo);
      });
      $scope.todos = [];
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

    $scope.filterPriorityFunction = function(todo) {
      if ($scope.filterPriority === '') {
        return true;
      } else {
        return $scope.priorities[todo._id] === $scope.filterPriority ? true : false;
      }
    };

  })
