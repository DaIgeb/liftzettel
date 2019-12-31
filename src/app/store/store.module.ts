import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { AppState, initialAppState } from './model';
import { rootReducer } from './reducers';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { provideReduxForms, NgReduxFormModule } from '@angular-redux/form';


import { FluxStandardAction } from 'flux-standard-action';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable-es6-compat';
import { RootEpics } from './epics';


@NgModule({
  declarations: [],
  imports: [
    NgReduxModule,
    NgReduxFormModule,
    NgReduxRouterModule.forRoot()
  ],
})
export class StoreModule {
  constructor(
    store: NgRedux<AppState>,
    ngReduxRouter: NgReduxRouter,
    devTools: DevToolsExtension,
    rootEpics: RootEpics
  ) {
    // Tell Redux about our reducers and epics. If the Redux DevTools
    // chrome extension is available in the browser, tell Redux about
    // it too.
    const epicMiddleware = createEpicMiddleware<
      FluxStandardAction<any, any, any>,
      FluxStandardAction<any, any, any>,
      AppState>();

    store.configureStore(
      rootReducer,
      initialAppState(),
      [createLogger(), epicMiddleware],
      // configure store typings conflict with devTools typings
      (devTools.isEnabled() ? [devTools.enhancer()] : []) as any,
    );

    epicMiddleware.run(rootEpics.createEpics());

    // Enable syncing of Angular router state with our Redux store.
    if (ngReduxRouter) {
      ngReduxRouter.initialize();
    }

    // Enable syncing of Angular form state with our Redux store.
    provideReduxForms(store);
  }
}
