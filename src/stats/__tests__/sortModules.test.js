/**
 * @flow
 */

import { defaultExtendedModule } from '../../__test_helpers__/defaults';
import sortModules from '../sortModules';

const indexJS = defaultExtendedModule({id: 1, name: 'index.js'});
const buttonJS = defaultExtendedModule({id: 2, name: 'button.js'});
const modalJS = defaultExtendedModule({id: 3, name: 'modal.js'});

const allModules = [indexJS, buttonJS, modalJS];

describe('sortModules', () => {
  it('Should sort by name both ways', () => {
    expect(
      sortModules(allModules, {field: 'name', direction: 'ASC'})
    ).toEqual([
      buttonJS,
      indexJS,
      modalJS,
    ]);

    expect(
      sortModules(allModules, {field: 'name', direction: 'DESC'})
    ).toEqual([
      modalJS,
      indexJS,
      buttonJS,
    ]);
  });

  it('Should sort by id both ways', () => {
    expect(
      sortModules(allModules, {field: 'id', direction: 'ASC'})
    ).toEqual([
      indexJS,
      buttonJS,
      modalJS,
    ]);

    expect(
      sortModules(allModules, {field: 'id', direction: 'DESC'})
    ).toEqual([
      modalJS,
      buttonJS,
      indexJS,
    ]);
  });

});
