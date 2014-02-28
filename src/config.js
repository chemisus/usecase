function config($routeProvider) {
    $routeProvider.when('/doc/:name', {
        controller: UseCaseCtrl,
        controllerAs: 'document',
        template: '{{ document.name }}',
        resolve: {
            document_name: function ($route) {
                return $route.current.params.name;
            }
        }
    });
}
