'use strict';

/**
 * @ngdoc function
 * @name softwareEngineeringTeamApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the softwareEngineeringTeamApp
 */
angular.module('softwareEngineeringTeamApp')
  .controller('ToDoCtrl', function($scope, pDB, pouchDB) {

      $scope.todos = [];

      //Syncing for local and remote databases
      var remoteDB = pouchDB('http://todoitall.mercs.net:5984/todo');
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
            response.rows.forEach(function(row) {
              $scope.todos.push(row.doc);
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
          response.rows.forEach(function(row) {
            $scope.todos.push(row.doc);
          });
        });
      });

      //Variables for passing attributes to html
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
      $scope.percievedAbility = '';
      $scope.percievedChallenge = '';

      //Helper funcitons

      $scope.taskStateCalc = function(pAbility, pChallenge) {
        var state = pChallenge / pAbility;

        if (state <= 4 / 12) {
          state = "Apathy";
        } else if (4 / 12 < state && state <= 8 / 12) {
          state = "Power-Apathy";
        } else if (8 / 12 < state && state <= 12 / 8) {
          state = "Power";
        } else if (12 / 8 < state && state <= 12 / 4) {
          state = "Power-Stress";
        } else if (12 / 4 < state) {
          state = "Stress";
        } else {
          state = "";
        }
        return state;

    };

    //Main Functions
    $scope.addTodo = function() {

      if ($scope.todoPriority === '') {
        $scope.todoPriority = 'Low';
      }
      var newTodo = {
        _id: Math.uuid,
        text: $scope.todoText,
        done: false,
        priority: $scope.todoPriority,
        pAbility: $scope.percievedAbility,
        pChallenge: $scope.percievedChallenge,
        taskState: $scope.taskStateCalc($scope.percievedAbility, $scope.percievedChallenge)

      };
      $scope.todos.push(newTodo);
      $scope.todoText = '';
      pDB.post(newTodo, function(err, res) {
        if (err) {
          console.log(err);
        }
        newTodo._id = res.id;
        newTodo._rev = res.rev;
      });
      $scope.todoPriority = '';
      $scope.percievedAbility = '';
      $scope.percievedChallenge = '';
    };

    $scope.remove = function(todo) {
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

  });
