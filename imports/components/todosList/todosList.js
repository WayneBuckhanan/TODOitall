import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {
  Meteor
} from 'meteor/meteor';
import {
  Tasks
} from '../../api/tasks.js';
import template from './todosList.html';

class TodosListCtrl {
  constructor($scope) {
    $scope.viewModel(this);
    this.subscribe('tasks');
    this.priorityOptions = [
                           {priority:'High'},
                           {priority:'Medium'},
                           {priority:'Low'}];
    this.taskPriority = '';
    this.priority = '';
    this.hideCompleted = false;

    this.helpers({
      tasks() {
        const selector = {};

        // If hide completed is checked, filter tasks
        if (this.getReactively('hideCompleted')) {
          selector.checked = {
            $ne: true
          };
        }

        // Show newest tasks at the top
        return Tasks.find({}, {
          sort: {
            createdAt: -1
          }
        });
      },
      incompleteCount() {
        return Tasks.find({
          checked: {
            $ne: true
          },
          $or: [
          {
            private: {
              $ne: true
            }
          },
          {
            owner: Meteor.userId()}
          ]
        }).count();
      },
      currentUser() {
        return Meteor.user();
      }
    });
  }

  addTask(newTask, priority) {
    // Insert a task into the collection
    Meteor.call('tasks.insert', newTask, priority);

    // Clear form
    this.newTask = '';
    this.priority = '';
  }

  setChecked(task) {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', task._id, !task.checked);
  }

  removeTask(task) {
    Meteor.call('tasks.remove', task._id);
  }

  setPrivate(task) {
    Meteor.call('tasks.setPrivate', task._id, !task.private);
  }
}
export default angular.module('todosList', [
    angularMeteor
  ])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: ['$scope', TodosListCtrl]
  });
