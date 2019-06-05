import { TestBed, async } from '@angular/core/testing';

import { NavigationService } from './navigation.service';
import { NavRoute } from '../../../nav-routing';

describe('NavigationService', () => {
    let service: NavigationService;
    const mockNavRouteItems: NavRoute[] = [
        { path: 'somePath', data: { title: 'someTitle' } },
        { path: 'somePath2' },
        { path: 'somePath3' },
    ];
    const mockNavRouteService = {
        navRoute: null,
        router: null,
        getNavRoutes: () => mockNavRouteItems,
    };

    beforeEach(async (() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: NavigationService,
                    useValue: new NavigationService(mockNavRouteService),
                },
            ],
        });
        service = TestBed.get(NavigationService);
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getNavigationItems', () => {
        it('should get the correct navigationItems', () => {
            expect(service.getNavigationItems()).toEqual(mockNavRouteItems);
        });
    });

    describe('setActivePage', () => {
        it('should set the activePage', () => {
            service.setActivePage('fakeTitle', true);
            const activePage = service.getActivePage();
            expect(activePage.title).toEqual('fakeTitle');
            expect(activePage.isChild).toEqual(true);
        });
    });

    describe('getActivePage', () => {
        it('should get the activePage', () => {
            service.setActivePage('fakeTitle', false);
            const activePage = service.getActivePage();
            expect(service.getActivePage()).toEqual(activePage);
        });
    });

    describe('selectNavigationItemByPath', () => {
        it('should get the correct selectedNavigationItem by the item path', () => {
            spyOn(service, 'setActivePage');

            service.selectNavigationItemByPath('somePath');
            expect(service.setActivePage).toHaveBeenCalledWith(
                mockNavRouteItems[0].data.title,
            );
        });
    });

    describe('getSelectedNavigationItem', () => {
        it('should get the correct selectedNavigationItem', () => {
            const navigationItem = mockNavRouteItems[0];
            service.selectNavigationItemByPath(navigationItem.path);
            expect(service.getSelectedNavigationItem()).toEqual(navigationItem);
        });
    });
});
