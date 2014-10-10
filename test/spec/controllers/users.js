'use strict';
/* jshint expr: true */
/* global sinon: false */

describe('Controller: UsersCtrl', function () {

  // load the controller's module
  beforeEach(module('openhimWebui2App'));

  var createController, httpBackend, scope, modalSpy;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $modal) {
    httpBackend = $httpBackend;

    $httpBackend.when('GET', new RegExp('.*/users')).respond([
      {
        'firstname': 'Super',
        'surname': 'User',
        'email': 'super@openim.org',
        'passwordAlgorithm': 'sample/api',
        'passwordHash': '539aa778930879b01b37ff62',
        'passwordSalt': '79b01b37ff62',
        'groups': ['admin']

      },
      {
        'firstname': 'Ordinary',
        'surname': 'User',
        'email': 'normal@openim.org',
        'passwordAlgorithm': 'sample/api',
        'passwordHash': '539aa778930879b01b37ff62',
        'passwordSalt': '79b01b37ff62',
        'groups': ['limited']
      }
    ]);

    $httpBackend.when('GET', new RegExp('.*/channels')).respond([
      {'name':'Sample JsonStub Channel 1','urlPattern':'sample/api','allow':['PoC'],'txRerunAcl':['test'],'routes':[{'host':'jsonstub.com','port':80,'primary':true}],'_id':'5322fe9d8b6add4b2b059dd8'},
      {'name':'Sample JsonStub Channel 2','urlPattern':'sample/api','allow':['PoC'],'txRerunAcl':['testing'],'routes':[{'host':'jsonstub.com','port':80}],'_id':'5322fe9d8b6add4b2b059aa3'}
    ]);

    modalSpy = sinon.spy($modal, 'open');

    scope = $rootScope.$new();
    createController = function () {
      scope = $rootScope.$new();
      return $controller('UsersCtrl', { $scope: scope });
    };
  }));

  it('should attach a list of users to the scope', function () {
    httpBackend.expectGET(new RegExp('.*/users'));
    createController();
    httpBackend.flush();
    scope.users.length.should.equal(2);

  });

  it('should open a modal to confirm deletion of a user', function () {
    createController();
    httpBackend.flush();

    httpBackend.expectGET('views/deleteConfirmModal.html').respond(200, '');
    scope.confirmDelete(scope.users[0]);
    modalSpy.should.be.calledOnce;
    httpBackend.flush();
  });

  it('should open a modal to add a user', function () {
    createController();
    scope.addUser();

    modalSpy.should.be.calledOnce;

    httpBackend.flush();
  });

  it('should open a modal to edit a user', function () {
    createController();
    scope.editUser();

    modalSpy.should.be.calledOnce;

    httpBackend.flush();
  });
});
