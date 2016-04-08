'use strict';

/**
 * @ngdoc function
 * @name softwareEngineeringTeamApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the softwareEngineeringTeamApp
 */
angular.module('softwareEngineeringTeamApp')
  .controller('MainCtrl', function($scope, pDB) {

    $scope.todos = [];

    $scope.addTodo = function() {
      var newTodo = {
        _id: Math.uuid,
        text: $scope.todoText,
        done: false
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
    };

    pDB.allDocs({
      include_docs: true
    }, function(err, response) {
      $scope.$apply(function() {
        response.rows.forEach(function(row) {
          $scope.todos.push(row.doc);
        });
      });
    });

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
