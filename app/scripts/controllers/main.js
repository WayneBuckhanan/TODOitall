'use strict';

/**
 * @ngdoc function
 * @name softwareEngineeringTeamApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the softwareEngineeringTeamApp
 */
angular.module('softwareEngineeringTeamApp')
  .controller('MainCtrl', function($scope, pDB, pouchDB) {
    var remoteDB = pouchDB('http://todoitall.mercs.net:5984/todo');
    $scope.todos = [];

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

    $scope.priorityOptions = [
                           {value:'High'},
                           {value:'Medium'},
                           {value:'Low'}];
    $scope.todoPriority = '';
    //Prioty used for filtering :TODO need to change the name
    $scope.filterPriority = '';

    $scope.addTodo = function() {
      var newTodo = {
        _id: Math.uuid,
        text: $scope.todoText,
        done: false,
        priority: $scope.todoPriority
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
