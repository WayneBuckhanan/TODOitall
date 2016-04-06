import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './todosList.html';
import { Tasks } from '../../api/tasks.js';

class TodosListCtrl {
	constructor($scope) {
	    $scope.viewModel(this);
 
	    this.helpers({
	      tasks() {
	  // new first. such sort. very wow.
			  return Tasks.find({}, {
			            sort: {
			              createdAt: -1
			            }
			          });
	      }
	    })
	  }
  
	  
	  addTask(newTask) {
	      // new task. such organize.
	      Tasks.insert({
	        text: newTask,
	        createdAt: new Date
	      });
 
	      // clear form. much empty.
	      this.newTask = '';
	    }
		
		setChecked(task) {
		    // complete task. wow.
		    Tasks.update(task._id, {
		      $set: {
		        checked: !task.checked
		      },
		    });
		  }
 		 	//bye felicia. aka task.
		  removeTask(task) {
		    Tasks.remove(task._id);
		  }
	}
 
export default angular.module('todosList', [
  angularMeteor
])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: ['$scope', TodosListCtrl]
  });